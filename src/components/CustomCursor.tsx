'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  
  // State refs
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const visible = useRef(false);
  const rafId = useRef<number>(0);
  
  // Magnet refs
  const magnetEl = useRef<HTMLElement | null>(null);

  const bindInteractiveElements = useCallback(() => {
    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor || !label) return;

    // 1. Image Hover (Badge)
    const hovers = document.querySelectorAll<HTMLElement>('[data-cursor="hover"]');
    // 2. Links (Small scale)
    const links = document.querySelectorAll<HTMLElement>('[data-cursor="link"], a, button');
    // 3. Magnets (Sticky center)
    const magnets = document.querySelectorAll<HTMLElement>('[data-cursor="magnet"]');

    const onHoverEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const text = el.getAttribute('data-cursor-label') || 'View';
      label.textContent = text;
      gsap.to(cursor, { width: 100, height: 100, borderRadius: '50%', duration: 0.5, ease: 'expo.out' });
      gsap.to(label, { opacity: 1, duration: 0.3, delay: 0.08 });
    };

    const onLinkEnter = () => {
      gsap.to(cursor, { width: 32, height: 32, duration: 0.4, ease: 'expo.out' });
    };

    const onMagnetEnter = (e: Event) => {
      magnetEl.current = e.currentTarget as HTMLElement;
      gsap.to(cursor, { width: 64, height: 64, duration: 0.5, ease: 'back.out(1.5)' });
    };

    const onLeave = () => {
      magnetEl.current = null;
      gsap.to(cursor, { width: 12, height: 12, duration: 0.5, ease: 'expo.out' });
      gsap.to(label, { opacity: 0, duration: 0.2 });
    };

    hovers.forEach(el => { el.addEventListener('mouseenter', onHoverEnter); el.addEventListener('mouseleave', onLeave); });
    links.forEach(el => { el.addEventListener('mouseenter', onLinkEnter); el.addEventListener('mouseleave', onLeave); });
    magnets.forEach(el => { el.addEventListener('mouseenter', onMagnetEnter); el.addEventListener('mouseleave', onLeave); });

    return () => {
      hovers.forEach(el => { el.removeEventListener('mouseenter', onHoverEnter); el.removeEventListener('mouseleave', onLeave); });
      links.forEach(el => { el.removeEventListener('mouseenter', onLinkEnter); el.removeEventListener('mouseleave', onLeave); });
      magnets.forEach(el => { el.removeEventListener('mouseenter', onMagnetEnter); el.removeEventListener('mouseleave', onLeave); });
    };
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
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

    // Physics Loop (Lerp + Magnetism)
    const animate = () => {
      let tx = target.current.x;
      let ty = target.current.y;
      let lerp = 0.15; // Более отзывчивый, но плавный

      // Magnetic logic
      if (magnetEl.current) {
        const rect = magnetEl.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        
        // Притягиваем цель к центру элемента + немного следуем за реальной мышью
        const dx = target.current.x - cx;
        const dy = target.current.y - cy;
        
        tx = cx + dx * 0.2;
        ty = cy + dy * 0.2;
        lerp = 0.1; // Более вязкий в магните
      }

      pos.current.x += (tx - pos.current.x) * lerp;
      pos.current.y += (ty - pos.current.y) * lerp;

      gsap.set(cursor, {
        x: pos.current.x,
        y: pos.current.y,
      });

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    rafId.current = requestAnimationFrame(animate);

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
        top: 0, left: 0,
        width: 12, height: 12,
        marginLeft: -6, marginTop: -6,
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
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          opacity: 0,
          color: '#080808',
        }}
      />
    </div>
  );
}
