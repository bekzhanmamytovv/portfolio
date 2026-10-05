'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SplitText from './SplitText';
import ScrollReveal from './ScrollReveal';

export default function Hero() {
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const indicator = scrollIndicatorRef.current;
    const line = lineRef.current;
    if (!indicator || !line) return;

    // Fade in scroll indicator
    gsap.fromTo(
      indicator,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 2.2, ease: 'power2.out' }
    );

    // Animate the line growing
    gsap.fromTo(
      line,
      { scaleY: 0, transformOrigin: 'top' },
      {
        scaleY: 1,
        duration: 1,
        delay: 2.4,
        ease: 'expo.out',
      }
    );

    // Subtle floating animation
    gsap.to(indicator, {
      y: 10,
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 3,
    });
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center relative pt-32 pb-40">
      <div className="container">
        <div className="max-w-[1300px]">
          <SplitText
            as="h1"
            className="text-display-xl text-accent mb-10 md:mb-14"
            delay={0.5}
            trigger={false}
            stagger={0.035}
          >
            Design & Digital Experiences
          </SplitText>

          <div className="max-w-[480px] md:ml-auto md:mr-[10%]">
            <ScrollReveal delay={1.6} trigger={false}>
              <p className="text-body-lg text-fg-secondary leading-relaxed">
                Creating meaningful digital products through thoughtful design
                and meticulous engineering. Every pixel, every interaction —
                intentional.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        style={{ opacity: 0 }}
      >
        <span className="text-caption uppercase text-fg-secondary tracking-[0.2em]">
          Scroll
        </span>
        <div
          ref={lineRef}
          className="w-px h-16 bg-gradient-to-b from-fg-secondary/50 to-transparent"
          style={{ transform: 'scaleY(0)' }}
        />
      </div>
    </section>
  );
}
