'use client';

import { useEffect, useRef } from 'react';
import { useCountUp as useCountUpLib } from 'react-countup';
import { useScrollAnimation } from './useScrollAnimation';

interface UseCountUpOptions {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export function useCountUp(options: UseCountUpOptions) {
  const { end, duration = 2, prefix = '', suffix = '' } = options;
  const countUpRef = useRef<HTMLElement>(null) as React.RefObject<HTMLElement>;
  const hasStarted = useRef(false);
  const [scrollRef, inView] = useScrollAnimation({ threshold: 0.3 });

  const { start } = useCountUpLib({
    ref: countUpRef,
    end,
    duration,
    prefix,
    suffix,
    startOnMount: false,
  });

  useEffect(() => {
    if (inView && !hasStarted.current) {
      hasStarted.current = true;
      start();
    }
  }, [inView, start]);

  return {
    ref: scrollRef,
    countUpRef,
    inView,
  };
}
