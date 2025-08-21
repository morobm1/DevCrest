/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#e84b3f',
          white: '#ffffff',
          gray: '#c4c2c0',
          blue: '#295491',
          yellow: '#f1c24b',
          green: '#367d3d',
          cyan: '#4ca2cb',
        },
      },
      fontFamily: {
        oswald: ["Oswald", "Arial", "Helvetica Neue", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
}

