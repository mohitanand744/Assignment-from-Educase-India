/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'popx-purple': '#6C25FF',
        'popx-purple-light': '#CBC1FF',
        'popx-purple-light-hover': '#ede8ff',
        'popx-purple-dark': '#4b19b2',
        'popx-bg': '#F7F8F9',
        'popx-text': '#1D2226',
        'popx-gray-text': '#585858',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
