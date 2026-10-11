import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { ItemCard } from "@/components/items/item-card";
import { Alert } from "@/components/ui/alert";
import { LinkButton } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { getSessionUser } from "@/lib/auth";
import { listItems } from "@/lib/items";
import { prisma } from "@/lib/prisma";

export default async function FeedPage() {
  const user = await getSessionUser();
  const [items, profile] = await Promise.all([
    listItems({}),
    user ? prisma.styleProfile.findUnique({ where: { userId: user.id } }) : null,
  ]);
  const rankedItems = items
    .map((item) => ({ item, score: scoreItem(item, profile) }))
    .sort((a, b) => b.score - a.score);

  return (
    <AppShell active="feed" className="space-y-6">
      <PageHeader
        eyebrow="AI Discovery"
        title="فید کشف هوشمند"
        description="آگهی‌های فعال بر اساس تطابق سلیقه، رنگ، دسته و بودجه مرتب می‌شوند."
        actions={
          <>
            <LinkButton href="/search" variant="outline">
              جست‌وجو و فیلتر
            </LinkButton>
            <LinkButton href="/onboarding" variant="brand">
              تکمیل سلیقه
            </LinkButton>
          </>
        }
      />

      {!user && (
        <Alert variant="info" title="ورود نشده‌ای">
          بدون ورود، رتبه‌بندی عمومی نشان داده می‌شود. برای تطابق دقیق‌تر وارد شو و پروفایل سلیقه بساز.
          <div className="mt-3">
            <LinkButton href="/auth" size="sm">
              ورود با موبایل
            </LinkButton>
          </div>
        </Alert>
      )}

      {user && !profile && (
        <Alert variant="warning" title="پروفایل سلیقه ناقص است">
          چند سؤال کوتاه، دقت فید را بالا می‌برد.
          <div className="mt-3">
            <LinkButton href="/onboarding" size="sm" variant="brand">
              ساخت پروفایل
            </LinkButton>
          </div>
        </Alert>
      )}

      {rankedItems.length === 0 ? (
        <EmptyState
          title="هنوز آگهی فعالی وجود ندارد"
          description="اولین فروشنده باش و آگهی وینتیج/استریت‌ویر تهران را ثبت کن."
          action={
            <LinkButton href="/seller/new" variant="brand">
              ثبت اولین آگهی
            </LinkButton>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rankedItems.map(({ item, score }) => (
            <ItemCard
              key={item.id}
              href={`/items/${item.id}`}
              title={item.title}
              meta={`${item.category.name} · ${item.size ?? "سایز ثبت نشده"} · ${item.city}`}
              price={item.price}
              matchPercent={score}
              imageUrl={item.images[0]?.url}
            />
          ))}
        </div>
      )}
    </AppShell>
  );
}

function scoreItem(
  item: Awaited<ReturnType<typeof listItems>>[number],
  profile: Awaited<ReturnType<typeof prisma.styleProfile.findUnique>>,
) {
  if (!profile) return 50;
  const sizes = Array.isArray((profile.sizeInfo as { sizes?: unknown } | null)?.sizes)
    ? (profile.sizeInfo as { sizes: string[] }).sizes
    : [];
  return Math.min(
    100,
    30 +
      (profile.preferredCategories.includes(item.category.name) ? 25 : 0) +
      (item.color && profile.preferredColors.includes(item.color) ? 20 : 0) +
      (item.size && sizes.includes(item.size) ? 15 : 0) +
      (!profile.budgetMax || item.price <= profile.budgetMax ? 10 : 0),
  );
}
