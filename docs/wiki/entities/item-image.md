# ItemImage

> تصاویر یک آیتم، با ترتیب نمایش.

## مسئولیت‌ها
- نگهداری `url` و `order` تصویر.

## وابستگی‌ها
- [[entities/item]] — N به ۱.

## قراردادها / Edge cases
- محل ذخیره فایل (Object Storage) هنوز در PRD «در فاز بعد مشخص می‌شود» — این مدل فقط URL را نگه می‌دارد؛
  آپلود/CDN خارج از این جدول است.

## منابع کد
- `web/prisma/schema.prisma:120` — مدل `ItemImage`
