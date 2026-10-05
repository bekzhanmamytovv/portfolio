'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  trigger?: boolean;
  stagger?: number;
}

export default function SplitText({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
  trigger = true,
  stagger = 0.04,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || hasAnimated.current) return;

    const text = children;
    const words = text.split(' ');

    container.innerHTML = '';

    const wordInners: HTMLElement[] = [];

    words.forEach((word, i) => {
      const wrapper = document.createElement('span');
      wrapper.style.overflow = 'hidden';
      wrapper.style.display = 'inline-block';
      wrapper.style.verticalAlign = 'top';

      const inner = document.createElement('span');
      inner.style.display = 'inline-block';
      inner.style.transform = 'translateY(115%)';
      inner.style.willChange = 'transform';
      inner.textContent = word;

      wrapper.appendChild(inner);
      container.appendChild(wrapper);

      if (i < words.length - 1) {
        const space = document.createElement('span');
        space.innerHTML = '\u00A0';
        space.style.display = 'inline-block';
        container.appendChild(space);
      }

      wordInners.push(inner);
    });

    const animConfig = {
      y: 0,
      duration: 1.4,
      ease: 'expo.out',
      stagger,
    };

    if (trigger) {
      ScrollTrigger.create({
        trigger: container,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(wordInners, { ...animConfig, delay });
        },
      });
    } else {
      gsap.to(wordInners, { ...animConfig, delay });
    }

    hasAnimated.current = true;

    return () => {
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === container)
        .forEach((st) => st.kill());
    };
  }, [children, delay, trigger, stagger]);

  const El = Tag as any;

  return (
    <El ref={containerRef} className={className} aria-label={children}>
      {children}
    </El>
  );
}
