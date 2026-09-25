import { rankExpansionMarkets, scoreExpansionMarket } from "@/lib/expansion";

const markets = rankExpansionMarkets([
  { city: "اصفهان", category: "استریت‌ویر", supplyCount: 90, demandScore: 80, trustReadiness: 70 },
  { city: "شیراز", category: "وینتیج", supplyCount: 60, demandScore: 70, trustReadiness: 50 },
  { city: "رشت", category: "کت و بارانی", supplyCount: 48, demandScore: 62, trustReadiness: 55 },
]);

export default function ExpansionPage() {
  return (
    <main className="min-h-screen bg-[#070a12] px-5 py-8 text-stone-50">
      <section className="mx-auto max-w-6xl space-y-6">
        <a className="text-sm text-stone-400 transition hover:text-white" href="/">بازگشت به تیپت</a>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 md:p-10">
          <p className="text-sm font-black text-amber-200">مقیاس‌پذیری بازار</p>
          <h1 className="mt-3 text-4xl font-black leading-tight">اولویت‌بندی شهرها و دسته‌های بعدی بر اساس عرضه، تقاضا و آمادگی اعتماد.</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {markets.map((market) => (
            <article key={`${market.city}-${market.category}`} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
              <p className="text-sm text-stone-400">{market.category}</p>
              <h2 className="mt-2 text-2xl font-black">{market.city}</h2>
              <p className="mt-6 text-4xl font-black text-amber-200">{scoreExpansionMarket(market).toLocaleString("fa-IR")}</p>
              <p className="mt-2 text-sm text-stone-400">امتیاز ورود به بازار</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
