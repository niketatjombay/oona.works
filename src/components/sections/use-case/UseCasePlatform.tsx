'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeader } from '@/components/common';
import { AnimatedSection } from '@/components/animations';
import { HOME_PLATFORM } from '@/content/home';
import { floatingLoop } from '@/lib/animations';

export function UseCasePlatform() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatedSection className="mx-auto max-w-[var(--content-max)] px-4 py-16 md:py-24">
      <SectionHeader
        title={HOME_PLATFORM.title}
        subtitle={HOME_PLATFORM.subtitle}
        titleSize="h4"
        align="center"
      />
      <motion.div animate={shouldReduceMotion ? undefined : floatingLoop}>
        <Image
          src="/images/platform-overview.png"
          alt="Platform overview"
          width={1380}
          height={512}
          className="mt-8 h-auto w-full rounded-2xl"
        />
      </motion.div>
    </AnimatedSection>
  );
}
