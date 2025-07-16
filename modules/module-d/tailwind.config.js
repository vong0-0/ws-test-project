/** @type {import('tailwindcss').Config} */
export default {
  content: ["src/**/*.{js,jsx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        black: "#333333",
      },
    },
  },
  plugins: [],
};
