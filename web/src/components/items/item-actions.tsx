"use client";

import { useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button, LinkButton } from "@/components/ui/button";

interface ItemActionsProps {
  itemId: string;
  whatsappUrl?: string | null;
  telegramUrl?: string | null;
  showPhase2Links?: boolean;
}

export function ItemActions({
  itemId,
  whatsappUrl,
  telegramUrl,
  showPhase2Links = false,
}: ItemActionsProps) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<"like" | "save" | "contact" | null>(null);

  async function interact(type: "LIKE" | "SAVE" | "CONTACT_SELLER") {
    setLoading(type === "LIKE" ? "like" : type === "SAVE" ? "save" : "contact");
    setMessage("");
    setError("");
    try {
      const response = await fetch("/api/interactions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ itemId, type }),
      });
      const payload = await response.json();
      if (response.status === 401) {
        setError("برای ثبت پسند یا ذخیره، ابتدا وارد شو.");
        return;
      }
      if (!response.ok) throw new Error(payload.error || "ثبت تعامل ناموفق بود.");
      setMessage(
        type === "LIKE" ? "به سلیقه‌ات اضافه شد." : type === "SAVE" ? "آیتم ذخیره شد." : "درخواست تماس ثبت شد.",
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "ثبت تعامل ناموفق بود.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button variant="brand" loading={loading === "like"} onClick={() => interact("LIKE")}>
          پسندیدن
        </Button>
        <Button variant="secondary" loading={loading === "save"} onClick={() => interact("SAVE")}>
          ذخیره
        </Button>
        <Button variant="outline" loading={loading === "contact"} onClick={() => interact("CONTACT_SELLER")}>
          ثبت تماس با فروشنده
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {whatsappUrl ? (
          <LinkButton href={whatsappUrl} variant="outline" target="_blank" rel="noreferrer">
            واتساپ فروشنده
          </LinkButton>
        ) : (
          <Button variant="outline" disabled title="لینک واتساپ هنوز ثبت نشده">
            واتساپ (به‌زودی)
          </Button>
        )}
        {telegramUrl ? (
          <LinkButton href={telegramUrl} variant="outline" target="_blank" rel="noreferrer">
            تلگرام فروشنده
          </LinkButton>
        ) : (
          <Button variant="outline" disabled title="لینک تلگرام هنوز ثبت نشده">
            تلگرام (به‌زودی)
          </Button>
        )}
        {showPhase2Links && (
          <>
            <Button variant="ghost" disabled title="چت داخلی در فازهای بعد فعال می‌شود">
              چت داخلی (به‌زودی)
            </Button>
            <Button variant="ghost" disabled title="پرداخت امن در فازهای بعد فعال می‌شود">
              پرداخت امن (به‌زودی)
            </Button>
          </>
        )}
      </div>

      {message && <Alert variant="success">{message}</Alert>}
      {error && (
        <Alert variant="destructive">
          {error}
          {error.includes("وارد") && (
            <div className="mt-2">
              <LinkButton href="/auth" size="sm">
                ورود
              </LinkButton>
            </div>
          )}
        </Alert>
      )}
    </div>
  );
}
