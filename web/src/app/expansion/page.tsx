import { InteractionType, ItemStatus } from "@prisma/client";
import { rankExpansionMarkets, scoreExpansionMarket, type ExpansionMarket } from "@/lib/expansion";
import { prisma } from "@/lib/prisma";

export default async function ExpansionPage() {
  const [activeItems, interactions] = await Promise.all([
    prisma.item.findMany({
      where: { status: ItemStatus.ACTIVE },
      select: { city: true, category: { select: { name: true } }, sellerId: true },
    }),
    prisma.interaction.findMany({
      where: { type: { in: [InteractionType.VIEW, InteractionType.LIKE, InteractionType.CONTACT_SELLER] } },
      select: { item: { select: { city: true, category: { select: { name: true } } } } },
    }),
  ]);

  const markets = new Map<string, ExpansionMarket & { sellerIds: Set<string> }>();
  for (const item of activeItems) {
    const key = `${item.city}\u0000${item.category.name}`;
    const market = markets.get(key) ?? { city: item.city, category: item.category.name, supplyCount: 0, demandCount: 0, sellerCount: 0, sellerIds: new Set<string>() };
    market.supplyCount += 1;
    market.sellerIds.add(item.sellerId);
    market.sellerCount = market.sellerIds.size;
    markets.set(key, market);
  }
  for (const interaction of interactions) {
    const key = `${interaction.item.city}\u0000${interaction.item.category.name}`;
    const market = markets.get(key);
    if (market) market.demandCount += 1;
  }
  const rankedMarkets = rankExpansionMarkets([...markets.values()]).slice(0, 9);

  return (
    <main className="min-h-screen bg-[#070a12] px-5 py-8 text-stone-50">
      <section className="mx-auto max-w-6xl space-y-6">
        <a className="text-sm text-stone-400 transition hover:text-white" href="/">بازگشت به تیپت</a>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 md:p-10">
          <p className="text-sm font-black text-amber-200">مقیاس‌پذیری بازار</p>
          <h1 className="mt-3 text-4xl font-black leading-tight">اولویت بازارها بر اساس عرضه، تعامل و فروشندهٔ فعال.</h1>
          <p className="mt-4 max-w-3xl leading-8 text-stone-300">امتیاز از دادهٔ زنده محاسبه می‌شود: ۵۰٪ عرضهٔ فعال، ۳۵٪ تعامل ثبت‌شده و ۱۵٪ فروشندهٔ دارای عرضه.</p>
        </div>
        {rankedMarkets.length ? (
          <div className="grid gap-4 md:grid-cols-3">
            {rankedMarkets.map((market) => (
              <article key={`${market.city}-${market.category}`} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
                <p className="text-sm text-stone-400">{market.category} · {market.city}</p>
                <p className="mt-6 text-4xl font-black text-amber-200">{scoreExpansionMarket(market).toLocaleString("fa-IR")}</p>
                <p className="mt-2 text-sm text-stone-400">امتیاز ورود به بازار</p>
                <dl className="mt-5 grid grid-cols-3 gap-2 text-center text-xs"><div><dt className="text-stone-500">عرضه</dt><dd className="mt-1 font-black">{market.supplyCount.toLocaleString("fa-IR")}</dd></div><div><dt className="text-stone-500">تعامل</dt><dd className="mt-1 font-black">{market.demandCount.toLocaleString("fa-IR")}</dd></div><div><dt className="text-stone-500">فروشنده</dt><dd className="mt-1 font-black">{market.sellerCount.toLocaleString("fa-IR")}</dd></div></dl>
                <p className="mt-5 text-xs font-bold text-emerald-300">زنده</p>
              </article>
            ))}
          </div>
        ) : <p className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 text-stone-400">هنوز عرضهٔ فعال برای محاسبهٔ اولویت بازار وجود ندارد.</p>}
      </section>
    </main>
  );
}
