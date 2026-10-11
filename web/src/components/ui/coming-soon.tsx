import { Alert } from "@/components/ui/alert";
import { LinkButton } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ComingSoonProps {
  eyebrow: string;
  title: string;
  description: string;
  phaseLabel?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

/** الگوی صیقلی برای فیچرهایی که بک‌اند/فازشان آماده نیست. */
export function ComingSoonBanner({
  eyebrow,
  title,
  description,
  phaseLabel = "به‌زودی",
  primaryHref = "/feed",
  primaryLabel = "برو به فید کشف",
  secondaryHref = "/",
  secondaryLabel = "صفحه اصلی",
}: ComingSoonProps) {
  return (
    <Card>
      <CardHeader>
        <p className="text-sm font-semibold text-brand">{eyebrow}</p>
        <CardTitle className="text-2xl font-display sm:text-3xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="warning" title={phaseLabel}>
          این قابلیت در فاز فعلی به‌صورت نمایشی/منطقی آماده است؛ عملیات واقعی هنوز فعال نشده.
        </Alert>
        <div className="flex flex-col gap-2 sm:flex-row">
          <LinkButton href={primaryHref}>{primaryLabel}</LinkButton>
          <LinkButton href={secondaryHref} variant="outline">
            {secondaryLabel}
          </LinkButton>
        </div>
      </CardContent>
    </Card>
  );
}
