import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "secondary" | "outline" | "success" | "warning" | "brand" | "destructive" | "soft";

const variants: Record<Variant, string> = {
  default: "bg-primary text-primary-foreground shadow-control",
  secondary: "border-line border-border bg-secondary text-secondary-foreground backdrop-blur-md",
  outline: "border-line border-border bg-card/50 text-foreground backdrop-blur-md",
  success: "border-line border-success/30 bg-success/15 text-success backdrop-blur-md",
  warning: "border-line border-warning/30 bg-warning/15 text-warning backdrop-blur-md",
  brand: "bg-brand text-brand-foreground shadow-control",
  destructive: "border-line border-destructive/30 bg-destructive/15 text-destructive backdrop-blur-md",
  soft: "border-line border-border bg-accent text-foreground backdrop-blur-md",
};

export function Badge({
  className,
  variant = "soft",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium leading-5",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
