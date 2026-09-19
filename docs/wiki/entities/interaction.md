# Interaction

> رفتار کاربر روی آیتم‌ها؛ ورودی یادگیری سلیقه و رتبه‌بندی فید.

## مسئولیت‌ها
- ثبت append-only رخداد: `VIEW` / `LIKE` / `DISLIKE` / `SAVE` / `CONTACT_SELLER`.

## وابستگی‌ها
- [[entities/user]], [[entities/item]]
- [[concepts/ai-discovery]] — آخرین N تعامل با وزن نزولی، ورودی محاسبه سلیقه‌ی فعلی
  (منطق در `RecommendationService`).

## قراردادها / Edge cases
- جدول فقط insert است؛ هیچ‌وقت update/delete نمی‌شود.
- ایندکس روی `(userId, createdAt)` و `itemId` برای کوئری‌های فید/آمار.

## منابع کد
- `web/prisma/schema.prisma:141` — مدل `Interaction`
- `web/src/lib/recommendation.ts` — `getRecommendedItems` (فعلاً stub، `return []`)
