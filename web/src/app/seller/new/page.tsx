"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Alert } from "@/components/ui/alert";
import { Button, LinkButton } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, Input, Select, Textarea } from "@/components/ui/input";

export default function NewSellerItemPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploaded, setUploaded] = useState(0);
  const uploadedUrls = useRef(new Map<File, string>());
  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [files]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setMessage("");
    setError("");
    const form = new FormData(event.currentTarget);
    const images = files;

    if (images.length === 0 || images.length > 8 || images.some((file) => !["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 8 * 1024 * 1024 || file.size === 0)) {
      setError("۱ تا ۸ تصویر JPG، PNG یا WebP، هرکدام حداکثر ۸ مگابایت انتخاب کن.");
      setLoading(false);
      return;
    }

    try {
      const imageUrls: string[] = [];
      setUploaded(0);
      for (const image of images) {
        let url = uploadedUrls.current.get(image);
        if (!url) {
          const upload = new FormData();
          upload.set("image", image);
          const response = await fetch("/api/items/upload", { method: "POST", body: upload });
          const payload = await response.json();
          if (response.status === 401) throw new Error("برای ثبت آگهی ابتدا وارد شو.");
          if (!response.ok) throw new Error(payload.error || "آپلود تصویر ناموفق بود؛ دوباره ثبت را بزن.");
          url = payload.url as string;
          uploadedUrls.current.set(image, url);
        }
        imageUrls.push(url);
        setUploaded(imageUrls.length);
      }

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
      if (response.status === 401) {
        setError("برای ثبت آگهی ابتدا وارد شو.");
        return;
      }
      if (!response.ok) throw new Error(payload.error || "ثبت آگهی ناموفق بود.");
      setMessage("آگهی ثبت شد. در حال انتقال…");
      window.location.assign(`/items/${payload.item.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "ثبت آگهی ناموفق بود.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell active="seller" className="space-y-6">
      <PageHeader
        eyebrow="ثبت آیتم"
        title="آگهی واقعی بساز و تصویرهایش را ذخیره کن"
        description="عکس‌ها و مشخصات واقعی کالا را اضافه کن، بررسی کن و منتشر کن."
        actions={
          <LinkButton href="/seller" variant="outline">
            بازگشت به پنل
          </LinkButton>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle>راهنمای عکاسی سریع</CardTitle>
            <CardDescription>عکس بهتر یعنی اعتماد بیشتر و فروش سریع‌تر.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-muted-foreground">
            <p>• عکس اصلی در نور طبیعی و پس‌زمینه ساده</p>
            <p>• نمای جلو، پشت، برچسب سایز و ایرادهای احتمالی را جدا ثبت کن</p>
            <p>• توضیح حداقل ۲۰ کاراکتر؛ برند و جنس اختیاری‌اند ولی کمک‌کننده‌اند</p>
            <Alert variant="info" title="نیاز به ورود">
              برای انتشار وارد حساب شو. در صورت خطا اطلاعات فرم را نگه دار و دوباره تلاش کن.
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 sm:p-6">
            <form onSubmit={submit} className="space-y-4">
              <Field label="عنوان" htmlFor="title">
                <Input id="title" name="title" required minLength={3} maxLength={120} placeholder="مثلاً کت جین آبی" />
              </Field>
              <Field label="توضیح" htmlFor="description" hint="حداقل ۲۰ کاراکتر">
                <Textarea
                  id="description"
                  name="description"
                  required
                  minLength={20}
                  maxLength={4000}
                  placeholder="اندازه، وضعیت و ایرادهای احتمالی کالا را بنویس."
                />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="دسته" htmlFor="category">
                  <Input id="category" name="category" required minLength={2} maxLength={64} placeholder="مثلاً کت" />
                </Field>
                <Field label="شهر" htmlFor="city">
                  <Input id="city" name="city" required minLength={2} maxLength={64} placeholder="مثلاً تهران" />
                </Field>
                <Field label="سایز" htmlFor="size">
                  <Input id="size" name="size" placeholder="مثلاً M" />
                </Field>
                <Field label="رنگ" htmlFor="color">
                  <Input id="color" name="color" placeholder="مثلاً آبی" />
                </Field>
                <Field label="برند" htmlFor="brand">
                  <Input id="brand" name="brand" placeholder="اختیاری" />
                </Field>
                <Field label="جنس" htmlFor="material">
                  <Input id="material" name="material" placeholder="مثلاً جین" />
                </Field>
                <Field label="قیمت (تومان)" htmlFor="price">
                  <Input id="price" name="price" type="number" dir="ltr" required min={1} max={1000000000} step={1} />
                </Field>
                <Field label="وضعیت کالا" htmlFor="condition">
                  <Select id="condition" name="condition" required defaultValue="">
                    <option value="" disabled>وضعیت را انتخاب کن</option>
                    <option value="NEW_WITH_TAG">نو با تگ</option>
                    <option value="LIKE_NEW">در حد نو</option>
                    <option value="GOOD">خوب</option>
                    <option value="FAIR">قابل قبول</option>
                  </Select>
                </Field>
              </div>
              <Field
                label="تصویرها"
                htmlFor="images"
                hint="۱ تا ۸ تصویر؛ هر فایل حداکثر ۸ مگابایت"
              >
                <Input
                  id="images"
                  name="images"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  disabled={loading}
                  onChange={(e) => { setFiles(Array.from(e.target.files ?? [])); setUploaded(0); }}
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                {files.map((file, index) => <div key={`${file.name}-${index}`} className="rounded-control border border-border p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {previews[index] && <img src={previews[index]} alt={`پیش‌نمایش ${file.name}`} width={200} height={150} className="aspect-[4/3] w-full object-contain" />}
                  <p className="truncate text-xs" dir="auto">{file.name}</p>
                  <Button type="button" variant="ghost" disabled={loading} onClick={() => setFiles(files.filter((_, i) => i !== index))}>حذف تصویر {index + 1}</Button>
                  <Button type="button" variant="outline" disabled={loading || index === 0} onClick={() => setFiles([file, ...files.filter((_, i) => i !== index)])}>تصویر اصلی</Button>
                </div>)}
              </div>
              {loading && <p role="status">تصویرهای بارگذاری‌شده: {uploaded} از {files.length}</p>}
              <label className="flex items-start gap-2 text-sm"><input type="checkbox" required className="mt-2" />مشخصات و تصویرها را بررسی کرده‌ام و حق انتشار آن‌ها را دارم. اطلاعات پیشنهادی خودکار در این نسخه فعال نیست.</label>
              <Button type="submit" className="w-full" loading={loading}>
                ثبت آگهی
              </Button>
              {error && (
                <Alert variant="destructive">
                  {error}
                  {error.includes("وارد") && (
                    <div className="mt-2">
                      <LinkButton href="/auth" size="sm">
                        ورود
                      </LinkButton>
                    </div>
                  )}
                </Alert>
              )}
              {message && <Alert variant="success">{message}</Alert>}
            </form>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
