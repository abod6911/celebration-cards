import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './react.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        emerald: {
          950: '#061812',
          900: '#0A261D',
          850: '#0F3D2E',
          800: '#164E3D',
          700: '#1B6550',
          600: '#238268',
          500: '#10B981',
          100: '#D1FAE5',
          50: '#ECFDF5',
        },
        gold: {
          900: '#684F14',
          800: '#8A691A',
          700: '#AA8220',
          600: '#C5A059',
          500: '#D4AF37',
          400: '#DEC062',
          300: '#E6CA92',
          200: '#F2DFB8',
          100: '#FAF3E0',
          50: '#FCF9F2',
          champagne: '#D4AF37',
          sand: '#C5A880',
          shimmer: '#E6CA92',
        },
        alabaster: {
          50: '#FFFFFF',
          100: '#FBF9F5',
          200: '#F4EFE6',
          300: '#E8E0D2',
          400: '#D6CBB8',
          500: '#B8A890',
        },
        burgundy: {
          900: '#4C0519',
          800: '#881337',
          700: '#BE123C',
          600: '#E11D48',
          100: '#FFE4E6',
          50: '#FFF1F2',
        },
        amber: {
          900: '#78350F',
          800: '#92400E',
          700: '#B45309',
          600: '#D97706',
          500: '#F59E0B',
          100: '#FEF3C7',
          50: '#FFFBEB',
        },
      },
      fontFamily: {
        arabic: ['Cairo', 'Readex Pro', 'Tajawal', '-apple-system', 'sans-serif'],
        sans: ['Cairo', 'Plus Jakarta Sans', '-apple-system', 'sans-serif'],
        serif: ['Amiri', '"Playfair Display"', 'serif'],
        display: ['Cairo', 'Amiri', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(10, 38, 29, 0.08)',
        'glass-hover': '0 12px 40px 0 rgba(10, 38, 29, 0.14)',
        'gold-glow': '0 10px 30px -4px rgba(212, 175, 55, 0.3)',
        'emerald-glow': '0 10px 30px -4px rgba(10, 38, 29, 0.35)',
        'card-luxury': '0 4px 20px -2px rgba(10, 38, 29, 0.06), 0 1px 3px rgba(10, 38, 29, 0.03)',
        'card-elevated': '0 20px 40px -8px rgba(10, 38, 29, 0.12), 0 8px 16px -3px rgba(10, 38, 29, 0.06)',
      },
      animation: {
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'laser-sweep': 'laserSweep 2.5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'gold-drift': 'goldDrift 14s ease-in-out infinite alternate',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.82' },
        },
        laserSweep: {
          '0%': { top: '5%' },
          '50%': { top: '90%' },
          '100%': { top: '5%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        goldDrift: {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '0.25' },
          '50%': { transform: 'translate(4%, -3%) scale(1.08)', opacity: '0.45' },
          '100%': { transform: 'translate(-3%, 3%) scale(0.96)', opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
