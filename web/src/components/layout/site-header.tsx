import { LinkButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const desktopLinks = [
  { href: "/feed", label: "فید", key: "feed" },
  { href: "/search", label: "جست‌وجو", key: "search" },
  { href: "/seller", label: "فروشنده", key: "seller" },
  { href: "/profile", label: "پروفایل", key: "profile" },
  { href: "/outfits", label: "ست‌سازی", key: "none" },
] as const;

type Active = "home" | "feed" | "search" | "seller" | "profile" | "none";

export function SiteHeader({ active = "none", compact = false }: { active?: Active; compact?: boolean }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border surface-glass-strong">
      <div
        className={cn(
          "mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6",
          compact ? "py-3" : "py-4",
        )}
      >
        <a href="/" className="min-w-0" aria-label="تیپت — صفحه اصلی">
          <p className="text-xl font-display leading-none tracking-tight">تیپت</p>
          <p className="mt-1 truncate text-xs text-muted-foreground">کشف هوشمند لباس دست‌دوم</p>
        </a>
        <nav className="hidden items-center gap-1 text-sm text-muted-foreground md:flex" aria-label="منوی اصلی">
          {desktopLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-control px-3 py-1.5 transition-all duration-motion ease-motion hover:bg-accent hover:text-foreground",
                active === link.key && "bg-accent font-semibold text-foreground shadow-control",
              )}
              aria-current={active === link.key ? "page" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LinkButton href="/seller/new" variant="outline" size="sm" className="hidden sm:inline-flex">
            ثبت آگهی
          </LinkButton>
          <LinkButton href="/auth" variant="brand" size="sm">
            ورود
          </LinkButton>
        </div>
      </div>
    </header>
  );
}
