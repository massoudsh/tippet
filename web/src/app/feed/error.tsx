"use client";

export default function FeedError({ reset }: { reset: () => void }) {
  return <main className="min-h-screen bg-[#070a12] px-5 py-8 text-stone-50"><section className="mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.07] p-8 text-center"><h1 className="text-2xl font-black">فید فعلاً در دسترس نیست.</h1><p className="mt-3 text-stone-300">دریافت آگهی‌ها با مشکل روبه‌رو شد. دوباره تلاش کن.</p><button onClick={reset} className="mt-6 rounded-2xl bg-amber-300 px-5 py-3 font-black text-slate-950">تلاش دوباره</button></section></main>;
}
