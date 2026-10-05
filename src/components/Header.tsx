'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import TransitionLink from './TransitionLink';
import ThemeToggle from './ThemeToggle';
import SoundToggle from './SoundToggle';

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    gsap.fromTo(
      el.children,
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'expo.out',
        delay: 0.3,
        stagger: 0.1,
      }
    );
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 mix-blend-difference pointer-events-none"
    >
      {/* pointer-events-none на контейнере, pointer-events-auto на детях, чтобы не блокировать клики под хедером */}
      <div className="container flex items-center justify-between py-6 md:py-8 pointer-events-auto">
        <TransitionLink
          href="/"
          className="text-caption uppercase tracking-[0.2em] text-white"
        >
          Studio©
        </TransitionLink>

        <nav className="flex items-center gap-6 md:gap-10">
          <TransitionLink
            href="/"
            className="text-caption uppercase tracking-[0.15em] text-white opacity-50 hover:opacity-100 transition-opacity duration-500"
          >
            Work
          </TransitionLink>
          <a
            href="mailto:hello@studio.com"
            className="text-caption uppercase tracking-[0.15em] text-white opacity-50 hover:opacity-100 transition-opacity duration-500 hidden sm:block"
          >
            Contact
          </a>
          
          <div className="w-px h-4 bg-white/20 mx-2 hidden sm:block" />
          
          <ThemeToggle />
          <SoundToggle />
        </nav>
      </div>
    </header>
  );
}
