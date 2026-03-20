'use client';

import { AnimatedCounter } from '@/components/common';
import { AnimatedSection } from '@/components/animations';
import type { UseCaseStat } from '@/types';

interface UseCaseStatsProps {
  stats: UseCaseStat[];
}

export function UseCaseStats({ stats }: UseCaseStatsProps) {
  return (
    <AnimatedSection className="mx-auto max-w-[var(--content-max)] px-4 py-12">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
        {stats.map((stat) =>
          stat.type === 'static' ? (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center"
            >
              <span className="typo-h3 text-foreground">{stat.display}</span>
              <span className="typo-body-sm text-muted-foreground mt-2">
                {stat.label}
              </span>
            </div>
          ) : (
            <AnimatedCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              className="items-center text-center"
            />
          )
        )}
      </div>
    </AnimatedSection>
  );
}
