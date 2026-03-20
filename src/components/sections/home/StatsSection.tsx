'use client';

import { AnimatedSection } from '@/components/animations';
import { CTAButton } from '@/components/common';
import { HOME_STATS } from '@/content/home';

export function StatsSection() {
  const { heading, subtitle, ctaLabel, ctaHref, stats } = HOME_STATS;

  return (
    <section className="mx-auto max-w-[var(--content-max)] px-4 py-16 md:py-24">
      <AnimatedSection as="div">
        <div className="bg-surface rounded-2xl p-[var(--section-padding)]">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Left column */}
            <div>
              <h3 className="text-h3 text-primary">
                {heading.split('\n').map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </h3>
              <p className="text-body-lg text-foreground mt-6">{subtitle}</p>
              <div className="mt-8">
                <CTAButton variant="dark" href={ctaHref}>
                  {ctaLabel}
                </CTAButton>
              </div>
            </div>

            {/* Right column — 2x2 stats grid */}
            <div className="grid grid-cols-2 gap-8">
              {stats.slice(0, 2).map((stat) => (
                <div key={stat.label}>
                  <p className="text-display text-foreground">{stat.label}</p>
                  <p className="text-overline text-foreground mt-2">
                    {stat.sublabel}
                  </p>
                </div>
              ))}
              <div className="bg-border col-span-2 h-px" />
              {stats.slice(2, 4).map((stat) => (
                <div key={stat.label}>
                  <p className="text-display text-foreground">{stat.label}</p>
                  <p className="text-overline text-foreground mt-2">
                    {stat.sublabel}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
