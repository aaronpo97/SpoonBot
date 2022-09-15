/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: { sans: ['Lato', 'system-ui'] },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['lofi'],
  },
};
