module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          200: '#f1f3f4',
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
