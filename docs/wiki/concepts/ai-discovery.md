# AI Discovery — کشف هوشمند

> موتور اصلی تیپت: تطابق سلیقه‌ی خریدار با آیتم‌های موجود از طریق embedding.

## جریان
1. استخراج ویژگی از عکس آیتم (رنگ، الگو، جنس تقریبی، دسته، وضعیت ظاهری).
2. استخراج ویژگی از متن آگهی فارسی (برند، سایز، شرایط).
3. تبدیل هر آیتم به `itemEmbedding` (بردار ۱۵۳۶بعدی) — [[entities/item]].
4. تطابق با `tasteEmbedding` کاربر ([[entities/style-profile]]) با cosine similarity (pgvector) → رتبه‌بندی فید.
5. `tasteEmbedding` از میانگین/ترکیب embedding آیتم‌های پسندیده‌شده به‌روز می‌شود؛ ورودی از
   [[entities/interaction]] (آخرین N با وزن نزولی).

## وابستگی‌ها
- [[entities/item]], [[entities/style-profile]], [[entities/interaction]]
- `AIPipelineClient` — لایه انتزاعی فراخوانی Vision/Text/Embedding provider (هنوز پیاده‌سازی نشده).

## وضعیت پیاده‌سازی
`web/src/lib/recommendation.ts` رتبه‌بند قواعدی فعلی فید را در اختیار دارد و `/feed` آن را روی آگهی‌های فعال اجرا می‌کند. تا زمانی که embeddingهای تولیدی آماده نیستند، وابستگی ML یا دانلود مدل ندارد.

### فرمول رتبه‌بندی فعلی
امتیاز کشف هر آگهی از ۱۰۰ محاسبه می‌شود:

- **دسته: ۳۰ امتیاز** برای تطابق دقیق با `preferredCategories`.
- **سبک صریح: ۲۵ امتیاز** شامل رنگ ۱۵ و سایز ۱۰؛ سایز `Free` با هر پروفایل سازگار است.
- **بودجه: ۲۵ امتیاز** برای قیمت داخل بازه؛ بیرون از بازه به‌صورت تدریجی با نسبت `price / budgetMin` یا `budgetMax / price` کاهش می‌یابد.
- **تازگی: ۲۰ امتیاز** برای آگهی حداکثر ۷ روزه، ۱۲ امتیاز تا ۳۰ روز، و ۵ امتیاز برای آگهی قدیمی‌تر.

ترتیب نهایی نزولی بر اساس امتیاز است؛ در تساوی، آگهی جدیدتر و سپس `itemId` مقدم است. بدون پروفایل، تنها تازگی رتبه را تعیین می‌کند تا cold start همچنان فید قابل‌استفاده‌ای داشته باشد. رابط `/feed` حالت‌های loading، empty و error جداگانه دارد.

منطق embedding در `web/src/lib/matching.ts` و تست‌هایش برای فاز بعدی باقی می‌ماند؛ وقتی ستون‌های pgvector و خط لولهٔ تولید embedding آماده شدند، سیگنال embedding باید به فرمول بالا افزوده و وزن‌ها دوباره ارزیابی شوند.

## منابع کد
- `web/src/lib/recommendation.ts`
- `web/src/lib/recommendation.test.ts`
- `web/src/app/feed/page.tsx`
- `web/src/app/feed/loading.tsx`
- `web/src/app/feed/error.tsx`
- `web/src/lib/matching.ts`
- `web/prisma/schema.prisma:48` و `:113` (کامنت‌های embedding)
