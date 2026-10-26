import { describe, expect, it } from "vitest";
import { catalogItems } from "./catalog";
import { filterCatalogItems } from "./search";
import { itemSearchSchema } from "./items";

describe("item search URL filters", () => {
  it("accepts blank price fields submitted by the search form", () => {
    expect(itemSearchSchema.parse({ q: "کت", minPrice: "", maxPrice: "" })).toMatchObject({ q: "کت", minPrice: undefined, maxPrice: undefined });
  });

  it("parses size and price ranges", () => {
    expect(itemSearchSchema.parse({ size: " M ", minPrice: "0", maxPrice: "2000000" })).toMatchObject({ size: "M", minPrice: 0, maxPrice: 2000000 });
  });

  it.each([
    { maxPrice: "invalid" },
    { maxPrice: "-1" },
    { maxPrice: "0" },
    { minPrice: "-1" },
    { minPrice: "200", maxPrice: "100" },
  ])("rejects invalid price filters %j", (filters) => {
    expect(itemSearchSchema.safeParse(filters).success).toBe(false);
  });
});

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
