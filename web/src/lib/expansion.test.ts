import { describe, expect, it } from "vitest";
import { rankExpansionMarkets, scoreExpansionMarket } from "./expansion";

describe("expansion", () => {
  it("scores and ranks candidate markets", () => {
    const markets = [
      { city: "شیراز", category: "وینتیج", supplyCount: 60, demandCount: 70, sellerCount: 50 },
      { city: "اصفهان", category: "استریت‌ویر", supplyCount: 90, demandCount: 80, sellerCount: 70 },
    ];

    expect(scoreExpansionMarket(markets[0])).toBe(62);
    expect(rankExpansionMarkets(markets)[0].city).toBe("اصفهان");
  });
});
