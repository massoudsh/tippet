import { cn } from "@/lib/utils";
import { BottomNav } from "@/components/layout/bottom-nav";
import { SiteHeader } from "@/components/layout/site-header";

interface AppShellProps {
  children: React.ReactNode;
  active?: "home" | "feed" | "search" | "seller" | "profile" | "none";
  className?: string;
  showBottomNav?: boolean;
  compactHeader?: boolean;
}

export function AppShell({
  children,
  active = "none",
  className,
  showBottomNav = true,
  compactHeader = false,
}: AppShellProps) {
  return (
    <div className="relative min-h-screen overflow-x-clip text-foreground">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-24 top-10 size-72 rounded-full bg-primary/20 blur-3xl animate-float" />
        <div className="absolute -right-16 bottom-24 size-80 rounded-full bg-brand/15 blur-3xl" />
        <div className="absolute left-1/3 top-1/2 size-56 -translate-y-1/2 rounded-full bg-ring/10 blur-3xl" />
      </div>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:right-2 focus:z-50 focus:rounded-control focus:bg-background focus:p-3">
        رفتن به محتوای اصلی
      </a>
      <SiteHeader active={active} compact={compactHeader} />
      <main id="main-content" tabIndex={-1} className={cn("mx-auto w-full max-w-6xl px-4 pb-28 pt-6 sm:px-6", className)}>{children}</main>
      {showBottomNav && <BottomNav active={active} />}
    </div>
  );
}
