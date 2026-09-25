import { normalizeIngestionCandidate } from "@/lib/ingestion";

const candidate = normalizeIngestionCandidate({
  source: "divar",
  sourceUrl: "https://example.com/listing",
  title: "کت جین وینتیج",
  price: 1480000,
  city: "تهران",
  hasPermission: true,
});

export default function IngestionPage() {
  return (
    <main className="min-h-screen bg-[#070a12] px-5 py-8 text-stone-50">
      <section className="mx-auto max-w-5xl space-y-6">
        <a className="text-sm text-stone-400 transition hover:text-white" href="/">بازگشت به تیپت</a>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 md:p-10">
          <p className="text-sm font-black text-amber-200">Ingestion با مجوز</p>
          <h1 className="mt-3 text-4xl font-black">ورود آگهی از کانال‌های دیگر برای بازبینی.</h1>
          <p className="mt-4 leading-8 text-stone-300">آگهی فقط وقتی وارد صف استانداردسازی می‌شود که مجوز منبع تأیید شده باشد؛ سپس به مدل Item نزدیک می‌شود.</p>
        </div>
        <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
          <span className="rounded-full bg-amber-300 px-3 py-1 text-sm font-black text-slate-950">در انتظار بازبینی</span>
          <h2 className="mt-5 text-2xl font-black">{candidate.title}</h2>
          <p className="mt-2 text-stone-400">{candidate.city} · {candidate.price.toLocaleString("fa-IR")} تومان · منبع: {candidate.source}</p>
          <p className="mt-4 text-sm text-stone-500">پس از بازبینی، دسته، وضعیت، سایز و برچسب‌های سبک توسط فروشنده تأیید می‌شوند.</p>
        </article>
      </section>
    </main>
  );
}
