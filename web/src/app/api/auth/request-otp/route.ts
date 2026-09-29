import { NextResponse } from "next/server";
import { z } from "zod";
import { createOtpChallenge } from "@/lib/auth";
import { sendOtpSms } from "@/lib/sms";

const requestSchema = z.object({ phone: z.string() });

export async function POST(request: Request) {
  try {
    const { phone } = requestSchema.parse(await request.json());
    const { challengeId, code } = await createOtpChallenge(phone);

    if (process.env.NODE_ENV === "production") {
      await sendOtpSms(phone, code);
      return NextResponse.json({ challengeId }, { status: 201 });
    }

    return NextResponse.json({ challengeId, developmentCode: code }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "درخواست نامعتبر است." }, { status: 400 });
  }
}
