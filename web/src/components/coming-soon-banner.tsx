export function ComingSoonBanner({ feature }: { feature: string }) {
  return (
    <aside
      aria-label={`وضعیت ${feature}`}
      className="rounded-2xl border border-amber-300/30 bg-amber-300/10 px-4 py-3 text-sm leading-7 text-amber-100"
    >
      <strong className="font-black">پیش‌نمایش فاز ۳</strong>
      <span className="mx-2 text-amber-200/70">·</span>
      {feature} هنوز فعال نشده و این صفحه فقط برای نمایش روند آینده است.
    </aside>
  );
}
