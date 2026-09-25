import { calculateEscrowBreakdown, nextEscrowStatus } from "@/lib/escrow";

const breakdown = calculateEscrowBreakdown({ itemPrice: 1480000, platformFeeRate: 0.05, status: "HELD" });
const nextStatus = nextEscrowStatus("HELD", "CONFIRM_DELIVERY");

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-[#070a12] px-5 py-8 text-stone-50">
      <section className="mx-auto max-w-5xl space-y-6">
        <a className="text-sm text-stone-400 transition hover:text-white" href="/items/vintage-denim-jacket">بازگشت به آیتم</a>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 md:p-10">
          <p className="text-sm font-black text-amber-200">پرداخت امن داخلی</p>
          <h1 className="mt-3 text-4xl font-black leading-tight">وجه تا تأیید تحویل نزد تیپت نگه داشته می‌شود.</h1>
          <p className="mt-4 leading-8 text-stone-300">خریدار پرداخت می‌کند، مبلغ در وضعیت امن می‌ماند و بعد از تأیید تحویل برای فروشنده آزاد می‌شود.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <Metric title="قیمت آیتم" value={`${breakdown.itemPrice.toLocaleString("fa-IR")} تومان`} />
          <Metric title="کارمزد پلتفرم" value={`${breakdown.platformFee.toLocaleString("fa-IR")} تومان`} />
          <Metric title="پرداخت خریدار" value={`${breakdown.buyerTotal.toLocaleString("fa-IR")} تومان`} />
          <Metric title="مرحله بعد" value={nextStatus === "RELEASED" ? "آزادسازی وجه" : nextStatus} />
        </div>
      </section>
    </main>
  );
}

function Metric({ title, value }: { title: string; value: string }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
      <p className="text-sm text-stone-400">{title}</p>
      <p className="mt-3 text-xl font-black">{value}</p>
    </article>
  );
}
