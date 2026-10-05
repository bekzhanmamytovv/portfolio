'use client';

import { useEffect, useRef, ElementType } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SplitTextProps {
  children: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  trigger?: boolean; // Привязать ли к скроллу
}

export default function SplitText({
  children,
  as: Component = 'div',
  className = '',
  delay = 0,
  duration = 1.4,
  stagger = 0.05, // По ТЗ: задержка 0.05с между элементами
  trigger = true,
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const words = wordRefs.current.filter(Boolean);

    const ctx = gsap.context(() => {
      // expo.out - точный GSAP-аналог cubic-bezier(0.16, 1, 0.3, 1)
      const animation = gsap.fromTo(
        words,
        { 
          y: '115%', 
          rotateZ: 2 // Легкий кинематографичный завал
        },
        {
          y: '0%',
          rotateZ: 0,
          duration,
          delay: trigger ? 0 : delay,
          ease: 'expo.out',
          stagger,
        }
      );

      if (trigger) {
        ScrollTrigger.create({
          trigger: container,
          start: 'top 88%',
          animation,
        });
      }
    });

    return () => ctx.revert();
  }, [delay, duration, stagger, trigger]);

  // Разбиваем на слова. При overflow-hidden родителя это выглядит
  // как построчное/пословное появление из маски.
  const words = children.split(' ');

  return (
    <Component
      ref={containerRef}
      className={className}
      aria-label={children} // Для скринридеров читается целиком
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]"
          style={{ whiteSpace: 'pre' }}
        >
          <span
            ref={(el) => {
              wordRefs.current[i] = el;
            }}
            className="inline-block transform-gpu will-change-transform origin-top-left"
          >
            {word}
            {i !== words.length - 1 && ' '}
          </span>
        </span>
      ))}
    </Component>
  );
}
