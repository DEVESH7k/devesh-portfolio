/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0a192f",
          light: "#112240",
          lightest: "#233554",
        },
        "navy-light": "#112240",
        "navy-lightest": "#233554",
        slate: {
          DEFAULT: "#8892b0",
          light: "#a8b2d1",
          lightest: "#ccd6f6",
        },
        "slate-light": "#a8b2d1",
        "slate-lightest": "#ccd6f6",
        teal: {
          DEFAULT: "#64ffda",
          tint: "rgba(100, 255, 218, 0.1)",
        },
        "teal-tint": "rgba(100, 255, 218, 0.1)",
        white: "#e6f1ff",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["'JetBrains Mono'", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      transitionTimingFunction: {
        portfolio: "cubic-bezier(0.645, 0.045, 0.355, 1)",
      },
      boxShadow: {
        card: "0 10px 30px -15px rgba(2, 12, 27, 0.7)",
        "card-hover": "0 20px 30px -15px rgba(2, 12, 27, 0.7)",
      },
      maxWidth: {
        content: "1000px",
      },
    },
  },
  plugins: [],
};
