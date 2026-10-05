import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: 'var(--color-bg)',
        fg: 'var(--color-fg)',
        'fg-secondary': 'var(--color-fg-secondary)',
        border: 'var(--color-border)',
        accent: 'var(--color-accent)',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.16, 1, 0.3, 1)',
        cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 9vw, 10rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        display: ['clamp(2.5rem, 6vw, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        heading: ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'body-lg': ['clamp(1.125rem, 1.5vw, 1.5rem)', { lineHeight: '1.5', letterSpacing: '0em' }],
        body: ['1rem', { lineHeight: '1.5' }],
        caption: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
      },
    },
  },
  plugins: [],
};

export default config;
