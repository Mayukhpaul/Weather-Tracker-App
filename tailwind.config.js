/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      margin: {
        '520px': '520px',
      },
      colors: {
        weather: {
          50: "#edf2fa",
          100: "#d2d7e0",
          200: "#b6bdc8",
          300: "#98a3b2",
          400: "#7b889c",
          500: "#626f82",
          600: "#ba9ce2",
          700: "#6c4ec9",
          800: "#1f252d",
          900: "#060c14",
        },
      },
    },
  },
  plugins: [],
};
