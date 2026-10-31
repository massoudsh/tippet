"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { faNumber } from "@/lib/utils";

export function ImageGallery({ images, title }: { images: { id: string; url: string }[]; title: string }) {
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const touchStart = useRef<number | null>(null);
  const zoomButton = useRef<HTMLButtonElement>(null);
  if (!images.length) return <p className="flex aspect-[4/3] items-center justify-center rounded-surface bg-secondary">تصویری ثبت نشده است.</p>;
  const image = images[index];
  const move = (delta: number) => setIndex((value) => (value + delta + images.length) % images.length);
  return <section aria-label="تصویرهای کالا" className="space-y-3" onKeyDown={(event) => {
    if (event.key === "ArrowRight") { event.preventDefault(); move(-1); }
    if (event.key === "ArrowLeft") { event.preventDefault(); move(1); }
  }}>
    <button ref={zoomButton} type="button" aria-label="بزرگ‌نمایی تصویر" onClick={() => dialog.current?.showModal()} className="block aspect-[4/3] w-full overflow-hidden rounded-surface bg-secondary" onTouchStart={(event) => { touchStart.current = event.changedTouches[0].clientX; }} onTouchEnd={(event) => {
      if (touchStart.current !== null && Math.abs(event.changedTouches[0].clientX - touchStart.current) > 50) move(event.changedTouches[0].clientX > touchStart.current ? 1 : -1);
      touchStart.current = null;
    }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image.url} alt={`${title} — تصویر ${faNumber(index + 1)}`} width={768} height={576} decoding="async" className="h-full w-full object-contain" />
    </button>
    <div className="flex items-center justify-between gap-2">
      <Button variant="outline" disabled={images.length < 2} onClick={() => move(-1)}>قبلی</Button>
      <p role="status">{faNumber(index + 1)} از {faNumber(images.length)}</p>
      <Button variant="outline" disabled={images.length < 2} onClick={() => move(1)}>بعدی</Button>
    </div>
    <dialog ref={dialog} aria-label={`بزرگ‌نمایی ${title}`} onClose={() => zoomButton.current?.focus()} className="max-h-[90dvh] max-w-[95vw] rounded-surface border border-border bg-background p-4 text-foreground backdrop:bg-black/70">
      <Button variant="outline" onClick={() => dialog.current?.close()}>بستن تصویر</Button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image.url} alt={title} width={1200} height={900} className="max-h-[75dvh] w-auto object-contain" />
    </dialog>
  </section>;
}
