'use client';

import { cases } from '@/lib/data';
import CaseCard from './CaseCard';
import SplitText from './SplitText';

export default function CasesGrid() {
  return (
    <section className="pb-40 md:pb-56">
      <div className="container mb-16 md:mb-24">
        <div className="flex items-end justify-between gap-8">
          <SplitText as="h2" className="text-display text-accent">
            Selected Work
          </SplitText>
          <span className="text-caption text-fg-secondary uppercase tracking-[0.15em] hidden md:block pb-3">
            {cases.length} Projects
          </span>
        </div>

        {/* Divider */}
        <div className="mt-8 h-px bg-border" />
      </div>

      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-20 md:gap-y-32">
          {cases.map((caseStudy, index) => (
            <div
              key={caseStudy.slug}
              className={index % 2 === 1 ? 'md:mt-40' : ''}
            >
              <CaseCard caseStudy={caseStudy} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
