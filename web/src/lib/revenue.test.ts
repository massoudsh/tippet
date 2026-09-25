import { describe, expect, it } from "vitest";
import { calculateRevenue } from "./revenue";

describe("revenue", () => {
  it("calculates commission and premium seller services", () => {
    expect(
      calculateRevenue({
        itemPrice: 2_000_000,
        commissionRate: 0.08,
        premiumListingFee: 50_000,
        premiumEnabled: true,
      })
    ).toEqual({
      commission: 160_000,
      premiumFee: 50_000,
      totalRevenue: 210_000,
      sellerNet: 1_790_000,
    });
  });
});
