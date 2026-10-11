import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  shimmer,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { shimmer?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "rounded-md bg-secondary",
        shimmer
          ? "relative overflow-hidden before:absolute before:inset-0 before:animate-shine before:bg-gradient-to-l before:from-transparent before:via-foreground/10 before:to-transparent"
          : "animate-pulse-soft",
        className,
      )}
      {...props}
    />
  );
}

export function ItemCardSkeleton() {
  return (
    <div className="rounded-surface border-line border-border bg-card p-5">
      <Skeleton className="mb-4 aspect-[4/3] w-full rounded-overlay" />
      <Skeleton className="h-3 w-20" />
      <Skeleton className="mt-3 h-5 w-3/4" />
      <Skeleton className="mt-3 h-3 w-1/2" />
      <Skeleton className="mt-5 h-4 w-28" />
    </div>
  );
}
