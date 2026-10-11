import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { faPercent, formatToman } from "@/lib/utils";

const featuredItems = [
  {
    href: "/items/vintage-denim-jacket",
    title: "کت جین وینتیج",
    meta: "تهران · سایز M · وضعیت عالی",
    price: 1480000,
    match: 92,
    palette: "from-sky-200/80 via-slate-200/70 to-zinc-400/60",
  },
  {
    href: "/feed",
    title: "بارانی زعفرانی",
    meta: "تجریش · سایز L · کم‌کارکرد",
    price: 2100000,
    match: 87,
    palette: "from-amber-200/80 via-orange-100/70 to-stone-300/60",
  },
  {
    href: "/feed",
    title: "هودی استریت‌ویر",
    meta: "یوسف‌آباد · فری‌سایز · سالم",
    price: 920000,
    match: 84,
    palette: "from-emerald-200/80 via-teal-100/70 to-slate-300/60",
  },
];

const trustSignals = [
  { title: "تشخیص سلیقه با AI", text: "فید بر اساس سایز، رنگ، بودجه و بازخورد تو مرتب می‌شود." },
  { title: "آگهی استاندارد", text: "دسته، وضعیت و مشخصات برای مقایسه سریع یکدست می‌شوند." },
  { title: "اعتماد فروشنده", text: "سابقه آگهی و کامل‌بودن اطلاعات قبل از تماس دیده می‌شود." },
  { title: "تمرکز تهران وینتیج", text: "MVP روی استریت‌ویر و برندهای کمیاب تهران متمرکز است." },
];

