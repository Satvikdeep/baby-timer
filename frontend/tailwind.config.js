// tailwind.config.js
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",                // fix: from "./index." to "./index.html"
    "./src/**/*.{js,jsx,ts,tsx}",  // includes all relevant source files
  ],
  theme: {
    extend: {
      borderColor: {
        border: "rgb(var(--border) / <alpha-value>)",
      },
      colors: {
        border: "rgb(var(--border) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        destructive: "rgb(var(--destructive) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        popover: "rgb(var(--popover) / <alpha-value>)",
        input: "rgb(var(--input) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
        mono: ["JetBrains Mono", ...fontFamily.mono],
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
    },
  },
  plugins: [],
};
