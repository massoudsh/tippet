import { calculateRevenue } from "@/lib/revenue";

const revenue = calculateRevenue({
  itemPrice: 2100000,
  commissionRate: 0.08,
  premiumListingFee: 50000,
  premiumEnabled: true,
});

export default function RevenuePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-stone-50">
      <section className="mx-auto max-w-5xl space-y-6">
        <a className="text-sm text-stone-400 transition hover:text-white" href="/">بازگشت به تیپت</a>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 md:p-10">
          <p className="text-sm font-black text-amber-200">مدل درآمدی</p>
          <h1 className="mt-3 text-4xl font-black leading-tight">کمیسیون فروش موفق به‌همراه خدمات ویژه فروشنده.</h1>
          <p className="mt-4 leading-8 text-stone-300">در نسخه تجاری، درآمد از کمیسیون تراکنش و ابزارهای دیده‌شدن بیشتر برای فروشنده‌های منتخب محاسبه می‌شود.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <Metric title="کمیسیون" value={`${revenue.commission.toLocaleString("fa-IR")} تومان`} />
          <Metric title="خدمات ویژه" value={`${revenue.premiumFee.toLocaleString("fa-IR")} تومان`} />
          <Metric title="درآمد کل" value={`${revenue.totalRevenue.toLocaleString("fa-IR")} تومان`} />
          <Metric title="دریافتی فروشنده" value={`${revenue.sellerNet.toLocaleString("fa-IR")} تومان`} />
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
