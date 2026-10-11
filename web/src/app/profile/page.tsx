import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { LogoutButton } from "@/components/auth/logout-button";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatToman } from "@/lib/utils";

export default async function ProfilePage() {
  const user = await getSessionUser();
  const profile = user
    ? await prisma.styleProfile.findUnique({ where: { userId: user.id } })
    : null;
  const sizes = Array.isArray((profile?.sizeInfo as { sizes?: unknown } | null)?.sizes)
    ? (profile?.sizeInfo as { sizes: string[] }).sizes
    : [];

  return (
    <AppShell active="profile" className="space-y-6">
      <PageHeader
        eyebrow="پروفایل سلیقه"
        title="سلیقه، سایز و بودجه خریدار"
        description="این پروفایل مبنای رتبه‌بندی فید کشف و پیشنهاد آیتم‌های نزدیک به سلیقه است."
        actions={
          <>
            <LinkButton href="/onboarding" variant="brand">
              ویرایش سلیقه
            </LinkButton>
            <LinkButton href="/feed" variant="outline">
              مشاهده فید
            </LinkButton>
          </>
        }
      />

      {!user && (
        <EmptyState
          title="برای دیدن پروفایل وارد شو"
          description="ورود با موبایل OTP کافی است؛ بعد می‌توانی سلیقه‌ات را ذخیره کنی."
          action={
            <LinkButton href="/auth" variant="brand">
              ورود با موبایل
            </LinkButton>
          }
        />
      )}

      {user && !profile && (
        <EmptyState
          title="پروفایل سلیقه هنوز ساخته نشده"
          description="با چند سؤال کوتاه، فید کشف شخصی‌سازی می‌شود."
          action={
            <LinkButton href="/onboarding" variant="brand">
              شروع ساخت پروفایل
            </LinkButton>
          }
        />
      )}

      {user && profile && (
        <>
          <Alert variant="success" title="پروفایل فعال است">
            شماره واردشده: <span dir="ltr">{user.phone}</span>
          </Alert>
          <div className="grid gap-4 md:grid-cols-2">
            <ProfileCard title="سایزها" values={sizes} empty="سایزی ثبت نشده" />
            <ProfileCard title="دسته‌های محبوب" values={profile.preferredCategories} empty="دسته‌ای ثبت نشده" />
            <ProfileCard title="رنگ‌ها" values={profile.preferredColors} empty="رنگی ثبت نشده" />
            <Card>
              <CardHeader>
                <CardTitle>بودجه خرید</CardTitle>
                <CardDescription>بازه‌ای که برای پیشنهادها در نظر گرفته می‌شود.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-display text-brand">
                  {profile.budgetMin != null || profile.budgetMax != null
                    ? `${profile.budgetMin != null ? formatToman(profile.budgetMin) : "بدون کف"} تا ${
                        profile.budgetMax != null ? formatToman(profile.budgetMax) : "بدون سقف"
                      }`
                    : "بودجه‌ای ثبت نشده"}
                </p>
              </CardContent>
            </Card>
          </div>
          <LogoutButton />
        </>
      )}
    </AppShell>
  );
}

function ProfileCard({ title, values, empty }: { title: string; values: string[]; empty: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {values.length === 0 ? (
          <p className="text-sm text-muted-foreground">{empty}</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {values.map((value) => (
              <Badge key={value} variant="secondary">
                {value}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
