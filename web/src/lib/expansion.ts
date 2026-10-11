export interface ExpansionMarket {
  city: string;
  category: string;
  supplyCount: number;
  demandCount: number;
  sellerCount: number;
}

export function scoreExpansionMarket(market: ExpansionMarket) {
  return Math.round(market.supplyCount * 0.5 + market.demandCount * 0.35 + market.sellerCount * 0.15);
}

export function rankExpansionMarkets(markets: ExpansionMarket[]) {
  return [...markets].sort((a, b) => scoreExpansionMarket(b) - scoreExpansionMarket(a));
}
