import { NextResponse } from "next/server";
import { z } from "zod";
import { getSessionUser } from "@/lib/auth";
import { getItemById, updateItemStatus } from "@/lib/items";

const updateSchema = z.object({ status: z.enum(["ACTIVE", "RESERVED", "SOLD", "REMOVED"]) });

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const item = await getItemById(params.id);
  if (!item) return NextResponse.json({ error: "آگهی پیدا نشد." }, { status: 404 });
  return NextResponse.json({ item });
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "ورود لازم است." }, { status: 401 });

  try {
    const { status } = updateSchema.parse(await request.json());
    const item = await updateItemStatus(params.id, user.id, status);
    return NextResponse.json({ item });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "به‌روزرسانی ناموفق بود." }, { status: 400 });
  }
}
