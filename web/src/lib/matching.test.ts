import { describe, expect, it } from "vitest";

import {
  SIGNAL_WEIGHTS,
  buildTasteEmbedding,
  cosineSimilarity,
  matchPercent,
  matchScore,
  rankItems,
} from "./matching";
import type { RankableItem, TasteSignal } from "./matching";

describe("cosineSimilarity", () => {
  it("returns 1 for identical vectors", () => {
    expect(cosineSimilarity([1, 0], [1, 0])).toBeCloseTo(1);
    expect(cosineSimilarity([0.3, 0.4, 0.5], [0.3, 0.4, 0.5])).toBeCloseTo(1);
  });

  it("is scale-invariant", () => {
    expect(cosineSimilarity([1, 2], [10, 20])).toBeCloseTo(1);
  });

  it("returns 0 for orthogonal vectors", () => {
    expect(cosineSimilarity([1, 0], [0, 1])).toBeCloseTo(0);
  });

  it("returns -1 for opposite vectors", () => {
    expect(cosineSimilarity([1, 0], [-1, 0])).toBeCloseTo(-1);
  });

  it("returns 0 when one of the vectors is all zeros", () => {
    expect(cosineSimilarity([0, 0], [1, 1])).toBe(0);
  });

  it("returns 0 for empty vectors", () => {
    expect(cosineSimilarity([], [])).toBe(0);
  });

  it("throws on mismatched dimensions", () => {
    expect(() => cosineSimilarity([1, 2], [1])).toThrow();
  });
});

describe("buildTasteEmbedding", () => {
  it("returns an empty vector when there is no signal (cold start)", () => {
    expect(buildTasteEmbedding([])).toEqual([]);
  });

  it("ignores signals with an empty embedding", () => {
    const signals: TasteSignal[] = [
      { embedding: [], type: "LIKE" },
      { embedding: [2, 0], type: "LIKE" },
    ];

    expect(buildTasteEmbedding(signals)).toEqual([2, 0]);
  });

  it("returns the item vector itself for a single LIKE", () => {
    const signals: TasteSignal[] = [{ embedding: [1, 0], type: "LIKE" }];

    expect(buildTasteEmbedding(signals)).toEqual([1, 0]);
  });

  it("weights recent interactions higher than older ones", () => {
    const signals: TasteSignal[] = [
      { embedding: [1, 0], type: "LIKE" },
      { embedding: [0, 1], type: "LIKE" },
    ];

    const taste = buildTasteEmbedding(signals, { decay: 0.5 });

    expect(taste[0]).toBeCloseTo(2 / 3);
    expect(taste[1]).toBeCloseTo(1 / 3);
  });

  it("only uses the newest `limit` interactions", () => {
    const signals: TasteSignal[] = [
      { embedding: [1, 0], type: "LIKE" },
      { embedding: [0, 1], type: "LIKE" },
    ];

    expect(buildTasteEmbedding(signals, { limit: 1 })).toEqual([1, 0]);
  });

  it("gives VIEW less weight than LIKE", () => {
    const signals: TasteSignal[] = [
      { embedding: [0, 1], type: "VIEW" },
      { embedding: [1, 0], type: "LIKE" },
    ];

    const taste = buildTasteEmbedding(signals, { decay: 1 });

    expect(taste[0]).toBeCloseTo(1 / 1.2);
    expect(taste[1]).toBeCloseTo(0.2 / 1.2);
    expect(taste[0]).toBeGreaterThan(taste[1]);
  });

  it("pushes the taste vector away from disliked items", () => {
    const signals: TasteSignal[] = [{ embedding: [1, 0], type: "DISLIKE" }];

    expect(buildTasteEmbedding(signals)).toEqual([-1, 0]);
  });

  it("throws when interaction embeddings have different dimensions", () => {
    const signals: TasteSignal[] = [
      { embedding: [1, 0], type: "LIKE" },
      { embedding: [1, 0, 0], type: "LIKE" },
    ];

    expect(() => buildTasteEmbedding(signals)).toThrow();
  });
});

