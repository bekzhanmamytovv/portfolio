'use client';

import Link from 'next/link';
import { usePageTransition } from './PageTransition';
import { ReactNode, MouseEvent } from 'react';

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

export default function TransitionLink({
  href,
  children,
  className,
  ...props
}: TransitionLinkProps) {
  const { navigateTo } = usePageTransition();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigateTo(href);
  };

  return (
    <Link href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
}
