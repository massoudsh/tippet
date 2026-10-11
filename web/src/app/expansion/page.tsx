import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Alert } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";
import { rankExpansionMarkets, scoreExpansionMarket } from "@/lib/expansion";
import { faNumber } from "@/lib/utils";

const markets = rankExpansionMarkets([
  { city: "اصفهان", category: "استریت‌ویر", supplyCount: 90, demandScore: 80, trustReadiness: 70 },
  { city: "شیراز", category: "وینتیج", supplyCount: 60, demandScore: 70, trustReadiness: 50 },
  { city: "رشت", category: "کت و بارانی", supplyCount: 48, demandScore: 62, trustReadiness: 55 },
]);

export default function ExpansionPage() {
  return (
    <AppShell active="none" className="space-y-6">
      <PageHeader
        eyebrow="مقیاس‌پذیری بازار"
        title="اولویت شهرها و دسته‌های بعدی"
        description="رتبه‌بندی بر اساس عرضه، تقاضا و آمادگی اعتماد — فعلاً با داده نمونه."
        actions={
          <LinkButton href="/" variant="outline">
            صفحه اصلی
          </LinkButton>
        }
      />

      <Alert variant="info" title="ابزار داخلی محصول">
        این صفحه برای تصمیم‌گیری توسعه بازار است؛ کاربر نهایی MVP روی تهران وینتیج/استریت‌ویر تمرکز دارد.
      </Alert>

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
