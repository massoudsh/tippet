# StyleTag / ItemStyleTag

> برچسب سبک (وینتیج، استریت‌ویر، رسمی، اسپرت، ...) — رابطه‌ی چندبه‌چند با [[entities/item]].

## مسئولیت‌ها
- `StyleTag`: نام یکتای برچسب.
- `ItemStyleTag`: جدول واسط + `confidence` (اطمینان تشخیص AI، ۰ تا ۱).

## وابستگی‌ها
- [[entities/item]]
- [[concepts/ai-discovery]] — منبع مقدار `confidence`.
- [[concepts/ai-styling]] — استفاده از تگ‌ها برای پیشنهاد آیتم مکمل.

## قراردادها / Edge cases
- کلید ترکیبی `(itemId, styleTagId)` — هر آیتم هر تگ را فقط یک‌بار می‌گیرد.

## منابع کد
- `web/prisma/schema.prisma:60` — مدل `StyleTag`
- `web/prisma/schema.prisma:66` — مدل `ItemStyleTag`
