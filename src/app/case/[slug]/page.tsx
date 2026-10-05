import { notFound } from 'next/navigation';
import { cases, getCaseBySlug, getNextCase } from '@/lib/data';
import Header from '@/components/Header';
import CaseHero from '@/components/CaseHero';
import ScrollReveal from '@/components/ScrollReveal';
import TransitionLink from '@/components/TransitionLink';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

interface CasePageProps {
  params: { slug: string };
}

export default function CasePage({ params }: CasePageProps) {
  const caseStudy = getCaseBySlug(params.slug);

  if (!caseStudy) {
    notFound();
  }

  const nextCase = getNextCase(params.slug);

  return (
    <main>
      <Header />
      <CaseHero caseStudy={caseStudy} />

      {/* Case details */}
      <section className="pb-32 md:pb-40">
        <div className="container">
          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-24 md:mb-32">
            <ScrollReveal>
              <h3 className="text-caption uppercase text-fg-secondary tracking-[0.15em] mb-6">
                The Challenge
              </h3>
              <p className="text-body-lg text-fg leading-relaxed">
                {caseStudy.challenge}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <h3 className="text-caption uppercase text-fg-secondary tracking-[0.15em] mb-6">
                The Solution
              </h3>
              <p className="text-body-lg text-fg leading-relaxed">
                {caseStudy.solution}
              </p>
            </ScrollReveal>
          </div>

          {/* Services */}
          <ScrollReveal>
            <div className="border-t border-border pt-12">
              <h3 className="text-caption uppercase text-fg-secondary tracking-[0.15em] mb-8">
                Services
              </h3>
              <div className="flex flex-wrap gap-3">
                {caseStudy.services.map((service) => (
                  <span
                    key={service}
                    className="text-body text-fg-secondary border border-border px-5 py-2.5 hover:text-fg hover:border-fg-secondary/50 transition-colors duration-300"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Next case */}
      {nextCase && (
        <section className="border-t border-border">
          <div className="container py-32 md:py-48 text-center">
            <ScrollReveal>
              <span className="text-caption uppercase text-fg-secondary tracking-[0.2em] block mb-10">
                Next Project
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <TransitionLink href={`/case/${nextCase.slug}`}>
                <span
                  className="text-display-xl text-accent inline-block hover:opacity-50 transition-opacity duration-700"
                  data-cursor="hover"
                  data-cursor-label="Next"
                >
                  {nextCase.title}
                </span>
              </TransitionLink>
            </ScrollReveal>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
