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
