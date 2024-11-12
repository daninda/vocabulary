/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      transitionDuration: {
        DEFAULT: '100ms',
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.no-scrollbar': {
          /* Для браузеров на базе Webkit */
          '&::-webkit-scrollbar': { display: 'none' },
          /* Для Firefox */
          scrollbarWidth: 'none',
        },
      });
    },
  ],
};
