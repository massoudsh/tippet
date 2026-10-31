"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Alert } from "@/components/ui/alert";
import { Button, LinkButton } from "@/components/ui/button";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <AppShell className="space-y-5"><Alert variant="destructive" title="بارگذاری انجام نشد">اتصال را بررسی کن و دوباره تلاش کن. اگر مشکل ادامه داشت، بعداً برگرد.</Alert><Button onClick={reset}>تلاش دوباره</Button><LinkButton href="/" variant="outline">صفحهٔ اصلی</LinkButton></AppShell>;
}
