import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "تیپت | کشف هوشمند لباس دست‌دوم",
  description: "کشف هوشمند لباس دست‌دوم، متناسب با سلیقه‌ی تو",
};

// یادداشت: برای فونت فارسی کامل، تقویم شمسی و راست‌چینی حرفه‌ای،
// مهارت «فارسی‌سازی حرفه‌ای» پروژه قابل نصب و استفاده است.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
