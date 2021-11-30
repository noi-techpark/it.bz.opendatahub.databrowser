module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        green: {
          500: '#476929',
          700: '#234009',
        },
        gray: {
          100: '#f1f3f4',
          200: '#efefef',
          300: '#dcdde1',
          600: '#707c7e',
          900: '#3c4043',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
