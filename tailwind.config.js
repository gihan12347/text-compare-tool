
const {heroui} = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
// Exports the Tailwind configuration object.
module.exports = {
  // Tells Tailwind where to look for class names to keep
  content: [
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      // foreground: '#ffffff', // your text color
      // background: '#121212', // your dark background
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};