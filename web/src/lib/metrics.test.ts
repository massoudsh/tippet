import { describe, expect, it } from "vitest";
import { calculateMvpMetrics, formatPercent } from "./metrics";

describe("MVP metrics", () => {
  it("calculates dashboard rates", () => {
    expect(
      calculateMvpMetrics({
        activeItems: 240,
        feedImpressions: 1000,
        itemClicks: 180,
        contactClicks: 36,
        likes: 90,
      })
    ).toEqual({
      activeItems: 240,
      clickThroughRate: 0.18,
      contactConversionRate: 0.2,
      engagementRate: 0.09,
    });
  });

  it("formats Persian percentages", () => {
    expect(formatPercent(0.182)).toBe("۱۸٫۲٪");
  });
});
