import { calculateMvpMetrics, formatPercent } from "@/lib/metrics";

const metrics = calculateMvpMetrics({
  activeItems: 248,
  feedImpressions: 12400,
  itemClicks: 2110,
  contactClicks: 318,
  likes: 980,
});

const cards = [
  { title: "آگهی فعال", value: metrics.activeItems.toLocaleString("fa-IR"), detail: "تهران، وینتیج و استریت‌ویر" },
  { title: "تعامل با فید", value: formatPercent(metrics.engagementRate), detail: "پسندیدن نسبت به نمایش" },
  { title: "کلیک آیتم", value: formatPercent(metrics.clickThroughRate), detail: "مشاهده آیتم نسبت به نمایش" },
  { title: "تبدیل به تماس", value: formatPercent(metrics.contactConversionRate), detail: "تماس با فروشنده نسبت به مشاهده" },
];

export default function MetricsPage() {
  return (
    <main className="min-h-screen bg-[#070a12] px-5 py-8 text-stone-50">
      <section className="mx-auto max-w-6xl space-y-8">
        <a className="text-sm text-stone-400 transition hover:text-white" href="/">بازگشت به تیپت</a>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/20 md:p-10">
          <p className="text-sm font-black text-amber-200">داشبورد موفقیت MVP</p>
          <h1 className="mt-3 text-4xl font-black leading-tight">شاخص‌های اصلی کشف، اعتماد و تماس.</h1>
          <p className="mt-4 max-w-3xl leading-8 text-stone-300">
            این داشبورد نرخ تعامل فید، تبدیل مشاهده به تماس و حجم عرضه فعال را برای ارزیابی MVP نشان می‌دهد.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {cards.map((card) => (
            <article key={card.title} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
              <p className="text-sm text-stone-400">{card.title}</p>
              <p className="mt-3 text-3xl font-black">{card.value}</p>
              <p className="mt-3 text-sm leading-6 text-stone-400">{card.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
