import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatToman, faPercent, cn } from "@/lib/utils";

export interface ItemCardProps {
  href: string;
  title: string;
  meta: string;
  price: number;
  matchPercent?: number;
  imageUrl?: string | null;
  className?: string;
}

export function ItemCard({ href, title, meta, price, matchPercent, imageUrl, className }: ItemCardProps) {
  return (
    <a href={href} className={cn("group block", className)}>
      <Card className="overflow-hidden hover:border-primary/35 hover:shadow-overlay">
        <div className="aspect-[4/3] bg-secondary/80">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-muted-foreground">بدون تصویر</div>
          )}
        </div>
        <div className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-2">
            <h2 className="line-clamp-2 text-base font-semibold leading-6">{title}</h2>
            {typeof matchPercent === "number" && <Badge variant="brand">{faPercent(matchPercent)} تطابق</Badge>}
          </div>
          <p className="line-clamp-2 text-sm text-muted-foreground">{meta}</p>
          <p className="font-semibold">{formatToman(price)}</p>
        </div>
      </Card>
    </a>
  );
}
