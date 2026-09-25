export interface MvpMetricsInput {
  activeItems: number;
  feedImpressions: number;
  itemClicks: number;
  contactClicks: number;
  likes: number;
}

export function calculateMvpMetrics(input: MvpMetricsInput) {
  const clickThroughRate = input.feedImpressions
    ? input.itemClicks / input.feedImpressions
    : 0;
  const contactConversionRate = input.itemClicks
    ? input.contactClicks / input.itemClicks
    : 0;
  const engagementRate = input.feedImpressions
    ? input.likes / input.feedImpressions
    : 0;

  return {
    activeItems: input.activeItems,
    clickThroughRate,
    contactConversionRate,
    engagementRate,
  };
}

export function formatPercent(value: number) {
  return new Intl.NumberFormat("fa-IR", {
    style: "percent",
    maximumFractionDigits: 1,
  }).format(value);
}
