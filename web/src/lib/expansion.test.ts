import { describe, expect, it } from "vitest";
import { rankExpansionMarkets, scoreExpansionMarket } from "./expansion";

describe("expansion", () => {
  it("scores and ranks candidate markets", () => {
    const markets = [
      { city: "شیراز", category: "وینتیج", supplyCount: 60, demandScore: 70, trustReadiness: 50 },
      { city: "اصفهان", category: "استریت‌ویر", supplyCount: 90, demandScore: 80, trustReadiness: 70 },
    ];

    expect(scoreExpansionMarket(markets[0])).toBe(61);
    expect(rankExpansionMarkets(markets)[0].city).toBe("اصفهان");
  });
});
