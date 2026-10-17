# تیپت

کشف هوشمند لباس دست‌دوم، متناسب با سلیقه‌ی تو.

- سند محصول (PRD): [`docs/PRD.md`](docs/PRD.md)
- دیتامدل اولیه: [`docs/DATA_MODEL.md`](docs/DATA_MODEL.md)
- اسکلت اپ وب: [`web/`](web/)

## توسعه محلی

```bash
docker compose up -d postgres
npm --prefix web install
npm --prefix web run prisma:generate
npm --prefix web run prisma:migrate -- --name local_setup
npm --prefix web run typecheck
npm --prefix web test
```

دیتابیس توسعه با PostgreSQL و افزونه pgvector اجرا می‌شود و مقدار `DATABASE_URL` نمونه در `web/.env.example` آمده است. تست persistence در صورت تنظیم `DATABASE_URL` اجرا می‌شود و در محیط بدون دیتابیس skip خواهد شد.

## تنظیمات production

- `DATABASE_URL`: اتصال PostgreSQL با pgvector.
- `SMS_PROVIDER_ENDPOINT` و `SMS_PROVIDER_TOKEN`: endpoint سازگار با ارسال JSON شامل `to` و `message`؛ پاسخ می‌تواند `messageId` داشته باشد.
- `STORAGE_UPLOAD_ENDPOINT` و `STORAGE_UPLOAD_TOKEN`: endpoint سازگار با multipart field به نام `file`؛ پاسخ باید `{ "url": "https://..." }` باشد.
- در production اگر storage تنظیم نشده باشد، آپلود تصویر عمداً رد می‌شود؛ local storage فقط برای development است.
- قبل از اجرا، `npx prisma migrate deploy` را اجرا کنید.

## معماری و امنیت

- معماری و جریان داده: [`ARCHITECTURE.md`](ARCHITECTURE.md).
- درخواست‌های تغییردهندهٔ API فقط از مبدأ همسان پذیرفته می‌شوند؛ sessionها در cookie HTTP-only و SameSite نگهداری می‌شوند.
- ورود موفق OTP، sessionهای قبلی کاربر را باطل و session جدید ایجاد می‌کند.
- CI علاوه بر lint، type-check، تست و build، اسکن secret، CodeQL، Semgrep و SBOM تولید می‌کند.
- وابستگی‌های npm و GitHub Actions با Dependabot به‌صورت هفتگی/ماهانه بررسی می‌شوند.

## ارزیابی AI

رتبه‌بندی فعلی فید rule-based و قابل‌تکرار است. تغییرات رتبه‌بندی باید با fixture ثابت و معیارهای precision@5/10، نرخ نقض بودجه، تطابق دسته/سایز، cold-start و latency ارزیابی شوند. embedding تا زمان تکمیل ارزیابی آفلاین، مسیر rollback و بررسی حریم خصوصی فعال نمی‌شود.

## وضعیت MVP

- CI وب برای lint، type-check، تست و build فعال است.
- مجوز MIT در ریشه پروژه ثبت شده است.
- تست Vitest برای منطق دامنه آماده است.
- migration پایه Prisma همراه pgvector و docker compose اضافه شده است.
- راهنمای عکاسی فروشنده در صفحه اصلی نمایش داده می‌شود.
