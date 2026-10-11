import Image from "next/image";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { ItemActions } from "@/components/items/item-actions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";
import { getItemById } from "@/lib/items";
import { formatToman } from "@/lib/utils";

const conditionLabels = {
  NEW_WITH_TAG: "نو با تگ",
  LIKE_NEW: "در حد نو",
  GOOD: "خوب",
  FAIR: "قابل قبول",
} as const;

export default async function ItemPage({ params }: { params: { id: string } }) {
  const item = await getItemById(params.id);
  if (!item) notFound();

  return (
    <AppShell active="feed" className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <LinkButton href="/feed" variant="ghost" size="sm">
          بازگشت به فید
        </LinkButton>
        <LinkButton href="/search" variant="outline" size="sm">
          جست‌وجوی مشابه
        </LinkButton>
      </div>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-3 sm:grid-cols-2">
          {item.images.length === 0 ? (
            <Card className="col-span-full">
              <CardContent className="flex h-72 items-center justify-center text-sm text-muted-foreground">
                تصویری برای این آگهی ثبت نشده است.
              </CardContent>
            </Card>
          ) : (
            item.images.map((image) => (
              <div key={image.id} className="overflow-hidden rounded-surface border-line border-border bg-secondary">
                <Image
                  src={image.url}
                  alt={item.title}
                  width={768}
                  height={576}
                  className="h-72 w-full object-cover"
                />
              </div>
            ))
          )}
        </div>

        <Card>
          <CardHeader className="space-y-4">
            <Badge variant="soft">{item.city}</Badge>
            <h1 className="text-3xl font-display leading-tight sm:text-4xl">{item.title}</h1>
            <p className="text-2xl font-display text-brand">{formatToman(item.price)}</p>
            <p className="leading-8 text-muted-foreground">{item.description}</p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <Info title="دسته" value={item.category.name} />
              <Info title="سایز" value={item.size ?? "ثبت نشده"} />
              <Info title="رنگ" value={item.color ?? "ثبت نشده"} />
              <Info title="وضعیت" value={conditionLabels[item.condition]} />
              <Info title="برند" value={item.brand ?? "ثبت نشده"} />
              <Info title="جنس" value={item.material ?? "ثبت نشده"} />
            </div>

            <div className="rounded-overlay border-line border-border bg-secondary/50 p-4">
              <h2 className="font-semibold">فروشنده</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.seller.name ?? "فروشنده تیپت"} · {item.seller.city ?? item.city}
              </p>
            </div>

            <ItemActions itemId={item.id} showPhase2Links />
          </CardContent>
        </Card>
      </section>
    </AppShell>
  );
}

function Info({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-control border-line border-border bg-field p-4">
      <p className="text-xs text-muted-foreground">{title}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}
