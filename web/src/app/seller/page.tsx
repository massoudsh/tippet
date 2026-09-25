import { calculateSellerTrustScore, summarizeSellerItems } from "@/lib/seller";

const items = [
  { id: "1", title: "کت جین وینتیج", price: 1480000, status: "ACTIVE" as const, completeness: 92, views: 184, contacts: 12 },
  { id: "2", title: "هودی استریت‌ویر", price: 920000, status: "RESERVED" as const, completeness: 86, views: 96, contacts: 6 },
  { id: "3", title: "بارانی زعفرانی", price: 2100000, status: "SOLD" as const, completeness: 94, views: 220, contacts: 19 },
];

const summary = summarizeSellerItems(items);
const trustScore = calculateSellerTrustScore(items);

const statusLabel = {
  ACTIVE: "فعال",
  RESERVED: "رزرو شده",
  SOLD: "فروخته‌شده",
  REMOVED: "حذف‌شده",
};

export default function SellerPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-stone-50">
      <section className="mx-auto max-w-6xl space-y-8">
        <a className="text-sm text-stone-400 transition hover:text-white" href="/">بازگشت به تیپت</a>
        <div className="grid gap-4 md:grid-cols-5">
          <Metric title="آگهی فعال" value={summary.active.toLocaleString("fa-IR")} />
          <Metric title="فروخته‌شده" value={summary.sold.toLocaleString("fa-IR")} />
          <Metric title="درخواست تماس" value={summary.contacts.toLocaleString("fa-IR")} />
          <Metric title="کامل‌بودن" value={`${summary.averageCompleteness.toLocaleString("fa-IR")}٪`} />
          <Metric title="امتیاز اعتماد" value={`${trustScore.toLocaleString("fa-IR")}٪`} />
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20">
          <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-black text-amber-200">پنل ساده فروشنده</p>
              <h1 className="mt-2 text-3xl font-black">مدیریت آگهی‌ها و وضعیت فروش</h1>
            </div>
            <button className="rounded-2xl bg-amber-300 px-5 py-3 font-black text-slate-950">ثبت آگهی جدید</button>
          </div>
          <div className="overflow-hidden rounded-3xl border border-white/10">
            {items.map((item) => (
              <article key={item.id} className="grid gap-3 border-b border-white/10 bg-white/[0.04] p-4 last:border-b-0 md:grid-cols-[1fr_auto_auto_auto] md:items-center">
                <div>
                  <h2 className="font-black">{item.title}</h2>
                  <p className="mt-1 text-sm text-stone-400">{item.price.toLocaleString("fa-IR")} تومان</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-stone-200">{statusLabel[item.status]}</span>
                <span className="text-sm text-stone-300">{item.views.toLocaleString("fa-IR")} بازدید</span>
                <span className="text-sm text-amber-100">{item.contacts.toLocaleString("fa-IR")} تماس</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Metric({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-5">
      <p className="text-sm text-stone-400">{title}</p>
      <p className="mt-2 text-2xl font-black">{value}</p>
    </div>
  );
}
