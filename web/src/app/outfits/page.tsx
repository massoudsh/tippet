import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ComingSoonBanner } from "@/components/ui/coming-soon";
import { LinkButton } from "@/components/ui/button";
import { catalogItems } from "@/lib/catalog";
import { buildSimpleOutfit } from "@/lib/outfit";
import { formatToman } from "@/lib/utils";

const outfit = buildSimpleOutfit(catalogItems[0], catalogItems);

export default function OutfitsPage() {
  return (
    <AppShell active="none" className="space-y-6">
      <PageHeader
        eyebrow="Outfit Builder ساده"
        title="ست پیشنهادی بر اساس یک آیتم اصلی"
        description="در فاز فعلی یک آیتم اصلی انتخاب و دو آیتم مکمل از همان کاتالوگ پیشنهاد می‌شود."
        actions={
          <LinkButton href="/feed" variant="outline">
            برو به فید
          </LinkButton>
        }
      />

      <ComingSoonBanner
        eyebrow="فاز ۲"
        title="ست‌سازی کامل هنوز آماده نیست"
        description="نسخه ساده مکمل‌ها اینجاست؛ پیشنهاد ست کامل و تحلیل فرم بدن در فازهای بعد می‌آید."
        phaseLabel="نسخه ساده فعال · کامل‌سازی به‌زودی"
        primaryHref="/items/vintage-denim-jacket"
        primaryLabel="دیدن آیتم اصلی"
      />

      <div className="grid gap-4 md:grid-cols-3">
        {[outfit.anchor, ...outfit.complements].map((item, index) => (
          <Card key={item.id}>
            <CardContent className="space-y-4 p-5">
              <Badge variant={index === 0 ? "brand" : "soft"}>{index === 0 ? "آیتم اصلی" : "مکمل"}</Badge>
              <h2 className="text-xl font-display">{item.title}</h2>
              <p className="text-sm text-muted-foreground">
                {item.category} · {item.color} · {item.size}
              </p>
              <p className="font-semibold">{formatToman(item.price)}</p>
              <LinkButton
                href={item.id === "vintage-denim-jacket" ? "/items/vintage-denim-jacket" : "/feed"}
                variant="outline"
                size="sm"
              >
                مشاهده
              </LinkButton>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
