/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#25D366', // WhatsApp green
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        surface: {
          50:  '#ffffff',
          100: '#0f172a', // text primary: dark black
          200: '#1e293b', // text secondary
          300: '#334155', // text muted
          400: '#64748b', // text light muted
          500: '#94a3b8', // placeholder / icons
          600: '#cbd5e1', // borders light
          700: '#e2e8f0', // borders
          800: '#f1f5f9', // input backgrounds / light hover
          850: '#f8fafc', // panels background
          900: '#ffffff', // card & sidebar background (pure white)
          950: '#f8fafc', // app root background (light off-white)
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card:  '0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        glass: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        glow:  '0 4px 14px 0 rgba(37, 211, 102, 0.39)',
      },
      animation: {
        'fade-in':    'fadeIn 0.2s ease-out',
        'slide-up':   'slideUp 0.25s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:    { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp:   { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        pulseSoft: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.6 } },
      },
    },
  },
  plugins: [],
};
