import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080808",
        surface: {
          DEFAULT: "#0f131f",
          card: "#141828",
          cardElevated: "#1a1f33",
          glass: "rgba(255, 255, 255, 0.08)",
          glassHover: "rgba(255, 255, 255, 0.14)",
          glassActive: "rgba(255, 255, 255, 0.20)",
        },
        border: {
          glass: "rgba(255, 255, 255, 0.18)",
          card: "rgba(255, 255, 255, 0.22)",
          subtle: "rgba(255, 255, 255, 0.10)",
          highlight: "rgba(255, 255, 255, 0.35)",
        },
        foreground: {
          DEFAULT: "#FFFFFF",
          secondary: "rgba(255, 255, 255, 0.85)",
          tertiary: "rgba(255, 255, 255, 0.65)",
        },
      },
      fontFamily: {
        serifJp: [
          '"Shippori Mincho"',
          '"Yu Mincho"',
          '"YuMincho"',
          '"Hiragino Mincho ProN"',
          '"MS PMincho"',
          "serif",
        ],
        sans: [
          '"Zen Kaku Gothic New"',
          '"Yu Gothic"',
          '"YuGothic"',
          '"Hiragino Sans"',
          '"Hiragino Kaku Gothic ProN"',
          '"Meiryo"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
        mono: [
          '"JetBrains Mono"',
          '"SF Mono"',
          "ui-monospace",
          "Menlo",
          "Monaco",
          "monospace",
        ],
      },
      boxShadow: {
        glass: "0 20px 60px rgba(0, 0, 0, 0.4)",
        glassGlow: "0 0 35px -5px var(--accent-glow, rgba(56, 189, 248, 0.35))",
        cardDepth: "0 20px 40px -10px rgba(0, 0, 0, 0.6)",
        cardGlow: "0 0 20px -2px rgba(255, 255, 255, 0.08)",
      },
      backdropBlur: {
        glass: "20px",
      },
      animation: {
        "pulse-slow": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
