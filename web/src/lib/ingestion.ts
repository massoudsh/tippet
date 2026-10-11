import { z } from "zod";

export const ingestionDraftSchema = z.object({
  source: z.enum(["divar", "instagram", "telegram", "other"]),
  sourceUrl: z.string().trim().url().max(2048).refine((url) => /^https?:\/\//i.test(url), "لینک منبع باید با http یا https شروع شود."),
  title: z.string().trim().min(3).max(120),
  description: z.string().trim().min(20).max(4000),
  category: z.string().trim().min(2).max(64),
  brand: z.string().trim().max(64).optional(),
  size: z.string().trim().max(32).optional(),
  condition: z.enum(["NEW_WITH_TAG", "LIKE_NEW", "GOOD", "FAIR"]),
  color: z.string().trim().max(32).optional(),
  material: z.string().trim().max(64).optional(),
  price: z.number().int().positive().max(1_000_000_000),
  city: z.string().trim().min(2).max(64),
  hasPermission: z.literal(true, { errorMap: () => ({ message: "برای ورود آگهی باید مجوز منبع را تأیید کنید." }) }),
});

export interface IngestionCandidate {
  source: "divar" | "instagram" | "telegram";
  sourceUrl: string;
  title: string;
  price: number;
  city: string;
  hasPermission: boolean;
}

export function normalizeIngestionCandidate(candidate: IngestionCandidate) {
  if (!candidate.hasPermission) {
    throw new Error("برای ورود آگهی باید مجوز منبع تأیید شده باشد.");
  }

  return {
    title: candidate.title.trim(),
    price: candidate.price,
    city: candidate.city.trim(),
    source: candidate.source,
    sourceUrl: candidate.sourceUrl,
    status: "PENDING_REVIEW" as const,
  };
}
