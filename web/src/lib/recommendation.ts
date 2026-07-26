// RecommendationService — پیاده‌سازی واقعی در فاز بعد اضافه می‌شود.
// مسئولیت: تطابق بردار سلیقه‌ی کاربر (StyleProfile.tasteEmbedding) با
// بردار ویژگی آیتم‌ها (Item.itemEmbedding) از طریق pgvector و
// بازگرداندن فهرست رتبه‌بندی‌شده برای فید کشف.

export interface RecommendedItem {
  itemId: string;
  score: number;
}

export async function getRecommendedItems(
  _userId: string
): Promise<RecommendedItem[]> {
  // TODO: پیاده‌سازی جست‌وجوی شباهت برداری با pgvector
  return [];
}
