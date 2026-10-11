"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function logout() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok) throw new Error("خروج ناموفق بود.");
      window.location.assign("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "خروج ناموفق بود.");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <Button type="button" variant="outline" loading={loading} onClick={logout}>
        خروج از حساب
      </Button>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
