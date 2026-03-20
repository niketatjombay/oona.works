'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { HOME_HERO } from '@/content/home';
import { CTAButton } from '@/components/common/CTAButton';
import {
  fadeIn,
  fadeUp,
  fadeRight,
  staggerContainer,
  staggerItem,
} from '@/lib/animations';

export function HeroSection() {
  const headlineLines = HOME_HERO.headline.split('\n');
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-background pt-[180px] pb-16 md:pb-24">
      <div className="mx-auto max-w-[var(--content-max)] px-4">
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-start md:justify-between">
          {/* Left column */}
          <div className="flex flex-col items-start">
            {/* Logo mark */}
            {shouldReduceMotion ? (
              <div>
                <Image
                  src="/images/logo-mark.png"
                  alt="Oona.Works logo mark"
                  width={352}
                  height={164}
                />
              </div>
            ) : (
              <motion.div variants={fadeIn} initial="hidden" animate="visible">
                <Image
                  src="/images/logo-mark.png"
                  alt="Oona.Works logo mark"
                  width={352}
                  height={164}
                />
              </motion.div>
            )}

            {/* Headline */}
            {shouldReduceMotion ? (
              <div className="mt-6">
                {headlineLines.map((line) => (
                  <div key={line}>
                    <h1 className="md:text-h1 text-foreground text-[36px] leading-[44px] tracking-[-1px]">
                      {line}
                    </h1>
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="mt-6"
              >
                {headlineLines.map((line) => (
                  <motion.div key={line} variants={staggerItem}>
                    <h1 className="md:text-h1 text-foreground text-[36px] leading-[44px] tracking-[-1px]">
                      {line}
                    </h1>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* CTA */}
            {shouldReduceMotion ? (
              <div className="mt-8">
                <CTAButton variant="primary" href={HOME_HERO.ctaHref}>
                  {HOME_HERO.ctaLabel}
                </CTAButton>
              </div>
            ) : (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <CTAButton variant="primary" href={HOME_HERO.ctaHref}>
                  {HOME_HERO.ctaLabel}
                </CTAButton>
              </motion.div>
            )}
          </div>

          {/* Right column */}
          {shouldReduceMotion ? (
            <div className="flex-shrink-0">
              <Image
                src="/images/hero-image.png"
                alt="Hero illustration"
                width={464}
                height={484}
                className="h-auto w-full rounded-2xl"
              />
            </div>
          ) : (
            <motion.div
              variants={fadeRight}
              initial="hidden"
              animate="visible"
              className="flex-shrink-0"
            >
              <Image
                src="/images/hero-image.png"
                alt="Hero illustration"
                width={464}
                height={484}
                className="h-auto w-full rounded-2xl"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
