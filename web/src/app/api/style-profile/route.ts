import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { styleProfileInputSchema, upsertStyleProfile } from "@/lib/styleProfiles";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "ورود لازم است." }, { status: 401 });
  return NextResponse.json({ profile: await prisma.styleProfile.findUnique({ where: { userId: user.id } }) });
}

export async function PUT(request: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "ورود لازم است." }, { status: 401 });

  try {
    const input = styleProfileInputSchema.parse(await request.json());
    return NextResponse.json({ profile: await upsertStyleProfile(user.id, input) });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "پروفایل نامعتبر است." }, { status: 400 });
  }
}
