const steps = [
  "شماره موبایل را وارد کن.",
  "کد ۶ رقمی پیامک‌شده را ثبت کن.",
  "بعد از تأیید، پروفایل سلیقه یا پنل فروشنده باز می‌شود.",
];

export default function AuthPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-stone-50">
      <section className="mx-auto grid max-w-5xl gap-8 rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/20 md:grid-cols-[0.9fr_1.1fr] md:p-10">
        <div className="space-y-5">
          <a className="text-sm text-stone-400 transition hover:text-white" href="/">بازگشت به تیپت</a>
          <p className="text-sm font-black text-amber-200">ورود امن با موبایل</p>
          <h1 className="text-4xl font-black leading-tight">احراز هویت OTP برای خریدار و فروشنده.</h1>
          <p className="leading-8 text-stone-300">
            در MVP، ورود با شماره موبایل طراحی شده تا کاربر بدون رمز عبور وارد شود و مسیر خرید یا ثبت آگهی را سریع ادامه دهد.
          </p>
        </div>
        <div className="rounded-[1.5rem] bg-stone-50 p-5 text-slate-950">
          <label className="text-sm font-bold" htmlFor="phone">شماره موبایل</label>
          <input id="phone" className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-left" dir="ltr" placeholder="09121234567" />
          <button className="mt-4 w-full rounded-2xl bg-slate-950 px-5 py-3 font-black text-white">دریافت کد تأیید</button>
          <div className="mt-6 space-y-3">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center gap-3 rounded-2xl bg-slate-100 p-3 text-sm text-slate-700">
                <span className="flex size-8 items-center justify-center rounded-xl bg-amber-300 font-black text-slate-950">{index + 1}</span>
                {step}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
