module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        '2xl': '1.625rem',
      },
      colors: {
        green: {
          500: '#476929',
          700: '#234009',
        },
        gray: {
          100: '#f1f3f4',
          200: '#efefef',
          300: '#dcdde1',
          400: '#e0e1e5',
          600: '#707c7e',
          700: '#494d50',
          900: '#3c4043',
        },
      },
    },
  },
  variants: {
    extend: {
      padding: ['responsive', 'last', 'first'],
    },
  },
  plugins: [],
};
