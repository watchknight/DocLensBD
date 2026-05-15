/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0A0A3E',
          'navy-light': '#12124F',
          'navy-muted': '#1A1A5E',
          teal: '#00C9D6',
          'teal-hover': '#00B3BF',
          gold: '#D4A855',
          'gold-light': '#F0D48A',
          rose: '#FF6B8A',
          'rose-light': '#FFE0E8',
        },
        surface: {
          primary: '#FAFBFD',
          card: '#FFFFFF',
          elevated: '#F0F2F8',
          hover: '#E8EAF2',
        },
        txt: {
          primary: '#0A0A3E',
          secondary: '#5A5E7A',
          muted: '#9CA0B8',
        },
        // Keep legacy colors working during migration
        primary: {
          50: '#f0f0ff',
          100: '#e0e0ff',
          200: '#c0c0ff',
          300: '#8080cc',
          400: '#4040aa',
          500: '#000088',
          600: '#000066',
          700: '#0A0A3E',
          800: '#000033',
          900: '#000022',
        },
        accent: {
          50: '#e6fafb',
          100: '#b3f0f4',
          200: '#80e6ed',
          300: '#4ddce6',
          400: '#1ad2df',
          500: '#00C9D6',
          600: '#009ea8',
          700: '#008a93',
          800: '#006b72',
          900: '#004d52',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(10, 10, 62, 0.06)',
        'card-hover': '0 20px 48px rgba(10, 10, 62, 0.12)',
        'glow-teal': '0 8px 32px rgba(0, 201, 214, 0.3)',
        'glow-gold': '0 8px 32px rgba(212, 168, 85, 0.2)',
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '24px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      container: {
        center: true,
        screens: {
          '2xl': '1400px',
        },
      },
    },
  },
  plugins: [],
}
