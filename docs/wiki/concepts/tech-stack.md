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

> گام نصب در CI: اگر `package-lock.json` موجود باشد `npm ci` و در غیر این صورت
> `npm install --no-audit --no-fund` اجرا می‌شود (الان حالت دوم، چون قفل طبق AGENTS.md روی سرور SSH
> ساخته می‌شود و هنوز commit نشده است). هر دو حالت روی خطا fail می‌شوند و `|| true` وجود ندارد.

> وضعیت تأیید: اولین اجرای واقعی این workflow روی PR #۲۴ (شاخه‌ی `fix/open-issues-batch`) **سبز** شد —
> هر ۹ گام (install, prisma generate, lint, type-check, test, build) پاس شدند (~۵۵ ثانیه، ubuntu-latest,
> Node 20). یعنی `prisma generate` با `previewFeatures = ["postgresqlExtensions"]` کار می‌کند و
> `next build`/`next lint` روی اسکلت فعلی بدون خطا اجرا می‌شوند. اجرای روی `main` بعد از merge تکرار می‌شود.
> به‌صورت محلی و بدون `npm install` هم تأیید شده: تراز بودن import/export تست‌ها با
> `matching.ts`/`recommendation.ts`، پاس شدن هر ۳۷ assertion تست دامنه (اجرا با یک شبیه‌ساز حداقلی API
> ویتست، نه خود vitest) و type-check تمیز `matching.ts` با `--strict`. خود `npm install`/`vitest`/
> `next build` محلی اجرا نشده و نباید اجرا شود (AGENTS.md).

## منابع کد
- `web/package.json`, `web/prisma/schema.prisma`, `web/tailwind.config.ts`
- `.github/workflows/ci.yml`, `web/vitest.config.ts`, `web/.eslintrc.json`, `LICENSE`

