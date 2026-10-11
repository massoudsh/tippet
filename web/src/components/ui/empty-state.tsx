import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  iconLabel?: string;
}

/** حالت خالی — بگو چه چیزی نیست و یک قدم بعدی بده. */
export function EmptyState({ title, description, action, className, iconLabel = "خالی" }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 rounded-surface border border-dashed border-input surface-glass p-8 text-center",
        className,
      )}
    >
      <span
        aria-hidden
        className="flex size-11 items-center justify-center rounded-full border-line border-border bg-accent text-xs font-semibold text-muted-foreground backdrop-blur-md"
      >
        {iconLabel.slice(0, 1)}
      </span>
      <p className="mt-1 text-sm font-medium">{title}</p>
      {description && <p className="max-w-sm text-xs leading-6 text-muted-foreground">{description}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}
