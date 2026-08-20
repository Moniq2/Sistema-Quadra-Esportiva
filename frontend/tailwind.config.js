/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        meutema: {
          "primary": "#01406D",
          "secondary": "#01B4BA",
          "accent": "#FF7A0F",
          "neutral": "#01406D",
          "base-100": "#FFFFFF",
          "base-200": "#F5FEFE",
        },
      },
    ],
  },
}