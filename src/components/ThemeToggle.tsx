'use client';

import { useRef, useCallback } from 'react';
import { useTheme } from './ThemeProvider';
import { getSoundManager } from '@/lib/sounds';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    getSoundManager()?.themeSwitch();

    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    toggleTheme(x, y);
  }, [toggleTheme]);

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className="flex items-center justify-center w-5 h-5 opacity-50 hover:opacity-100 transition-opacity duration-500"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span
        className="block w-[10px] h-[10px] rounded-full border-[1.5px] border-white transition-all duration-700 ease-out"
        style={{
          background: theme === 'light' ? 'white' : 'transparent',
          transform: theme === 'light' ? 'scale(1)' : 'scale(0.85)',
        }}
      />
    </button>
  );
}
