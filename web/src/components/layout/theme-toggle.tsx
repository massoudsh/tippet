"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState("system");
  useEffect(() => {
    try { setTheme(localStorage.getItem("tippet-theme") || "system"); } catch { /* Storage may be disabled by the browser. */ }
  }, []);

  function changeTheme(value: string) {
    setTheme(value);
    document.documentElement.dataset.theme = value;
    try { localStorage.setItem("tippet-theme", value); } catch { /* The selected theme still applies for this page. */ }
  }

  return <label className="text-xs text-muted-foreground">پوسته
    <select aria-label="پوسته نمایش" value={theme} onChange={(event) => changeTheme(event.target.value)} className="ms-2 min-h-11 rounded-control border border-border bg-background px-2 text-foreground">
      <option value="system">خودکار</option><option value="light">روشن</option><option value="dark">تیره</option>
    </select>
  </label>;
}
