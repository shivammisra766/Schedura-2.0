/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      'primary' : "#5f6FFF"
      },
      gridTemplateColumns:{
        'auto-fill': 'repeat(auto-fill, minmax(0, 1fr))'
      }
    },
  },
  plugins: [],
}