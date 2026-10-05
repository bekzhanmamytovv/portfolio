'use client';

import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const thumb = thumbRef.current;
    if (!thumb) return;

    let ticking = false;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      thumb.style.transform = `scaleY(${progress})`;
      ticking = false;
    };

    // Sync with Lenis if available, otherwise use passive scroll
    const lenis = (window as any).__lenis;

    if (lenis) {
      const handler = ({ progress }: { progress: number }) => {
        thumb.style.transform = `scaleY(${progress})`;
      };
      lenis.on('scroll', handler);
      return () => lenis.off('scroll', handler);
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 right-0 w-[2px] h-full z-50 pointer-events-none"
      style={{ mixBlendMode: 'difference' }}
    >
      <div
        ref={thumbRef}
        className="w-full h-full origin-top"
        style={{
          background: 'rgba(255,255,255,0.5)',
          transform: 'scaleY(0)',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
