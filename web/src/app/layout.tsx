import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "تیپت | کشف هوشمند لباس دست‌دوم",
  description: "کشف آیتم‌های وینتیج و استریت‌ویر دست‌دوم با پیشنهادهای هوشمند متناسب با سلیقه تو",
};

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
