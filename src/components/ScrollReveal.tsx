'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  trigger?: boolean;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  y = 60,
  duration = 1.4,
  trigger = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y });

    const playAnimation = () => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: 'expo.out',
      });
    };

    if (trigger) {
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: playAnimation,
      });

      return () => {
        st.kill();
      };
    } else {
      playAnimation();
    }
  }, [delay, y, duration, trigger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
