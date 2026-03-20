'use client';

import { SectionHeader } from '@/components/common/SectionHeader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { glowPulse, staggerContainer, staggerItem } from '@/lib/animations';
import { motion, useReducedMotion } from 'framer-motion';

interface SecurityPillarsProps {
  title: string;
  pillars: { title: string; description: string }[];
}

function PillarCard({
  pillar,
  shouldReduceMotion,
}: {
  pillar: { title: string; description: string };
  shouldReduceMotion: boolean | null;
}) {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.3 });

  return (
    <motion.div
      variants={staggerItem}
      whileHover={shouldReduceMotion ? undefined : glowPulse}
      className="bg-surface border-border rounded-md border p-6 transition-shadow"
    >
      <div ref={ref as (node: Element | null) => void}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-primary mb-3 ${isVisible ? 'animate-stroke-draw is-visible' : 'animate-stroke-draw'}`}
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <h4 className="text-card-heading text-foreground font-semibold">
          {pillar.title}
        </h4>
        <p className="text-body-sm text-muted-foreground">{pillar.description}</p>
      </div>
    </motion.div>
  );
}

export function SecurityPillars({ title, pillars }: SecurityPillarsProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="mx-auto max-w-[var(--content-max)] px-4 py-12">
      <SectionHeader title={title} titleSize="h4" align="center" />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        {pillars.map((pillar) => (
          <PillarCard
            key={pillar.title}
            pillar={pillar}
            shouldReduceMotion={shouldReduceMotion}
          />
        ))}
      </motion.div>
    </div>
  );
}
