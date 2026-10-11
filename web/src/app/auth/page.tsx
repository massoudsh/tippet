"use client";

import { FormEvent, useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Alert } from "@/components/ui/alert";
import { Button, LinkButton } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/input";
import { OtpField } from "@/components/ui/otp-field";
import { Stepper } from "@/components/ui/stepper";
import { normalizeIranMobile } from "@/lib/utils";

type Step = "phone" | "otp";

export default function AuthPage() {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [developmentCode, setDevelopmentCode] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const phoneError = useMemo(() => {
    if (!phone) return "";
    return normalizeIranMobile(phone) ? "" : "شماره باید با ۰۹ شروع شود و ۱۱ رقم باشد.";
  }, [phone]);

  async function requestOtp(event?: FormEvent) {
    event?.preventDefault();
    const normalized = normalizeIranMobile(phone);
    if (!normalized) {
      setError("شماره موبایل معتبر نیست.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ phone: normalized }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "ارسال کد ناموفق بود.");
      setPhone(normalized);
      setDevelopmentCode(payload.developmentCode ?? null);
      setSuccess("کد تأیید ارسال شد. تا پنج دقیقه اعتبار دارد.");
      setStep("otp");
    } catch (err) {
      setError(err instanceof Error ? err.message : "ارسال کد ناموفق بود.");
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp(event?: FormEvent, nextCode = code) {
    event?.preventDefault();
    const normalized = normalizeIranMobile(phone);
    if (!normalized) {
      setError("ابتدا شماره موبایل را وارد کن.");
      setStep("phone");
      return;
    }
    if (nextCode.length !== 6) {
      setError("کد تأیید باید شش رقم باشد.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ phone: normalized, code: nextCode }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "تأیید کد ناموفق بود.");
      setSuccess("ورود موفق بود. در حال انتقال…");
      window.location.assign("/onboarding");
    } catch (err) {
      setError(err instanceof Error ? err.message : "تأیید کد ناموفق بود.");
      setLoading(false);
    }
  }

  return (
    <AppShell active="none" showBottomNav={false} className="max-w-5xl space-y-6">
      <PageHeader
        eyebrow="ورود امن با موبایل"
        title="احراز هویت OTP برای خریدار و فروشنده"
        description="کد یک‌بارمصرف پیامکی؛ بدون رمز عبور. بعد از ورود می‌توانی پروفایل سلیقه یا آگهی بسازی."
      />

      <Stepper
        current={step === "phone" ? 0 : 1}
        steps={[
          { label: "شماره موبایل", description: "دریافت کد" },
          { label: "کد تأیید", description: "ورود به تیپت" },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardContent className="space-y-4 p-6">
            <p className="text-sm leading-7 text-muted-foreground">
              شماره فقط برای ورود و تماس امن استفاده می‌شود. تعداد درخواست کد برای هر شماره محدود است.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• فرمت قابل قبول: ۰۹۱۲۱۲۳۴۵۶۷</li>
              <li>• کد شش‌رقمی تا پنج دقیقه معتبر است</li>
              <li>• پس از ورود به ساخت پروفایل سلیقه هدایت می‌شوی</li>
            </ul>
            <LinkButton href="/" variant="ghost" className="px-0">
              بازگشت به صفحه اصلی
            </LinkButton>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-5 p-6">
            {step === "phone" ? (
              <form onSubmit={requestOtp} className="space-y-4">
                <Field label="شماره موبایل" htmlFor="phone" hint="کد کشور ایران به‌صورت +۹۸ در نظر گرفته می‌شود.">
                  <Input
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    dir="ltr"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="09121234567"
                    startAddon="+98"
                    error={phoneError}
                    required
                  />
                </Field>
                <Button type="submit" className="w-full" loading={loading} disabled={Boolean(phoneError) || !phone}>
                  ارسال کد تأیید
                </Button>
              </form>
            ) : (
              <form onSubmit={(e) => verifyOtp(e)} className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-muted-foreground">
                    کد برای <span dir="ltr">{phone}</span> ارسال شد.
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setStep("phone");
                      setCode("");
                      setError("");
                      setSuccess("");
                    }}
                  >
                    تغییر شماره
                  </Button>
                </div>
                <Field label="کد شش‌رقمی" htmlFor="otp">
                  <OtpField
                    value={code}
                    onChange={setCode}
                    onComplete={(value) => verifyOtp(undefined, value)}
                    disabled={loading}
                    aria-label="کد تأیید شش‌رقمی"
                  />
                </Field>
                <Button type="submit" variant="brand" className="w-full" loading={loading} disabled={code.length !== 6}>
                  تأیید و ورود
                </Button>
                <Button type="button" variant="outline" className="w-full" loading={loading} onClick={() => void requestOtp()}>
                  ارسال مجدد کد
                </Button>
              </form>
            )}

            {developmentCode && (
              <Alert variant="warning" title="کد توسعه">
                در محیط توسعه از این کد استفاده کن: <span dir="ltr">{developmentCode}</span>
              </Alert>
            )}
            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="destructive">{error}</Alert>}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
