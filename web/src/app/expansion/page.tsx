import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Alert } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";
import { rankExpansionMarkets, scoreExpansionMarket } from "@/lib/expansion";
import { faNumber } from "@/lib/utils";

import { prisma } from "@/lib/prisma";
import type { ExpansionMarket } from "@/lib/expansion";

export default async function ExpansionPage() {
  const items = await prisma.item.findMany({ where: { status: "ACTIVE" }, select: { city: true, sellerId: true, category: { select: { name: true } }, _count: { select: { interactions: { where: { type: { in: ["VIEW", "LIKE", "CONTACT_SELLER"] } } } } } } });
  const grouped = new Map<string, ExpansionMarket & { sellers: Set<string> }>();
  for (const item of items) {
    const key = `${item.city}\u0000${item.category.name}`;
    const market = grouped.get(key) ?? { city: item.city, category: item.category.name, supplyCount: 0, demandCount: 0, sellerCount: 0, sellers: new Set<string>() };
    market.supplyCount++;
    market.demandCount += item._count.interactions;
    market.sellers.add(item.sellerId);
    market.sellerCount = market.sellers.size;
    grouped.set(key, market);
  }
  const markets = rankExpansionMarkets([...grouped.values()]).slice(0, 9);
  return (
    <AppShell active="none" className="space-y-6">
      <PageHeader
        eyebrow="مقیاس‌پذیری بازار"
        title="اولویت شهرها و دسته‌های بعدی"
        description="رتبه‌بندی عرضهٔ فعال، تعامل ثبت‌شده و تعداد فروشندگان — بر اساس دادهٔ واقعی."
        actions={
          <LinkButton href="/" variant="outline">
            صفحه اصلی
          </LinkButton>
        }
      />

      <Alert variant="info" title="ابزار داخلی محصول">
        این صفحه برای تصمیم‌گیری توسعه بازار است؛ کاربر نهایی MVP روی تهران وینتیج/استریت‌ویر تمرکز دارد.
      </Alert>

      {!markets.length && <p role="status">هنوز عرضهٔ فعالی برای محاسبه وجود ندارد.</p>}
      <div className="grid gap-4 md:grid-cols-3">
        {markets.map((market, index) => (
          <Card key={`${market.city}-${market.category}`}>
            <CardContent className="space-y-3 p-5">
              <p className="text-sm text-muted-foreground">
                اولویت {faNumber(index + 1)} · {market.category}
              </p>
              <h2 className="text-2xl font-display">{market.city}</h2>
              <p className="text-4xl font-display text-brand">{faNumber(scoreExpansionMarket(market))}</p>
              <p className="text-sm text-muted-foreground">امتیاز ورود به بازار</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
