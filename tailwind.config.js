/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spacing: {
        30: "7.5rem",
        15: "3.75rem",
      },
      colors: {
        primary: "#1f274c",
        secondary: "#fc583b",
        accent: "#f3f5fc",
      },
    },
  },
  plugins: [require("daisyui")],
};
