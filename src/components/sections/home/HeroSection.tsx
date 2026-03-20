'use client';

import { motion } from 'framer-motion';
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

  return (
    <section className="bg-background pt-[180px] pb-16 md:pb-24">
      <div className="mx-auto max-w-[var(--content-max)] px-4">
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-start md:justify-between">
          {/* Left column */}
          <div className="flex flex-col items-start">
            {/* Logo mark */}
            <motion.div variants={fadeIn} initial="hidden" animate="visible">
              <Image
                src="/images/logo-mark.png"
                alt="Oona.Works logo mark"
                width={352}
                height={164}
              />
            </motion.div>

            {/* Headline */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="mt-6"
            >
              {headlineLines.map((line) => (
                <motion.div key={line} variants={staggerItem}>
                  <h1 className="text-h1 text-foreground">{line}</h1>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
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
          </div>

          {/* Right column */}
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
              className="rounded-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
