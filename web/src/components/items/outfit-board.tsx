"use client";

import { useState } from "react";
import { ItemCard } from "./item-card";
import { Button } from "@/components/ui/button";
import { formatToman } from "@/lib/utils";

type OutfitItem = { id: string; title: string; price: number; imageUrl: string | null; meta: string };
export function OutfitBoard({ items }: { items: OutfitItem[] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const chosen = items.filter((item) => selected.includes(item.id));
  return <div className="space-y-6">
    <section aria-label="ست انتخابی" className="space-y-4 rounded-surface border border-border bg-card p-5">
      <h2 className="text-xl font-semibold">ست ساخته‌شده توسط شما</h2>
      <p role="status">{selected.length ? `جمع قیمت کالاها: ${formatToman(chosen.reduce((sum, item) => sum + item.price, 0))}` : "برای شروع، کالاها را از فهرست پایین اضافه کن."}</p>
      <p className="text-sm text-muted-foreground">این ست پیشنهاد AI نیست؛ هماهنگی و اندازه تضمین نمی‌شود. انتخاب‌ها با خروج از صفحه پاک می‌شوند و موجودی هنگام بازکردن آگهی باید دوباره بررسی شود. پرداخت، ذخیره و اشتراک ست هنوز فعال نیست.</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{chosen.map((item) => <div key={item.id} className="space-y-2"><ItemCard {...item} href={`/items/${item.id}`} /><Button variant="outline" onClick={() => setSelected(selected.filter((id) => id !== item.id))} aria-label={`حذف ${item.title} از ست`}>حذف از ست</Button></div>)}</div>
    </section>
    <h2 className="text-xl font-semibold">آگهی‌های فعال</h2>
    {!items.length && <p>آگهی فعالی برای ساخت ست وجود ندارد.</p>}
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.filter((item) => !selected.includes(item.id)).map((item) => <div key={item.id} className="space-y-2"><ItemCard {...item} href={`/items/${item.id}`} /><Button onClick={() => setSelected([...selected, item.id])} aria-label={`افزودن ${item.title} به ست`}>افزودن به ست</Button></div>)}</div>
  </div>;
}
