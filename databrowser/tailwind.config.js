// eslint-disable-next-line no-undef
const tailwindForms = require('@tailwindcss/forms');

// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        '2xl': '1.625rem',
      },
      colors: {
        error: '#ff0000',
        green: {
          400: '#50742f',
          500: '#476929',
          700: '#234009',
        },
        gray: {
          50: '#f4f8f9',
          100: '#f1f3f4',
          200: '#efefef',
          250: '#e3e4e7',
          300: '#dcdde1',
          400: '#e0e1e5',
          600: '#707c7e',
          700: '#494d50',
          900: '#3c4043',
        },
      },
    },
  },
  plugins: [tailwindForms],
};
