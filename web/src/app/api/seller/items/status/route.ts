import { NextResponse } from "next/server";
import { z } from "zod";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const bulkStatusSchema = z.object({
  itemIds: z.array(z.string().uuid()).min(1).max(50).refine((ids) => new Set(ids).size === ids.length, "شناسه‌های آگهی تکراری هستند."),
  status: z.enum(["ACTIVE", "SOLD"]),
});

export async function PATCH(request: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "ورود لازم است." }, { status: 401 });

  const parsed = bulkStatusSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "دادهٔ درخواست معتبر نیست." }, { status: 400 });

  const { itemIds, status } = parsed.data;
  const ownedItems = await prisma.item.findMany({
    where: { id: { in: itemIds }, sellerId: user.id },
    select: { id: true, status: true },
  });
  const itemsToUpdate = ownedItems.filter((item) => item.status !== status).map((item) => item.id);
  const result = itemsToUpdate.length
    ? await prisma.item.updateMany({ where: { id: { in: itemsToUpdate }, sellerId: user.id }, data: { status } })
    : { count: 0 };

  return NextResponse.json({
    requested: itemIds.length,
    updated: result.count,
    unchanged: ownedItems.length - itemsToUpdate.length,
    failed: itemIds.length - ownedItems.length + itemsToUpdate.length - result.count,
  });
}
