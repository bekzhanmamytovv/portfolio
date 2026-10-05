export interface CaseStudy {
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  color: string;
  services: string[];
  challenge: string;
  solution: string;
  nextCase?: string;
}

export const cases: CaseStudy[] = [
  {
    slug: 'meridian-brand',
    title: 'Meridian',
    category: 'Brand Identity',
    year: '2024',
    description:
      'A complete visual identity system for a fintech startup redefining digital banking.',
    image: '/images/case-01.svg',
    color: '#1a1a2e',
    services: [
      'Brand Strategy',
      'Visual Identity',
      'Design System',
      'Motion Design',
    ],
    challenge:
      'Create a brand that bridges the gap between traditional finance credibility and modern digital innovation, appealing to both enterprise clients and individual users.',
    solution:
      'We developed a typographic-led identity system with a dynamic color framework that adapts seamlessly across digital and physical touchpoints.',
    nextCase: 'aurora-platform',
  },
  {
    slug: 'aurora-platform',
    title: 'Aurora',
    category: 'Digital Platform',
    year: '2024',
    description:
      'End-to-end design and development of a creative collaboration platform.',
    image: '/images/case-02.svg',
    color: '#0d1b2a',
    services: [
      'UX Research',
      'Product Design',
      'Frontend Development',
      'Prototyping',
    ],
    challenge:
      'Design a platform that simplifies complex creative workflows without sacrificing professional-grade features or creative freedom.',
    solution:
      'An intuitive workspace architecture with progressive disclosure, keeping the interface clean while powerful features remain one click away.',
    nextCase: 'vanta-editorial',
  },
  {
    slug: 'vanta-editorial',
    title: 'Vanta',
    category: 'Editorial Design',
    year: '2023',
    description:
      'Digital editorial experience for an independent architecture and design publication.',
    image: '/images/case-03.svg',
    color: '#1b1b1b',
    services: [
      'Editorial Design',
      'Web Development',
      'Typography',
      'CMS Architecture',
    ],
    challenge:
      'Translate the tactile quality of print editorial design into a digital reading experience that feels equally considered and immersive.',
    solution:
      'A scroll-driven narrative framework with cinematic pacing, typographic rhythm, and immersive full-bleed image treatments.',
    nextCase: 'synthesis-identity',
  },
  {
    slug: 'synthesis-identity',
    title: 'Synthesis',
    category: 'Art Direction',
    year: '2023',
    description:
      'Art direction and visual identity for an AI research laboratory pushing boundaries.',
    image: '/images/case-04.svg',
    color: '#121212',
    services: [
      'Art Direction',
      'Visual Identity',
      'Motion Design',
      'Spatial Design',
    ],
    challenge:
      'Visualize the intersection of human creativity and artificial intelligence without resorting to clichéd tech aesthetics or cold, impersonal visuals.',
    solution:
      'An organic, generative visual language that evolves across applications, reflecting the adaptive and emergent nature of AI systems.',
    nextCase: 'meridian-brand',
  },
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}

export function getNextCase(slug: string): CaseStudy | undefined {
  const current = getCaseBySlug(slug);
  if (current?.nextCase) {
    return getCaseBySlug(current.nextCase);
  }
  return undefined;
}
