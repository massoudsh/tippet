import { NextResponse } from "next/server";
import { z } from "zod";
import { getSessionUser } from "@/lib/auth";
import { recordInteraction } from "@/lib/items";

const interactionSchema = z.object({
  itemId: z.string().uuid(),
  type: z.enum(["VIEW", "LIKE", "DISLIKE", "SAVE", "CONTACT_SELLER"]),
});

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "ورود لازم است." }, { status: 401 });

  try {
    const { itemId, type } = interactionSchema.parse(await request.json());
    await recordInteraction(user.id, itemId, type);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "ثبت تعامل ناموفق بود." }, { status: 400 });
  }
}
