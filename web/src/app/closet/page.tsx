import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { ItemCard } from "@/components/items/item-card";
import { LinkButton } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { itemInclude } from "@/lib/items";
import { availabilityLabels, conditionLabels } from "@/lib/product-labels";

export default async function ClosetPage() {
  const user = await getSessionUser();
  if (!user) return <AppShell active="closet"><EmptyState title="ذخیره‌های شخصی" description="برای مشاهدهٔ کالاهایی که ذخیره کرده‌ای وارد شو." action={<LinkButton href="/auth?next=/closet">ورود</LinkButton>} /></AppShell>;
  const items = await prisma.item.findMany({
    where: { interactions: { some: { userId: user.id, type: "SAVE" } } },
    include: itemInclude,
    orderBy: { updatedAt: "desc" },
  });
  return <AppShell active="closet" className="space-y-6">
    <PageHeader title="کمد ذخیره‌ها" description="ذخیره به معنی رزرو کالا نیست. وضعیت فعلی آگهی را قبل از تماس بررسی کن." actions={<LinkButton href="/feed">کشف آیتم‌ها</LinkButton>} />
    {!items.length ? <EmptyState title="هنوز چیزی ذخیره نکرده‌ای" description="در صفحهٔ هر کالا، ذخیره را بزن تا اینجا نمایش داده شود." /> : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((item) => <ItemCard key={item.id} href={`/items/${item.id}`} title={item.title} price={item.price} imageUrl={item.images[0]?.url} meta={`${availabilityLabels[item.status]} · ${conditionLabels[item.condition]} · ${item.size || "سایز ثبت نشده"}`} />)}</div>}
    <p className="text-sm text-muted-foreground">حذف ذخیره و مجموعه‌بندی هنوز پشتیبانی نمی‌شود.</p>
  </AppShell>;
}
