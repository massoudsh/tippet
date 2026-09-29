import { z } from "zod";
import { prisma } from "./prisma";

export const styleProfileInputSchema = z.object({
  sizes: z.array(z.string().trim().min(1).max(32)).min(1).max(8),
  budgetMin: z.number().int().nonnegative().optional(),
  budgetMax: z.number().int().positive().optional(),
  preferredCategories: z.array(z.string().trim().min(2).max(64)).min(1).max(12),
  preferredColors: z.array(z.string().trim().min(2).max(32)).min(1).max(12),
}).refine((input) => !input.budgetMin || !input.budgetMax || input.budgetMin <= input.budgetMax, {
  message: "حداقل بودجه نمی‌تواند از حداکثر بودجه بیشتر باشد.",
});

export function upsertStyleProfile(userId: string, input: z.infer<typeof styleProfileInputSchema>) {
  return prisma.styleProfile.upsert({
    where: { userId },
    update: {
      sizeInfo: { sizes: input.sizes },
      budgetMin: input.budgetMin ?? null,
      budgetMax: input.budgetMax ?? null,
      preferredCategories: input.preferredCategories,
      preferredColors: input.preferredColors,
    },
    create: {
      userId,
      sizeInfo: { sizes: input.sizes },
      budgetMin: input.budgetMin ?? null,
      budgetMax: input.budgetMax ?? null,
      preferredCategories: input.preferredCategories,
      preferredColors: input.preferredColors,
    },
  });
}
