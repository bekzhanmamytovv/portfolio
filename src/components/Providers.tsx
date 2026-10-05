'use client';

import { ReactNode } from 'react';
import SmoothScroll from './SmoothScroll';
import CustomCursor from './CustomCursor';
import PageTransition from './PageTransition';
import ThemeProvider from './ThemeProvider';
import ScrollProgress from './ScrollProgress';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <PageTransition>{children}</PageTransition>
        <CustomCursor />
        <ScrollProgress />
      </SmoothScroll>
    </ThemeProvider>
  );
}