export default function HomePage() {
  return (
    <AppShell active="home" className="space-y-10 pb-32">
      <section className="relative overflow-hidden rounded-surface border-line border-border surface-glass">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,oklch(0.86_0.12_190/0.22),transparent_45%),radial-gradient(circle_at_bottom_right,oklch(0.87_0.12_165/0.16),transparent_40%)]"
        />
        <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
          <div className="space-y-6">
            <Badge variant="brand">تهران · وینتیج و استریت‌ویر</Badge>
            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-display leading-[1.15] sm:text-5xl">تیپت</h1>
              <p className="max-w-xl text-lg leading-9 text-muted-foreground">
                لباس دست‌دوم را مثل یک استایلیست شخصی کشف کن — پیشنهادهای قابل‌خرید، نزدیک به سلیقه و بودجه تو.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <LinkButton href="/onboarding" size="lg">
                ساخت پروفایل سلیقه
              </LinkButton>
              <LinkButton href="/seller/new" variant="outline" size="lg">
                ثبت سریع آگهی
              </LinkButton>
            </div>
            <div className="grid max-w-md grid-cols-3 gap-2">
              <Stat value={faPercent(92)} label="بیشترین تطابق" />
              <Stat value="۴" label="سیگنال اعتماد" />
              <Stat value="۳ دقیقه" label="ثبت آگهی" />
            </div>
          </div>

          <Card className="surface-glass-strong">
            <CardHeader className="flex-row items-start justify-between gap-3 space-y-0">
              <div>
                <CardTitle>فید کشف امروز</CardTitle>
                <CardDescription>مرتب‌شده با تطابق سلیقه</CardDescription>
              </div>
              <Badge variant="success">نمونه</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {featuredItems.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="grid grid-cols-[96px_1fr] gap-3 rounded-overlay border-line border-border bg-card/70 p-3 backdrop-blur-md transition-all duration-motion ease-motion hover:border-primary/40 hover:bg-accent/60"
                >
                  <div className={`min-h-24 rounded-control bg-gradient-to-br ${item.palette}`} />
                  <div className="flex min-w-0 flex-col justify-between py-0.5">
                    <div>
                      <div className="mb-1 flex items-start justify-between gap-2">
                        <h2 className="truncate font-semibold">{item.title}</h2>
                        <Badge variant="brand">{faPercent(item.match)}</Badge>
                      </div>
                      <p className="text-xs leading-6 text-muted-foreground">{item.meta}</p>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold">{formatToman(item.price)}</p>
                      <span className="text-xs text-muted-foreground group-hover:text-foreground">جزئیات</span>
                    </div>
                  </div>
                </a>
              ))}
              <LinkButton href="/feed" variant="secondary" className="w-full">
                مشاهده فید کامل
              </LinkButton>
            </CardContent>
          </Card>
        </div>
      </section>

      <section aria-labelledby="trust-heading" className="space-y-4">
        <h2 id="trust-heading" className="text-xl font-display">
          چرا تیپت؟
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {trustSignals.map((signal) => (
            <Card key={signal.title}>
              <CardHeader>
                <CardTitle>{signal.title}</CardTitle>
                <CardDescription>{signal.text}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="seller-heading"
        className="grid gap-4 rounded-surface border-line border-border bg-primary/90 p-6 text-primary-foreground shadow-control backdrop-blur-xl sm:p-8 lg:grid-cols-[0.9fr_1.1fr]"
      >
        <div className="space-y-3">
          <p className="text-sm font-semibold text-primary-foreground/80">برای فروشنده‌ها</p>
          <h2 id="seller-heading" className="text-3xl font-display leading-tight">
            از عکس خام تا آگهی قابل اعتماد.
          </h2>
          <p className="leading-8 text-primary-foreground/75">
            عنوان، توضیح و تصویر را بده؛ مشخصات را کامل کن و آگهی را در چند دقیقه منتشر کن.
          </p>
          <div className="flex flex-col gap-2 pt-2 sm:flex-row">
            <LinkButton href="/seller/new" variant="brand">
              شروع ثبت آگهی
            </LinkButton>
            <LinkButton
              href="/seller"
              variant="outline"
              className="border-primary-foreground/25 bg-primary-foreground/5 text-primary-foreground hover:bg-primary-foreground/12"
            >
              پنل فروشنده
            </LinkButton>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <ProcessStep number="۱" title="آپلود عکس" text="نور و زاویه را رعایت کن." />
          <ProcessStep number="۲" title="تکمیل مشخصات" text="سایز، وضعیت و قیمت را ثبت کن." />
          <ProcessStep number="۳" title="انتشار" text="آگهی در فید و جست‌وجو دیده می‌شود." />
        </div>
      </section>

      <section aria-labelledby="explore-heading" className="space-y-4">
        <h2 id="explore-heading" className="text-xl font-display">
          کاوش بیشتر
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <ExploreLink href="/search" title="جست‌وجو و فیلتر" text="دسته، شهر و بودجه" />
          <ExploreLink href="/outfits" title="ست‌سازی ساده" text="آیتم‌های مکمل" />
          <ExploreLink href="/metrics" title="معیارهای MVP" text="نرخ کشف و تماس" />
          <ExploreLink href="/auth" title="ورود با موبایل" text="OTP امن" />
        </div>
      </section>
    </AppShell>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-control border-line border-border bg-card/60 p-3 text-center backdrop-blur-md shadow-surface">
      <p className="text-lg font-display text-foreground">{value}</p>
      <p className="mt-1 text-[11px] text-muted-foreground">{label}</p>
    </div>
  );
}

function ProcessStep({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div className="rounded-overlay border-line border-primary-foreground/15 bg-primary-foreground/10 p-4 text-primary-foreground backdrop-blur-md">
      <div className="mb-6 flex size-9 items-center justify-center rounded-control bg-brand text-sm font-display text-brand-foreground shadow-control">
        {number}
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-primary-foreground/70">{text}</p>
    </div>
  );
}

function ExploreLink({ href, title, text }: { href: string; title: string; text: string }) {
  return (
    <a
      href={href}
      className="rounded-surface border-line border-border surface-glass p-5 transition-all duration-motion ease-motion hover:border-primary/35 hover:shadow-overlay"
    >
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
    </a>
  );
}
