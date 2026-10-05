import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#080808',
        fg: '#e8e8e8',
        'fg-secondary': '#666666',
        border: '#1a1a1a',
        accent: '#ffffff',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display-xl': [
          'clamp(3.5rem, 9vw, 10rem)',
          { lineHeight: '0.92', letterSpacing: '-0.04em', fontWeight: '400' },
        ],
        display: [
          'clamp(2.5rem, 6vw, 6rem)',
          { lineHeight: '0.95', letterSpacing: '-0.035em', fontWeight: '400' },
        ],
        heading: [
          'clamp(1.5rem, 3vw, 3rem)',
          { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '400' },
        ],
        'body-lg': [
          'clamp(1rem, 1.2vw, 1.25rem)',
          { lineHeight: '1.65', fontWeight: '300' },
        ],
        body: ['1rem', { lineHeight: '1.65', fontWeight: '300' }],
        caption: [
          '0.75rem',
          { lineHeight: '1.5', letterSpacing: '0.1em', fontWeight: '500' },
        ],
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'in-out-quart': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
