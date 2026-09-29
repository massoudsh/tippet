import { getSessionUser } from "@/lib/auth";
import { listItems } from "@/lib/items";
import { prisma } from "@/lib/prisma";

export default async function FeedPage() {
  const user = await getSessionUser();
  const [items, profile] = await Promise.all([
    listItems({}),
    user ? prisma.styleProfile.findUnique({ where: { userId: user.id } }) : null,
  ]);
  const rankedItems = items.map((item) => ({ item, score: scoreItem(item, profile) })).sort((a, b) => b.score - a.score);

  return (
    <main className="min-h-screen bg-[#070a12] px-5 py-8 text-stone-50">
      <section className="mx-auto max-w-6xl space-y-6">
        <a className="text-sm text-stone-400 transition hover:text-white" href="/">بازگشت به تیپت</a>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/20 md:p-10"><p className="text-sm font-black text-amber-200">AI Discovery</p><h1 className="mt-3 text-4xl font-black">فید کشف هوشمند</h1><p className="mt-4 leading-8 text-stone-300">آیتم‌ها از آگهی‌های فعال مرتب می‌شوند؛ با تکمیل پروفایل، رنگ، دسته و بودجه در رتبه‌بندی اثر می‌گذارند.</p></div>
        {rankedItems.length === 0 ? <EmptyState /> : <div className="grid gap-4 md:grid-cols-3">{rankedItems.map(({ item, score }) => <article key={item.id} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5"><span className="rounded-full bg-amber-300 px-3 py-1 text-sm font-black text-slate-950">{score.toLocaleString("fa-IR")}٪ تطابق</span><h2 className="mt-5 text-xl font-black">{item.title}</h2><p className="mt-2 text-sm text-stone-400">{item.category.name} · {item.size ?? "سایز ثبت نشده"} · {item.city}</p><p className="mt-4 font-bold">{item.price.toLocaleString("fa-IR")} تومان</p><a className="mt-5 inline-flex rounded-2xl border border-white/10 px-4 py-2 text-sm text-stone-200" href={`/items/${item.id}`}>مشاهده آیتم</a></article>)}</div>}
      </section>
    </main>
  );
}

function scoreItem(item: Awaited<ReturnType<typeof listItems>>[number], profile: Awaited<ReturnType<typeof prisma.styleProfile.findUnique>>) {
  if (!profile) return 50;
  const sizes = Array.isArray((profile.sizeInfo as { sizes?: unknown } | null)?.sizes) ? (profile.sizeInfo as { sizes: string[] }).sizes : [];
  return Math.min(100, 30 + (profile.preferredCategories.includes(item.category.name) ? 25 : 0) + (item.color && profile.preferredColors.includes(item.color) ? 20 : 0) + (item.size && sizes.includes(item.size) ? 15 : 0) + (!profile.budgetMax || item.price <= profile.budgetMax ? 10 : 0));
}

function EmptyState() { return <div className="rounded-3xl border border-dashed border-white/15 p-10 text-center text-stone-300"><p className="text-xl font-black">هنوز آگهی فعالی وجود ندارد.</p><a className="mt-4 inline-flex rounded-2xl bg-amber-300 px-4 py-2 font-bold text-slate-950" href="/seller/new">اولین آگهی را ثبت کن</a></div>; }
