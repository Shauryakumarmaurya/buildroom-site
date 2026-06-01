import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#533AB7",
          50: "#F2EFFB",
          100: "#E4DEF6",
          200: "#C8BDED",
          300: "#AB9CE4",
          400: "#8F7BDB",
          500: "#725AD2",
          600: "#533AB7",
          700: "#412D8F",
          800: "#2F2167",
          900: "#1D143F",
        },
        ink: "#2C2C2A",
        paper: "#FAFAF7",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      letterSpacing: {
        tightish: "-0.02em",
        tighter2: "-0.035em",
        label: "0.2em",
      },
      borderColor: {
        hairline: "rgba(44, 44, 42, 0.10)",
      },
      boxShadow: {
        none: "none",
      },
    },
  },
  plugins: [],
};

export default config;
