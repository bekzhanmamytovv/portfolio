'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const visible = useRef(false);
  const rafId = useRef<number>(0);

  const bindInteractiveElements = useCallback(() => {
    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor || !label) return;

    const elements = document.querySelectorAll<HTMLElement>(
      '[data-cursor="hover"]'
    );

    const onEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const text = el.getAttribute('data-cursor-label') || 'View';
      label.textContent = text;

      gsap.to(cursor, {
        width: 120,
        height: 120,
        borderRadius: '50%',
        duration: 0.5,
        ease: 'expo.out',
      });
      gsap.to(label, { opacity: 1, duration: 0.3, delay: 0.08 });
    };

    const onLeave = () => {
      gsap.to(cursor, {
        width: 12,
        height: 12,
        duration: 0.5,
        ease: 'expo.out',
      });
      gsap.to(label, { opacity: 0, duration: 0.2 });
    };

    elements.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Hide on touch devices
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      cursor.style.display = 'none';
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) {
        visible.current = true;
        pos.current = { x: e.clientX, y: e.clientY };
        gsap.to(cursor, { opacity: 1, duration: 0.3 });
      }
    };

    const onMouseLeave = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.3 });
      visible.current = false;
    };

    const onMouseEnter = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.3 });
      visible.current = true;
    };

    // Lerp animation loop
    const animate = () => {
      const lerp = 0.12;
      pos.current.x += (target.current.x - pos.current.x) * lerp;
      pos.current.y += (target.current.y - pos.current.y) * lerp;

      gsap.set(cursor, {
        x: pos.current.x,
        y: pos.current.y,
      });

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    rafId.current = requestAnimationFrame(animate);

    // Bind interactive elements & observe DOM for new ones
    let cleanup = bindInteractiveElements();

    const observer = new MutationObserver(() => {
      cleanup?.();
      cleanup = bindInteractiveElements();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId.current);
      cleanup?.();
      observer.disconnect();
    };
  }, [bindInteractiveElements]);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 12,
        height: 12,
        marginLeft: -6,
        marginTop: -6,
        background: '#e8e8e8',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0,
        willChange: 'transform, width, height',
      }}
    >
      <span
        ref={labelRef}
        style={{
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase' as const,
          whiteSpace: 'nowrap' as const,
          opacity: 0,
          color: '#080808',
          userSelect: 'none' as const,
        }}
      >
        View
      </span>
    </div>
  );
}
