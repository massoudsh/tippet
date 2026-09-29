"use client";

import { FormEvent, useState } from "react";

export default function AuthPage() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [developmentCode, setDevelopmentCode] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function requestOtp(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const response = await fetch("/api/auth/request-otp", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    const payload = await response.json();
    setLoading(false);
    if (!response.ok) return setMessage(payload.error);
    setDevelopmentCode(payload.developmentCode ?? null);
    setMessage("کد تأیید ارسال شد.");
  }

  async function verifyOtp(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const response = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ phone, code }),
    });
    const payload = await response.json();
    setLoading(false);
    if (!response.ok) return setMessage(payload.error);
    window.location.assign("/onboarding");
  }

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-stone-50">
      <section className="mx-auto grid max-w-5xl gap-8 rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/20 md:grid-cols-[0.9fr_1.1fr] md:p-10">
        <div className="space-y-5">
          <a className="text-sm text-stone-400 transition hover:text-white" href="/">بازگشت به تیپت</a>
          <p className="text-sm font-black text-amber-200">ورود امن با موبایل</p>
          <h1 className="text-4xl font-black leading-tight">احراز هویت OTP برای خریدار و فروشنده.</h1>
          <p className="leading-8 text-stone-300">کد یک‌بارمصرف پنج دقیقه اعتبار دارد و تعداد درخواست‌ها برای هر شماره محدود شده است.</p>
        </div>
        <div className="rounded-[1.5rem] bg-stone-50 p-5 text-slate-950">
          <form onSubmit={requestOtp}>
            <label className="text-sm font-bold" htmlFor="phone">شماره موبایل</label>
            <input id="phone" value={phone} onChange={(event) => setPhone(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-left" dir="ltr" placeholder="09121234567" required />
            <button disabled={loading} className="mt-4 w-full rounded-2xl bg-slate-950 px-5 py-3 font-black text-white disabled:opacity-60">دریافت کد تأیید</button>
          </form>
          <form onSubmit={verifyOtp} className="mt-6 border-t border-slate-200 pt-5">
            <label className="text-sm font-bold" htmlFor="code">کد شش‌رقمی</label>
            <input id="code" value={code} onChange={(event) => setCode(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-left" dir="ltr" inputMode="numeric" pattern="[0-9]{6}" required />
            <button disabled={loading} className="mt-4 w-full rounded-2xl bg-amber-300 px-5 py-3 font-black text-slate-950 disabled:opacity-60">تأیید و ورود</button>
          </form>
          {developmentCode && <p className="mt-4 rounded-2xl bg-amber-100 p-3 text-sm">کد توسعه: <span dir="ltr">{developmentCode}</span></p>}
          {message && <p className="mt-4 text-sm text-slate-600">{message}</p>}
        </div>
      </section>
    </main>
  );
}
