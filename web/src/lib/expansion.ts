export interface ExpansionMarket {
  city: string;
  category: string;
  supplyCount: number;
  demandScore: number;
  trustReadiness: number;
}

export function scoreExpansionMarket(market: ExpansionMarket) {
  return Math.round(market.supplyCount * 0.4 + market.demandScore * 0.35 + market.trustReadiness * 0.25);
}

export function rankExpansionMarkets(markets: ExpansionMarket[]) {
  return [...markets].sort((a, b) => scoreExpansionMarket(b) - scoreExpansionMarket(a));
}
