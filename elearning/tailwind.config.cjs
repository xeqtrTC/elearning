/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'rtl',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'Barlow': ['Barlow', 'sans-serif']
      }
    },
  },
  plugins: [],
}