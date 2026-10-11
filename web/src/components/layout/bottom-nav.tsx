import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "خانه", key: "home" },
  { href: "/feed", label: "فید", key: "feed" },
  { href: "/search", label: "جست‌وجو", key: "search" },
  { href: "/seller", label: "فروش", key: "seller" },
  { href: "/profile", label: "پروفایل", key: "profile" },
] as const;

type Active = "home" | "feed" | "search" | "seller" | "profile" | "none";

export function BottomNav({ active = "none" }: { active?: Active }) {
  return (
    <nav
      aria-label="ناوبری پایین"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border surface-glass-strong md:hidden"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-5 px-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1">
        {items.map((item) => {
          const isActive = active === item.key;
          return (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-control px-1 text-[11px] transition-all duration-motion ease-motion",
                  isActive
                    ? "bg-accent/80 font-semibold text-primary shadow-control"
                    : "text-muted-foreground hover:bg-accent/40 hover:text-foreground",
                )}
              >
                <span
                  aria-hidden
                  className={cn("size-1.5 rounded-full", isActive ? "bg-primary" : "bg-transparent")}
                />
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
