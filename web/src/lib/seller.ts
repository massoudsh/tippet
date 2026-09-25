export type SellerItemStatus = "ACTIVE" | "RESERVED" | "SOLD" | "REMOVED";

export interface SellerPanelItem {
  id: string;
  title: string;
  price: number;
  status: SellerItemStatus;
  completeness: number;
  views: number;
  contacts: number;
}

export function summarizeSellerItems(items: SellerPanelItem[]) {
  return {
    active: items.filter((item) => item.status === "ACTIVE").length,
    sold: items.filter((item) => item.status === "SOLD").length,
    contacts: items.reduce((sum, item) => sum + item.contacts, 0),
    averageCompleteness: items.length
      ? Math.round(items.reduce((sum, item) => sum + item.completeness, 0) / items.length)
      : 0,
  };
}

export function calculateSellerTrustScore(items: SellerPanelItem[]) {
  if (items.length === 0) return 0;

  const soldRatio = items.filter((item) => item.status === "SOLD").length / items.length;
  const averageCompleteness = items.reduce((sum, item) => sum + item.completeness, 0) / items.length;
  const contactSignal = Math.min(items.reduce((sum, item) => sum + item.contacts, 0) / items.length / 5, 1);

  return Math.round(soldRatio * 35 + averageCompleteness * 0.45 + contactSignal * 20);
}

export function applyBulkStatus(items: SellerPanelItem[], itemIds: string[], status: SellerItemStatus) {
  const selected = new Set(itemIds);

  return items.map((item) => (selected.has(item.id) ? { ...item, status } : item));
}
