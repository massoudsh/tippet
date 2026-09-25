import { describe, expect, it } from "vitest";
import { catalogItems } from "./catalog";
import { buildSimpleOutfit } from "./outfit";

describe("buildSimpleOutfit", () => {
  it("suggests complementary items for an anchor item", () => {
    const outfit = buildSimpleOutfit(catalogItems[0], catalogItems);

    expect(outfit.anchor.id).toBe("vintage-denim-jacket");
    expect(outfit.complements.map((item) => item.id)).toEqual(["saffron-trench", "streetwear-hoodie"]);
  });
});
