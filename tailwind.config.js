/** @type {import('tailwindcss').Config} */
import fluid, { extract, screens, fontSize } from 'fluid-tailwind'

export default {
  darkMode: 'selector',
  content: {
    files: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    extract
  },
  theme: {
    screens,
    fontSize,
    extend: {
      screens: {
        xs: '20rem'
      }
    }
  },
  plugins: [require("daisyui"), fluid, require('@tailwindcss/line-clamp')],
};
