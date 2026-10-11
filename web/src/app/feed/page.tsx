import { getSessionUser } from "@/lib/auth";
import { listItems } from "@/lib/items";
import { prisma } from "@/lib/prisma";
import { rankDiscoveryItems } from "@/lib/recommendation";

export default async function FeedPage() {
  const user = await getSessionUser();
  const [items, profile] = await Promise.all([
    listItems({}),
    user ? prisma.styleProfile.findUnique({ where: { userId: user.id } }) : null,
  ]);
  const sizes = Array.isArray((profile?.sizeInfo as { sizes?: unknown } | null)?.sizes)
    ? (profile?.sizeInfo as { sizes: string[] }).sizes
    : [];
  const scores = new Map(rankDiscoveryItems(items.map((item) => ({
    id: item.id,
    category: item.category.name,
    color: item.color,
    size: item.size,
    price: item.price,
    createdAt: item.createdAt,
  })), {
    preferredCategories: profile?.preferredCategories ?? [],
    preferredColors: profile?.preferredColors ?? [],
    sizes,
    budgetMin: profile?.budgetMin,
    budgetMax: profile?.budgetMax,
  }).map((entry) => [entry.itemId, entry.score]));
  const rankedItems = [...items].sort((a, b) => (scores.get(b.id) ?? 0) - (scores.get(a.id) ?? 0) || b.createdAt.getTime() - a.createdAt.getTime() || a.id.localeCompare(b.id));

  return (
    <main className="min-h-screen bg-[#070a12] px-5 py-8 text-stone-50">
      <section className="mx-auto max-w-6xl space-y-6">
        <a className="text-sm text-stone-400 transition hover:text-white" href="/">بازگشت به تیپت</a>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/20 md:p-10"><p className="text-sm font-black text-amber-200">AI Discovery</p><h1 className="mt-3 text-4xl font-black">فید کشف هوشمند</h1><p className="mt-4 leading-8 text-stone-300">آیتم‌ها بر پایهٔ دسته، رنگ و سایز دلخواه، تناسب بودجه و تازگی آگهی مرتب می‌شوند.</p></div>
        {rankedItems.length === 0 ? <EmptyState /> : <div className="grid gap-4 md:grid-cols-3">{rankedItems.map((item) => <article key={item.id} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5"><span className="rounded-full bg-amber-300 px-3 py-1 text-sm font-black text-slate-950">{(scores.get(item.id) ?? 0).toLocaleString("fa-IR")}٪ امتیاز کشف</span><h2 className="mt-5 text-xl font-black">{item.title}</h2><p className="mt-2 text-sm text-stone-400">{item.category.name} · {item.size ?? "سایز ثبت نشده"} · {item.city}</p><p className="mt-4 font-bold">{item.price.toLocaleString("fa-IR")} تومان</p><a className="mt-5 inline-flex rounded-2xl border border-white/10 px-4 py-2 text-sm text-stone-200" href={`/items/${item.id}`}>مشاهده آیتم</a></article>)}</div>}
      </section>
    </main>
  );
}

function EmptyState() { return <div className="rounded-3xl border border-dashed border-white/15 p-10 text-center text-stone-300"><p className="text-xl font-black">هنوز آگهی فعالی وجود ندارد.</p><a className="mt-4 inline-flex rounded-2xl bg-amber-300 px-4 py-2 font-bold text-slate-950" href="/seller/new">اولین آگهی را ثبت کن</a></div>; }
