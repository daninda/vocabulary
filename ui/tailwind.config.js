/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      transitionDuration: {
        "3000": "3000ms",
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
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
        },
      });
    },
  ],
};
