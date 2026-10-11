import { AppShell } from "@/components/layout/app-shell";
import { EmptyState } from "@/components/ui/empty-state";
import { LinkButton } from "@/components/ui/button";

export default function NotFound() {
  return (
    <AppShell active="none" className="space-y-6">
      <EmptyState
        title="این صفحه پیدا نشد"
        description="آدرس اشتباه است یا آگهی حذف شده. از فید یا جست‌وجو ادامه بده."
        action={
          <div className="flex flex-col gap-2 sm:flex-row">
            <LinkButton href="/feed" variant="brand">
              فید کشف
            </LinkButton>
            <LinkButton href="/search" variant="outline">
              جست‌وجو
            </LinkButton>
          </div>
        }
      />
    </AppShell>
  );
}
