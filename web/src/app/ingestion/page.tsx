import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ComingSoonBanner } from "@/components/ui/coming-soon";
import { LinkButton } from "@/components/ui/button";
import { normalizeIngestionCandidate } from "@/lib/ingestion";
import { formatToman } from "@/lib/utils";

const candidate = normalizeIngestionCandidate({
  source: "divar",
  sourceUrl: "https://example.com/listing",
  title: "کت جین وینتیج",
  price: 1480000,
  city: "تهران",
  hasPermission: true,
});

export default function IngestionPage() {
  return (
    <AppShell active="seller" className="space-y-6">
      <PageHeader
        eyebrow="Ingestion با مجوز"
        title="ورود آگهی از کانال‌های دیگر برای بازبینی"
        description="آگهی فقط وقتی وارد صف استانداردسازی می‌شود که مجوز منبع تأیید شده باشد."
        actions={
          <LinkButton href="/seller/new" variant="brand">
            ثبت دستی آگهی
          </LinkButton>
        }
      />

      <ComingSoonBanner
        eyebrow="فاز ۲"
        title="صف ingestion خودکار هنوز وصل نیست"
        description="MVP با ثبت دستی فروشنده شروع می‌شود؛ این صفحه کاندیدای نمونه‌ای با مجوز را نشان می‌دهد."
        phaseLabel="به‌زودی — خارج از محدوده MVP"
        primaryHref="/seller/new"
        primaryLabel="ثبت آگهی دستی"
        secondaryHref="/seller"
        secondaryLabel="پنل فروشنده"
      />

      <Card>
        <CardContent className="space-y-4 p-5">
          <Badge variant="warning">در انتظار بازبینی</Badge>
          <h2 className="text-2xl font-display">{candidate.title}</h2>
          <p className="text-muted-foreground">
            {candidate.city} · {formatToman(candidate.price)} · منبع: {candidate.source}
          </p>
          <p className="text-sm text-muted-foreground">
            پس از بازبینی، دسته، وضعیت، سایز و برچسب‌های سبک توسط فروشنده تأیید می‌شوند.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled
              className="h-11 rounded-control bg-primary px-4 text-sm font-semibold text-primary-foreground opacity-50"
            >
              تأیید و تبدیل به آگهی
            </button>
            <button
              type="button"
              disabled
              className="h-11 rounded-control border-line border-border px-4 text-sm font-semibold opacity-50"
            >
              رد کاندیدا
            </button>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}
