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
npm --prefix web run typecheck
npm --prefix web test
```

دیتابیس توسعه با PostgreSQL و افزونه pgvector اجرا می‌شود و مقدار `DATABASE_URL` نمونه در `web/.env.example` آمده است.

## وضعیت MVP

- CI وب برای lint، type-check، تست و build فعال است.
- مجوز MIT در ریشه پروژه ثبت شده است.
- تست Vitest برای منطق دامنه آماده است.
- migration پایه Prisma همراه pgvector و docker compose اضافه شده است.
- راهنمای عکاسی فروشنده در صفحه اصلی نمایش داده می‌شود.
