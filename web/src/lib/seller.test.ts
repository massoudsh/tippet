import { describe, expect, it } from "vitest";
import { calculateSellerTrustScore, summarizeSellerItems } from "./seller";

const items = [
  { id: "1", title: "کت", price: 1000000, status: "ACTIVE" as const, completeness: 90, views: 120, contacts: 7 },
  { id: "2", title: "هودی", price: 800000, status: "SOLD" as const, completeness: 80, views: 90, contacts: 5 },
];

describe("seller panel helpers", () => {
  it("summarizes seller items", () => {
    expect(summarizeSellerItems(items)).toEqual({
      active: 1,
      sold: 1,
      contacts: 12,
      averageCompleteness: 85,
    });
  });

  it("calculates seller trust score", () => {
    expect(calculateSellerTrustScore(items)).toBe(76);
  });
});
