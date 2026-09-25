import { describe, expect, it } from "vitest";
import { calculateStyleProfileCompleteness } from "./onboarding";

describe("calculateStyleProfileCompleteness", () => {
  it("scores completed onboarding inputs", () => {
    expect(
      calculateStyleProfileCompleteness({
        sizes: ["M"],
        categories: ["کت", "هودی"],
        colors: ["مشکی", "آبی"],
        budgetMin: 500000,
        budgetMax: 2500000,
        inspirationCount: 3,
      })
    ).toBe(100);
  });

  it("scores incomplete onboarding inputs", () => {
    expect(
      calculateStyleProfileCompleteness({
        sizes: [],
        categories: ["کت"],
        colors: [],
        inspirationCount: 1,
      })
    ).toBe(0);
  });
});
