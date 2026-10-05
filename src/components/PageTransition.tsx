'use client';

import {
  createContext,
  useContext,
  useRef,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { getSoundManager } from '@/lib/sounds';

interface TransitionContextValue {
  navigateTo: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextValue>({
  navigateTo: () => {},
});

export function usePageTransition() {
  return useContext(TransitionContext);
}

export default function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement[]>([]);
  const isAnimating = useRef(false);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPathname.current && isAnimating.current) {
      prevPathname.current = pathname;

      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
        if ((window as any).__lenis) {
          (window as any).__lenis.scrollTo(0, { immediate: true });
        }

        gsap.to(columnsRef.current, {
          scaleY: 0,
          duration: 0.8,
          ease: 'power4.inOut',
          stagger: 0.05,
          transformOrigin: 'top',
          onComplete: () => {
            isAnimating.current = false;
            const overlay = overlayRef.current;
            if (overlay) overlay.style.pointerEvents = 'none';
          },
        });
      }, 100);

      return () => clearTimeout(timer);
    }
    prevPathname.current = pathname;
  }, [pathname]);

  const navigateTo = useCallback(
    (href: string) => {
      if (isAnimating.current || href === pathname) return;
      isAnimating.current = true;
      
      // Звуковой эффект whoosh при переходе
      getSoundManager()?.transition();

      const overlay = overlayRef.current;
      if (overlay) overlay.style.pointerEvents = 'all';

      gsap.fromTo(
        columnsRef.current,
        { scaleY: 0, transformOrigin: 'bottom' },
        {
          scaleY: 1,
          duration: 0.8,
          ease: 'power4.inOut',
          stagger: 0.05,
          onComplete: () => {
            router.push(href);
          },
        }
      );
    },
    [pathname, router]
  );

  const setColumnRef = useCallback(
    (el: HTMLDivElement | null, index: number) => {
      if (el) columnsRef.current[index] = el;
    },
    []
  );

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      {children}

      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          display: 'flex',
          pointerEvents: 'none',
        }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => setColumnRef(el, i)}
            style={{
              flex: 1,
              background: 'var(--color-fg)',
              transform: 'scaleY(0)',
              transformOrigin: 'bottom',
              willChange: 'transform',
            }}
          />
        ))}
      </div>
    </TransitionContext.Provider>
  );
}
