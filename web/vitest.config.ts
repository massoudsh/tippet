import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

// تست‌های واحد منطق دامنه (src/lib) — بدون نیاز به دیتابیس یا سرویس بیرونی.
export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    // هم‌سان با alias «@/*» در tsconfig.json
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
