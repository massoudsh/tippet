"use client";

import { FormEvent, useEffect, useState } from "react";
import { ingestionDraftSchema } from "@/lib/ingestion";

type CreatedItem = { id: string; title: string };

export default function IngestionPage() {
  const [authLoading, setAuthLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [createdItem, setCreatedItem] = useState<CreatedItem | null>(null);

  useEffect(() => {
    void fetch("/api/auth/me")
      .then(async (response) => {
        const payload = await response.json();
        if (!payload.user) window.location.assign("/auth?next=/ingestion");
      })
      .catch(() => setError("بررسی ورود ناموفق بود. دوباره تلاش کنید."))
      .finally(() => setAuthLoading(false));
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;

    const form = new FormData(event.currentTarget);
    const parsed = ingestionDraftSchema.safeParse({
      source: form.get("source"),
      sourceUrl: form.get("sourceUrl"),
      title: form.get("title"),
      description: form.get("description"),
      category: form.get("category"),
      brand: form.get("brand") || undefined,
      size: form.get("size") || undefined,
      condition: form.get("condition"),
      color: form.get("color") || undefined,
      material: form.get("material") || undefined,
      price: Number(form.get("price")),
      city: form.get("city"),
      hasPermission: form.get("hasPermission") === "on",
    });
    const images = form.getAll("images").filter((value): value is File => value instanceof File && value.size > 0);

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message || "اطلاعات آگهی معتبر نیست.");
      return;
    }
    if (!images.length) {
      setError("حداقل یک تصویر از آیتم اضافه کنید.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const imageUrls = await Promise.all(images.map(async (image) => {
        const upload = new FormData();
        upload.set("image", image);
        const response = await fetch("/api/items/upload", { method: "POST", body: upload });
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || "بارگذاری تصویر ناموفق بود.");
        return payload.url as string;
      }));

      const itemInput = {
        title: parsed.data.title,
        description: parsed.data.description,
        category: parsed.data.category,
        brand: parsed.data.brand,
        size: parsed.data.size,
        condition: parsed.data.condition,
        color: parsed.data.color,
        material: parsed.data.material,
        price: parsed.data.price,
        city: parsed.data.city,
      };
      const response = await fetch("/api/items", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...itemInput, imageUrls }),
      });
      const payload = await response.json();
      if (response.status === 401) {
        window.location.assign("/auth?next=/ingestion");
        return;
      }
      if (!response.ok) throw new Error(payload.error || "ثبت آگهی ناموفق بود.");
      setCreatedItem(payload.item);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "ثبت آگهی ناموفق بود.");
    } finally {
      setLoading(false);
    }
  }

  if (authLoading) return <PageMessage message="در حال بررسی ورود..." />;
  if (createdItem) return <main className="min-h-screen bg-[#070a12] px-5 py-8 text-stone-50"><section className="mx-auto max-w-2xl rounded-[2rem] border border-emerald-300/30 bg-emerald-300/10 p-8 text-center"><p className="text-sm font-black text-emerald-200">ثبت شد</p><h1 className="mt-3 text-3xl font-black">{createdItem.title} آمادهٔ مدیریت است.</h1><p className="mt-4 leading-8 text-stone-200">اطلاعات دستی شما با API آیتم ثبت شد. لینک منبع فقط برای راهنمای ورود استفاده شد و هنوز در مدل آیتم ذخیره نمی‌شود.</p><div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center"><a className="rounded-2xl bg-amber-300 px-5 py-3 font-black text-slate-950" href={`/items/${createdItem.id}`}>مشاهدهٔ آیتم</a><a className="rounded-2xl border border-white/20 px-5 py-3 font-black" href="/seller">رفتن به پنل فروشنده</a></div></section></main>;

  return <main className="min-h-screen bg-[#070a12] px-5 py-8 text-stone-50"><section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.8fr_1.2fr]"><aside className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 md:p-10"><a className="text-sm text-stone-400 transition hover:text-white" href="/seller">بازگشت به پنل فروشنده</a><p className="mt-8 text-sm font-black text-amber-200">ورود URL-یار</p><h1 className="mt-3 text-4xl font-black leading-tight">آگهی را از روی منبع مجاز، دقیق و دستی ثبت کنید.</h1><p className="mt-4 leading-8 text-stone-300">این صفحه وب را scrape نمی‌کند. URL برای ارجاع شماست و مشخصات، قیمت و تصویرها را خودتان وارد می‌کنید.</p><p className="mt-6 rounded-2xl border border-amber-200/20 bg-amber-200/10 p-4 text-sm leading-7 text-amber-50">پیش از ثبت، مطمئن شوید حق استفاده از اطلاعات و تصویرهای منبع را دارید.</p></aside><form onSubmit={submit} className="space-y-4 rounded-[2rem] bg-stone-50 p-5 text-slate-950 md:p-8"><div className="grid gap-4 md:grid-cols-2"><Select name="source" label="منبع" options={[["divar", "دیوار"], ["instagram", "اینستاگرام"], ["telegram", "تلگرام"], ["other", "سایر"]]} /><Field name="sourceUrl" label="لینک منبع" type="url" placeholder="https://..." required /></div><Field name="title" label="عنوان" required /><label className="block text-sm font-bold" htmlFor="description">توضیح</label><textarea id="description" name="description" required minLength={20} className="mt-2 h-28 w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="وضعیت، اندازه و جزئیات آیتم را بنویسید." /><div className="grid gap-4 md:grid-cols-2"><Field name="category" label="دسته" required /><Field name="city" label="شهر" required /><Field name="brand" label="برند" /><Field name="size" label="سایز" /><Field name="color" label="رنگ" /><Field name="material" label="جنس" /><Field name="price" label="قیمت (تومان)" type="number" required /><Select name="condition" label="وضعیت" options={[["NEW_WITH_TAG", "نو با تگ"], ["LIKE_NEW", "در حد نو"], ["GOOD", "خوب"], ["FAIR", "قابل قبول"]]} /></div><label className="block text-sm font-bold">تصویرها<input name="images" type="file" accept="image/jpeg,image/png,image/webp" multiple required className="mt-2 block w-full text-sm" /></label><label className="flex gap-3 rounded-2xl border border-slate-200 p-4 text-sm leading-6"><input name="hasPermission" type="checkbox" required className="mt-1 size-4 accent-slate-950" /><span>تأیید می‌کنم مجاز به استفاده از این آگهی و تصویرهای آن هستم.</span></label>{error && <p role="alert" className="text-sm text-red-700">{error}</p>}<button disabled={loading} aria-busy={loading} className="w-full rounded-2xl bg-slate-950 px-5 py-3 font-black text-white disabled:opacity-60">{loading ? "در حال بارگذاری و ثبت..." : "ثبت دستی آگهی"}</button></form></section></main>;
}

function Field({ name, label, type = "text", required = false, placeholder }: { name: string; label: string; type?: string; required?: boolean; placeholder?: string }) { return <label className="block text-sm font-bold">{label}<input name={name} type={type} required={required} placeholder={placeholder} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3" /></label>; }
function Select({ name, label, options }: { name: string; label: string; options: [string, string][] }) { return <label className="block text-sm font-bold">{label}<select name={name} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3">{options.map(([value, text]) => <option key={value} value={value}>{text}</option>)}</select></label>; }
function PageMessage({ message }: { message: string }) { return <main className="min-h-screen bg-[#070a12] px-5 py-8 text-stone-50"><p className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/[0.06] p-8 text-center">{message}</p></main>; }
