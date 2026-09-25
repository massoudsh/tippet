import { describe, expect, it } from "vitest";
import { getRecommendedItems } from "./recommendation";

describe("getRecommendedItems", () => {
  it("returns an empty recommendation list before vector ranking is connected", async () => {
    await expect(getRecommendedItems("user-1")).resolves.toEqual([]);
  });
});
