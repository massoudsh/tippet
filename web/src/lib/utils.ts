export type ClassValue = string | number | bigint | null | undefined | false | ClassValue[];

/** Minimal class joiner (swap for clsx + tailwind-merge when the library grows). */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  for (const i of inputs) {
    if (!i) continue;
    if (Array.isArray(i)) {
      const nested = cn(...i);
      if (nested) out.push(nested);
    } else {
      out.push(String(i));
    }
  }
  return out.join(" ");
}

const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** Convert Latin digits in a string/number to Persian digits: 1405 -> ۱۴۰۵ */
export function fa(value: string | number): string {
  return String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);
}

/** Persian digits back to Latin (for parsing user input). */
export function en(value: string): string {
  return value
    .replace(/[۰-۹]/g, (d) => String(FA_DIGITS.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660));
}

/** Thousands-separated Persian number: 12450000 -> ۱۲٬۴۵۰٬۰۰۰ */
export function faNumber(value: number): string {
  return fa(Math.round(value).toLocaleString("en-US")).replace(/,/g, "٬");
}

/** Amount in toman with unit: 12450000 -> ۱۲٬۴۵۰٬۰۰۰ تومان */
export function formatToman(value: number): string {
  return `${faNumber(value)} تومان`;
}

/** Percent with Persian digits and the Persian percent sign: 18 -> ۱۸٪ */
export function faPercent(value: number, digits = 0): string {
  return `${fa(value.toFixed(digits))}٪`;
}

/** Normalize Iranian mobile to 09xxxxxxxxx or null. */
export function normalizeIranMobile(raw: string): string | null {
  const digits = en(raw).replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("09")) return digits;
  if (digits.length === 10 && digits.startsWith("9")) return `0${digits}`;
  if (digits.length === 12 && digits.startsWith("98")) return `0${digits.slice(2)}`;
  if (digits.length === 13 && digits.startsWith("098")) return `0${digits.slice(3)}`;
  return null;
}
