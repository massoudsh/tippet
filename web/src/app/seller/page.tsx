"use client";

import { useEffect, useState } from "react";

type SellerItemStatus = "ACTIVE" | "RESERVED" | "SOLD" | "REMOVED";
type SellerItem = { id: string; title: string; price: number; status: SellerItemStatus; completeness: number; views: number; contacts: number };
type Summary = { active: number; sold: number; contacts: number; averageCompleteness: number };

const statusLabel: Record<SellerItemStatus, string> = { ACTIVE: "فعال", RESERVED: "رزرو شده", SOLD: "فروخته‌شده", REMOVED: "حذف‌شده" };

export default function SellerPage() {
  const [items, setItems] = useState<SellerItem[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [trustScore, setTrustScore] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const response = await fetch("/api/seller/items");
    const payload = await response.json();
    setLoading(false);
    if (!response.ok) return setMessage(payload.error);
    setItems(payload.items);
    setSummary(payload.summary);
    setTrustScore(payload.trustScore);
  }

  useEffect(() => { void load(); }, []);

  function toggleItem(id: string) {
    setSelected((current) => current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]);
  }

  async function markSelectedSold() {
    if (!selected.length) return setMessage("حداقل یک آگهی را انتخاب کنید.");
    const response = await fetch("/api/seller/items", { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ itemIds: selected, status: "SOLD" }) });
    const payload = await response.json();
    if (!response.ok) return setMessage(payload.error);
    setMessage(`${payload.updated.toLocaleString("fa-IR")} آگهی به‌روزرسانی شد.`);
    setSelected([]);
    await load();
  }

  if (loading) return <PageMessage message="در حال بارگذاری پنل فروشنده..." />;
  if (!summary) return <PageMessage message={message || "پنل فروشنده در دسترس نیست."} />;

  return <main className="min-h-screen bg-slate-950 px-5 py-8 text-stone-50"><section className="mx-auto max-w-6xl space-y-8">
    <a className="text-sm text-stone-400 transition hover:text-white" href="/">بازگشت به تیپت</a>
    <div className="grid gap-4 md:grid-cols-5"><Metric title="آگهی فعال" value={summary.active.toLocaleString("fa-IR")} /><Metric title="فروخته‌شده" value={summary.sold.toLocaleString("fa-IR")} /><Metric title="درخواست تماس" value={summary.contacts.toLocaleString("fa-IR")} /><Metric title="کامل‌بودن" value={`${summary.averageCompleteness.toLocaleString("fa-IR")}٪`} /><Metric title="امتیاز اعتماد" value={`${trustScore.toLocaleString("fa-IR")}٪`} /></div>
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20">
      <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center"><div><p className="text-sm font-black text-amber-200">پنل فروشنده</p><h1 className="mt-2 text-3xl font-black">مدیریت آگهی‌ها و وضعیت فروش</h1></div><a className="rounded-2xl bg-amber-300 px-5 py-3 text-center font-black text-slate-950" href="/seller/new">ثبت آگهی جدید</a></div>
      <div className="mb-5 grid gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-4 md:grid-cols-3"><button onClick={() => setSelected(items.filter((item) => item.status === "ACTIVE").map((item) => item.id))} className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-stone-100">انتخاب آگهی‌های فعال</button><button onClick={markSelectedSold} className="rounded-2xl bg-amber-300 px-4 py-3 text-sm font-black text-slate-950">تغییر گروهی به فروخته‌شده</button><a className="rounded-2xl border border-white/10 px-4 py-3 text-center text-sm font-bold text-stone-100" href="/ingestion">ورود آگهی با مجوز</a></div>
      {message && <p className="mb-4 text-sm text-amber-100">{message}</p>}
      <div className="overflow-hidden rounded-3xl border border-white/10">{items.length === 0 ? <p className="p-8 text-center text-stone-400">هنوز آگهی ثبت نکرده‌اید.</p> : items.map((item) => <article key={item.id} className="grid gap-3 border-b border-white/10 bg-white/[0.04] p-4 last:border-b-0 md:grid-cols-[auto_1fr_auto_auto_auto] md:items-center"><input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggleItem(item.id)} className="size-4 accent-amber-300" /><div><h2 className="font-black">{item.title}</h2><p className="mt-1 text-sm text-stone-400">{item.price.toLocaleString("fa-IR")} تومان · کامل‌بودن {item.completeness.toLocaleString("fa-IR")}٪</p></div><span className="rounded-full bg-white/10 px-3 py-1 text-sm text-stone-200">{statusLabel[item.status]}</span><span className="text-sm text-stone-300">{item.views.toLocaleString("fa-IR")} بازدید</span><span className="text-sm text-amber-100">{item.contacts.toLocaleString("fa-IR")} تماس</span></article>)}</div>
    </div>
  </section></main>;
}

function Metric({ title, value }: { title: string; value: string }) { return <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-5"><p className="text-sm text-stone-400">{title}</p><p className="mt-2 text-2xl font-black">{value}</p></div>; }
function PageMessage({ message }: { message: string }) { return <main className="min-h-screen bg-slate-950 px-5 py-8 text-stone-50"><p className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/[0.06] p-8 text-center">{message}</p></main>; }
