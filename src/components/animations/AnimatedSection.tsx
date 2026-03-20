'use client';

import { motion, type Variants, useReducedMotion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';

interface AnimatedSectionProps {
  children: React.ReactNode;
  variant?: Variants;
  className?: string;
  delay?: number;
  as?: 'div' | 'section';
}

const motionComponents = {
  div: motion.div,
  section: motion.section,
};

export function AnimatedSection({
  children,
  variant = fadeUp,
  className,
  delay = 0,
  as = 'section',
}: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const Element = as;
    return <Element className={className}>{children}</Element>;
  }

  const Component = motionComponents[as];

  return (
    <Component
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      transition={delay > 0 ? { delay } : undefined}
      className={className}
    >
      {children}
    </Component>
  );
}
