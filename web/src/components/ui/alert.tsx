import { cn } from "@/lib/utils";

type Variant = "info" | "success" | "warning" | "destructive";

const styles: Record<Variant, string> = {
  info: "border-border surface-glass text-foreground",
  success: "border-success/25 bg-success/10 text-success backdrop-blur-md",
  warning: "border-warning/25 bg-warning/10 text-warning backdrop-blur-md",
  destructive: "border-destructive/30 bg-destructive/10 text-destructive backdrop-blur-md",
};

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: Variant;
  title?: React.ReactNode;
}

export function Alert({ variant = "info", title, className, children, ...props }: AlertProps) {
  return (
    <div
      role={variant === "destructive" ? "alert" : "status"}
      className={cn("rounded-overlay border-line p-4 text-sm shadow-surface", styles[variant], className)}
      {...props}
    >
      {title && <p className="font-semibold">{title}</p>}
      {children && <div className={cn("text-foreground/80", title && "mt-1")}>{children}</div>}
    </div>
  );
}
