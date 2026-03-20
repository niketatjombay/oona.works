'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeader } from '@/components/common';
import { AnimatedSection } from '@/components/animations';
import { floatingLoop } from '@/lib/animations';

interface UseCaseDashboardProps {
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
}

export function UseCaseDashboard({
  title,
  subtitle,
  image,
  imageAlt,
}: UseCaseDashboardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatedSection className="mx-auto max-w-[var(--content-max)] px-4 py-12">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        titleSize="h4"
        align="center"
      />
      <motion.div animate={shouldReduceMotion ? undefined : floatingLoop}>
        <Image
          src={image}
          alt={imageAlt}
          width={1140}
          height={524}
          className="mt-8 h-auto w-full rounded-2xl"
        />
      </motion.div>
    </AnimatedSection>
  );
}
