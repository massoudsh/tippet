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
| `/outfits` | ست ساده | مکمل‌های کاتالوگ + coming-soon فاز ۲ |
| `/checkout` | escrow | coming-soon فاز ۳ + محاسبه نمونه |
| `/chat` | چت | coming-soon فاز ۳ + thread نمونه |
| `/ingestion` | ورود آگهی خارجی | coming-soon فاز ۲ |
| `/metrics` | داشبورد MVP | داده نمونه |
| `/revenue` | مدل درآمد | محاسبه نمونه + coming-soon |
| `/expansion` | اولویت بازار | امتیاز نمونه شهر/دسته |

## منابع کد
- `web/src/app/**/page.tsx`
- `web/src/components/**`
- `web/src/lib/utils.ts`
