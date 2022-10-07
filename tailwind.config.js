/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],

  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
  daisyui: {
    logs: false,
    themes: [
      {
        default: {
          primary: 'hsl(227, 46%, 31%)',
          secondary: 'hsl(47, 100%, 80%)',
          accent: '#fe3bd9',
          neutral: '#131520',
          info: '#0A7CFF',
          success: '#8ACE2B',
          warning: '#F9D002',
          error: '#CF1259',
          'primary-content': '#FAF9F6',
          'error-content': '#FAF9F6',
          'base-100': 'hsl(200, 71%, 98%)',
          'base-200': 'hsl(220, 71%, 93%)',
          'base-300': 'hsl(220, 71%, 91%)',
        },
      },
    ],
  },
};
