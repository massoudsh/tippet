import { describe, expect, it } from "vitest";
import { calculateEscrowBreakdown, nextEscrowStatus } from "./escrow";

describe("escrow", () => {
  it("calculates buyer total and seller payout", () => {
    expect(calculateEscrowBreakdown({ itemPrice: 1_000_000, platformFeeRate: 0.05, status: "HELD" })).toEqual({
      itemPrice: 1_000_000,
      platformFee: 50_000,
      buyerTotal: 1_050_000,
      sellerReceives: 1_000_000,
      status: "HELD",
    });
  });

  it("moves funds through safe status transitions", () => {
    expect(nextEscrowStatus("AWAITING_PAYMENT", "PAY")).toBe("HELD");
    expect(nextEscrowStatus("HELD", "CONFIRM_DELIVERY")).toBe("RELEASED");
    expect(nextEscrowStatus("HELD", "REFUND")).toBe("REFUNDED");
  });
});
