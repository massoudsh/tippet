import { InteractionType, ItemStatus } from "@prisma/client";
import { formatPercent } from "@/lib/metrics";
import { prisma } from "@/lib/prisma";

export default async function MetricsPage() {
  const [itemCount, userCount, categoryCount, statusCounts, interactionCounts, categories] = await Promise.all([
    prisma.item.count(),
    prisma.user.count(),
    prisma.category.count(),
    prisma.item.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.interaction.groupBy({ by: ["type"], _count: { _all: true } }),
    prisma.category.findMany({
      select: { name: true, _count: { select: { items: true } } },
      orderBy: { items: { _count: "desc" } },
      take: 8,
    }),
  ]);

  const countByStatus = new Map(statusCounts.map(({ status, _count }) => [status, _count._all]));
  const countByInteraction = new Map(interactionCounts.map(({ type, _count }) => [type, _count._all]));
  const views = countByInteraction.get(InteractionType.VIEW) ?? 0;
  const likes = countByInteraction.get(InteractionType.LIKE) ?? 0;
  const contactClicks = countByInteraction.get(InteractionType.CONTACT_SELLER) ?? 0;
  const activeItems = countByStatus.get(ItemStatus.ACTIVE) ?? 0;
  const soldItems = countByStatus.get(ItemStatus.SOLD) ?? 0;
  const cards = [
    { title: "همهٔ آگهی‌ها", value: itemCount, detail: "تعداد کل آگهی‌های ثبت‌شده" },
    { title: "کاربران", value: userCount, detail: "تعداد کل حساب‌های ثبت‌شده" },
    { title: "آگهی فعال", value: activeItems, detail: "آگهی‌های آمادهٔ نمایش" },
    { title: "آگهی فروخته‌شده", value: soldItems, detail: "آگهی‌هایی با وضعیت فروخته‌شده" },
    { title: "دسته‌بندی‌ها", value: categoryCount, detail: "دسته‌های ثبت‌شده در کاتالوگ" },
    { title: "تعامل با فید", value: formatPercent(views ? likes / views : 0), detail: "پسندیدن نسبت به مشاهده" },
    { title: "تبدیل به تماس", value: formatPercent(views ? contactClicks / views : 0), detail: "تماس با فروشنده نسبت به مشاهده" },
  ];

  return (
    <main className="min-h-screen bg-[#070a12] px-5 py-8 text-stone-50">
      <section className="mx-auto max-w-6xl space-y-8">
        <a className="text-sm text-stone-400 transition hover:text-white" href="/">بازگشت به تیپت</a>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/20 md:p-10">
          <p className="text-sm font-black text-amber-200">داشبورد موفقیت MVP</p>
          <h1 className="mt-3 text-4xl font-black leading-tight">شاخص‌های زندهٔ کشف، اعتماد و تماس.</h1>
          <p className="mt-4 max-w-3xl leading-8 text-stone-300">تمام اعداد این صفحه فقط‌خواندنی و از داده‌های فعلی پایگاه داده محاسبه می‌شوند.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <article key={card.title} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
              <p className="text-sm text-stone-400">{card.title}</p>
              <p className="mt-3 text-3xl font-black">{card.value.toLocaleString("fa-IR")}</p>
              <p className="mt-3 text-sm leading-6 text-stone-400">{card.detail}</p>
              <p className="mt-4 text-xs font-bold text-emerald-300">زنده</p>
            </article>
          ))}
        </div>
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06]">
          <div className="border-b border-white/10 p-5"><h2 className="text-xl font-black">پراکندگی آگهی بر اساس دسته</h2></div>
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="bg-white/[0.04] text-stone-400"><tr><th className="px-5 py-4 font-medium">دسته</th><th className="px-5 py-4 font-medium">تعداد آگهی</th><th className="px-5 py-4 font-medium">وضعیت داده</th></tr></thead>
              <tbody>{categories.map((category) => <tr key={category.name} className="border-t border-white/5"><td className="px-5 py-4 font-bold">{category.name}</td><td className="px-5 py-4">{category._count.items.toLocaleString("fa-IR")}</td><td className="px-5 py-4 text-emerald-300">زنده</td></tr>)}</tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}
