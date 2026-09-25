export interface RevenuePlan {
  itemPrice: number;
  commissionRate: number;
  premiumListingFee: number;
  premiumEnabled: boolean;
}

export function calculateRevenue(plan: RevenuePlan) {
  const commission = Math.round(plan.itemPrice * plan.commissionRate);
  const premiumFee = plan.premiumEnabled ? plan.premiumListingFee : 0;

  return {
    commission,
    premiumFee,
    totalRevenue: commission + premiumFee,
    sellerNet: plan.itemPrice - commission - premiumFee,
  };
}
