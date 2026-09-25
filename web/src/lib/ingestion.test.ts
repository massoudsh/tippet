import { describe, expect, it } from "vitest";
import { normalizeIngestionCandidate } from "./ingestion";

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
