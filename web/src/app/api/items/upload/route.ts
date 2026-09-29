import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { storeItemImage } from "@/lib/storage";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "ورود لازم است." }, { status: 401 });

  try {
    const file = (await request.formData()).get("image");
    if (!(file instanceof File)) return NextResponse.json({ error: "تصویر ارسال نشده است." }, { status: 400 });
    return NextResponse.json({ url: await storeItemImage(file) }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "آپلود ناموفق بود." }, { status: 400 });
  }
}
