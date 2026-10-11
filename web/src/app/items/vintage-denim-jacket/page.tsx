import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button, LinkButton } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { catalogItems } from "@/lib/catalog";
import { rankItemsForStyleProfile } from "@/lib/recommendation";
import { faNumber, faPercent, formatToman } from "@/lib/utils";

const item = catalogItems.find((catalogItem) => catalogItem.id === "vintage-denim-jacket")!;
const match = rankItemsForStyleProfile([item], {
  categories: ["کت"],
  colors: ["آبی"],
  sizes: ["M"],
  tags: ["وینتیج", "استریت‌ویر"],
  maxPrice: 2000000,
})[0].score;

export default function DemoItemPage() {
  return (
    <AppShell active="feed" className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <LinkButton href="/feed" variant="ghost" size="sm">
          بازگشت به فید
        </LinkButton>
        <Badge variant="warning">نمونه کاتالوگ</Badge>
      </div>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-surface border-line border-border bg-gradient-to-br from-sky-200/80 via-slate-200/70 to-zinc-400/60 p-5">
          <div className="flex h-96 items-end rounded-overlay border border-white/40 bg-white/25 p-4">
            <p className="text-sm font-medium text-slate-800">پیش‌نمایش بصری آیتم نمونه</p>
          </div>
        </div>

        <Card>
          <CardHeader className="space-y-4">
            <Badge variant="brand">{faPercent(match)} به سلیقه تو نزدیک است</Badge>
            <h1 className="text-3xl font-display leading-tight sm:text-4xl">{item.title}</h1>
            <p className="leading-8 text-muted-foreground">
              {item.category}
              {item.brand ? ` برند ${item.brand}` : ""} با وضعیت {item.condition}، مناسب استایل وینتیج و استریت‌ویر.
            </p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <Info title="سایز" value={item.size} />
              <Info title="رنگ" value={item.color} />
              <Info title="شهر" value={item.city} />
              <Info title="قیمت" value={formatToman(item.price)} />
            </div>

            <div className="rounded-overlay border-line border-border bg-secondary/50 p-4">
              <h2 className="font-semibold">فروشنده</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.seller.name} · عضویت از {item.seller.joinedAt} · {faNumber(item.seller.activeItems)} آگهی فعال
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.seller.contactLinks.whatsapp && (
                  <LinkButton href={item.seller.contactLinks.whatsapp} variant="brand" target="_blank" rel="noreferrer">
                    تماس واتساپ
                  </LinkButton>
                )}
                {item.seller.contactLinks.telegram && (
                  <LinkButton href={item.seller.contactLinks.telegram} variant="outline" target="_blank" rel="noreferrer">
                    پیام تلگرام
                  </LinkButton>
                )}
                <Button variant="ghost" disabled title="پرداخت امن در فاز ۳">
                  پرداخت امن (به‌زودی)
                </Button>
                <Button variant="ghost" disabled title="چت داخلی در فاز ۳">
                  چت داخلی (به‌زودی)
                </Button>
              </div>
            </div>

            <Alert variant="info" title="این صفحه دمو است">
              برای آگهی‌های واقعی ثبت‌شده در دیتابیس، مسیر <span dir="ltr">/items/[id]</span> را باز کن.
            </Alert>
          </CardContent>
        </Card>
      </section>
    </AppShell>
  );
}

function Info({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-control border-line border-border bg-field p-4">
      <p className="text-xs text-muted-foreground">{title}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}
