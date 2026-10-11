import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { ComingSoonBanner } from "@/components/ui/coming-soon";
import { Card, CardContent } from "@/components/ui/card";
import { calculateRevenue } from "@/lib/revenue";
import { formatToman } from "@/lib/utils";

const revenue = calculateRevenue({
  itemPrice: 2100000,
  commissionRate: 0.08,
  premiumListingFee: 50000,
  premiumEnabled: true,
});

export default function RevenuePage() {
  return (
    <AppShell active="none" className="space-y-6">
      <PageHeader
        eyebrow="مدل درآمدی"
        title="کمیسیون فروش موفق به‌همراه خدمات ویژه فروشنده"
        description="در نسخه تجاری، درآمد از کمیسیون تراکنش و ابزارهای دیده‌شدن بیشتر محاسبه می‌شود."
      />

      <ComingSoonBanner
        eyebrow="پس از MVP"
        title="صورتحساب واقعی هنوز صادر نمی‌شود"
        description="این صفحه فقط محاسبه نمونه کمیسیون و خدمات ویژه را نشان می‌دهد."
        primaryHref="/seller"
        primaryLabel="پنل فروشنده"
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metric title="کمیسیون" value={formatToman(revenue.commission)} />
        <Metric title="خدمات ویژه" value={formatToman(revenue.premiumFee)} />
        <Metric title="درآمد کل" value={formatToman(revenue.totalRevenue)} />
        <Metric title="دریافتی فروشنده" value={formatToman(revenue.sellerNet)} />
      </div>
    </AppShell>
  );
}

function Metric({ title, value }: { title: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="mt-3 text-xl font-display">{value}</p>
      </CardContent>
    </Card>
  );
}
