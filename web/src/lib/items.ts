import { ItemCondition, ItemStatus, UserRole } from "@prisma/client";
import { z } from "zod";
import { prisma } from "./prisma";

const itemConditionSchema = z.nativeEnum(ItemCondition);
const itemStatusSchema = z.nativeEnum(ItemStatus);

export const itemInputSchema = z.object({
  title: z.string().trim().min(3).max(120),
  description: z.string().trim().min(20).max(4000),
  category: z.string().trim().min(2).max(64),
  brand: z.string().trim().max(64).optional(),
  size: z.string().trim().max(32).optional(),
  condition: itemConditionSchema,
  color: z.string().trim().max(32).optional(),
  material: z.string().trim().max(64).optional(),
  price: z.number().int().positive().max(1_000_000_000),
  city: z.string().trim().min(2).max(64),
  imageUrls: z.array(z.string().startsWith("/uploads/items/")).min(1).max(8),
});

export const itemSearchSchema = z.object({
  q: z.string().trim().max(100).optional(),
  city: z.string().trim().max(64).optional(),
  category: z.string().trim().max(64).optional(),
  size: z.string().trim().max(32).optional(),
  minPrice: z.coerce.number().int().nonnegative().optional(),
  maxPrice: z.coerce.number().int().positive().optional(),
  status: itemStatusSchema.optional(),
});

export async function createItem(sellerId: string, input: z.infer<typeof itemInputSchema>) {
  const category = await prisma.category.upsert({
    where: { name: input.category },
    update: {},
    create: { name: input.category },
  });

  await prisma.user.update({
    where: { id: sellerId },
    data: { role: UserRole.BOTH },
  });

  return prisma.item.create({
    data: {
      sellerId,
      title: input.title,
      description: input.description,
      categoryId: category.id,
      brand: input.brand || null,
      size: input.size || null,
      condition: input.condition,
      color: input.color || null,
      material: input.material || null,
      price: input.price,
      city: input.city,
      aiExtractedTags: {
        completeness: calculateListingCompleteness(input),
        suggestedBy: "rule-based-draft",
      },
      images: { create: input.imageUrls.map((url, order) => ({ url, order })) },
    },
    include: itemInclude,
  });
}

export async function listItems(filters: z.infer<typeof itemSearchSchema>) {
  const where = {
    status: filters.status ?? ItemStatus.ACTIVE,
    ...(filters.city ? { city: filters.city } : {}),
    ...(filters.category ? { category: { name: filters.category } } : {}),
    ...(filters.size ? { size: filters.size } : {}),
    ...(filters.minPrice || filters.maxPrice ? { price: { ...(filters.minPrice ? { gte: filters.minPrice } : {}), ...(filters.maxPrice ? { lte: filters.maxPrice } : {}) } } : {}),
    ...(filters.q
      ? {
          OR: [
            { title: { contains: filters.q, mode: "insensitive" as const } },
            { description: { contains: filters.q, mode: "insensitive" as const } },
            { brand: { contains: filters.q, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  return prisma.item.findMany({ where, include: itemInclude, orderBy: { createdAt: "desc" } });
}

export async function getItemById(id: string) {
  return prisma.item.findUnique({ where: { id }, include: itemInclude });
}

export async function updateItemStatus(itemId: string, sellerId: string, status: ItemStatus) {
  const item = await prisma.item.findFirst({ where: { id: itemId, sellerId } });
  if (!item) throw new Error("آگهی موردنظر پیدا نشد یا دسترسی ندارید.");

  return prisma.item.update({ where: { id: itemId }, data: { status }, include: itemInclude });
}

export async function recordInteraction(userId: string, itemId: string, type: "VIEW" | "LIKE" | "DISLIKE" | "SAVE" | "CONTACT_SELLER") {
  return prisma.interaction.create({ data: { userId, itemId, type } });
}

export const itemInclude = {
  category: true,
  images: { orderBy: { order: "asc" as const } },
  seller: { select: { id: true, name: true, city: true, createdAt: true } },
} as const;

function calculateListingCompleteness(input: z.infer<typeof itemInputSchema>) {
  const populated = [input.brand, input.size, input.color, input.material].filter(Boolean).length;
  return Math.min(100, 50 + input.imageUrls.length * 6 + populated * 6 + (input.description.length > 100 ? 10 : 0));
}
