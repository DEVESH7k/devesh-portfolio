/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#080808",
        secondary: "#888888",
        tertiary: "#101010",
        accent: "#6A1BDA",
        accentPink: "#9d5ff5",
        bg1: "#0e0e0e",
        bg2: "#111111",
        bg3: "#161616",
        muted: "#2a2a2a",
      },
      fontFamily: {
        sans: ["Chakra Petch", "Outfit", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
        chakra: ["Chakra Petch", "sans-serif"],
      },
      boxShadow: {
        card: "0px 35px 120px -15px #000",
        glow: "0 0 40px rgba(106,27,218,0.2)",
        glowPink: "0 0 40px rgba(157,95,245,0.15)",
      },
      screens: {
        xs: "450px",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
