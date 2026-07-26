# تیپت — دیتامدل اولیه

این سند موجودیت‌های اصلی MVP و رابطه‌ی آن‌ها را توضیح می‌دهد. پیاده‌سازی کامل در
[`/web/prisma/schema.prisma`](../web/prisma/schema.prisma) است.

## ۱. نمودار روابط (ساده‌شده)

```
User (خریدار) 1───1 StyleProfile
User (فروشنده) 1───N Item
Item N───1 Category
Item 1───N ItemImage
Item N───N StyleTag   (از طریق ItemStyleTag)
User N───N Item       (از طریق Interaction: view/like/dislike/save)
```

## ۲. موجودیت‌ها

### User
کاربر پلتفرم؛ می‌تواند نقش خریدار، فروشنده یا هر دو داشته باشد.

| فیلد | نوع | توضیح |
|---|---|---|
| id | string (uuid) | شناسه |
| phone | string | شماره موبایل (روش اصلی احراز هویت در ایران) |
| name | string? | نام نمایشی |
| role | enum(BUYER, SELLER, BOTH) | نقش کاربر |
| city | string? | شهر (برای MVP عمدتاً «تهران») |
| createdAt | datetime | |

### StyleProfile
پروفایل سلیقه‌ی خریدار؛ ورودی اصلی موتور کشف هوشمند.

| فیلد | نوع | توضیح |
|---|---|---|
| id | string | |
| userId | string | یک‌به‌یک با User |
| sizeInfo | json | سایز تخمینی به تفکیک دسته (بالاتنه، پایین‌تنه، کفش و ...) |
| budgetMin / budgetMax | int? | بازه بودجه (تومان) |
| preferredCategories | string[] | دسته‌های موردعلاقه |
| preferredColors | string[] | رنگ‌های موردعلاقه |
| tasteEmbedding | vector(1536)? | بردار سلیقه؛ میانگین/ترکیب embedding آیتم‌های پسندیده‌شده |
| updatedAt | datetime | |

### Item (آیتم لباس)
هسته‌ی مارکت‌پلیس.

| فیلد | نوع | توضیح |
|---|---|---|
| id | string | |
| sellerId | string | فروشنده (User) |
| title | string | عنوان آگهی |
| description | string | توضیح آزاد فروشنده |
| categoryId | string | دسته (کت، مانتو، شلوار، کفش و ...) |
| brand | string? | برند (تشخیص AI یا ورودی فروشنده) |
| size | string? | سایز |
| condition | enum(NEW_WITH_TAG, LIKE_NEW, GOOD, FAIR) | وضعیت کالا |
| color | string? | رنگ غالب (تشخیص AI) |
| material | string? | جنس تقریبی (تشخیص AI) |
| price | int | قیمت به تومان |
| city | string | شهر آیتم |
| status | enum(ACTIVE, RESERVED, SOLD, REMOVED) | وضعیت آگهی |
| itemEmbedding | vector(1536)? | بردار ویژگی آیتم (از عکس+متن) برای تطابق سلیقه |
| aiExtractedTags | json? | خروجی خام تحلیل AI (برای دیباگ/بهبود مدل) |
| createdAt / updatedAt | datetime | |

### ItemImage
| فیلد | نوع | توضیح |
|---|---|---|
| id | string | |
| itemId | string | |
| url | string | |
| order | int | ترتیب نمایش |

### Category
دسته‌بندی سلسله‌مراتبی ساده (مثلاً «پوشاک بالاتنه» → «کت»).

| فیلد | نوع | توضیح |
|---|---|---|
| id | string | |
| name | string | |
| parentId | string? | برای سلسله‌مراتب |

### StyleTag / ItemStyleTag
برچسب‌های سبک (وینتیج، استریت‌ویر، رسمی، اسپرت، ...) — رابطه‌ی چندبه‌چند با Item.

| فیلد | نوع | توضیح |
|---|---|---|
| StyleTag.id | string | |
| StyleTag.name | string | |
| ItemStyleTag.itemId | string | |
| ItemStyleTag.styleTagId | string | |
| ItemStyleTag.confidence | float? | اطمینان تشخیص AI (۰ تا ۱) |

### Interaction
رفتار کاربر روی آیتم‌ها؛ ورودی یادگیری سلیقه و رتبه‌بندی فید.

| فیلد | نوع | توضیح |
|---|---|---|
| id | string | |
| userId | string | |
| itemId | string | |
| type | enum(VIEW, LIKE, DISLIKE, SAVE, CONTACT_SELLER) | |
| createdAt | datetime | |

## ۳. یادداشت‌های طراحی
- `tasteEmbedding` و `itemEmbedding` با `pgvector` ذخیره می‌شوند و جست‌وجوی شباهت (cosine similarity)
  مبنای رتبه‌بندی فید کشف هوشمند است.
- برای MVP، ثبت آیتم دستی توسط فروشنده است؛ فیلد `aiExtractedTags` برای این طراحی شده که خروجی خام
  مدل AI ذخیره شود تا بعداً برای بهبود دقت تشخیص (fine-tuning/prompt tuning) قابل بررسی باشد.
- `Interaction` جدول append-only است (فقط insert)؛ برای محاسبه‌ی سلیقه‌ی فعلی کاربر، آخرین N تعامل
  با وزن نزولی در نظر گرفته می‌شود (منطق در `RecommendationService`).
- احراز هویت بر پایه‌ی شماره موبایل (رایج‌ترین روش در محصولات ایرانی) در نظر گرفته شده؛ جزئیات OTP
  در فاز پیاده‌سازی احراز هویت مشخص می‌شود.
