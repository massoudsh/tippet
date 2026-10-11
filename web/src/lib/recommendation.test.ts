import { describe, expect, it } from "vitest";
import { catalogItems } from "./catalog";
import { getRecommendedItems, rankDiscoveryItems, rankItemsForStyleProfile } from "./recommendation";

describe("recommendation ranking", () => {
  it("ranks items by style profile match", () => {
    const ranked = rankItemsForStyleProfile(catalogItems, {
      categories: ["کت"],
      colors: ["آبی"],
      sizes: ["M"],
      tags: ["وینتیج"],
      maxPrice: 2000000,
    });

    expect(ranked[0]).toEqual({ itemId: "vintage-denim-jacket", score: 100 });
  });

  it("returns a default discovery feed", async () => {
    const recommendations = await getRecommendedItems("user-1");

    expect(recommendations).toHaveLength(3);
    expect(recommendations[0].itemId).toBe("vintage-denim-jacket");
  });

  it("uses profile matches, budget, and recency in a stable order", () => {
    const now = new Date("2026-10-11T12:00:00Z");
    const ranked = rankDiscoveryItems([
      { id: "older-match", category: "کت", color: "آبی", size: "M", price: 1_000_000, createdAt: new Date("2026-08-01T12:00:00Z") },
      { id: "new-match", category: "کت", color: "آبی", size: "M", price: 1_000_000, createdAt: new Date("2026-10-10T12:00:00Z") },
      { id: "new-mismatch", category: "هودی", color: "مشکی", size: "L", price: 3_000_000, createdAt: new Date("2026-10-10T12:00:00Z") },
    ], {
      preferredCategories: ["کت"],
      preferredColors: ["آبی"],
      sizes: ["M"],
      budgetMin: 700_000,
      budgetMax: 1_500_000,
    }, now);

    expect(ranked).toEqual([
      { itemId: "new-match", score: 100 },
      { itemId: "older-match", score: 85 },
      { itemId: "new-mismatch", score: 33 },
    ]);
  });
});
