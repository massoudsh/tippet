import { NextResponse } from "next/server";
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


function readCompleteness(tags: unknown): number {
  if (tags && typeof tags === "object" && "completeness" in tags) {
    const value = (tags as { completeness?: unknown }).completeness;
    if (typeof value === "number") return value;
  }
  return 0;
}
