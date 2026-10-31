# فرانت‌اند و UI

## جهت طراحی
- فارسی، RTL، تم **Turquoise (فیروزه)** از VibeFarsi — glassmorphism (`lang="fa" dir="rtl"`).
- توکن‌ها در `web/src/app/globals.css` (سطح نیمه‌شفاف، `backdrop-filter`، گرادیان پس‌زمینه، Noto Kufi برای display)؛ نگاشت Tailwind در `web/tailwind.config.ts`.
- utilityهای شیشه: `surface-glass` / `surface-glass-strong` روی کارت، هدر، ناوبری پایین.
- اعداد و تومان از `web/src/lib/utils.ts` (`fa`, `faNumber`, `formatToman`, `faPercent`).
- کامپوننت‌های مشترک در `web/src/components/` (بدون وابستگی lucide؛ آیکون‌های ضروری با متن/علامت).

## پوسته مشترک
- `AppShell` + `SiteHeader` + `BottomNav` (موبایل)
- `PageHeader`, `ItemCard`, `ComingSoonBanner`, `EmptyState`, `Alert`, `Stepper`, `OtpField`

## مسیرهای کاربر (App Router)
| مسیر | نقش | وضعیت UI |
|---|---|---|
| `/` | لندینگ | برند + CTA سلیقه/آگهی + پیش‌نمایش فید |
| `/auth` | OTP موبایل | دو مرحله شماره/کد، اعتبارسنجی ۰۹، loading/error |
| `/onboarding` | پروفایل سلیقه | فرم چندمرحله‌ای → `PUT /api/style-profile` |
| `/feed` | کشف | رتبه‌بندی واقعی آیتم‌ها + empty/auth alerts |
| `/search` | فیلتر | فرم GET + فیلتر عبارت/شهر/دسته/سایز/حداقل و حداکثر قیمت + empty/error state |
| `/items/[id]` | جزئیات واقعی | تصاویر، مشخصات، `ItemActions` (LIKE/SAVE/CONTACT) |
| `/items/vintage-denim-jacket` | دمو کاتالوگ | تماس واتساپ/تلگرام؛ escrow/chat غیرفعال |
| `/profile` | سلیقه ذخیره‌شده | خواندن از DB + logout |
| `/seller` | پنل فروشنده | متریک نمونه + انتخاب گروهی (API گروهی هنوز نیست) |
| `/seller/new` | ثبت آگهی | آپلود + `POST /api/items` |
| `/outfits` | ست دستی | انتخاب/حذف از آگهی‌های فعال، جمع قیمت؛ بدون پیشنهاد AI یا ذخیرهٔ پایدار |
| `/closet` | ذخیره‌های شخصی | ورود الزامی، آیتم‌های دارای SAVE کاربر با وضعیت واقعی؛ بدون حذف ذخیره |
| `/checkout` | escrow | coming-soon فاز ۳ + محاسبه نمونه |
| `/chat` | چت | coming-soon فاز ۳ + thread نمونه |
| `/ingestion` | ورود آگهی خارجی | coming-soon فاز ۲ |
| `/metrics` | داشبورد MVP | داده نمونه |
| `/revenue` | مدل درآمد | محاسبه نمونه + coming-soon |
| `/expansion` | اولویت بازار | امتیاز عرضهٔ فعال/تعامل/فروشندگان از دیتابیس |

## قراردادهای بازبینی بک‌لاگ
- پوسته روشن/تیره/سیستم در localStorage نگه‌داری می‌شود؛ انتخاب سیستم از CSS و تنظیمات OS پیروی می‌کند.
- `GlassSurface` سه سطح دارد؛ blur به ۸ پیکسل کاهش یافته و fallback بدون backdrop-filter موجود است.
- گالری کالا از dialog بومی برای بزرگ‌نمایی، کلیدهای جهت و swipe استفاده می‌کند. وضعیت آگهی و لینک‌های واقعی فروشنده نمایش داده می‌شوند؛ تماس در وضعیت غیر ACTIVE غیرفعال است.
- ثبت آگهی مقادیر ساختگی پیش‌فرض ندارد؛ پیش‌نمایش، حذف/انتخاب تصویر اصلی، پیشرفت و استفادهٔ مجدد از آپلود موفق در retry دارد.
- امتیاز فید برای کاربر بدون پروفایل نمایش داده نمی‌شود؛ محاسبهٔ رتبه‌بندی تغییر نکرده است.
- `npm run check` شامل lint/typecheck و تست markup کامپوننت‌ها است؛ نتیجه و محدودیت‌های هر ۱۷ بخش در `web/README.md` ثبت شده‌اند. WCAG و بررسی بصری هنوز تأیید نشده‌اند.

## منابع کد
- `web/src/app/**/page.tsx`
- `web/src/components/**`
- `web/src/lib/utils.ts`
