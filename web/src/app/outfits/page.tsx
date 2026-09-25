import { catalogItems } from "@/lib/catalog";
import { buildSimpleOutfit } from "@/lib/outfit";

const outfit = buildSimpleOutfit(catalogItems[0], catalogItems);

export default function OutfitsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-stone-50">
      <section className="mx-auto max-w-6xl space-y-6">
        <a className="text-sm text-stone-400 transition hover:text-white" href="/">بازگشت به تیپت</a>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 md:p-10">
          <p className="text-sm font-black text-amber-200">Outfit Builder ساده</p>
          <h1 className="mt-3 text-4xl font-black">ست پیشنهادی بر اساس یک آیتم anchor</h1>
          <p className="mt-4 leading-8 text-stone-300">در فاز فعلی، یک آیتم اصلی انتخاب و دو آیتم مکمل از همان فید پیشنهاد می‌شود.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[outfit.anchor, ...outfit.complements].map((item, index) => (
            <article key={item.id} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-stone-200">{index === 0 ? "آیتم اصلی" : "مکمل"}</span>
              <h2 className="mt-5 text-xl font-black">{item.title}</h2>
              <p className="mt-2 text-sm text-stone-400">{item.category} · {item.color} · {item.size}</p>
              <p className="mt-4 font-bold">{item.price.toLocaleString("fa-IR")} تومان</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
