"use client";

import { useEffect, useState } from "react";

type Profile = { sizes: string[]; categories: string[]; colors: string[]; budgetMin: number | null; budgetMax: number | null; updatedAt: string };

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [completeness, setCompleteness] = useState(0);
  const [message, setMessage] = useState("در حال بارگذاری پروفایل...");

  useEffect(() => {
    void (async () => {
      const response = await fetch("/api/style-profile/summary");
      const payload = await response.json();
      if (!response.ok) return setMessage(payload.error);
      setProfile(payload.profile);
      setCompleteness(payload.completeness);
      setMessage("");
    })();
  }, []);

  if (!profile) return <main className="min-h-screen bg-slate-950 px-5 py-8 text-stone-50"><section className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.06] p-8 text-center"><p>{message || "پروفایل سلیقه هنوز ساخته نشده است."}</p><a className="mt-5 inline-flex rounded-2xl bg-amber-300 px-5 py-3 font-black text-slate-950" href="/onboarding">ساخت پروفایل</a></section></main>;

  return <main className="min-h-screen bg-slate-950 px-5 py-8 text-stone-50"><section className="mx-auto max-w-5xl space-y-6"><a className="text-sm text-stone-400 transition hover:text-white" href="/">بازگشت به تیپت</a><div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/20 md:p-10"><p className="text-sm font-black text-amber-200">پروفایل سلیقه</p><h1 className="mt-3 text-4xl font-black">سلیقه، سایز و بودجه خریدار</h1><p className="mt-4 leading-8 text-stone-300">این پروفایل مبنای رتبه‌بندی فید کشف است. کامل‌بودن: {completeness.toLocaleString("fa-IR")}٪</p><a className="mt-5 inline-flex rounded-2xl border border-white/15 px-4 py-2 text-sm font-bold" href="/onboarding">ویرایش پروفایل</a></div><div className="grid gap-4 md:grid-cols-3"><ProfileCard title="سایزها" values={profile.sizes} /><ProfileCard title="دسته‌های محبوب" values={profile.categories} /><ProfileCard title="رنگ‌ها" values={profile.colors} /></div><div className="rounded-3xl border border-white/10 bg-amber-300 p-5 text-slate-950"><p className="text-sm font-bold">بودجه خرید</p><p className="mt-2 text-2xl font-black">{profile.budgetMin?.toLocaleString("fa-IR") ?? "۰"} تا {profile.budgetMax?.toLocaleString("fa-IR") ?? "بدون سقف"} تومان</p></div></section></main>;
}

function ProfileCard({ title, values }: { title: string; values: string[] }) { return <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-5"><h2 className="font-black">{title}</h2><div className="mt-4 flex flex-wrap gap-2">{values.map((value) => <span key={value} className="rounded-full bg-white/10 px-3 py-1 text-sm text-stone-200">{value}</span>)}</div></article>; }
