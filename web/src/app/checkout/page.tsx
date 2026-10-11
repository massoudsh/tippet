import { ComingSoonBanner } from "@/components/coming-soon-banner";

const steps = [
  { title: "مرور سفارش", description: "آیتم و مبلغ نهایی را بررسی کن." },
  { title: "روش پرداخت", description: "پرداخت آنلاین در فاز ۳ فعال می‌شود." },
  { title: "تأیید و پیگیری", description: "پس از راه‌اندازی، وضعیت سفارش اینجا نمایش داده می‌شود." },
];

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-[#070a12] px-5 py-8 text-stone-50 sm:py-12">
      <section className="mx-auto max-w-3xl space-y-6">
        <a className="inline-flex text-sm text-stone-400 underline-offset-4 transition hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300" href="/items/vintage-denim-jacket">
          بازگشت به صفحهٔ آیتم
        </a>

        <header className="space-y-4 rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 md:p-8">
          <p className="text-sm font-black text-amber-200">خرید آیتم</p>
          <h1 className="text-3xl font-black leading-tight md:text-4xl">پرداخت این سفارش هنوز آماده نیست.</h1>
          <p className="max-w-2xl leading-8 text-stone-300">برای این آیتم هنوز پرداخت، نگه‌داری وجه یا ثبت سفارش انجام نمی‌شود. تا زمان فعال‌شدن این قابلیت، هماهنگی را با فروشنده ادامه بده.</p>
          <ComingSoonBanner feature="پرداخت داخلی" />
        </header>

        <ol aria-label="مراحل پرداخت" className="grid gap-3 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm font-black text-amber-200">{(index + 1).toLocaleString("fa-IR")}</span>
              <h2 className="mt-4 font-black">{step.title}</h2>
              <p className="mt-2 text-sm leading-6 text-stone-400">{step.description}</p>
            </li>
          ))}
        </ol>

        <section aria-labelledby="order-summary" className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 id="order-summary" className="text-xl font-black">خلاصهٔ سفارش</h2>
              <p className="mt-2 text-stone-300">کت جین وینتیج</p>
            </div>
            <p className="text-xl font-black">۱٬۴۸۰٬۰۰۰ تومان</p>
          </div>
          <p className="mt-5 text-sm leading-7 text-stone-400">مبلغ بالا فقط قیمت نمایشی آیتم است؛ اکنون هیچ تراکنشی انجام نمی‌شود.</p>
          <button type="button" disabled className="mt-6 w-full cursor-not-allowed rounded-2xl bg-stone-700 px-5 py-3 font-black text-stone-400" aria-describedby="payment-unavailable">
            پرداخت در فاز ۳ فعال می‌شود
          </button>
          <p id="payment-unavailable" className="mt-3 text-center text-sm text-stone-500">برای هماهنگی خرید، با فروشنده گفتگو کن.</p>
        </section>

        <div className="flex flex-wrap gap-3">
          <a className="rounded-2xl bg-amber-300 px-5 py-3 font-black text-slate-950 transition hover:bg-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300" href="/chat">گفتگو با فروشنده</a>
          <a className="rounded-2xl border border-white/15 px-5 py-3 font-bold transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300" href="/items/vintage-denim-jacket">بازگشت به آیتم</a>
        </div>
      </section>
    </main>
  );
}
