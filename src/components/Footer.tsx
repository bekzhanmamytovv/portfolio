'use client';

import SplitText from './SplitText';
import ScrollReveal from './ScrollReveal';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container py-24 md:py-40">
        {/* CTA */}
        <div className="mb-24 md:mb-32">
          <SplitText as="h2" className="text-display text-accent mb-10">
            Let&apos;s create something together
          </SplitText>
          <ScrollReveal>
            <a
              href="mailto:hello@studio.com"
              className="inline-block text-heading text-fg-secondary hover:text-accent transition-colors duration-500 border-b border-fg-secondary/20 hover:border-accent/40 pb-2"
              data-cursor="hover"
              data-cursor-label="Email"
            >
              hello@studio.com
            </a>
          </ScrollReveal>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <ScrollReveal>
            <p className="text-caption uppercase text-fg-secondary tracking-[0.15em]">
              © {currentYear} Studio.
              <br className="md:hidden" />
              <span className="hidden md:inline"> — </span>
              All rights reserved.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap gap-6 md:gap-10">
              {['Twitter', 'Dribbble', 'Instagram', 'LinkedIn'].map(
                (social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-caption uppercase text-fg-secondary tracking-[0.15em] hover:text-accent transition-colors duration-500"
                  >
                    {social}
                  </a>
                )
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </footer>
  );
}
