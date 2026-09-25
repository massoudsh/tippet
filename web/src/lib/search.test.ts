import { describe, expect, it } from "vitest";
import { catalogItems } from "./catalog";
import { filterCatalogItems } from "./search";

describe("filterCatalogItems", () => {
  it("filters by query, city, size, and price", () => {
    expect(
      filterCatalogItems(catalogItems, {
        query: "جین",
        city: "تهران",
        size: "M",
        maxPrice: 2000000,
      }).map((item) => item.id)
    ).toEqual(["vintage-denim-jacket"]);
  });
});
