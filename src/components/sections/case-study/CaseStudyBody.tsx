'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { AnimatedSection } from '@/components/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface CaseStudyBodyProps {
  howItWorks: {
    title: string;
    steps: { number: number; title: string; description: string }[];
  };
  outcomes: {
    title: string;
    items: string[];
  };
}

export function CaseStudyBody({ howItWorks, outcomes }: CaseStudyBodyProps) {
  const [ref, isInView] = useScrollAnimation({ threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="mx-auto max-w-[var(--content-max)] px-4 py-12">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <AnimatedSection
          as="div"
          className="bg-surface rounded-xl p-6 md:p-[var(--section-padding)]"
        >
          <h3 className="text-h3 text-foreground mb-6">{howItWorks.title}</h3>
          <div ref={ref} className="relative">
            {/* Background track */}
            <div className="bg-border absolute left-[7px] top-0 bottom-0 w-0.5" />
            {/* Animated overlay line */}
            <motion.div
              className="bg-primary absolute left-[7px] top-0 bottom-0 w-0.5 origin-top"
              initial={{ scaleY: prefersReducedMotion ? 1 : 0 }}
              animate={{ scaleY: isInView ? 1 : 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 1.5, ease: 'easeOut' }
              }
            />
            {/* Steps */}
            <div className="space-y-4">
              {howItWorks.steps.map((step) => (
                <div key={step.number} className="relative pl-8">
                  {/* Circle marker */}
                  <div className="bg-surface border-primary absolute left-0 top-1 size-[14px] rounded-full border-2" />
                  <p className="text-body-sm text-foreground font-semibold">
                    {step.number}. {step.title}
                  </p>
                  <p className="text-body-sm text-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection
          as="div"
          className="bg-surface rounded-xl p-6 md:p-[var(--section-padding)]"
          delay={0.1}
        >
          <h3 className="text-h3 text-foreground mb-6">{outcomes.title}</h3>
          <ul className="list-disc space-y-2 pl-6">
            {outcomes.items.map((item, index) => (
              <li key={index} className="text-body-sm text-foreground">
                {item}
              </li>
            ))}
          </ul>
        </AnimatedSection>
      </div>
    </div>
  );
}
