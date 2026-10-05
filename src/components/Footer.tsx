'use client';

import SplitText from './SplitText';
import ScrollReveal from './ScrollReveal';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border pt-24 pb-12 md:pt-40 md:pb-16 bg-bg overflow-hidden relative">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 md:gap-32 mb-32">
          
          {/* Huge CTA */}
          <div className="max-w-[900px]">
            <ScrollReveal>
              <h2 className="text-caption uppercase text-fg-secondary tracking-[0.2em] mb-8">
                Got a project in mind?
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <a
                href="mailto:hello@ilyadev.com"
                className="text-[clamp(3rem,8vw,8rem)] leading-[0.9] tracking-tight text-accent hover:opacity-70 transition-opacity duration-500 block mb-4"
                data-cursor="magnet"
              >
                hello@ilyadev.com
              </a>
            </ScrollReveal>
          </div>

          {/* Nav Links */}
          <div className="flex gap-16 md:gap-24 shrink-0">
            <ScrollReveal delay={0.2}>
              <div className="flex flex-col gap-4">
                <span className="text-caption uppercase text-fg-secondary tracking-[0.15em] mb-4">Socials</span>
                {['Twitter', 'Instagram', 'LinkedIn', 'GitHub'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    data-cursor="link"
                    className="text-body-lg hover:text-accent transition-colors duration-300"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-col gap-4">
                <span className="text-caption uppercase text-fg-secondary tracking-[0.15em] mb-4">Location</span>
                <span className="text-body-lg">
                  Remote (Europe)<br />
                  <span className="text-fg-secondary mt-2 block">GMT+2</span>
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-10 border-t border-border/50">
          <ScrollReveal>
            <p className="text-caption uppercase text-fg-secondary tracking-[0.15em]">
              © {currentYear} Ilya. All rights reserved.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <p className="text-caption uppercase text-fg-secondary tracking-[0.15em]">
              Crafted with Next.js & WebGL
            </p>
          </ScrollReveal>
        </div>
      </div>
    </footer>
  );
}
