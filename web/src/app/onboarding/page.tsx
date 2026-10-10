"use client";

import { FormEvent, useState } from "react";

export default function OnboardingPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    const split = (value: FormDataEntryValue | null) => String(value ?? "").split(",").map((entry) => entry.trim()).filter(Boolean);
    const response = await fetch("/api/style-profile", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        sizes: split(form.get("sizes")),
        preferredCategories: split(form.get("categories")),
        preferredColors: split(form.get("colors")),
        budgetMin: Number(form.get("budgetMin")) || undefined,
        budgetMax: Number(form.get("budgetMax")) || undefined,
      }),
    });
    const payload = await response.json();
    setLoading(false);
    if (!response.ok) return setMessage(payload.error);
    window.location.assign("/feed");
  }

  return <main className="min-h-screen bg-[#070a12] px-5 py-8 text-stone-50"><section className="mx-auto max-w-4xl space-y-8"><a className="text-sm text-stone-400 transition hover:text-white" href="/">بازگشت به تیپت</a><div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"><div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/20"><p className="text-sm font-black text-amber-200">شروع شخصی‌سازی</p><h1 className="mt-3 text-4xl font-black leading-tight">پروفایل سلیقه را در چند سؤال بساز.</h1><p className="mt-4 leading-8 text-stone-300">سایز، بودجه، رنگ‌ها و دسته‌های مورد علاقه، فید کشف را از همان ابتدا دقیق‌تر می‌کند.</p></div><form onSubmit={submit} className="space-y-4 rounded-[2rem] bg-stone-50 p-6 text-slate-950"><Field name="sizes" label="سایزها" placeholder="M, L" defaultValue="M" /><Field name="categories" label="دسته‌های محبوب" placeholder="کت, هودی" defaultValue="کت, هودی" /><Field name="colors" label="رنگ‌های محبوب" placeholder="مشکی, آبی" defaultValue="مشکی, آبی" /><div className="grid gap-4 sm:grid-cols-2"><Field name="budgetMin" label="حداقل بودجه" type="number" defaultValue="700000" /><Field name="budgetMax" label="حداکثر بودجه" type="number" defaultValue="3000000" /></div><button disabled={loading} className="w-full rounded-2xl bg-slate-950 px-5 py-3 font-black text-white disabled:opacity-60">{loading ? "در حال ذخیره..." : "ذخیره و دیدن فید"}</button>{message && <p className="text-sm text-red-700">{message}</p>}</form></div></section></main>;
}

function Field({ name, label, placeholder, defaultValue, type = "text" }: { name: string; label: string; placeholder?: string; defaultValue: string; type?: string }) { return <label className="block text-sm font-bold">{label}<input name={name} type={type} required className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder={placeholder} defaultValue={defaultValue} /></label>; }
