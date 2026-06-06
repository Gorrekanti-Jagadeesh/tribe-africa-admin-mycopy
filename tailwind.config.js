/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        rufina: ['Rufina', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'brand-orange': '#FF6600',
      },
      maxWidth: {
        '8xl': '1316px',
      },
    },
  },
};
