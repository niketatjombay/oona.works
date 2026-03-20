'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '@/components/common';
import { HOME_LIFECYCLE } from '@/content/home';
import { staggerContainer, staggerItem, scaleOnHover } from '@/lib/animations';

export function LifecycleSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mx-auto max-w-[var(--content-max)] px-4 py-[var(--section-padding)] md:py-[var(--section-padding-lg)]">
      <SectionHeader
        title={HOME_LIFECYCLE.title}
        subtitle={HOME_LIFECYCLE.subtitle}
        titleSize="h4"
        align="center"
      />

      {shouldReduceMotion ? (
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {HOME_LIFECYCLE.columns.map((column, colIndex) => (
            <div
              key={colIndex}
              className="bg-background flex flex-col gap-4 rounded-md"
            >
              {column.cards.map((card, cardIndex) => {
                const cardContent = (
                  <div
                    key={cardIndex}
                    className="bg-surface relative rounded-sm p-6 transition-shadow duration-200 hover:shadow-md md:p-[var(--card-padding-lg)]"
                  >
                    <div className="border-border absolute top-6 right-6 flex h-[44px] w-[44px] items-center justify-center rounded-full border">
                      <ArrowUpRight className="text-foreground h-5 w-5" />
                    </div>

                    <h3 className="typo-card-heading text-foreground pr-14">
                      {card.title}
                    </h3>

                    <ul className="mt-3 space-y-1">
                      {card.items.map((item, i) => (
                        <li key={i} className="typo-body-sm text-foreground">
                          {'> '}
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );

                if (card.href) {
                  return (
                    <Link key={cardIndex} href={card.href}>
                      {cardContent}
                    </Link>
                  );
                }

                return cardContent;
              })}
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {HOME_LIFECYCLE.columns.map((column, colIndex) => (
            <div
              key={colIndex}
              className="bg-background flex flex-col gap-4 rounded-md"
            >
              {column.cards.map((card, cardIndex) => {
                const cardContent = (
                  <motion.div
                    key={cardIndex}
                    className="bg-surface relative rounded-sm p-6 md:p-[var(--card-padding-lg)]"
                    variants={staggerItem}
                    whileHover={scaleOnHover}
                  >
                    <div className="border-border absolute top-6 right-6 flex h-[44px] w-[44px] items-center justify-center rounded-full border">
                      <ArrowUpRight className="text-foreground h-5 w-5" />
                    </div>

                    <h3 className="typo-card-heading text-foreground pr-14">
                      {card.title}
                    </h3>

                    <ul className="mt-3 space-y-1">
                      {card.items.map((item, i) => (
                        <li key={i} className="typo-body-sm text-foreground">
                          {'> '}
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );

                if (card.href) {
                  return (
                    <Link key={cardIndex} href={card.href}>
                      {cardContent}
                    </Link>
                  );
                }

                return cardContent;
              })}
            </div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
