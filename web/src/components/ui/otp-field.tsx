"use client";

import * as React from "react";
import { cn, en, fa } from "@/lib/utils";

export interface OtpFieldProps {
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  size?: "sm" | "md";
  className?: string;
  "aria-label"?: string;
}

export function OtpField({
  length = 6,
  value,
  defaultValue = "",
  onChange,
  onComplete,
  disabled,
  size = "md",
  className,
  ...aria
}: OtpFieldProps) {
  const [internal, setInternal] = React.useState(defaultValue);
  const code = value ?? internal;
  const refs = React.useRef<(HTMLInputElement | null)[]>([]);

  function commit(next: string) {
    const clean = en(next).replace(/\D/g, "").slice(0, length);
    if (value === undefined) setInternal(clean);
    onChange?.(clean);
    if (clean.length === length) onComplete?.(clean);
    refs.current[Math.min(clean.length, length - 1)]?.focus();
  }

  return (
    <div
      className={cn("inline-flex", size === "sm" ? "gap-1" : "gap-1.5", className)}
      dir="ltr"
      role="group"
      aria-label={aria["aria-label"] ?? "کد تأیید"}
    >
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          disabled={disabled}
          value={code[i] ? fa(code[i]) : ""}
          onChange={(e) => {
            const typed = en(e.target.value).replace(/\D/g, "");
            if (typed.length > 1) return commit(code.slice(0, i) + typed);
            commit(code.slice(0, i) + typed + code.slice(i + 1));
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !code[i] && i > 0) {
              e.preventDefault();
              commit(code.slice(0, i - 1));
            }
            if (e.key === "ArrowLeft") refs.current[i - 1]?.focus();
            if (e.key === "ArrowRight") refs.current[i + 1]?.focus();
          }}
          onFocus={(e) => e.target.select()}
          className={cn(
            "shrink-0 rounded-field border-line-field border-input bg-card text-center font-semibold text-foreground caret-transparent",
            size === "sm" ? "h-11 w-9 text-sm" : "h-12 w-10 text-base",
            "transition-colors focus:border-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/40",
            "disabled:opacity-50",
          )}
        />
      ))}
    </div>
  );
}
