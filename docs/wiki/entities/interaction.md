# Interaction

> رفتار کاربر روی آیتم‌ها؛ ورودی یادگیری سلیقه و رتبه‌بندی فید.

## مسئولیت‌ها
- ثبت append-only رخداد: `VIEW` / `LIKE` / `DISLIKE` / `SAVE` / `CONTACT_SELLER`.

## وابستگی‌ها
- [[entities/user]], [[entities/item]]
- [[concepts/ai-discovery]] — آخرین N تعامل با وزن نزولی، ورودی محاسبه سلیقه‌ی فعلی
  (منطق خالص در `web/src/lib/matching.ts` → `buildTasteEmbedding`؛ `RecommendationService`
  هنوز stub است و در فاز بعد همین تابع را روی داده‌ی واقعی اجرا می‌کند).
- وزن هر نوع تعامل در `INTERACTION_WEIGHTS` (`web/src/lib/matching.ts`) تعریف شده و آینه‌ی
  enum `InteractionType` است: LIKE ۱، SAVE ۰.۸، CONTACT_SELLER ۰.۶، VIEW ۰.۲، DISLIKE ۱−.

## قراردادها / Edge cases
- جدول فقط insert است؛ هیچ‌وقت update/delete نمی‌شود.
- ایندکس روی `(userId, createdAt)` و `itemId` برای کوئری‌های فید/آمار.

## منابع کد
- `web/prisma/schema.prisma:141` — مدل `Interaction`
- `web/src/lib/recommendation.ts` — `getRecommendedItems` (فعلاً stub، `return []`)
- `web/src/lib/matching.ts` — `buildTasteEmbedding`, `INTERACTION_WEIGHTS` (تست: `matching.test.ts`)
