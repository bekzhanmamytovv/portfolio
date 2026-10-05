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

// Используем качественные референсы с Unsplash для заглушек
export const cases: CaseStudy[] = [
  {
    slug: 'meridian-brand',
    title: 'Meridian',
    category: 'Brand Identity',
    year: '2024',
    description: 'A complete visual identity system for a fintech startup redefining digital banking.',
    image: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=1400&auto=format&fit=crop',
    color: '#E8E4DF',
    services: ['Brand Strategy', 'Visual Identity', 'Design System', 'Motion Design'],
    challenge: 'Create a brand that bridges the gap between traditional finance credibility and modern digital innovation.',
    solution: 'We developed a typographic-led identity system with a dynamic color framework.',
    nextCase: 'aurora-platform',
  },
  {
    slug: 'aurora-platform',
    title: 'Aurora',
    category: 'Digital Platform',
    year: '2024',
    description: 'End-to-end design and development of a creative collaboration platform.',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1400&auto=format&fit=crop',
    color: '#1a1a1a',
    services: ['UX Research', 'Product Design', 'Frontend Development', 'WebGL'],
    challenge: 'Design a platform that simplifies complex creative workflows without sacrificing professional features.',
    solution: 'An intuitive workspace architecture with progressive disclosure and seamless interactions.',
    nextCase: 'vanta-editorial',
  },
  {
    slug: 'vanta-editorial',
    title: 'Vanta',
    category: 'Editorial Design',
    year: '2023',
    description: 'Digital editorial experience for an independent architecture publication.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop',
    color: '#A3998D',
    services: ['Editorial Design', 'Web Development', 'Typography', 'CMS Architecture'],
    challenge: 'Translate the tactile quality of print editorial design into a digital reading experience.',
    solution: 'A scroll-driven narrative framework with cinematic pacing and immersive typography.',
    nextCase: 'synthesis-identity',
  },
  {
    slug: 'synthesis-identity',
    title: 'Synthesis',
    category: 'Art Direction',
    year: '2023',
    description: 'Art direction and visual identity for an AI research laboratory pushing boundaries.',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1400&auto=format&fit=crop',
    color: '#0D0D0D',
    services: ['Art Direction', 'Visual Identity', 'Motion Design', 'Spatial Design'],
    challenge: 'Visualize the intersection of human creativity and artificial intelligence.',
    solution: 'An organic, generative visual language that evolves across applications.',
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
