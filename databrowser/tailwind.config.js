// eslint-disable-next-line no-undef
const tailwindForms = require('@tailwindcss/forms');

// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'table-static-col': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      fontSize: {
        '2xl': '1.625rem',
      },
      colors: {
        'alert-info': '#234009',
        'alert-warning': '#65603b',
        'alert-error': '#d12953',
        error: '#ff0000',
        disabled: '#dcdde1',
        delete: '#dc2626',
        dialog: '#687182',
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
  safelist: [
    'bg-alert-info',
    'text-alert-info',
    'bg-alert-warning',
    'text-alert-warning',
    'bg-alert-error',
    'text-alert-error',
  ],
  plugins: [tailwindForms],
};
