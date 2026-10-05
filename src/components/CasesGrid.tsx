'use client';

import { cases } from '@/lib/data';
import CaseCard from './CaseCard';
import SplitText from './SplitText';

// Асимметричная журнальная сетка
const GRID_LAYOUTS = [
  { wrapperClass: 'w-full md:w-[55%]', aspect: '4/5' }, // 0: Крупно слева
  { wrapperClass: 'w-full md:w-[35%] md:ml-auto md:-mt-[15vw]', aspect: '3/4' }, // 1: Узко справа со сдвигом вверх
  { wrapperClass: 'w-full mt-20 md:mt-32', aspect: '16/9' }, // 2: Фуллскрин по центру
  { wrapperClass: 'w-full md:w-[60%] md:mx-auto mt-20 md:mt-32', aspect: '4/5' }, // 3: По центру средне
];

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
        <div className="mt-8 h-px bg-border" />
      </div>

      <div className="container">
        <div className="flex flex-col gap-24 md:gap-0">
          {cases.map((caseStudy, index) => {
            const layout = GRID_LAYOUTS[index % GRID_LAYOUTS.length];
            return (
              <div key={caseStudy.slug} className={layout.wrapperClass}>
                <CaseCard 
                  caseStudy={caseStudy} 
                  index={index} 
                  aspectRatio={layout.aspect}
                  priority={index < 2}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
