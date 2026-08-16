# Category

> دسته‌بندی سلسله‌مراتبی ساده (مثلاً «پوشاک بالاتنه» → «کت»).

## مسئولیت‌ها
- self-relation والد/فرزند (`parentId` / `parent` / `children`).

## وابستگی‌ها
- [[entities/item]] — هر آیتم دقیقاً یک `categoryId` دارد.

## قراردادها / Edge cases
- عمق سلسله‌مراتب در schema محدود نشده — باید در سطح seed/UI کنترل شود.

## منابع کد
- `web/prisma/schema.prisma:51` — مدل `Category`
