"use client";

import { FormEvent, useState } from "react";

export default function NewSellerItemPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    const images = form.getAll("images").filter((value): value is File => value instanceof File && value.size > 0);

    try {
      const imageUrls = await Promise.all(images.map(async (image) => {
        const upload = new FormData();
        upload.set("image", image);
        const response = await fetch("/api/items/upload", { method: "POST", body: upload });
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error);
        return payload.url as string;
      }));

      const response = await fetch("/api/items", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
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
          imageUrls,
        }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error);
      window.location.assign(`/items/${payload.item.id}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "ثبت آگهی ناموفق بود.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#070a12] px-5 py-8 text-stone-50">
      <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 md:p-10">
          <a className="text-sm text-stone-400 transition hover:text-white" href="/seller">بازگشت به پنل فروشنده</a>
          <p className="mt-8 text-sm font-black text-amber-200">ثبت آیتم</p>
          <h1 className="mt-3 text-4xl font-black leading-tight">آگهی واقعی بساز و تصویرهای آن را ذخیره کن.</h1>
          <p className="mt-4 leading-8 text-stone-300">پس از ورود، تصویرها در فضای پروژه ذخیره می‌شوند و آگهی همراه با مشخصاتش در PostgreSQL ثبت خواهد شد.</p>
        </div>
        <form onSubmit={submit} className="space-y-4 rounded-[2rem] bg-stone-50 p-5 text-slate-950 md:p-8">
          <Field name="title" label="عنوان" defaultValue="کت جین آبی" required />
          <label className="block text-sm font-bold" htmlFor="description">توضیح</label>
          <textarea id="description" name="description" className="mt-2 h-28 w-full rounded-2xl border border-slate-200 px-4 py-3" defaultValue="کت جین سالم سایز M، مناسب استریت‌ویر و وینتیج." required minLength={20} />
          <div className="grid gap-4 md:grid-cols-2">
            <Field name="category" label="دسته" defaultValue="کت" required />
            <Field name="city" label="شهر" defaultValue="تهران" required />
            <Field name="size" label="سایز" defaultValue="M" />
            <Field name="color" label="رنگ" defaultValue="آبی" />
            <Field name="brand" label="برند" defaultValue="" />
            <Field name="material" label="جنس" defaultValue="جین" />
            <Field name="price" label="قیمت تومان" type="number" defaultValue="1480000" required />
            <label className="block text-sm font-bold">وضعیت<select name="condition" className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3" defaultValue="GOOD"><option value="NEW_WITH_TAG">نو با تگ</option><option value="LIKE_NEW">در حد نو</option><option value="GOOD">خوب</option><option value="FAIR">قابل قبول</option></select></label>
          </div>
          <label className="block text-sm font-bold">تصویرها<input name="images" type="file" accept="image/jpeg,image/png,image/webp" multiple className="mt-2 block w-full text-sm" required /></label>
          <button disabled={loading} className="w-full rounded-2xl bg-slate-950 px-5 py-3 font-black text-white disabled:opacity-60">{loading ? "در حال ثبت..." : "ثبت آگهی"}</button>
          {message && <p className="text-sm text-red-700">{message}</p>}
        </form>
      </section>
    </main>
  );
}

function Field({ name, label, defaultValue, type = "text", required = false }: { name: string; label: string; defaultValue: string; type?: string; required?: boolean }) {
  return <label className="block text-sm font-bold">{label}<input name={name} type={type} defaultValue={defaultValue} required={required} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3" /></label>;
}
