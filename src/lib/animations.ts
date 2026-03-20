import type { Variants, TargetAndTransition } from 'framer-motion';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// Used with whileHover prop, not with variants/whileInView
export const scaleOnHover: TargetAndTransition = {
  scale: 1.02,
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
  transition: { duration: 0.2, ease: 'easeOut' },
};

// Perpetual floating animation for screenshots/images.
// Use with motion.div animate={floatingLoop} (not variants/whileInView).
export const floatingLoop = {
  y: [0, -8, 0],
  transition: {
    duration: 3,
    ease: 'easeInOut',
    repeat: Infinity,
    repeatType: 'loop' as const,
  },
};

// Glow effect on hover for enterprise pillar cards.
// Use with whileHover prop, like scaleOnHover.
export const glowPulse: TargetAndTransition = {
  scale: 1.02,
  boxShadow: '0 0 24px rgba(247, 38, 133, 0.25)',
  transition: { duration: 0.3, ease: 'easeOut' },
};

// Uses initial/animate/exit keys for AnimatePresence (not hidden/visible).
// Do NOT pass to AnimatedSection — use with AnimatePresence directly.
export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};
