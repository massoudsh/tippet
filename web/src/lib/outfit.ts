import type { CatalogItem } from "./catalog";

export interface OutfitSuggestion {
  anchor: CatalogItem;
  complements: CatalogItem[];
}

const complementCategories: Record<string, string[]> = {
  کت: ["هودی", "بارانی"],
  بارانی: ["هودی", "کت"],
  هودی: ["کت", "بارانی"],
};

export function buildSimpleOutfit(anchor: CatalogItem, items: CatalogItem[]): OutfitSuggestion {
  const categories = complementCategories[anchor.category] ?? [];
  const complements = items
    .filter((item) => item.id !== anchor.id && categories.includes(item.category))
    .slice(0, 2);

  return { anchor, complements };
}