describe("matchScore", () => {
  it("keeps the signal weights normalized to 1", () => {
    const total = Object.values(SIGNAL_WEIGHTS).reduce(
      (sum, weight) => sum + weight,
      0
    );

    expect(total).toBeCloseTo(1);
  });

  it("returns 1 (100%) for a perfect match", () => {
    const profile = {
      tasteEmbedding: [1, 0],
      preferredCategories: ["jacket"],
      preferredColors: ["مشکی"],
      budgetMin: 100_000,
      budgetMax: 500_000,
      sizeInfo: { jacket: "M" },
    };
    const item = {
      itemEmbedding: [1, 0],
      categoryId: "jacket",
      color: "مشکی",
      price: 300_000,
      size: "M",
    };

    expect(matchScore(profile, item)).toBeCloseTo(1);
    expect(matchPercent(profile, item)).toBe(100);
  });

  it("returns 0 when the profile carries no signal at all (cold start)", () => {
    expect(matchScore({}, { price: 100 })).toBe(0);
    expect(matchPercent({}, { price: 100 })).toBe(0);
  });

  it("treats empty preference lists as 'no signal', not as 'nothing matches'", () => {
    const profile = { preferredCategories: [], tasteEmbedding: [] };

    expect(matchScore(profile, { price: 100, categoryId: "jacket" })).toBe(0);
  });

  it("treats budgetMin = 0 as a real lower bound (no upper bound)", () => {
    expect(matchScore({ budgetMin: 0 }, { price: 500 })).toBeCloseTo(1);
  });

  it("gives full budget credit inside [budgetMin, budgetMax]", () => {
    const profile = { budgetMin: 1_000, budgetMax: 2_000 };

    expect(matchScore(profile, { price: 1_500 })).toBeCloseTo(1);
  });

  it("decays budget credit gradually below budgetMin", () => {
    expect(matchScore({ budgetMin: 1_000 }, { price: 500 })).toBeCloseTo(0.5);
  });

  it("decays budget credit gradually above budgetMax", () => {
    expect(matchScore({ budgetMax: 100 }, { price: 200 })).toBeCloseTo(0.5);
    expect(matchPercent({ budgetMax: 100 }, { price: 200 })).toBe(50);
  });

  it("lowers the score when the category is not a preferred one", () => {
    const profile = {
      preferredCategories: ["dress"],
      preferredColors: ["black"],
      budgetMin: 0,
      budgetMax: 1_000,
      sizeInfo: { jacket: "M" },
    };
    const item = {
      categoryId: "jacket",
      color: "black",
      price: 500,
      size: "M",
    };

    // category 0 (0.2) + color 1 (0.15) + budget 1 (0.1) + size 1 (0.05) → 0.3 / 0.5
    expect(matchScore(profile, item)).toBeCloseTo(0.6);
    expect(matchPercent(profile, item)).toBe(60);
  });

  it("lowers the score when the size does not match the sizeInfo of that category", () => {
    const profile = {
      preferredCategories: ["jacket"],
      sizeInfo: { jacket: "M" },
    };

    // category 1 (0.2) + size 0 (0.05) → 0.2 / 0.25
    expect(matchScore(profile, { categoryId: "jacket", size: "L", price: 0 })).toBeCloseTo(0.8);
  });

  it("scores 0 when the embedding is exactly opposite to the taste", () => {
    const profile = { tasteEmbedding: [1, 0] };
    const item = { itemEmbedding: [-1, 0], price: 0 };

    expect(matchScore(profile, item)).toBe(0);
  });

  it("redistributes the weight of missing signals", () => {
    const profile = {
      preferredColors: ["black"],
      budgetMin: 0,
      budgetMax: 200,
      sizeInfo: { jacket: "M" },
    };
    const item = { color: "black", price: 100, size: "M", categoryId: "jacket" };

    // category signal is absent (no preferredCategories) — remaining signals all match
    expect(matchScore(profile, item)).toBeCloseTo(1);
  });

  it("returns 0 when the only available signal does not match", () => {
    expect(matchScore({ preferredColors: ["black"] }, { color: "blue", price: 0 })).toBe(0);
  });

  it("compares colors case-insensitively and ignoring surrounding spaces", () => {
    expect(matchScore({ preferredColors: [" Black "] }, { color: "black", price: 0 })).toBeCloseTo(1);
  });

  it("throws when the taste and item embeddings have different dimensions", () => {
    expect(() =>
      matchScore({ tasteEmbedding: [1, 0] }, { itemEmbedding: [1, 0, 0], price: 0 })
    ).toThrow();
  });
});

describe("rankItems", () => {
  const profile = { preferredColors: ["black"] };
  const items: RankableItem[] = [
    { id: "i1", color: "black", price: 0 },
    { id: "i2", color: "blue", price: 0 },
    { id: "i3", color: "black", price: 0 },
  ];

  it("sorts by score descending with a deterministic tie-break on id", () => {
    expect(rankItems(items, profile).map((entry) => entry.itemId)).toEqual([
      "i1",
      "i3",
      "i2",
    ]);
  });

  it("exposes both the raw score and the display percentage", () => {
    const [best] = rankItems(items, profile);

    expect(best.score).toBeCloseTo(1);
    expect(best.matchPercent).toBe(100);
  });

  it("respects minScore", () => {
    expect(
      rankItems(items, profile, { minScore: 1 }).map((entry) => entry.itemId)
    ).toEqual(["i1", "i3"]);
  });

  it("respects limit", () => {
    expect(rankItems(items, profile, { limit: 1 })).toHaveLength(1);
    expect(rankItems(items, profile, { limit: 1 })[0].itemId).toBe("i1");
  });

  it("gives every item a zero score for a cold-start profile (no signal)", () => {
    const ranked = rankItems(items, {});

    expect(ranked.map((entry) => entry.score)).toEqual([0, 0, 0]);
    expect(ranked.map((entry) => entry.itemId)).toEqual(["i1", "i2", "i3"]);
  });
});
