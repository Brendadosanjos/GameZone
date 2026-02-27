/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '6px 16px 30px #6962620D',
      },
      colors: {
        "grayCustom": '#474747',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, #eee7ff, rgba(255, 255, 255, 0))',
      },
    },
  },
  plugins: [],
}