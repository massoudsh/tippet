import { NextResponse } from "next/server";
import { z } from "zod";
import { getSessionUser, normalizeIranMobile } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const whatsappUrlSchema = z.string().url().refine((url) => new URL(url).hostname === "wa.me", "لینک واتساپ باید از wa.me باشد.");
const telegramUrlSchema = z.string().url().refine((url) => ["t.me", "telegram.me"].includes(new URL(url).hostname), "لینک تلگرام باید از t.me باشد.");
const contactSchema = z.object({
  contactPhone: z.string().trim().min(1).transform(normalizeIranMobile).nullable().optional(),
  whatsappUrl: whatsappUrlSchema.nullable().optional(),
  telegramUrl: telegramUrlSchema.nullable().optional(),
});

export async function PATCH(request: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "ورود لازم است." }, { status: 401 });

  try {
    const input = contactSchema.parse(await request.json());
    const seller = await prisma.user.update({
      where: { id: user.id },
      data: input,
      select: { contactPhone: true, whatsappUrl: true, telegramUrl: true },
    });
    return NextResponse.json({ seller });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "اطلاعات تماس نامعتبر است." }, { status: 400 });
  }
}
