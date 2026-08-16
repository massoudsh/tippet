# Schema — قوانین ویکی تیپت

این ویکی (`docs/wiki/`) دانش فشرده پروژه تیپت است. نسخه‌ی آینه‌ی همان محتوا روی GitHub Wiki
(`https://github.com/massoudsh/tippet/wiki`) هم منتشر می‌شود — همان فایل‌ها، همان ساختار پوشه.

## ساختار
```
docs/wiki/
  schema.md      # همین فایل — قوانین ساختار و لینک‌گذاری
  overview.md    # نمای کلی (≤۴۰۰ کلمه)
  index.md       # کاتالوگ همه صفحات
  log.md         # تاریخچه append-only (جدیدترین در بالا)
  entities/      # User, StyleProfile, Item, ItemImage, Category, StyleTag, Interaction
  concepts/      # ai-discovery, ai-styling, trust-building, tech-stack, roadmap-phases
```

## شروع هر سشن کاری روی این پروژه
1. اول `overview.md` و `index.md` بخوان.
2. فقط صفحات مرتبط با تسک فعلی را drill-down کن.
3. کل `docs/PRD.md` و `docs/DATA_MODEL.md` را فقط وقتی بخوان که ویکی برای تسک کافی نبود.

## قانون به‌روزرسانی — با رشد اپ
هر بار که `web/prisma/schema.prisma` تغییر کرد یا فیچر اصلی جدید پیاده‌سازی شد:
1. صفحه entity/concept مربوطه را آپدیت کن (فیلد جدید، رابطه جدید، منطق جدید، edge case).
2. اگر entity/concept کاملاً جدید و به‌اندازه کافی مهم است (≥۳ ارجاع یا حجم مستقل)، صفحه جدید بساز و در
   `index.md` لینک بده؛ در غیر این صورت صفحه موجود را آپدیت کن.
3. یک خط در `log.md` اضافه کن: `## [YYYY-MM-DD] update | <خلاصه>`.
4. همان تغییر فایل را روی GitHub Wiki هم push کن (مقصد جدا، محتوای یکسان).
5. اگر تغییر یک فیچر جدید/فاز جدید معرفی کرد، Issue/Milestone متناظر در گیت‌هاب هم بساز و در
   [[concepts/roadmap-phases]] لینک بده.

تغییرات trivial (typo، فرمت) نیاز به آپدیت ویکی ندارند. آپدیت‌های ویکی یک‌بار در پایان هر تسک انجام شود.

## قواعد لینک (Obsidian-style)
- `[[entities/item]]` بدون پسوند `.md`.
- نام فایل: lowercase + hyphen.

## Lint دوره‌ای
وقتی کاربر گفت «ویکی رو بازبینی کن»: orphan pages، broken link، تناقض بین صفحات، صفحات کهنه را پیدا و اصلاح کن
(بدون پرسیدن — بهترین حدس را انتخاب کن و در `log.md` ثبت کن).
