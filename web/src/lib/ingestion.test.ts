import { describe, expect, it } from "vitest";
import { ingestionDraftSchema, normalizeIngestionCandidate } from "./ingestion";

describe("ingestionDraftSchema", () => {
  it("accepts an authorized HTTP source URL", () => {
    expect(ingestionDraftSchema.safeParse({
      source: "divar", sourceUrl: "https://example.com/listing", title: "کت جین", description: "کت جین سالم و مناسب استریت‌ویر در سایز M.", category: "کت", condition: "GOOD", price: 1200000, city: "تهران", hasPermission: true,
    }).success).toBe(true);
  });

  it("rejects an unauthorized or non-HTTP source", () => {
    expect(ingestionDraftSchema.safeParse({
      source: "other", sourceUrl: "ftp://example.com/listing", title: "کت جین", description: "کت جین سالم و مناسب استریت‌ویر در سایز M.", category: "کت", condition: "GOOD", price: 1200000, city: "تهران", hasPermission: false,
    }).success).toBe(false);
  });
});

describe("normalizeIngestionCandidate", () => {
  it("normalizes permitted external listings for review", () => {
    expect(
      normalizeIngestionCandidate({
        source: "divar",
        sourceUrl: "https://example.com/listing",
        title: " کت جین ",
        price: 1200000,
        city: " تهران ",
        hasPermission: true,
      })
    ).toEqual({
      title: "کت جین",
      price: 1200000,
      city: "تهران",
      source: "divar",
      sourceUrl: "https://example.com/listing",
      status: "PENDING_REVIEW",
    });
  });

  it("rejects listings without permission", () => {
    expect(() =>
      normalizeIngestionCandidate({
        source: "instagram",
        sourceUrl: "https://example.com/listing",
        title: "هودی",
        price: 800000,
        city: "تهران",
        hasPermission: false,
      })
    ).toThrow("مجوز");
  });
});
