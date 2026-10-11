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
- `POST /api/items` برای فروشندهٔ احرازشده، دادهٔ معتبر و حداقل یک URL تصویر آپلودشده، آیتم فعال می‌سازد؛ فرم `/ingestion` همین قرارداد را برای ورود دستیِ URL-یار استفاده می‌کند.
- URL منبع خارجی در مدل `Item` یا API فعلی ستونی ندارد؛ در `/ingestion` فقط برای ارجاع فروشنده اعتبارسنجی می‌شود و ذخیره/استخراج خودکار نمی‌شود.
- `status`: `ACTIVE`/`RESERVED`/`SOLD`/`REMOVED` — فروشنده باید بعد از فروش وضعیت را عوض کند.
- `PATCH /api/seller/items/status` فقط برای صاحب نشست معتبر است و حداکثر ۵۰ UUID یکتا را با وضعیت `ACTIVE` یا `SOLD` می‌پذیرد؛ پاسخ تعداد `updated`، `unchanged` و `failed` را برای نتیجهٔ جزئی برمی‌گرداند.
- آیتم‌های ناموجود یا متعلق به فروشندهٔ دیگر در bulk update تغییر نمی‌کنند و فقط در `failed` شمرده می‌شوند.
- `itemEmbedding` مثل `tasteEmbedding` هنوز در schema فعال نشده (Issue #۱۸).
- `/items/[id]` شمارهٔ عمومی اختیاری و پیوندهای WhatsApp/Telegram فروشنده را از `seller` برمی‌دارد؛ WhatsApp و Telegram بدون پیوند معتبر با برچسب «ثبت نشده» غیرفعال‌اند و شمارهٔ تلفن در نبود آن نمایش داده نمی‌شود.
- بازشدن صفحهٔ آیتم برای کاربر نشست‌دار تعامل `VIEW` و انتخاب هر راه تماس تعامل `CONTACT_SELLER` را ثبت می‌کند؛ درخواست‌ها بدون مختل‌کردن مسیر تماس ارسال می‌شوند.
- کیفیت عکس فروشنده مستقیم روی دقت `aiExtractedTags` اثر دارد (ریسک PRD بخش ۱۰؛ Issue #۲۱).

## منابع کد
- `web/prisma/schema.prisma:96` — مدل `Item`
