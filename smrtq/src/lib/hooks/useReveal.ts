'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

export function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/** Returns the shared fade-up reveal style used across section components. */
export function revealStyle(inView: boolean, delayMs = 0): CSSProperties {
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.7s ease ${delayMs}ms, transform 0.7s ease ${delayMs}ms`,
  };
}

/** Reveal style for staggered children (e.g. product cards). */
export function revealItemStyle(inView: boolean, index: number, baseDelayMs = 0, stepMs = 120): CSSProperties {
  const delay = baseDelayMs + index * stepMs;
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(40px)',
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  };
}
