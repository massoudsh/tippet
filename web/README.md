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
npm run check       # lint + typecheck + tests (including server-rendered UI contracts)
npm run typecheck   # TypeScript only
```

## UI backlog delivery and verification

The attached UI backlog is implemented against existing APIs, not hypothetical AI, cart, or moderation services. These are **partial backlog improvements**, not certification that all 17 issues are complete.

| Backlog | Delivered | Remaining or blocked |
| --- | --- | --- |
| 1, 3: design system/glass | Existing primitives retained; `GlassSurface` variants, theme tokens, 8px blur, opaque fallback | Full modal/drawer/popover library is not introduced without consumers; rendered contrast audit pending |
| 2: shell | Theme selector, saved-items entry, existing responsive navigation and keyboard skip link | Notifications and account menu need further work; no notifications backend |
| 4: discovery | Existing ranking unchanged; anonymous fabricated match badge removed; rule-based explanation and end state | Per-item explanations and inline feed feedback remain |
| 5: products | Lazy images with dimensions, gallery zoom/keyboard/swipe, Persian status, actual seller links and unavailable contact state | Related products, share/report, external image optimization remain |
| 6: listing | No fabricated default attributes/prices; previews, removal/primary-image selection, count progress, reuse successful uploads on retry, review confirmation | No AI extraction endpoint or persistent drafts; full field-linked error summary remains |
| 7: outfits | Manual add/remove board using active database listings and price totals; no AI or fit claims | No outfit persistence/share/cart API; previous fixture recommendation algorithm remains untouched in the library |
| 8: search | URL filter chips, individual removal, retained input on validation failure, Persian conditions | Mobile drawer and new backend sorting options remain |
| 9: closet | Authenticated saved-item view from existing SAVE interactions, deduplicated by item with live status | No unsave/undo/collection backend; explicitly disclosed in UI |
| 10: checkout | Existing clearly labelled preview retained; no payment functionality invented | Orders, inventory locking, payment and shipping integration are absent |
| 11: recovery | Shared loading/error boundary, offline notice, upload/input retention | Bilingual error catalog and field-linked summaries remain |
| 12: RTL | Inherited body direction, mixed-content isolation, wrapping button labels | Full RTL/LTR visual and screen-reader checks remain |
| 13: themes | Persisted light/dark/system selector, pre-paint initialization and OS CSS fallback | Legacy demo pages still need token conversion; no visual sign-off |
| 14: motion | Existing reduced-motion handling preserved; large glass blur reduced | Interaction/browser verification pending |
| 15: accessibility | Larger small-button targets, labelled gallery/dialog, status text and markup tests | Full WCAG AA compliance and focus behavior need real assistive-technology testing |
| 16: performance | Lazy card images, stable dimensions, lighter blur | No Core Web Vitals numbers measured; responsive remote image pipeline remains |
| 17: gates | `npm run check`, server-rendered component tests included in existing CI test discovery | No browser automation, screenshots or visual-regression run performed |

Validation: 77 tests passed, one PostgreSQL integration test skipped without a database. Typecheck passed; lint passed with the existing root-layout external-font warning. No production build was run in the container. Server-rendered markup tests do not validate actual keyboard behavior, CSS contrast or visual layout.

Manual release checks: test light/dark/system (including disabled storage), 320px RTL and long labels; keyboard gallery open/close and focus return; swipe images; offline/reconnect and upload retry; unauthenticated closet, empty closet and saved sold items; invalid search filters and removing one filter; manual outfit add/remove and stale availability. Recheck real seller ownership/API permissions against a seeded database. Do not claim payment protection or AI-generated metadata.

تست‌ها روی توابع خالص دامنه (`src/lib/matching.ts`) اجرا می‌شوند و به دیتابیس نیاز ندارند.
CI (`.github/workflows/ci.yml`) همین مراحل به‌علاوه‌ی `npm run build` را روی هر push/PR به
`main` اجرا می‌کند.
