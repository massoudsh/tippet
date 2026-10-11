# Log

## [2026-10-11] update | ارتقای پیش‌نمایش‌های فاز ۳ در `/checkout` و `/chat`: مراحل روشن، CTAهای بازگشت، حالت‌های غیرفعال و متن صریحِ بدون پرداخت یا ارسال واقعی؛ افزودن [[concepts/frontend-ui]] برای قرارداد مشترک ComingSoonBanner و دسترس‌پذیری.

## [2026-10-11] update | تبدیل `/ingestion` به جریان ورود دستیِ URL-یار: بررسی نشست و redirect ورود، اعتبارسنجی Zod، آپلود تصویر و ثبت با API آیتم، همراه با حالت‌های loading/error/success؛ URL منبع فعلاً scrape یا ذخیره نمی‌شود. ثبت قرارداد در [[entities/item]] و [[concepts/frontend-ui]]

## [2026-10-11] update | پیاده‌سازی رتبه‌بندی قواعدی فید با وزن‌های دسته، رنگ، سایز، بودجهٔ تدریجی و تازگی؛ افزودن تست و حالت‌های loading/error در `/feed` و مستندسازی فرمول در [[concepts/ai-discovery]]

## [2026-10-11] update | افزودن تغییر گروهی وضعیت آگهی‌های فروشنده با endpoint احرازشده، اعتبارسنجی UUID و گزارش نتیجهٔ جزئی؛ ثبت قرارداد در [[entities/seller]]، [[entities/item]] و [[concepts/frontend-ui]]

## [2026-09-19] update | اولین اجرای واقعی CI روی PR #۲۴ سبز شد (۹/۹ گام: install → prisma generate → lint → type-check → test → build)؛ ثبت نتیجه در [[concepts/tech-stack]] و [[overview]] — یعنی `prisma generate` با فلگ `postgresqlExtensions` و `next build` روی اسکلت فعلی تأیید شدند

## [2026-09-19] update | بازبینی و همگام‌سازی ویکی با کامیت `41856db`: اصلاح ادعای کهنه در [[entities/interaction]] (منطق ساخت بردار سلیقه از `RecommendationService` به `matching.ts` منتقل شده)، افزودن `rankItems`/`cosineSimilarity` و شرح tie-break فید به [[entities/style-profile]]، تغییر گام نصب CI به شرطی (`npm ci` وقتی `package-lock.json` موجود است، وگرنه `npm install`) و مستندسازی آن + ثبت دقیق وضعیت تأیید در [[concepts/tech-stack]]؛ آینه‌ی GitHub Wiki هم با همین محتوا به‌روز شد

## [2026-09-19] update | رفع بلاکر CI: افزودن `previewFeatures = ["postgresqlExtensions"]` به generator در `schema.prisma` (بدون آن `extensions = [vector]` نامعتبر است و `prisma generate` در مرحله‌ی CI شکست می‌خورد)؛ به‌روزرسانی ارجاع‌های شماره‌خط `schema.prisma` در ۷ صفحه‌ی entities/concepts به‌خاطر جابه‌جایی ۳ خطی؛ ثبت وضعیت تأییدنشده‌ی اولین run در [[concepts/tech-stack]]

## [2026-09-19] update | افزودن LICENSE (Apache-2.0) + ارجاع در README (#۱۶)؛ راه‌اندازی CI گیت‌هاب — lint/type-check/test/build روی Node 20 (#۱۵)؛ راه‌اندازی Vitest + پیاده‌سازی منطق دامنه‌ی تطابق سلیقه در `web/src/lib/matching.ts` و تست‌های واحد آن (#۱۷)؛ به‌روزرسانی صفحات tech-stack / ai-discovery / style-profile / overview

## [2026-08-16] setup | ایجاد اسکلت ویکی دانش (docs/wiki) از روی PRD/دیتامدل؛ افزودن AGENTS.md با دستورالعمل نگهداری؛ افزودن ۹ Issue جدید (زیرساخت CI/تست/LICENSE/migration/OTP + فیچرهای cold-start/عکاسی/متریک/درآمد)؛ محتوای مشابه برای GitHub Wiki آماده شد (در انتظار ساخت اولین صفحه از طریق وب — محدودیت پلتفرم گیت‌هاب)
