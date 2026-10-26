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

## Competitive and UX review — 2026-10-26

This is a source/code review, not a live usability benchmark. Iranian reference products are Divar (general classifieds), Komodaa (fashion resale/social commerce), and Basalam (seller marketplace). Public descriptions are incomplete; the opportunities below do **not** imply competitors lack these features.

### Five prioritized feature opportunities

| Priority | Opportunity | Current gap and acceptance criteria |
| --- | --- | --- |
| 1 | Saved searches and new-listing alerts | Search exists but saved-query persistence and notification delivery do not. Persist normalized filters per user, support unsubscribe, and deduplicate alerts. Validate repeat visits and alert-to-listing clicks. |
| 2 | Fit confidence and garment measurements | Size labels already exist; add chest/waist/length in cm, a measurement guide, and explicit missing-data states. Explain fit without guaranteeing it. Validate measurement coverage and buyer contact conversion. |
| 3 | Buyer protection and dispute tracking | Checkout is a preview, not escrow. Integrate an approved payment provider, idempotent verified callbacks, delivery confirmation, dispute/refund states and clear fees before describing payment as protected. Track completed orders and dispute resolution time. |
| 4 | Seller reputation and transaction-linked reviews | Seller age/completeness is not a verified reputation. Add completed-order reviews, report/moderation tools and a transparent verification label; prevent self-reviews and duplicate reviews. Measure fraud reports and repeat purchases. |
| 5 | Shoppable outfits using live inventory | Current outfits use catalog fixtures. Generate only from active listings, constrain total budget and size, explain recommendations, and exclude sold items. Measure outfit saves and contact conversion; keep AI claims separate from rule-based ranking. |

Research: [Komodaa publisher listing](https://play.google.com/store/apps/details?hl=fa&id=com.komodaa.app), [third-party marketplace comparison](https://rankesh.com/marketplace/), [third-party Divar feature guide](https://pishkhanak.com/blog/download-divar-classifieds-app). The publisher listing confirms resale positioning and payment-related release notes; saved-search and marketplace-protection descriptions from third-party sources need official verification before specification. Google Play's wishlist UI is not evidence of an in-app favorites feature.

### Duplication and unnecessary surface area

- No byte-identical tracked files were found. No folders were identified as safe to delete wholesale.
- Import-reference review flags `web/src/components/coming-soon-banner.tsx` and `web/src/components/item-interactions.tsx` as unused legacy alternatives to the current `ui/coming-soon` and `items/item-actions` components. `ui/skeleton.tsx` also has no current imports. Retained pending explicit deletion approval.
- `web/src/lib/search.ts` supports catalog fixtures/tests; `items.ts` searches PostgreSQL. These are distinct demo/live paths, not interchangeable implementations. Likewise the static denim route and catalog remain referenced by previews; do not delete them blindly.
- Phone normalization exists in both `auth.ts` and `utils.ts` with different error/format semantics. Consolidation requires contract tests rather than a rename.
- `/ingestion`, `/outfits`, `/chat`, `/checkout`, and `/revenue` contain previews. Keep preview labels and real alternatives prominent; do not create a second manual listing form alongside `/seller/new`.
- `/metrics` and `/expansion` are live aggregate pages, not customer purchase steps. Their audience and access policy should be decided before adding them to primary navigation.
- README/wiki claims drift from the implementation. Maintain current route contracts in one place; keep product roadmap separate from shipped behavior.

### Changes delivered in this review

- Blank price form fields no longer fail schema validation. Invalid and inverted price ranges get recoverable feedback instead of a page exception.
- Existing size and minimum-price backend filters are now exposed in search, with URL-persisted form values.
- Added a keyboard skip-to-content link and focus target to the shared shell.
- A page with no active navigation key no longer marks outfits as its current page.
- Added regression tests for empty, invalid and inverted search-price inputs.

The five opportunities above remain proposals, not shipped features. Lint could not start because installed dependencies are absent (`next: not found`); typecheck/tests therefore remain unverified. No production build or browser/visual audit was performed. Reduced-motion styles and focus-visible rules already exist and were preserved.

## وضعیت MVP

- CI وب برای lint، type-check، تست و build فعال است.
- مجوز MIT در ریشه پروژه ثبت شده است.
- تست Vitest برای منطق دامنه آماده است.
- migration پایه Prisma همراه pgvector و docker compose اضافه شده است.
- راهنمای عکاسی فروشنده در صفحه اصلی نمایش داده می‌شود.
