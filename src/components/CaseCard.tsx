'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { CaseStudy } from '@/lib/data';
import TransitionLink from './TransitionLink';
import ScrollReveal from './ScrollReveal';
import WebGLImage from './WebGLImage';
import { getSoundManager } from '@/lib/sounds';

interface CaseCardProps {
  caseStudy: CaseStudy;
  index: number;
  aspectRatio?: string;
  priority?: boolean;
}

export default function CaseCard({ caseStudy, index, aspectRatio = '4/5', priority = false }: CaseCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageWrapperRef.current) return;
    
    // Эффект параллакса (разная скорость смещения картинки при скролле)
    const ctx = gsap.context(() => {
      gsap.to(imageWrapperRef.current, {
        y: '20%', // Смещение вниз при скролле
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <ScrollReveal delay={0.1} y={80} duration={1.6}>
      <TransitionLink href={`/case/${caseStudy.slug}`} className="group block">
        <article
          ref={containerRef}
          data-cursor="hover"
          data-cursor-label="View Project"
          onMouseEnter={() => getSoundManager()?.hover()}
        >
          {/* Контейнер маски */}
          <div
            className="relative overflow-hidden mb-6 md:mb-8"
            style={{
              aspectRatio,
              backgroundColor: caseStudy.color,
            }}
          >
            {/* Обертка картинки (увеличена для параллакса) */}
            <div 
              ref={imageWrapperRef} 
              className="absolute top-[-20%] left-[-5%] w-[110%] h-[140%] will-change-transform"
            >
              <WebGLImage src={caseStudy.image} alt={caseStudy.title} priority={priority} />
            </div>

            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.05] transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 pointer-events-none" />

            {/* Hover scale effect */}
            <div
              className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] pointer-events-none"
              style={{ transformOrigin: 'center' }}
            />
          </div>

          <div className="flex items-start justify-between gap-4 relative z-10">
            <div>
              <h3 className="text-heading text-accent mb-1 group-hover:opacity-70 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                {caseStudy.title}
              </h3>
              <p className="text-body text-fg-secondary">
                {caseStudy.category}
              </p>
            </div>
            <span className="text-caption text-fg-secondary uppercase tracking-[0.15em] mt-2 shrink-0">
              {caseStudy.year}
            </span>
          </div>
        </article>
      </TransitionLink>
    </ScrollReveal>
  );
}
