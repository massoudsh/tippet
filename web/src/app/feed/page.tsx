import { catalogItems } from "@/lib/catalog";
import { getRecommendedItems } from "@/lib/recommendation";

export default async function FeedPage() {
  const recommendations = await getRecommendedItems("demo-user");
  const rankedItems = recommendations.map((rec) => ({
    ...catalogItems.find((item) => item.id === rec.itemId)!,
    score: rec.score,
  }));

  return (
    <main className="min-h-screen bg-[#070a12] px-5 py-8 text-stone-50">
      <section className="mx-auto max-w-6xl space-y-6">
        <a className="text-sm text-stone-400 transition hover:text-white" href="/">بازگشت به تیپت</a>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/20 md:p-10">
          <p className="text-sm font-black text-amber-200">AI Discovery</p>
          <h1 className="mt-3 text-4xl font-black">فید کشف هوشمند</h1>
          <p className="mt-4 leading-8 text-stone-300">آیتم‌ها با تطابق سلیقه، بودجه، رنگ، سایز و برچسب‌های سبک مرتب شده‌اند.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {rankedItems.map((item) => (
            <article key={item.id} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
              <span className="rounded-full bg-amber-300 px-3 py-1 text-sm font-black text-slate-950">{item.score.toLocaleString("fa-IR")}٪ تطابق</span>
              <h2 className="mt-5 text-xl font-black">{item.title}</h2>
              <p className="mt-2 text-sm text-stone-400">{item.category} · {item.size} · {item.city}</p>
              <p className="mt-4 font-bold">{item.price.toLocaleString("fa-IR")} تومان</p>
              <a className="mt-5 inline-flex rounded-2xl border border-white/10 px-4 py-2 text-sm text-stone-200 transition hover:text-white" href={`/items/${item.id}`}>مشاهده آیتم</a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
