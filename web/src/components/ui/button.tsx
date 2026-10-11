import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "secondary" | "outline" | "ghost" | "brand" | "destructive";
type Size = "sm" | "md" | "lg" | "icon";

const variants: Record<Variant, string> = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-control",
  secondary:
    "border-line border-border bg-secondary text-secondary-foreground shadow-control backdrop-blur-md hover:bg-accent",
  outline:
    "border-line border-input bg-card/40 text-foreground shadow-control backdrop-blur-md hover:bg-accent hover:text-accent-foreground",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  brand: "bg-brand text-brand-foreground hover:bg-brand/90 shadow-control",
  destructive: "bg-destructive text-white hover:bg-destructive/90 shadow-control",
};

const sizes: Record<Size, string> = {
  sm: "h-8 min-h-8 px-3 text-[13px] gap-1.5",
  md: "h-11 min-h-11 px-4 text-sm gap-2",
  lg: "h-12 min-h-12 px-6 text-base gap-2.5",
  icon: "size-11 min-h-11 min-w-11",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

export function Button({
  className,
  variant = "default",
  size = "md",
  type = "button",
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-control font-semibold transition-all duration-motion ease-motion",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50 active:shadow-press active:[transform:var(--press)]",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {loading ? "در حال انجام…" : children}
    </button>
  );
}

export interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
}

export function LinkButton({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: LinkButtonProps) {
  return (
    <a
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-control font-semibold transition-all duration-motion ease-motion",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "active:shadow-press active:[transform:var(--press)]",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
