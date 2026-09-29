import { z } from "zod";

const smsResponseSchema = z.object({ messageId: z.string().optional() });

export async function sendOtpSms(phone: string, code: string) {
  const endpoint = process.env.SMS_PROVIDER_ENDPOINT;
  const token = process.env.SMS_PROVIDER_TOKEN;

  if (!endpoint || !token) {
    throw new Error("سرویس پیامک پیکربندی نشده است.");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({ to: phone, message: `کد ورود تیپت: ${code}` }),
  });

  if (!response.ok) throw new Error("ارسال پیامک ناموفق بود.");
  return smsResponseSchema.parse(await response.json());
}
