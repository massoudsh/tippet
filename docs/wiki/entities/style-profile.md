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
  پیاده‌سازی AI Discovery فعال شود (Issue #۱۸).
- cold start: کاربر جدید بدون تعامل قبلی → فید خالی/بی‌ربط بدون آنبوردینگ (ریسک باز PRD بخش ۱۰؛ Issue #۲۰).

## منابع کد
- `web/prisma/schema.prisma:35` — مدل `StyleProfile`
