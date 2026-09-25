import { createHash, randomInt } from "crypto";
import { z } from "zod";

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
