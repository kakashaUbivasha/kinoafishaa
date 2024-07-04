/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors:{
        primary:"#ff7a20"
      },
      maxWidth: {
        container: "1672px",
      },
      boxShadow: {
        'footer_shadow': '0px -4px 17px -1px rgba(34, 60, 80, 0.2)'
      },
    },
  },
  plugins: [],
}