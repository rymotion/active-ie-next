import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        maroon: "#7B1113",
        cream: "#F2EDE9",
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        sans: ["var(--font-geist-sans)", "Arial", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      fontSize: {
        // Fluid display scale — no breakpoint cliffs between phone and 1920px+
        "display-xl": ["clamp(3.5rem, 10vw, 11rem)", { lineHeight: "0.95" }],
        display: ["clamp(2.5rem, 6vw, 6rem)", { lineHeight: "1" }],
        title: ["clamp(1.75rem, 3vw, 3rem)", { lineHeight: "1.1" }],
      },
      screens: {
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
} satisfies Config;
