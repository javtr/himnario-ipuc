/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      borderRadius: {
        'card': '0.5rem', // Radio global para tarjetas y elementos
      },
    },
  },
  plugins: [],
}
