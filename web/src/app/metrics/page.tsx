import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Alert } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";
import { calculateMvpMetrics, formatPercent } from "@/lib/metrics";
import { faNumber } from "@/lib/utils";

const metrics = calculateMvpMetrics({
  activeItems: 248,
  feedImpressions: 12400,
  itemClicks: 2110,
  contactClicks: 318,
  likes: 980,
});

const cards = [
  { title: "آگهی فعال", value: faNumber(metrics.activeItems), detail: "تهران، وینتیج و استریت‌ویر" },
  { title: "تعامل با فید", value: formatPercent(metrics.engagementRate), detail: "پسندیدن نسبت به نمایش" },
  { title: "کلیک آیتم", value: formatPercent(metrics.clickThroughRate), detail: "مشاهده آیتم نسبت به نمایش" },
  { title: "تبدیل به تماس", value: formatPercent(metrics.contactConversionRate), detail: "تماس با فروشنده نسبت به مشاهده" },
];

export default function MetricsPage() {
  return (
    <AppShell active="none" className="space-y-6">
      <PageHeader
        eyebrow="داشبورد موفقیت MVP"
        title="شاخص‌های اصلی کشف، اعتماد و تماس"
        description="نرخ تعامل فید، تبدیل مشاهده به تماس و حجم عرضه فعال برای ارزیابی MVP."
        actions={
          <LinkButton href="/" variant="outline">
            صفحه اصلی
          </LinkButton>
        }
      />

      <Alert variant="info" title="داده‌های نمونه">
        اعداد فعلی از ورودی نمونه محاسبه شده‌اند تا شکل داشبورد مشخص باشد؛ اتصال به رویدادهای واقعی در فاز بعد است.
      </Alert>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">{card.title}</p>
              <p className="mt-3 text-3xl font-display">{card.value}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{card.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
