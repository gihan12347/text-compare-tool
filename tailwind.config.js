const { heroui } = require("@heroui/react");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}" // <-- Make sure your app source is scanned too!
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here if needed
        // This preserves Tailwind's defaults
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
