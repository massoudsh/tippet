import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { ItemCard } from "@/components/items/item-card";
import { Button, LinkButton } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Field, Input } from "@/components/ui/input";
import { faNumber } from "@/lib/utils";
import { listItems, itemSearchSchema } from "@/lib/items";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const raw = Object.fromEntries(
    Object.entries(searchParams).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value]),
  );
  const filters = itemSearchSchema.parse(raw);
  const items = await listItems(filters);
  const hasFilters = Boolean(filters.q || filters.city || filters.category || filters.maxPrice);

  return (
    <AppShell active="search" className="space-y-6">
      <PageHeader
        eyebrow="جست‌وجو و فیلتر"
        title="آگهی‌های فعال را پیدا کن"
        description="عبارت، شهر، دسته و سقف قیمت را تنظیم کن تا نتایج دقیق‌تری ببینی."
      />

      <Card>
        <CardContent className="p-5 sm:p-6">
          <form action="/search" className="space-y-4" method="get">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Field label="عبارت جست‌وجو" htmlFor="q">
                <Input id="q" name="q" defaultValue={filters.q ?? ""} placeholder="مثلاً کت جین" />
              </Field>
              <Field label="شهر" htmlFor="city">
                <Input id="city" name="city" defaultValue={filters.city ?? ""} placeholder="تهران" />
              </Field>
              <Field label="دسته" htmlFor="category">
                <Input id="category" name="category" defaultValue={filters.category ?? ""} placeholder="کت" />
              </Field>
              <Field label="حداکثر قیمت (تومان)" htmlFor="maxPrice">
                <Input
                  id="maxPrice"
                  name="maxPrice"
                  type="number"
                  dir="ltr"
                  inputMode="numeric"
                  defaultValue={filters.maxPrice ?? ""}
                  placeholder="2000000"
                />
              </Field>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button type="submit" variant="brand">
                اعمال فیلتر
              </Button>
              <LinkButton href="/search" variant="outline">
                پاک کردن فیلترها
              </LinkButton>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {items.length === 0
            ? "نتیجه‌ای پیدا نشد"
            : `${faNumber(items.length)} آگهی پیدا شد`}
        </p>
        <LinkButton href="/feed" variant="ghost" size="sm">
          بازگشت به فید
        </LinkButton>
      </div>

      {items.length === 0 ? (
        <EmptyState
          title={hasFilters ? "آگهی مطابق فیلترها پیدا نشد" : "هنوز آگهی برای جست‌وجو نیست"}
          description={
            hasFilters
              ? "فیلترها را ساده‌تر کن یا سقف قیمت را بالاتر ببر."
              : "با ثبت آگهی، نتایج جست‌وجو پر می‌شوند."
          }
          action={
            hasFilters ? (
              <LinkButton href="/search" variant="outline">
                حذف فیلترها
              </LinkButton>
            ) : (
              <LinkButton href="/seller/new" variant="brand">
                ثبت آگهی
              </LinkButton>
            )
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              href={`/items/${item.id}`}
              title={item.title}
              meta={`${item.category.name} · ${item.size ?? "سایز ثبت نشده"} · ${item.condition}`}
              price={item.price}
              imageUrl={item.images[0]?.url}
            />
          ))}
        </div>
      )}
    </AppShell>
  );
}
