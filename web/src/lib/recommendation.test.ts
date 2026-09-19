import { describe, expect, it } from "vitest";

import { getRecommendedItems } from "./recommendation";

// توجه: این تست رفتار *فعلی* را قفل می‌کند — RecommendationService هنوز stub است.
// وقتی Issue #۳ (فید کشف هوشمند / جست‌وجوی شباهت با pgvector) پیاده‌سازی شد، باید
// به تست رفتار واقعی (رتبه‌بندی بر اساس matchScore در src/lib/matching.ts) تغییر کند.
describe("getRecommendedItems (stub)", () => {
  it("resolves to an empty feed until the real implementation lands", async () => {
    await expect(getRecommendedItems("user-1")).resolves.toEqual([]);
  });

  it("does not reject for a user without interactions", async () => {
    await expect(getRecommendedItems("unknown-user")).resolves.toEqual([]);
  });
});
