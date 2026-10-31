import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { LinkButton } from "@/components/ui/button";
import { OutfitBoard } from "@/components/items/outfit-board";
import { listItems } from "@/lib/items";
import { conditionLabels } from "@/lib/product-labels";

export default async function OutfitsPage() {
  const items = await listItems({});
  return <AppShell active="outfits" className="space-y-6">
    <PageHeader title="ست خودت را بساز" description="کالاهای واقعی را کنار هم ببین، حذف کن یا با گزینهٔ دیگری جایگزین کن." actions={<LinkButton href="/search" variant="outline">جست‌وجوی کالا</LinkButton>} />
    <OutfitBoard items={items.map((item) => ({ id: item.id, title: item.title, price: item.price, imageUrl: item.images[0]?.url ?? null, meta: `${item.category.name} · ${item.size ?? "سایز ثبت نشده"} · ${conditionLabels[item.condition]}` }))} />
  </AppShell>;
}
