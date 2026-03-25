/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  safelist: [
    "grid-cols-2",
    "sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]",
    "active-tab",
    "text-white",
    "text-gray-400",
    "hover:text-white",
    "sm:grid-cols-4",
    "sm:flex-row",
    "sm:grid-cols-3",
    "sm:grid-cols-2",
    "sm:inline",
    "sm:inline-block",
  ],
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
