'use client';

import { cn } from '@/lib/utils';
import { useCountUp } from '@/hooks/useCountUp';

interface AnimatedCounterProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  label,
  prefix,
  suffix,
  duration,
  className,
}: AnimatedCounterProps) {
  const { ref, countUpRef } = useCountUp({
    end: value,
    prefix,
    suffix,
    duration,
  });

  return (
    <div ref={ref} className={cn('flex flex-col', className)}>
      <span ref={countUpRef} className="typo-display text-foreground" />
      <span className="typo-overline text-foreground mt-2">{label}</span>
    </div>
  );
}
