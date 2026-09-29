import { listItems, itemSearchSchema } from "@/lib/items";

export default async function SearchPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const raw = Object.fromEntries(Object.entries(searchParams).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value]));
  const filters = itemSearchSchema.parse(raw);
  const items = await listItems(filters);

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-stone-50">
      <section className="mx-auto max-w-6xl space-y-6">
        <a className="text-sm text-stone-400 transition hover:text-white" href="/">بازگشت به تیپت</a>
        <form className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 md:p-10" action="/search"><p className="text-sm font-black text-amber-200">جست‌وجو و فیلتر پایه</p><h1 className="mt-3 text-4xl font-black">آگهی‌های فعال را پیدا کن</h1><div className="mt-6 grid gap-3 md:grid-cols-4"><input name="q" defaultValue={filters.q} placeholder="جست‌وجو" className="rounded-2xl bg-white/10 px-4 py-3" /><input name="city" defaultValue={filters.city} placeholder="شهر" className="rounded-2xl bg-white/10 px-4 py-3" /><input name="category" defaultValue={filters.category} placeholder="دسته" className="rounded-2xl bg-white/10 px-4 py-3" /><input name="maxPrice" defaultValue={filters.maxPrice} type="number" placeholder="حداکثر قیمت" className="rounded-2xl bg-white/10 px-4 py-3" /></div><button className="mt-4 rounded-2xl bg-amber-300 px-5 py-3 font-black text-slate-950">اعمال فیلتر</button></form>
        {items.length === 0 ? <p className="rounded-3xl border border-dashed border-white/15 p-10 text-center text-stone-300">آگهی مطابق فیلترها پیدا نشد.</p> : <div className="grid gap-4 md:grid-cols-2">{items.map((item) => <a key={item.id} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 transition hover:bg-white/[0.1]" href={`/items/${item.id}`}><h2 className="font-black">{item.title}</h2><p className="mt-2 text-sm text-stone-400">{item.category.name} · {item.size ?? "سایز ثبت نشده"} · {item.condition}</p><p className="mt-4 font-bold">{item.price.toLocaleString("fa-IR")} تومان</p></a>)}</div>}
      </section>
    </main>
  );
}
