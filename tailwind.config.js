/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0c0c0e',
          secondary: '#44444E',
        },
        accent: {
          DEFAULT: '#715A5A',
          light: '#D3DAD9',
        },
      },
    },
  },
}
