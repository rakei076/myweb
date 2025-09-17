import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        surface: "#F5F7FA",
        accent: {
          blue: "#D6E4FF",
          green: "#D9F7BE",
        },
        text: {
          primary: "#1F2937",
          secondary: "#6B7280",
        },
        line: "#E5E7EB",
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-sc)", "var(--font-inter)", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas"],
      },
      boxShadow: {
        sheet: "0 1px 2px rgba(0,0,0,0.04), 0 8px 20px rgba(0,0,0,0.06)",
      }
    },
  },
  plugins: [],
};

export default config;

