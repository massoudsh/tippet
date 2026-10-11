"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button, LinkButton } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { calculateSellerTrustScore, summarizeSellerItems } from "@/lib/seller";
import { faNumber, faPercent, formatToman } from "@/lib/utils";

const demoItems = [
  { id: "1", title: "کت جین وینتیج", price: 1480000, status: "ACTIVE" as const, completeness: 92, views: 184, contacts: 12 },
  { id: "2", title: "هودی استریت‌ویر", price: 920000, status: "RESERVED" as const, completeness: 86, views: 96, contacts: 6 },
  { id: "3", title: "بارانی زعفرانی", price: 2100000, status: "SOLD" as const, completeness: 94, views: 220, contacts: 19 },
];

const statusLabel = {
  ACTIVE: "فعال",
  RESERVED: "رزرو شده",
  SOLD: "فروخته‌شده",
  REMOVED: "حذف‌شده",
} as const;

const statusVariant = {
  ACTIVE: "success",
  RESERVED: "warning",
  SOLD: "secondary",
  REMOVED: "destructive",
} as const;

export default function SellerPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const summary = useMemo(() => summarizeSellerItems(demoItems), []);
  const trustScore = useMemo(() => calculateSellerTrustScore(demoItems), []);

  function toggle(id: string) {
    setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  function selectActive() {
    setSelected(demoItems.filter((item) => item.status === "ACTIVE").map((item) => item.id));
    setNotice("آگهی‌های فعال انتخاب شدند. تغییر گروهی وضعیت هنوز به API وصل نیست.");
  }

  return (
    <AppShell active="seller" className="space-y-6">
      <PageHeader
        eyebrow="پنل ساده فروشنده"
        title="مدیریت آگهی‌ها و وضعیت فروش"
        description="آگهی‌های نمونه برای نمایش جریان کار فروشنده. ثبت واقعی از مسیر «آگهی جدید» انجام می‌شود."
        actions={
          <LinkButton href="/seller/new" variant="brand">
            ثبت آگهی جدید
          </LinkButton>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <Metric title="آگهی فعال" value={faNumber(summary.active)} />
        <Metric title="فروخته‌شده" value={faNumber(summary.sold)} />
        <Metric title="درخواست تماس" value={faNumber(summary.contacts)} />
        <Metric title="کامل‌بودن" value={faPercent(summary.averageCompleteness)} />
        <Metric title="امتیاز اعتماد" value={faPercent(trustScore)} />
      </div>

      <Card>
        <CardContent className="space-y-4 p-5">
          <div className="grid gap-2 md:grid-cols-3">
            <Button type="button" variant="secondary" onClick={selectActive}>
              انتخاب آگهی‌های فعال
            </Button>
            <Button
              type="button"
              variant="brand"
              disabled={selected.length === 0}
              onClick={() =>
                setNotice(
                  selected.length === 0
                    ? "ابتدا چند آگهی انتخاب کن."
                    : `تغییر گروهی به فروخته‌شده برای ${faNumber(selected.length)} آگهی — به‌زودی به API وصل می‌شود.`,
                )
              }
            >
              تغییر گروهی به فروخته‌شده
            </Button>
            <LinkButton href="/ingestion" variant="outline">
              ورود آگهی با مجوز
            </LinkButton>
          </div>

          {notice && <Alert variant="warning">{notice}</Alert>}

          {demoItems.length === 0 ? (
            <EmptyState
              title="هنوز آگهی نداری"
              description="اولین آیتم وینتیج یا استریت‌ویر را ثبت کن."
              action={
                <LinkButton href="/seller/new" variant="brand">
                  ثبت آگهی
                </LinkButton>
              }
            />
          ) : (
            <div className="overflow-hidden rounded-overlay border-line border-border">
              {demoItems.map((item) => {
                const checked = selected.includes(item.id);
                return (
                  <article
                    key={item.id}
                    className="grid gap-3 border-b border-border p-4 last:border-b-0 md:grid-cols-[auto_1fr_auto_auto_auto] md:items-center"
                  >
                    <label className="flex min-h-11 items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggle(item.id)}
                        className="size-4 accent-[var(--brand)]"
                        aria-label={`انتخاب ${item.title}`}
                      />
                      <span className="sr-only">انتخاب</span>
                    </label>
                    <div>
                      <h2 className="font-semibold">{item.title}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{formatToman(item.price)}</p>
                    </div>
                    <Badge variant={statusVariant[item.status]}>{statusLabel[item.status]}</Badge>
                    <span className="text-sm text-muted-foreground">{faNumber(item.views)} بازدید</span>
                    <span className="text-sm text-brand">{faNumber(item.contacts)} تماس</span>
                  </article>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </AppShell>
  );
}

function Metric({ title, value }: { title: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="mt-2 text-2xl font-display">{value}</p>
      </CardContent>
    </Card>
  );
}
