# استک فنی

| لایه | انتخاب | دلیل |
|---|---|---|
| فرانت‌اند + بک‌اند | Next.js 14 App Router, TypeScript | یک‌پارچه برای MVP سریع، بدون دو سرویس جدا |
| دیتابیس | PostgreSQL + pgvector | جست‌وجوی شباهت برداری سلیقه↔آیتم |
| ORM | Prisma | `web/prisma/schema.prisma` |
| استایل | Tailwind CSS، RTL کامل | فونت فارسی، جهت راست‌به‌چپ |
| تصاویر | Object Storage (S3-compatible/آروان‌کلود) | مشخص می‌شود در فاز بعد |
| AI | لایه انتزاعی `AIPipelineClient` | provider قابل تعویض |

> نصب پکیج و build سنگین این پروژه (`npm install`, `npm run build`) باید روی سرور SSH انجام شود،
> نه داخل محیط ساخت (کانتینر).

## منابع کد
- `web/package.json`, `web/prisma/schema.prisma`, `web/tailwind.config.ts`
