/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#050608",
          soft: "#0B0D12",
          raised: "#12151C",
        },
        line: {
          DEFAULT: "rgba(245,245,247,0.08)",
          strong: "rgba(245,245,247,0.16)",
        },
        chalk: "#F5F5F7",
        mist: "#A1A1AA",
        emerald: {
          DEFAULT: "#00DFA2",
          dim: "rgba(0,223,162,0.12)",
        },
        cyan: {
          DEFAULT: "#55C8FF",
          dim: "rgba(85,200,255,0.12)",
        },
        azure: {
          DEFAULT: "#477BFF",
          dim: "rgba(71,123,255,0.12)",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["'JetBrains Mono'", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      fontSize: {
        display: ["clamp(2.6rem, 7.2vw, 6.25rem)", { lineHeight: "0.98", letterSpacing: "-0.035em" }],
        hero: ["clamp(2.1rem, 4.3vw, 3.75rem)", { lineHeight: "1.04", letterSpacing: "-0.032em" }],
        section: ["clamp(2rem, 4.4vw, 3.5rem)", { lineHeight: "1.08", letterSpacing: "-0.028em" }],
        stat: ["clamp(2.75rem, 6vw, 4.5rem)", { lineHeight: "1", letterSpacing: "-0.04em" }],
        eyebrow: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.22em" }],
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
        smooth: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      maxWidth: {
        shell: "1240px",
        prose: "68ch",
      },
      backdropBlur: {
        glass: "20px",
      },
      boxShadow: {
        lift: "0 24px 60px -24px rgba(0,0,0,0.85)",
        glow: "0 0 0 1px rgba(0,223,162,0.25), 0 20px 60px -20px rgba(0,223,162,0.25)",
      },
      keyframes: {
        caret: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        driftSlow: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-10px,0)" },
        },
      },
      animation: {
        caret: "caret 1.05s steps(1) infinite",
        drift: "driftSlow 7s cubic-bezier(0.45,0,0.55,1) infinite",
      },
    },
  },
  plugins: [],
};
