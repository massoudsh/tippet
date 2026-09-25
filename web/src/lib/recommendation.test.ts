import { describe, expect, it } from "vitest";
import { catalogItems } from "./catalog";
import { getRecommendedItems, rankItemsForStyleProfile } from "./recommendation";

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
});
