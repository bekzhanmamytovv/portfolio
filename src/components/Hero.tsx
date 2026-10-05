'use client';

import SplitText from './SplitText';
import ScrollReveal from './ScrollReveal';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center relative pt-32 pb-32">
      <div className="container">
        <div className="max-w-[1400px]">
          <SplitText
            as="h1"
            className="text-display-xl text-accent mb-8 md:mb-12"
            delay={0.5}
            trigger={false}
            stagger={0.035}
          >
            Creative Developer & Art Director
          </SplitText>

          <div className="max-w-[540px] md:ml-auto md:mr-[10%]">
            <ScrollReveal delay={1.6} trigger={false}>
              <p className="text-body-lg text-fg-secondary leading-relaxed">
                Independent creator focusing on digital architecture. 
                I bridge the gap between rigorous art direction and fluid WebGL-driven development.
                Currently available for selected freelance projects.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
