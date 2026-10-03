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
منطق خالص دامنه در `web/src/lib/matching.ts` پیاده‌سازی و تست شده است (Issue #۱۷):
شباهت کسینوسی، ساخت `tasteEmbedding` از تعامل‌ها (آخرین N با وزن نزولی + وزن نوع تعامل)،
و `matchScore`/`matchPercent`/`rankItems` بر پایه‌ی سیگنال‌های embedding/دسته/رنگ/بودجه/سایز.
جزئیات وزن‌ها و رفتار cold start در [[entities/style-profile]].

`web/src/lib/recommendation.ts` هنوز stub است (`return []`) و در فاز بعد همان توابع بالا را روی
داده‌ی واقعی اجرا می‌کند. ستون‌های embedding در `schema.prisma` comment شده‌اند تا فعال شوند
(Issue #۱۸)؛ فلگ preview مربوط به pgvector در بلوک generator فعال شده است ([[concepts/tech-stack]]).
پیگیری فیچر: Issue #۳ «فید کشف هوشمند».

## منابع کد
- `web/src/lib/recommendation.ts`
- `web/src/lib/matching.ts` و `web/src/lib/matching.test.ts`
- `web/prisma/schema.prisma:48` و `:113` (کامنت‌های embedding)
