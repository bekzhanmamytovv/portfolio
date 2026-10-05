'use client';

import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import { gsap } from 'gsap';

type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: (x: number, y: number) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const THEMES: Record<Theme, Record<string, string>> = {
  dark: {
    '--color-bg': '#080808',
    '--color-fg': '#e8e8e8',
    '--color-fg-secondary': '#666',
    '--color-border': '#1a1a1a',
    '--color-accent': '#ffffff',
  },
  light: {
    '--color-bg': '#f2f0ed',
    '--color-fg': '#1a1a1a',
    '--color-fg-secondary': '#777',
    '--color-border': '#ddd',
    '--color-accent': '#000000',
  },
};

function applyThemeVars(theme: Theme) {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  const vars = THEMES[theme];
  Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const overlayRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  // Sync initial theme from localStorage (blocking script in layout handles flash)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme') as Theme | null;
      if (saved === 'light' || saved === 'dark') {
        setTheme(saved);
        applyThemeVars(saved);
      }
    } catch {}
  }, []);

  // Persist and apply on change
  useEffect(() => {
    try {
      localStorage.setItem('theme', theme);
    } catch {}
    applyThemeVars(theme);
  }, [theme]);

  const toggleTheme = useCallback(
    (x: number, y: number) => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';
      const doc = document as any;

      const maxRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      // ── Approach 1: View Transitions API (Chrome 111+, Edge, Opera) ──
      if (doc.startViewTransition) {
        const transition = doc.startViewTransition(() => {
          applyThemeVars(newTheme);
          setTheme(newTheme);
        });

        transition.ready
          .then(() => {
            document.documentElement.animate(
              {
                clipPath: [
                  `circle(0px at ${x}px ${y}px)`,
                  `circle(${maxRadius}px at ${x}px ${y}px)`,
                ],
              },
              {
                duration: 800,
                easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
                pseudoElement: '::view-transition-new(root)',
              }
            );
          })
          .catch(() => {})
          .finally(() => {
            isAnimating.current = false;
          });

        return;
      }

      // ── Approach 2: GSAP overlay fallback ──
      const overlay = overlayRef.current;
      if (!overlay) {
        setTheme(newTheme);
        isAnimating.current = false;
        return;
      }

      overlay.style.backgroundColor = THEMES[newTheme]['--color-bg'];
      overlay.style.display = 'block';

      gsap.fromTo(
        overlay,
        { clipPath: `circle(0px at ${x}px ${y}px)` },
        {
          clipPath: `circle(${maxRadius}px at ${x}px ${y}px)`,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => {
            applyThemeVars(newTheme);
            setTheme(newTheme);
            // Wait 2 frames so DOM reflects new theme
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                overlay.style.display = 'none';
                overlay.style.clipPath = '';
                isAnimating.current = false;
              });
            });
          },
        }
      );
    },
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}

      {/* Fallback overlay for browsers without View Transitions API */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 98,
          display: 'none',
          pointerEvents: 'none',
        }}
      />
    </ThemeContext.Provider>
  );
}
