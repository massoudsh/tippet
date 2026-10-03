# تیپت — وب‌اپ

اسکلت اولیه‌ی Next.js (TypeScript + Tailwind + Prisma) برای MVP «تیپت».
جزئیات محصول و دیتامدل در [`/docs`](../docs) است.

## استک
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS (RTL)
- Prisma + PostgreSQL (با افزونه‌ی `pgvector`)

## راه‌اندازی (روی سرور، نه داخل کانتینر ساخت)

> نصب پکیج و اجرای build سنگین این پروژه باید روی سرور SSH انجام شود، نه داخل این محیط.

```bash
npm install
cp .env.example .env   # و مقداردهی DATABASE_URL
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

## ساختار پوشه‌ها

```
src/
  app/            صفحات و layout (Next.js App Router)
  components/     کامپوننت‌های UI
  lib/            سرویس‌ها و منطق دامنه (prisma client، matching، recommendation و...)
prisma/
  schema.prisma   دیتامدل (شرح مفهومی در /docs/DATA_MODEL.md)
```

## lint، type-check و تست

```bash
npm run lint        # ESLint (next lint)
npm run type-check  # tsc --noEmit
npm run test        # Vitest — تست‌های منطق دامنه در src/lib
```

تست‌ها روی توابع خالص دامنه (`src/lib/matching.ts`) اجرا می‌شوند و به دیتابیس نیاز ندارند.
CI (`.github/workflows/ci.yml`) همین مراحل به‌علاوه‌ی `npm run build` را روی هر push/PR به
`main` اجرا می‌کند.
