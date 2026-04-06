import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        yellow: {
          DEFAULT: '#F5A623',
          light: '#FFB84D',
          dark: '#D4891A',
        },
        black: '#0A0A0A',
        dark: {
          DEFAULT: '#1A1A1A',
          2: '#242424',
          3: '#2E2E2E',
        },
        surface: {
          DEFAULT: '#111111',
          2: '#181818',
        },
        'bg-page': '#FAFAFA',
        'bg-section': '#F7F6F2',
        'bg-white': '#FFFFFF',
        'border-light': '#E5E7EB',
        'text-primary': '#111827',
        'text-secondary': '#4B5563',
        'text-muted': '#9CA3AF',
        gray: {
          DEFAULT: '#6B7280',
          light: '#9CA3AF',
        },
        white: '#FAFAFA',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Barlow Condensed', 'sans-serif'],
        body: ['Barlow', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
