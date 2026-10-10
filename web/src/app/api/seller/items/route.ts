import { NextResponse } from "next/server";
import { ItemStatus } from "@prisma/client";
import { z } from "zod";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { summarizeSellerItems, calculateSellerTrustScore, type SellerPanelItem } from "@/lib/seller";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "ورود لازم است." }, { status: 401 });

  const items = await prisma.item.findMany({
    where: { sellerId: user.id },
    include: { images: { orderBy: { order: "asc" }, take: 1 }, interactions: true },
    orderBy: { createdAt: "desc" },
  });

  const panelItems: SellerPanelItem[] = items.map((item) => ({
    id: item.id,
    title: item.title,
    price: item.price,
    status: item.status,
    completeness: readCompleteness(item.aiExtractedTags),
    views: item.interactions.filter((interaction) => interaction.type === "VIEW").length,
    contacts: item.interactions.filter((interaction) => interaction.type === "CONTACT_SELLER").length,
  }));

  return NextResponse.json({
    items: panelItems,
    summary: summarizeSellerItems(panelItems),
    trustScore: calculateSellerTrustScore(panelItems),
  });
}

export async function PATCH(request: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "ورود لازم است." }, { status: 401 });

  const schema = z.object({
    itemIds: z.array(z.string().uuid()).min(1).max(50),
    status: z.nativeEnum(ItemStatus),
  });

  try {
    const { itemIds, status } = schema.parse(await request.json());
    const result = await prisma.item.updateMany({
      where: { id: { in: itemIds }, sellerId: user.id },
      data: { status },
    });
    return NextResponse.json({ updated: result.count });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "به‌روزرسانی ناموفق بود." }, { status: 400 });
  }
}

function readCompleteness(tags: unknown): number {
  if (tags && typeof tags === "object" && "completeness" in tags) {
    const value = (tags as { completeness?: unknown }).completeness;
    if (typeof value === "number") return value;
  }
  return 0;
}
