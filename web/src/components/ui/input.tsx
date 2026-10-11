import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startAddon?: React.ReactNode;
  endAddon?: React.ReactNode;
  error?: string;
}

export function Input({ className, type, startAddon, endAddon, error, id, dir, ...props }: InputProps) {
  const grouped = Boolean(startAddon || endAddon);
  const input = (
    <input
      id={id}
      type={type}
      dir={grouped ? undefined : dir}
      aria-invalid={error ? true : undefined}
      className={cn(
        "flex w-full min-w-0 text-sm text-foreground placeholder:text-muted-foreground/70",
        "disabled:cursor-not-allowed disabled:opacity-50",
        grouped
          ? "h-full bg-transparent px-0 outline-none"
          : cn(
              "h-11 rounded-field border-line-field border-input bg-field shadow-field px-3 backdrop-blur-md transition-all duration-motion ease-motion",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:border-transparent",
              "aria-invalid:border-destructive/60",
            ),
        className,
      )}
      {...props}
    />
  );

  if (!grouped) return withError(input, error);

  return withError(
    <div
      dir={dir}
      className={cn(
        "flex h-11 w-full items-center gap-2 rounded-field border-line-field border-input bg-field shadow-field px-3 text-sm backdrop-blur-md transition-all duration-motion ease-motion",
        "focus-within:border-transparent focus-within:ring-2 focus-within:ring-ring/60",
        error && "border-destructive/60",
      )}
    >
      {startAddon && <span className="shrink-0 text-muted-foreground">{startAddon}</span>}
      {input}
      {endAddon && <span className="shrink-0 text-muted-foreground">{endAddon}</span>}
    </div>,
    error,
  );
}

function withError(node: React.ReactNode, error?: string) {
  if (!error) return node;
  return (
    <div className="space-y-1.5">
      {node}
      <p className="text-xs text-destructive">{error}</p>
    </div>
  );
}

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("text-sm font-medium text-foreground/90", className)} {...props} />;
}

export function Field({
  label,
  htmlFor,
  hint,
  className,
  children,
}: {
  label: React.ReactNode;
  htmlFor?: string;
  hint?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function Textarea({
  className,
  error,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }) {
  const node = (
    <textarea
      aria-invalid={error ? true : undefined}
      className={cn(
        "min-h-28 w-full rounded-field border-line-field border-input bg-field px-3 py-3 text-sm text-foreground shadow-field backdrop-blur-md",
        "placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
        "disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive/60",
        className,
      )}
      {...props}
    />
  );
  return withError(node, error);
}

export function Select({
  className,
  error,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { error?: string }) {
  const node = (
    <select
      aria-invalid={error ? true : undefined}
      className={cn(
        "h-11 w-full rounded-field border-line-field border-input bg-field px-3 text-sm text-foreground shadow-field backdrop-blur-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
        "disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive/60",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
  return withError(node, error);
}
