import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: "var(--destructive)",
        success: "var(--success)",
        warning: "var(--warning)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        brand: {
          DEFAULT: "var(--brand)",
          foreground: "var(--brand-foreground)",
        },
      },
      borderRadius: {
        control: "var(--shape-control)",
        field: "var(--shape-field)",
        surface: "var(--shape-surface)",
        overlay: "var(--shape-overlay)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
      transitionDuration: {
        motion: "var(--motion)",
      },
      transitionTimingFunction: {
        motion: "var(--motion-ease)",
      },
    },
  },
  plugins: [],
};

export default config;
