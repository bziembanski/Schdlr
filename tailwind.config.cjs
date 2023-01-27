/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-light": "#C2D3F1",
        "blue-dark": "#2C5392",
        white: "#ECE9E0",
      },
      fontFamily: {
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
