import { catalogItems } from "@/lib/catalog";
import { rankItemsForStyleProfile } from "@/lib/recommendation";

const item = catalogItems.find((catalogItem) => catalogItem.id === "vintage-denim-jacket")!;
const match = rankItemsForStyleProfile([item], {
  categories: ["کت"],
  colors: ["آبی"],
  sizes: ["M"],
  tags: ["وینتیج", "استریت‌ویر"],
  maxPrice: 2000000,
})[0].score;

export default function ItemPage() {
  return (
    <main className="min-h-screen bg-[#070a12] px-5 py-8 text-stone-50">
      <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-sky-200 via-slate-200 to-zinc-300 p-5 shadow-2xl shadow-black/20">
          <div className="h-96 rounded-[1.5rem] border border-white/50 bg-white/30" />
        </div>
        <div className="space-y-5 rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 md:p-8">
          <a className="text-sm text-stone-400 transition hover:text-white" href="/feed">بازگشت به فید</a>
          <span className="inline-flex rounded-full bg-amber-300 px-3 py-1 text-sm font-black text-slate-950">{match.toLocaleString("fa-IR")}٪ به سلیقه تو نزدیک است</span>
          <h1 className="text-4xl font-black">{item.title}</h1>
          <p className="leading-8 text-stone-300">{item.category} {item.brand ? `برند ${item.brand}` : ""} با وضعیت {item.condition}، مناسب استایل وینتیج و استریت‌ویر.</p>
          <div className="grid gap-3 md:grid-cols-2">
            <Info title="سایز" value={item.size} />
            <Info title="رنگ" value={item.color} />
            <Info title="شهر" value={item.city} />
            <Info title="قیمت" value={`${item.price.toLocaleString("fa-IR")} تومان`} />
          </div>
          <div className="rounded-3xl bg-white/10 p-5">
            <h2 className="font-black">فروشنده</h2>
            <p className="mt-2 text-stone-300">{item.seller.name} · عضویت از {item.seller.joinedAt} · {item.seller.activeItems.toLocaleString("fa-IR")} آگهی فعال</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {item.seller.contactLinks.whatsapp && <a className="rounded-2xl bg-emerald-300 px-4 py-2 font-bold text-slate-950" href={item.seller.contactLinks.whatsapp}>تماس واتساپ</a>}
              {item.seller.contactLinks.telegram && <a className="rounded-2xl bg-sky-300 px-4 py-2 font-bold text-slate-950" href={item.seller.contactLinks.telegram}>پیام تلگرام</a>}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Info({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <p className="text-xs text-stone-400">{title}</p>
      <p className="mt-1 font-black">{value}</p>
    </div>
  );
}
