# StyleProfile

> پروفایل سلیقه‌ی خریدار؛ ورودی اصلی موتور [[concepts/ai-discovery]].

## مسئولیت‌ها
- نگهداری سایز (`sizeInfo` JSON به تفکیک دسته)، بازه بودجه، دسته/رنگ موردعلاقه.
- نگهداری `tasteEmbedding` (بردار ۱۵۳۶بعدی، pgvector) — میانگین/ترکیب embedding آیتم‌های پسندیده‌شده.

## وابستگی‌ها
- [[entities/user]] — یک‌به‌یک (`userId` یکتا).
- [[concepts/ai-discovery]] — مصرف‌کننده اصلی `tasteEmbedding`.

## قراردادها / Edge cases
- در `schema.prisma` فعلی، `tasteEmbedding` هنوز comment‌شده (`Unsupported("vector(1536)")`) — باید قبل از
  پیاده‌سازی AI Discovery فعال شود (Issue #۱۸). اما فلگ `previewFeatures = ["postgresqlExtensions"]` در
  بلوک generator فعال شده است؛ بدون آن، کلید `extensions = [vector]` در datasource نامعتبر است و
  `prisma generate` شکست می‌خورد.
- cold start: کاربر جدید بدون تعامل قبلی → فید خالی/بی‌ربط بدون آنبوردینگ (ریسک باز PRD بخش ۱۰؛ Issue #۲۰).
- ساخت `tasteEmbedding` (در `web/src/lib/matching.ts` — `buildTasteEmbedding`): تعامل‌ها از جدید به قدیم،
  N تای اول (`limit` پیش‌فرض ۲۰) با وزن `decay^i` (پیش‌فرض ۰.۹) و وزن نوع تعامل
  (LIKE ۱، SAVE ۰.۸، CONTACT_SELLER ۰.۶، VIEW ۰.۲، DISLIKE ۱−). بردار صفر/نبود تعامل → بردار خالی.
- امتیاز تطابق (`matchScore`، بازه‌ی [0,1] و `matchPercent` برای نمایش «۸۷٪») میانگین وزن‌دار
  سیگنال‌های *موجود* است: embedding ۰.۵، دسته ۰.۲، رنگ ۰.۱۵، بودجه ۰.۱، سایز ۰.۰۵. سیگنال غایب
  (مثلاً کاربر ترجیحی ثبت نکرده، یا آرایه‌ی ترجیح خالی است) وزنش بین بقیه پخش می‌شود.
- cold start کامل (هیچ سیگنالی موجود نیست) → امتیاز صفر؛ یعنی فید بدون آنبوردینگ بی‌رتبه است (Issue #۲۰).
- `budgetMin = ۰` یک حد پایین واقعی است (با «تعریف‌نشده» فرق دارد)؛ خارج از بازه‌ی بودجه امتیاز
  تدریجی کم می‌شود (نسبت قیمت به مرز)، نه پله‌ای.
- سایز فقط وقتی امتیاز می‌گیرد که `sizeInfo` برای همان دسته‌ی آیتم مقدار داشته باشد.
- ابعاد ناهم‌خوان بردار سلیقه و بردار آیتم → خطا (نشانه‌ی داده‌ی خراب)، نه امتیاز صفر.

## منابع کد
- `web/prisma/schema.prisma:38` — مدل `StyleProfile`
- `web/src/lib/matching.ts` — `buildTasteEmbedding`, `matchScore`, `matchPercent` (تست: `matching.test.ts`)
