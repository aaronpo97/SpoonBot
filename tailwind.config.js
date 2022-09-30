/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],

  plugins: [require('daisyui'), require('@tailwindcss/typography')],
  daisyui: {
    logs: false,
    themes: [
      {
        default: {
          primary: '#2C3D78',
          'primary-content': '#FAF9F6',
          secondary: '#047773',
          accent: '#fe3bd9',
          neutral: '#131520',
          'base-100': '#FBFDFE',
          'base-200': '#E2EAFA',
          'base-300': '#D8E2F8',
          info: '#0A7CFF',
          success: '#8ACE2B',
          warning: '#F9D002',
          error: '#CF1259',
          'error-content': '#FAF9F6',
        },
      },
    ],
  },
};
