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

export interface DiscoveryProfile {
  preferredCategories: readonly string[];
  preferredColors: readonly string[];
  sizes: readonly string[];
  budgetMin?: number | null;
  budgetMax?: number | null;
}

export interface DiscoveryItem {
  id: string;
  category: string;
  color?: string | null;
  size?: string | null;
  price: number;
  createdAt: Date;
}

export const DISCOVERY_WEIGHTS = {
  category: 30,
  color: 15,
  size: 10,
  budget: 25,
  recency: 20,
} as const;

function includes(values: readonly string[], value: string | null | undefined) {
  if (!value) return false;
  return values.some((entry) => entry.trim().toLocaleLowerCase() === value.trim().toLocaleLowerCase());
}

function budgetScore(price: number, profile: DiscoveryProfile) {
  const min = profile.budgetMin ?? null;
  const max = profile.budgetMax ?? null;
  if (min === null && max === null) return 0;
  if (min !== null && price < min) return DISCOVERY_WEIGHTS.budget * (min === 0 ? 0 : price / min);
  if (max !== null && price > max) return DISCOVERY_WEIGHTS.budget * (max === 0 ? 0 : max / price);
  return DISCOVERY_WEIGHTS.budget;
}

function recencyScore(createdAt: Date, now: Date) {
  const ageInDays = Math.max(0, (now.getTime() - createdAt.getTime()) / 86_400_000);
  if (ageInDays <= 7) return DISCOVERY_WEIGHTS.recency;
  if (ageInDays <= 30) return 12;
  return 5;
}

export function scoreDiscoveryItem(item: DiscoveryItem, profile: DiscoveryProfile, now = new Date()) {
  const category = includes(profile.preferredCategories, item.category) ? DISCOVERY_WEIGHTS.category : 0;
  const color = includes(profile.preferredColors, item.color) ? DISCOVERY_WEIGHTS.color : 0;
  const size = item.size === "Free" || includes(profile.sizes, item.size) ? DISCOVERY_WEIGHTS.size : 0;
  return Math.round(Math.min(100, category + color + size + budgetScore(item.price, profile) + recencyScore(item.createdAt, now)));
}

export function rankDiscoveryItems(items: readonly DiscoveryItem[], profile: DiscoveryProfile, now = new Date()): RecommendedItem[] {
  return items
    .map((item) => ({ itemId: item.id, score: scoreDiscoveryItem(item, profile, now), createdAt: item.createdAt }))
    .sort((a, b) => b.score - a.score || b.createdAt.getTime() - a.createdAt.getTime() || a.itemId.localeCompare(b.itemId))
    .map(({ itemId, score }) => ({ itemId, score }));
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
