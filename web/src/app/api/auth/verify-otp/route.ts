import { NextResponse } from "next/server";
import { z } from "zod";
import { setSessionCookie, verifyOtpChallenge } from "@/lib/auth";

const verifySchema = z.object({ phone: z.string(), code: z.string().regex(/^\d{6}$/) });

export async function POST(request: Request) {
  try {
    const { phone, code } = verifySchema.parse(await request.json());
    const { user, rawToken } = await verifyOtpChallenge(phone, code);
    setSessionCookie(rawToken);
    return NextResponse.json({ user: { id: user.id, phone: user.phone, role: user.role } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "کد تأیید نامعتبر است." }, { status: 401 });
  }
}
