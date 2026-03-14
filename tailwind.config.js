/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  safelist: ["grid-cols-2", "sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]"],
  theme: {
    extend: {
      colors: {
        primary: "#0a0a1e",
        secondary: "#1a0a2e",
      },
    },
  },
  plugins: [],
};
