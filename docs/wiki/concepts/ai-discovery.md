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
`web/src/lib/recommendation.ts` فعلاً stub است (`return []`). ستون‌های embedding در `schema.prisma`
comment شده‌اند تا فعال شوند (Issue #۱۸). پیگیری فیچر: Issue #۳ «فید کشف هوشمند».

## منابع کد
- `web/src/lib/recommendation.ts`
- `web/prisma/schema.prisma:44` و `:109` (کامنت‌های embedding)
