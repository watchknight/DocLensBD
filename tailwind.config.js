/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f0ff',
          100: '#e0e0ff',
          200: '#c0c0ff',
          300: '#8080cc',
          400: '#4040aa',
          500: '#000088',
          600: '#000066',
          700: '#000042',
          800: '#000033',
          900: '#000022',
        },
        accent: {
          50: '#e6fafb',
          100: '#b3f0f4',
          200: '#80e6ed',
          300: '#4ddce6',
          400: '#1ad2df',
          500: '#00BAC6',
          600: '#009ea8',
          700: '#008a93',
          800: '#006b72',
          900: '#004d52',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
