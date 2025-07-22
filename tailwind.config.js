/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: 'tw-',
  theme: {
    extend: {},
    screens: {
      mobile: { 'max': '767px' },
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
  },
  plugins: [],
}
