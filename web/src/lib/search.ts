import type { CatalogItem } from "./catalog";

export interface SearchFilters {
  query?: string;
  city?: string;
  category?: string;
  size?: string;
  maxPrice?: number;
}

export function filterCatalogItems(items: CatalogItem[], filters: SearchFilters) {
  const query = filters.query?.trim().toLowerCase();

  return items.filter((item) => {
    const matchesQuery = query
      ? [item.title, item.category, item.brand, item.color, ...item.tags]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(query))
      : true;

    return (
      matchesQuery &&
      (!filters.city || item.city === filters.city) &&
      (!filters.category || item.category === filters.category) &&
      (!filters.size || item.size === filters.size) &&
      (!filters.maxPrice || item.price <= filters.maxPrice)
    );
  });
}
