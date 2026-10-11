"use client";

import { FormEvent, useState } from "react";
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
  const [fileCount, setFileCount] = useState(0);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    const form = new FormData(event.currentTarget);
    const images = form.getAll("images").filter((value): value is File => value instanceof File && value.size > 0);

    if (images.length === 0) {
      setError("حداقل یک تصویر لازم است.");
      setLoading(false);
      return;
    }

    try {
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const upload = new FormData();
          upload.set("image", image);
          const response = await fetch("/api/items/upload", { method: "POST", body: upload });
          const payload = await response.json();
          if (!response.ok) throw new Error(payload.error || "آپلود تصویر ناموفق بود.");
          return payload.url as string;
        }),
      );

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
        description="پس از ورود، تصویرها ذخیره می‌شوند و آگهی در PostgreSQL ثبت می‌شود."
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
              اگر وارد نباشی، API ثبت آگهی خطای ۴۰۱ برمی‌گرداند.
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 sm:p-6">
            <form onSubmit={submit} className="space-y-4">
              <Field label="عنوان" htmlFor="title">
                <Input id="title" name="title" required defaultValue="کت جین آبی" />
              </Field>
              <Field label="توضیح" htmlFor="description" hint="حداقل ۲۰ کاراکتر">
                <Textarea
                  id="description"
                  name="description"
                  required
                  minLength={20}
                  defaultValue="کت جین سالم سایز M، مناسب استریت‌ویر و وینتیج."
                />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="دسته" htmlFor="category">
                  <Input id="category" name="category" required defaultValue="کت" />
                </Field>
                <Field label="شهر" htmlFor="city">
                  <Input id="city" name="city" required defaultValue="تهران" />
                </Field>
                <Field label="سایز" htmlFor="size">
                  <Input id="size" name="size" defaultValue="M" />
                </Field>
                <Field label="رنگ" htmlFor="color">
                  <Input id="color" name="color" defaultValue="آبی" />
                </Field>
                <Field label="برند" htmlFor="brand">
                  <Input id="brand" name="brand" placeholder="اختیاری" />
                </Field>
                <Field label="جنس" htmlFor="material">
                  <Input id="material" name="material" defaultValue="جین" />
                </Field>
                <Field label="قیمت (تومان)" htmlFor="price">
                  <Input id="price" name="price" type="number" dir="ltr" required defaultValue="1480000" />
                </Field>
                <Field label="وضعیت کالا" htmlFor="condition">
                  <Select id="condition" name="condition" defaultValue="GOOD">
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
                hint={fileCount > 0 ? `${fileCount} فایل انتخاب شده` : "JPG، PNG یا WebP"}
              >
                <Input
                  id="images"
                  name="images"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  required
                  onChange={(e) => setFileCount(e.target.files?.length ?? 0)}
                />
              </Field>
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
