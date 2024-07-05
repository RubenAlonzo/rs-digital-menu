/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
      },
      colors: {
        custom: {
          'primary': '#48352F',
          'secondary': '#806860', 
        },
      },
    },
  },
  plugins: [],
}
