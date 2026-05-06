import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        primary: "#2563EB",
        secondary: "#F6F8FB",
        card: "#FFFFFF",
        border: "#E2E8F0",
        primaryText: "#0F172A",
        mutedText: "#334155",
        success: "#16A34A",
        warning: "#D97706",
        danger: "#DC2626",
        info: "#2563EB"
      },
      boxShadow: {
        soft: "0 18px 40px rgba(15, 23, 42, 0.08)"
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
    }
  },
  plugins: []
};

export default config;
