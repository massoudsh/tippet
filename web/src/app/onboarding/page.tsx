"use client";

import { FormEvent, useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Alert } from "@/components/ui/alert";
import { Button, LinkButton } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/input";
import { Stepper } from "@/components/ui/stepper";
import { calculateStyleProfileCompleteness } from "@/lib/onboarding";
import { cn, en, faPercent } from "@/lib/utils";

const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "Free"];
const CATEGORY_OPTIONS = ["کت", "هودی", "شلوار", "بارانی", "کفش", "تی‌شرت"];
const COLOR_OPTIONS = ["مشکی", "آبی", "آبی نفتی", "سفید", "کرم", "قهوه‌ای"];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [sizes, setSizes] = useState<string[]>(["M"]);
  const [categories, setCategories] = useState<string[]>(["کت", "هودی"]);
  const [colors, setColors] = useState<string[]>(["مشکی"]);
  const [budgetMin, setBudgetMin] = useState("700000");
  const [budgetMax, setBudgetMax] = useState("3000000");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const completeness = useMemo(
    () =>
      calculateStyleProfileCompleteness({
        sizes,
        categories,
        colors,
        budgetMin: Number(en(budgetMin)) || undefined,
        budgetMax: Number(en(budgetMax)) || undefined,
        inspirationCount: colors.length > 0 ? 2 : 0,
      }),
    [sizes, categories, colors, budgetMin, budgetMax],
  );

  function toggle(list: string[], value: string, setter: (next: string[]) => void) {
    setter(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await fetch("/api/style-profile", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          sizes,
          preferredCategories: categories,
          preferredColors: colors,
          budgetMin: Number(en(budgetMin)) || undefined,
          budgetMax: Number(en(budgetMax)) || undefined,
        }),
      });
      const payload = await response.json();
      if (response.status === 401) {
        setError("برای ذخیره پروفایل ابتدا وارد شو.");
        return;
      }
      if (!response.ok) throw new Error(payload.error || "ذخیره پروفایل ناموفق بود.");
      setSuccess("پروفایل سلیقه ذخیره شد.");
      window.location.assign("/feed");
    } catch (err) {
      setError(err instanceof Error ? err.message : "ذخیره پروفایل ناموفق بود.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell active="profile" className="space-y-6">
      <PageHeader
        eyebrow="حل cold start"
        title="پروفایل سلیقه را در چند سؤال بساز"
        description="سایز، دسته، رنگ و بودجه برای رتبه‌بندی فید کشف استفاده می‌شود."
        actions={
          <div className="rounded-control bg-brand px-4 py-3 text-brand-foreground">
            <p className="text-xs font-medium">کامل‌بودن</p>
            <p className="text-2xl font-display">{faPercent(completeness)}</p>
          </div>
        }
      />

      <Stepper
        current={step}
        steps={[
          { label: "سایز", description: "چه می‌پوشی" },
          { label: "سلیقه", description: "دسته و رنگ" },
          { label: "بودجه", description: "بازه خرید" },
        ]}
      />

      <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle>چرا این سؤال‌ها؟</CardTitle>
            <CardDescription>
              بدون پروفایل، فید عمومی نشان داده می‌شود. با تکمیل این مرحله، تطابق رنگ، سایز و بودجه دقیق‌تر می‌شود.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <LinkButton href="/auth" variant="outline" className="w-full">
              هنوز وارد نشدی؟ ورود با موبایل
            </LinkButton>
            <LinkButton href="/feed" variant="ghost" className="w-full">
              فعلاً رد شو و برو به فید
            </LinkButton>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-5 p-6">
            {step === 0 && (
              <ChipGroup
                label="سایزهای معمول تو"
                options={SIZE_OPTIONS}
                selected={sizes}
                onToggle={(value) => toggle(sizes, value, setSizes)}
              />
            )}
            {step === 1 && (
              <div className="space-y-5">
                <ChipGroup
                  label="دسته‌های موردعلاقه"
                  options={CATEGORY_OPTIONS}
                  selected={categories}
                  onToggle={(value) => toggle(categories, value, setCategories)}
                />
                <ChipGroup
                  label="رنگ‌های محبوب"
                  options={COLOR_OPTIONS}
                  selected={colors}
                  onToggle={(value) => toggle(colors, value, setColors)}
                />
              </div>
            )}
            {step === 2 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="حداقل بودجه (تومان)" htmlFor="budgetMin">
                  <Input
                    id="budgetMin"
                    dir="ltr"
                    inputMode="numeric"
                    value={budgetMin}
                    onChange={(e) => setBudgetMin(e.target.value)}
                  />
                </Field>
                <Field label="حداکثر بودجه (تومان)" htmlFor="budgetMax">
                  <Input
                    id="budgetMax"
                    dir="ltr"
                    inputMode="numeric"
                    value={budgetMax}
                    onChange={(e) => setBudgetMax(e.target.value)}
                  />
                </Field>
              </div>
            )}

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
              <Button
                type="button"
                variant="outline"
                disabled={step === 0 || loading}
                onClick={() => setStep((value) => Math.max(0, value - 1))}
              >
                مرحله قبل
              </Button>
              {step < 2 ? (
                <Button
                  type="button"
                  onClick={() => setStep((value) => Math.min(2, value + 1))}
                  disabled={(step === 0 && sizes.length === 0) || (step === 1 && (categories.length === 0 || colors.length === 0))}
                >
                  مرحله بعد
                </Button>
              ) : (
                <Button type="submit" variant="brand" loading={loading} disabled={sizes.length === 0 || categories.length === 0}>
                  ذخیره و رفتن به فید
                </Button>
              )}
            </div>

            {error && <Alert variant="destructive">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
          </CardContent>
        </Card>
      </form>
    </AppShell>
  );
}

function ChipGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-medium">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(option)}
              className={cn(
                "min-h-11 rounded-control border-line px-4 text-sm font-medium transition-colors duration-motion ease-motion",
                active
                  ? "border-brand bg-brand text-brand-foreground"
                  : "border-border bg-field text-foreground hover:bg-accent",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
