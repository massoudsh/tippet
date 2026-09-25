import { suggestItemAttributes } from "@/lib/itemDraft";

const suggestion = suggestItemAttributes({
  title: "کت جین آبی",
  description: "کت سالم سایز M مناسب استریت‌ویر با چند عکس واضح و توضیح کامل فروشنده.",
  imageCount: 4,
});

export default function NewSellerItemPage() {
  return (
    <main className="min-h-screen bg-[#070a12] px-5 py-8 text-stone-50">
      <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 md:p-10">
          <a className="text-sm text-stone-400 transition hover:text-white" href="/seller">بازگشت به پنل فروشنده</a>
          <p className="mt-8 text-sm font-black text-amber-200">ثبت آیتم با پیشنهاد خودکار</p>
          <h1 className="mt-3 text-4xl font-black leading-tight">فروشنده عکس و توضیح می‌دهد، تیپت فیلدها را پیشنهاد می‌کند.</h1>
          <p className="mt-4 leading-8 text-stone-300">فروشنده قبل از انتشار، دسته، رنگ، وضعیت، سایز و کامل‌بودن آگهی را تأیید یا اصلاح می‌کند.</p>
        </div>
        <div className="rounded-[2rem] bg-stone-50 p-5 text-slate-950 md:p-8">
          <label className="text-sm font-bold" htmlFor="title">عنوان</label>
          <input id="title" className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3" defaultValue="کت جین آبی" />
          <label className="mt-4 block text-sm font-bold" htmlFor="description">توضیح آزاد</label>
          <textarea id="description" className="mt-2 h-28 w-full rounded-2xl border border-slate-200 px-4 py-3" defaultValue="کت سالم سایز M مناسب استریت‌ویر با چند عکس واضح و توضیح کامل فروشنده." />
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <Suggestion title="دسته" value={suggestion.category} />
            <Suggestion title="رنگ" value={suggestion.color} />
            <Suggestion title="وضعیت" value={suggestion.condition} />
            <Suggestion title="سایز" value={suggestion.size} />
          </div>
          <div className="mt-4 rounded-3xl bg-amber-300 p-5">
            <p className="text-sm font-bold">امتیاز کامل‌بودن آگهی</p>
            <p className="mt-2 text-4xl font-black">{suggestion.completeness.toLocaleString("fa-IR")}٪</p>
          </div>
        </div>
      </section>
    </main>
  );
}

function Suggestion({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-100 p-4">
      <p className="text-xs text-slate-500">{title}</p>
      <p className="mt-1 font-black">{value}</p>
    </div>
  );
}
