'use client';

import type { CaseStudy } from '@/lib/data';
import TransitionLink from './TransitionLink';
import ScrollReveal from './ScrollReveal';
import WebGLImage from './WebGLImage';
import { getSoundManager } from '@/lib/sounds';

interface CaseCardProps {
  caseStudy: CaseStudy;
  index: number;
}

export default function CaseCard({ caseStudy, index }: CaseCardProps) {
  return (
    <ScrollReveal delay={index % 2 === 1 ? 0.15 : 0} y={80} duration={1.6}>
      <TransitionLink href={`/case/${caseStudy.slug}`} className="group block">
        <article
          data-cursor="hover"
          data-cursor-label="View Case"
          onMouseEnter={() => getSoundManager()?.hover()}
        >
          {/* Image container */}
          <div
            className="relative overflow-hidden mb-6 md:mb-8"
            style={{
              aspectRatio: index % 3 === 0 ? '4/5' : '3/4',
              backgroundColor: caseStudy.color,
            }}
          >
            <WebGLImage src={caseStudy.image} alt={caseStudy.title} priority={index < 2} />

            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.08] transition-all duration-700 ease-out z-10 pointer-events-none" />

            {/* Scale effect on the image container */}
            <div
              className="absolute inset-0 transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03] pointer-events-none"
              style={{ transformOrigin: 'center' }}
            />
          </div>

          {/* Meta */}
          <div className="flex items-start justify-between gap-4 relative z-10">
            <div>
              <h3 className="text-heading text-accent mb-1 group-hover:opacity-70 transition-opacity duration-500">
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
