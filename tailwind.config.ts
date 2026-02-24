import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Color Hunt Palette: #FAFAFA #E0BB20 #841818 #000000
        // 60-30-10 Rule Application
        
        // Primary (60%) - Backgrounds & Base Surfaces
        whisper: "#FAFAFA",
        
        // Secondary (30%) - Structure, Headers, Text
        burgundy: {
          DEFAULT: "#841818",
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#841818",
          950: "#4d0e0e",
        },
        
        // Accent (10%) - CTAs, Highlights, Interactive Elements
        gold: {
          DEFAULT: "#E0BB20",
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#E0BB20",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
        },
        
        // Semantic aliases for easy reference
        primary: "#FAFAFA",
        secondary: "#841818",
        accent: "#E0BB20",
        "pure-black": "#000000",
        
        // Legacy support (mapped to new palette)
        maroon: {
          DEFAULT: "#841818",
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#841818",
        },
        yellow: {
          DEFAULT: "#E0BB20",
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#E0BB20",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        heading: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
