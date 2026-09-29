import { createHash, randomBytes, randomInt } from "crypto";
import { cookies } from "next/headers";
import { z } from "zod";
import { prisma } from "./prisma";

const sessionCookieName = "tipet_session";
const otpLifetimeMs = 5 * 60 * 1000;
const sessionLifetimeMs = 30 * 24 * 60 * 60 * 1000;
const otpRequestLimit = 3;
const otpRequestWindowMs = 15 * 60 * 1000;

export const iranMobileSchema = z
  .string()
  .trim()
  .regex(/^(?:\+98|0098|98|0)?9\d{9}$/, "شماره موبایل معتبر نیست");

export function normalizeIranMobile(input: string) {
  const digits = input.trim().replace(/[\s-]/g, "");
  const local = digits.replace(/^(?:\+98|0098|98)/, "0");
  const normalized = local.startsWith("9") ? `0${local}` : local;

  return iranMobileSchema.parse(normalized);
}

export function createOtpCode() {
  return String(randomInt(100000, 1000000));
}

export function hashOtpCode(phone: string, code: string) {
  return createHash("sha256").update(`${normalizeIranMobile(phone)}:${code}`).digest("hex");
}

export function verifyOtpCode(phone: string, code: string, hash: string) {
  return hashOtpCode(phone, code) === hash;
}

export async function createOtpChallenge(phoneInput: string) {
  const phone = normalizeIranMobile(phoneInput);
  const since = new Date(Date.now() - otpRequestWindowMs);
  const requestCount = await prisma.otpChallenge.count({
    where: { phone, createdAt: { gte: since } },
  });

  if (requestCount >= otpRequestLimit) {
    throw new Error("تعداد درخواست کد تأیید بیش از حد مجاز است.");
  }

  const code = createOtpCode();
  const challenge = await prisma.otpChallenge.create({
    data: {
      phone,
      codeHash: hashOtpCode(phone, code),
      expiresAt: new Date(Date.now() + otpLifetimeMs),
    },
  });

  return { challengeId: challenge.id, code };
}

export async function verifyOtpChallenge(phoneInput: string, code: string) {
  const phone = normalizeIranMobile(phoneInput);
  const challenge = await prisma.otpChallenge.findFirst({
    where: {
      phone,
      codeHash: hashOtpCode(phone, code),
      consumedAt: null,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!challenge) throw new Error("کد تأیید نامعتبر یا منقضی است.");

  const user = await prisma.user.upsert({
    where: { phone },
    update: {},
    create: { phone },
  });

  await prisma.otpChallenge.update({
    where: { id: challenge.id },
    data: { consumedAt: new Date(), userId: user.id },
  });

  const rawToken = randomBytes(32).toString("base64url");
  await prisma.session.create({
    data: {
      userId: user.id,
      tokenHash: hashSessionToken(rawToken),
      expiresAt: new Date(Date.now() + sessionLifetimeMs),
    },
  });

  return { user, rawToken };
}

export function hashSessionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function getSessionUser() {
  const token = cookies().get(sessionCookieName)?.value;
  if (!token) return null;

  const session = await prisma.session.findFirst({
    where: { tokenHash: hashSessionToken(token), expiresAt: { gt: new Date() } },
    include: { user: true },
  });

  return session?.user ?? null;
}

export function setSessionCookie(token: string) {
  cookies().set(sessionCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionLifetimeMs / 1000,
  });
}

export async function clearSession() {
  const token = cookies().get(sessionCookieName)?.value;
  if (token) {
    await prisma.session.deleteMany({ where: { tokenHash: hashSessionToken(token) } });
  }
  cookies().delete(sessionCookieName);
}
