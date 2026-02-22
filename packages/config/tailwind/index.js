/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        // Brand colors for blackmatte.dev
        brand: {
          50: "hsl(0, 0%, 98%)",
          100: "hsl(0, 0%, 90%)",
          200: "hsl(0, 0%, 75%)",
          300: "hsl(0, 0%, 60%)",
          400: "hsl(0, 0%, 45%)",
          500: "hsl(0, 0%, 30%)",
          600: "hsl(0, 0%, 20%)",
          700: "hsl(0, 0%, 14%)",
          800: "hsl(0, 0%, 9%)",
          900: "hsl(0, 0%, 5%)",
          950: "hsl(0, 0%, 3%)",
        },
      },
    },
  },
};
