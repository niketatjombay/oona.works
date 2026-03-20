'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollAnimation(
  options: UseScrollAnimationOptions = {}
): [ref: (node: Element | null) => void, isInView: boolean] {
  const { threshold = 0.1, rootMargin = '0px', once = true } = options;
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<Element | null>(null);

  const cleanup = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const ref = useCallback(
    (node: Element | null) => {
      cleanup();
      elementRef.current = node;

      if (!node) return;

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (once) {
              cleanup();
            }
          } else if (!once) {
            setIsInView(false);
          }
        },
        { threshold, rootMargin }
      );

      observerRef.current.observe(node);
    },
    [threshold, rootMargin, once, cleanup]
  );

  return [ref, isInView];
}
