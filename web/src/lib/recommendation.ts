import { catalogItems, type CatalogItem } from "./catalog";

export interface StylePreference {
  categories: string[];
  colors: string[];
  sizes: string[];
  tags: string[];
  maxPrice?: number;
}

export interface RecommendedItem {
  itemId: string;
  score: number;
}

export function rankItemsForStyleProfile(items: CatalogItem[], profile: StylePreference): RecommendedItem[] {
  return items
    .map((item) => {
      const categoryScore = profile.categories.includes(item.category) ? 30 : 0;
      const colorScore = profile.colors.includes(item.color) ? 20 : 0;
      const sizeScore = profile.sizes.includes(item.size) || item.size === "Free" ? 20 : 0;
      const tagScore = item.tags.filter((tag) => profile.tags.includes(tag)).length * 10;
      const budgetScore = !profile.maxPrice || item.price <= profile.maxPrice ? 20 : 0;

      return { itemId: item.id, score: Math.min(categoryScore + colorScore + sizeScore + tagScore + budgetScore, 100) };
    })
    .sort((a, b) => b.score - a.score);
}

export async function getRecommendedItems(_userId: string): Promise<RecommendedItem[]> {
  return rankItemsForStyleProfile(catalogItems, {
    categories: ["کت", "هودی"],
    colors: ["آبی", "مشکی"],
    sizes: ["M"],
    tags: ["وینتیج", "استریت‌ویر"],
    maxPrice: 2000000,
  });
}
