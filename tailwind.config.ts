import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        landing: {
          surface: 'rgba(255, 255, 255, 0.07)',
          'surface-hover': 'rgba(255, 255, 255, 0.12)',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-strong': 'rgba(255, 255, 255, 0.18)',
          text: 'rgba(255, 255, 255, 0.88)',
          'text-muted': 'rgba(255, 255, 255, 0.55)',
          gold: '#D4AF37',
          'gold-light': '#E8C868',
        },
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Amiri', 'serif'],
        sans: ['Cairo', '"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['Cairo', '"Instrument Serif"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
