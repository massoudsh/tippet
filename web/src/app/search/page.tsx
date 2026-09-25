import { catalogItems } from "@/lib/catalog";
import { filterCatalogItems } from "@/lib/search";

const results = filterCatalogItems(catalogItems, { city: "تهران", maxPrice: 2000000 });

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-stone-50">
      <section className="mx-auto max-w-6xl space-y-6">
        <a className="text-sm text-stone-400 transition hover:text-white" href="/">بازگشت به تیپت</a>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 md:p-10">
          <p className="text-sm font-black text-amber-200">جست‌وجو و فیلتر پایه</p>
          <h1 className="mt-3 text-4xl font-black">فیلتر بر اساس شهر، سایز، قیمت و دسته</h1>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {["تهران", "زیر ۲ میلیون", "سایز M", "وینتیج"].map((filter) => (
              <span key={filter} className="rounded-2xl bg-white/10 px-4 py-3 text-sm text-stone-200">{filter}</span>
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {results.map((item) => (
            <a key={item.id} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 transition hover:bg-white/[0.1]" href={`/items/${item.id}`}>
              <h2 className="font-black">{item.title}</h2>
              <p className="mt-2 text-sm text-stone-400">{item.category} · {item.size} · {item.condition}</p>
              <p className="mt-4 font-bold">{item.price.toLocaleString("fa-IR")} تومان</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
