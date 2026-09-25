import { describe, expect, it } from "vitest";
import { suggestItemAttributes } from "./itemDraft";

describe("suggestItemAttributes", () => {
  it("suggests item attributes from Persian seller text", () => {
    expect(
      suggestItemAttributes({
        title: "کت جین آبی",
        description: "کت سالم سایز M مناسب استریت‌ویر با چند عکس واضح",
        imageCount: 3,
      })
    ).toEqual({
      category: "کت",
      color: "آبی",
      condition: "خوب",
      size: "M",
      completeness: 100,
    });
  });
});
