export type EscrowStatus = "AWAITING_PAYMENT" | "HELD" | "RELEASED" | "REFUNDED";

export interface EscrowOrder {
  itemPrice: number;
  platformFeeRate: number;
  status: EscrowStatus;
}

export function calculateEscrowBreakdown(order: EscrowOrder) {
  const platformFee = Math.round(order.itemPrice * order.platformFeeRate);

  return {
    itemPrice: order.itemPrice,
    platformFee,
    buyerTotal: order.itemPrice + platformFee,
    sellerReceives: order.itemPrice,
    status: order.status,
  };
}

export function nextEscrowStatus(status: EscrowStatus, event: "PAY" | "CONFIRM_DELIVERY" | "REFUND") {
  if (status === "AWAITING_PAYMENT" && event === "PAY") return "HELD";
  if (status === "HELD" && event === "CONFIRM_DELIVERY") return "RELEASED";
  if (status === "HELD" && event === "REFUND") return "REFUNDED";

  return status;
}
