'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { CaseStudy } from '@/lib/data';
import SplitText from './SplitText';
import ScrollReveal from './ScrollReveal';

interface CaseHeroProps {
  caseStudy: CaseStudy;
}

export default function CaseHero({ caseStudy }: CaseHeroProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    const meta = metaRef.current;

    if (image) {
      gsap.fromTo(
        image,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.6,
          ease: 'power4.inOut',
          delay: 0.5,
        }
      );

      // Subtle parallax scale
      gsap.fromTo(
        image.querySelector('img'),
        { scale: 1.2 },
        {
          scale: 1,
          duration: 1.8,
          ease: 'power3.out',
          delay: 0.5,
        }
      );
    }

    if (meta) {
      gsap.fromTo(
        meta.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.08,
          delay: 0.3,
        }
      );
    }
  }, []);

  return (
    <section className="pt-36 md:pt-44 pb-20 md:pb-28">
      <div className="container">
        {/* Meta row */}
        <div ref={metaRef} className="flex items-center gap-6 mb-8 md:mb-10">
          <span className="text-caption uppercase text-fg-secondary tracking-[0.15em]">
            {caseStudy.category}
          </span>
          <span className="w-10 h-px bg-fg-secondary/30" />
          <span className="text-caption uppercase text-fg-secondary tracking-[0.15em]">
            {caseStudy.year}
          </span>
        </div>

        {/* Title */}
        <div className="mb-16 md:mb-20">
          <SplitText
            as="h1"
            className="text-display-xl text-accent"
            delay={0.15}
            trigger={false}
            stagger={0.03}
          >
            {caseStudy.title}
          </SplitText>
        </div>

        {/* Hero image */}
        <div
          ref={imageRef}
          className="w-full overflow-hidden"
          style={{
            aspectRatio: '16/9',
            backgroundColor: caseStudy.color,
            clipPath: 'inset(100% 0 0 0)',
          }}
        >
          <img
            src={caseStudy.image}
            alt={caseStudy.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>

        {/* Description */}
        <div className="mt-16 md:mt-24 max-w-[680px]">
          <ScrollReveal>
            <p className="text-body-lg text-fg-secondary leading-relaxed">
              {caseStudy.description}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
