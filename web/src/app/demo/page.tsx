"use client";

import { useEffect, useMemo, useState } from "react";

const steps = [
  { title: "شروع و ورود", description: "با موبایل وارد شو و مسیر شخصی خودت را شروع کن.", href: "/auth", action: "ورود با موبایل", accent: "ورود" },
  { title: "ساخت پروفایل", description: "سایز، رنگ و بودجه را انتخاب کن تا پیشنهادها دقیق‌تر شوند.", href: "/onboarding", action: "ساخت پروفایل", accent: "سلیقه" },
  { title: "کشف آیتم‌ها", description: "فید را ببین و آیتم‌هایی را پیدا کن که به استایل تو نزدیک‌اند.", href: "/feed", action: "دیدن فید", accent: "کشف" },
  { title: "ساخت ست", description: "یک آیتم اصلی انتخاب کن و مکمل‌های پیشنهادی را ببین.", href: "/outfits", action: "ساخت ست", accent: "استایل" },
  { title: "فروشندگی سریع", description: "اگر فروشنده‌ای، آگهی‌ات را با تصویر و جزئیات ثبت کن.", href: "/seller", action: "پنل فروشنده", accent: "فروش" },
  { title: "اندازه‌گیری نتیجه", description: "شاخص‌های زندهٔ کشف، اعتماد و تماس را بررسی کن.", href: "/metrics", action: "دیدن معیارها", accent: "نتیجه" },
] as const;

export default function DemoPage() {
  const [started, setStarted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!started || secondsLeft === 0) return;
    const timer = window.setInterval(() => setSecondsLeft((value) => Math.max(value - 1, 0)), 1000);
    return () => window.clearInterval(timer);
  }, [started, secondsLeft]);

  const progress = useMemo(() => Math.round(((currentStep + 1) / steps.length) * 100), [currentStep]);
  const step = steps[currentStep];

  function startDemo() {
    setStarted(true);
    setSecondsLeft(60);
    setCurrentStep(0);
  }

  function nextStep() {
    setCurrentStep((value) => Math.min(value + 1, steps.length - 1));
  }

  return (
    <main className="min-h-screen bg-[#070a12] px-5 py-8 text-stone-50">
      <section className="mx-auto max-w-5xl space-y-6">
        <a className="text-sm text-stone-400 transition hover:text-white" href="/">بازگشت به تیپت</a>
        <header className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/20 md:p-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
            <div>
              <p className="text-sm font-black text-amber-200">دموی یک‌دقیقه‌ای</p>
              <h1 className="mt-3 text-4xl font-black leading-tight">تیپت را در ۶۰ ثانیه تجربه کن.</h1>
              <p className="mt-4 max-w-2xl leading-8 text-stone-300">با دکمه‌های زیر بین صفحات اصلی حرکت کن؛ هر مرحله یک بخش واقعی از تجربهٔ خریدار یا فروشنده را نشان می‌دهد.</p>
            </div>
            <div className="min-w-32 rounded-3xl border border-amber-200/20 bg-amber-200/10 p-4 text-center">
              <p className="text-xs text-amber-100">زمان باقی‌مانده</p>
              <p className="mt-2 text-4xl font-black text-amber-200">{secondsLeft}</p>
              <p className="text-xs text-stone-400">ثانیه</p>
            </div>
          </div>
          <div className="mt-7 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-amber-300 transition-all" style={{ width: `${progress}%` }} /></div>
          <div className="mt-3 flex items-center justify-between text-xs text-stone-400"><span>مرحلهٔ {currentStep + 1} از {steps.length}</span><span>{progress}٪ مسیر دمو</span></div>
        </header>

        {!started ? (
          <section className="rounded-[2rem] border border-amber-200/20 bg-amber-300 p-6 text-slate-950 md:p-10">
            <p className="text-sm font-black">آماده‌ای؟</p>
            <h2 className="mt-2 text-3xl font-black">یک مسیر کوتاه از ورود تا نتیجه.</h2>
            <p className="mt-3 max-w-2xl leading-8 text-slate-800">روی شروع بزن، مرحله‌ها را جلو ببر و برای دیدن هر بخش وارد صفحهٔ واقعی آن شو.</p>
            <button type="button" onClick={startDemo} className="mt-6 rounded-2xl bg-slate-950 px-6 py-3 font-black text-white transition hover:bg-slate-800">شروع دمو</button>
          </section>
        ) : (
          <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6">
              <p className="text-sm font-black text-amber-200">مرحلهٔ فعلی</p>
              <div className="mt-5 flex size-16 items-center justify-center rounded-3xl bg-amber-300 text-xl font-black text-slate-950">{currentStep + 1}</div>
              <h2 className="mt-6 text-3xl font-black">{step.title}</h2>
              <p className="mt-4 leading-8 text-stone-300">{step.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={step.href} className="rounded-2xl bg-amber-300 px-5 py-3 text-center font-black text-slate-950 transition hover:bg-amber-200">{step.action}</a>
                <button type="button" onClick={nextStep} disabled={currentStep === steps.length - 1} className="rounded-2xl border border-white/15 px-5 py-3 font-black text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40">مرحلهٔ بعد</button>
              </div>
              {secondsLeft === 0 && <p className="mt-5 rounded-2xl border border-amber-200/20 bg-amber-200/10 p-4 text-sm text-amber-100">زمان دمو تمام شد؛ برای مرور دوباره روی شروع مجدد بزن.</p>}
              <button type="button" onClick={startDemo} className="mt-5 text-sm font-bold text-stone-400 underline-offset-4 hover:text-white hover:underline">شروع مجدد</button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {steps.map((item, index) => (
                <button type="button" key={item.title} onClick={() => setCurrentStep(index)} className={`rounded-3xl border p-5 text-right transition ${index === currentStep ? "border-amber-200/50 bg-amber-200/10" : "border-white/10 bg-white/[0.06] hover:bg-white/[0.1]"}`}>
                  <div className="flex items-center justify-between"><span className="text-xs font-black text-amber-200">۰{index + 1}</span><span className="text-xs text-stone-400">{item.accent}</span></div>
                  <h3 className="mt-7 font-black">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-400">{item.description}</p>
                </button>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
