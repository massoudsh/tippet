# استک فنی

| لایه | انتخاب | دلیل |
|---|---|---|
| فرانت‌اند + بک‌اند | Next.js 14 App Router, TypeScript | یک‌پارچه برای MVP سریع، بدون دو سرویس جدا |
| دیتابیس | PostgreSQL + pgvector | جست‌وجوی شباهت برداری سلیقه↔آیتم |
| ORM | Prisma | `web/prisma/schema.prisma`; `previewFeatures = ["postgresqlExtensions"]` برای pgvector |
| استایل | Tailwind CSS، RTL کامل | فونت فارسی، جهت راست‌به‌چپ |
| تصاویر | Object Storage (S3-compatible/آروان‌کلود) | مشخص می‌شود در فاز بعد |
| AI | لایه انتزاعی `AIPipelineClient` | provider قابل تعویض |
| تست | Vitest (`web/vitest.config.ts`) | تست منطق خالص دامنه بدون دیتابیس |
| Lint | ESLint + `eslint-config-next` (`web/.eslintrc.json`) | یکدستی کد؛ اسکریپت `npm run lint` |
| CI | GitHub Actions (`.github/workflows/ci.yml`) | lint + type-check + test + build روی Node 20 |
| مجوز | Apache License 2.0 (`LICENSE`) | هم‌راستا با سایر پروژه‌های نویسنده |

> نصب پکیج و build سنگین این پروژه (`npm install`, `npm run build`) باید روی سرور SSH انجام شود،
> نه داخل محیط ساخت (کانتینر). این محدودیت مربوط به محیط توسعه‌ی محلی است؛ CI خودش build را اجرا می‌کند.

> `npm ci` در CI فعلاً `npm install` است چون `package-lock.json` هنوز commit نشده (ساخت قفل طبق
> AGENTS.md روی سرور SSH انجام می‌شود).

> وضعیت تأیید: این workflow هنوز هیچ اجرایی روی گیت‌هاب نداشته (تا زمانی که به `main` merge/push شود)،
> و مراحلش به‌صورت محلی هم اجرا نشده‌اند (طبق AGENTS.md نصب/build محلی ممنوع است). پس «سبز بودن»
> اولین run تأییدنشده است.

## منابع کد
- `web/package.json`, `web/prisma/schema.prisma`, `web/tailwind.config.ts`
- `.github/workflows/ci.yml`, `web/vitest.config.ts`, `web/.eslintrc.json`, `LICENSE`

