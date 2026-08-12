import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "hsl(var(--bg))",
        surface: "hsl(var(--surface))",
        fg: "hsl(var(--fg))",
        muted: "hsl(var(--muted))",
        faint: "hsl(var(--faint))",
        border: "hsl(var(--border))",
        accent: {
          DEFAULT: "hsl(var(--accent))",
          alt: "hsl(var(--accent-alt))",
          glow: "hsl(var(--accent-glow))",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px -8px hsl(var(--accent-glow))",
        "glow-lg": "0 0 80px -12px hsl(var(--accent-glow))",
        glass: "0 8px 32px rgba(0,0,0,0.35)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-16px)" },
        },
        pulseglow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        shine: {
          from: { transform: "translateX(-150%) skewX(-15deg)" },
          to: { transform: "translateX(250%) skewX(-15deg)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(40px, -50px) scale(1.15)" },
          "66%": { transform: "translate(-30px, 30px) scale(0.9)" },
        },
        typeblink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "gradient-x": "gradient-x 8s ease infinite",
        float: "float 6s ease-in-out infinite",
        pulseglow: "pulseglow 4s ease-in-out infinite",
        "spin-slow": "spin-slow 14s linear infinite",
        shine: "shine 1.6s ease-in-out infinite",
        blob: "blob 18s ease-in-out infinite",
        typeblink: "typeblink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
