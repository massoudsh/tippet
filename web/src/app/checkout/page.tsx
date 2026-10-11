import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { ComingSoonBanner } from "@/components/ui/coming-soon";
import { Card, CardContent } from "@/components/ui/card";
import { calculateEscrowBreakdown, nextEscrowStatus } from "@/lib/escrow";
import { formatToman } from "@/lib/utils";

const breakdown = calculateEscrowBreakdown({ itemPrice: 1480000, platformFeeRate: 0.05, status: "HELD" });
const nextStatus = nextEscrowStatus("HELD", "CONFIRM_DELIVERY");

export default function CheckoutPage() {
  return (
    <AppShell active="none" className="space-y-6">
      <PageHeader
        eyebrow="پرداخت امن داخلی"
        title="وجه تا تأیید تحویل نزد تیپت نگه داشته می‌شود"
        description="خریدار پرداخت می‌کند، مبلغ در وضعیت امن می‌ماند و بعد از تأیید تحویل برای فروشنده آزاد می‌شود."
      />

      <ComingSoonBanner
        eyebrow="فاز ۳"
        title="Escrow هنوز برای تراکنش واقعی فعال نیست"
        description="منطق محاسبه کارمزد و مرحله بعد پیاده‌سازی شده؛ درگاه پرداخت و آزادسازی وجه در فاز بعد وصل می‌شود."
        phaseLabel="به‌زودی — خارج از محدوده MVP"
        primaryHref="/items/vintage-denim-jacket"
        primaryLabel="بازگشت به آیتم نمونه"
        secondaryHref="/feed"
        secondaryLabel="فید کشف"
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metric title="قیمت آیتم" value={formatToman(breakdown.itemPrice)} />
        <Metric title="کارمزد پلتفرم" value={formatToman(breakdown.platformFee)} />
        <Metric title="پرداخت خریدار" value={formatToman(breakdown.buyerTotal)} />
        <Metric title="مرحله بعد" value={nextStatus === "RELEASED" ? "آزادسازی وجه" : String(nextStatus)} />
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
