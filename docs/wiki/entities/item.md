# Item

> هسته‌ی مارکت‌پلیس — آیتم لباس ثبت‌شده توسط فروشنده.

## مسئولیت‌ها
- نگهداری اطلاعات آگهی (عنوان، توضیح، برند، سایز، وضعیت، قیمت، شهر).
- نگهداری خروجی AI: `color`, `material`, `aiExtractedTags` (خام، برای دیباگ/بهبود مدل)، `itemEmbedding`
  (فعلاً comment‌شده در schema).

## وابستگی‌ها
- [[entities/user]] — فروشنده (`sellerId`).
- [[entities/category]] — دسته اجباری.
- [[entities/item-image]] — یک آیتم N تصویر.
- [[entities/style-tag]] — N به N از طریق `ItemStyleTag`.
- [[entities/interaction]] — رفتار کاربران روی این آیتم.
- [[concepts/ai-discovery]] — تولید `itemEmbedding` از عکس+متن.

## قراردادها / Edge cases
- `status`: `ACTIVE`/`RESERVED`/`SOLD`/`REMOVED` — فروشنده باید بعد از فروش وضعیت را عوض کند.
- `itemEmbedding` مثل `tasteEmbedding` هنوز در schema فعال نشده (Issue #۱۸).
- کیفیت عکس فروشنده مستقیم روی دقت `aiExtractedTags` اثر دارد (ریسک PRD بخش ۱۰؛ Issue #۲۱).

## منابع کد
- `web/prisma/schema.prisma:96` — مدل `Item`
