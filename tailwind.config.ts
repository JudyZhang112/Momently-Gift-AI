import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      fontFamily: {
        display: ["'Manrope Variable'", ...fontFamily.sans],
        sans: ["'InterVariable'", ...fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "pastel-grid":
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
        "soft-glow":
          "radial-gradient(circle at 20% 20%, rgba(255, 200, 221, 0.4), transparent 35%), radial-gradient(circle at 80% 0%, rgba(180, 223, 255, 0.35), transparent 30%), radial-gradient(circle at 40% 90%, rgba(200, 255, 210, 0.35), transparent 30%)",
      },
      boxShadow: {
        glow: "0 10px 60px rgba(255, 182, 193, 0.45)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
