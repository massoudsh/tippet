"use client";

import { useEffect } from "react";

type InteractionType = "VIEW" | "CONTACT_SELLER";

function recordInteraction(itemId: string, type: InteractionType) {
  void fetch("/api/interactions", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ itemId, type }),
    keepalive: true,
  });
}

export function ItemViewTracker({ itemId }: { itemId: string }) {
  useEffect(() => {
    recordInteraction(itemId, "VIEW");
  }, [itemId]);

  return null;
}

export function ContactLink({ itemId, href, className, children }: { itemId: string; href: string; className: string; children: string }) {
  return <a className={`rounded-2xl px-4 py-2 font-bold text-slate-950 ${className}`} href={href} target="_blank" rel="noreferrer" onClick={() => recordInteraction(itemId, "CONTACT_SELLER")}>{children}</a>;
}
