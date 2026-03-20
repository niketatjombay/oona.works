'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '@/components/common';
import { HOME_LIFECYCLE } from '@/content/home';
import { staggerContainer, staggerItem, scaleOnHover } from '@/lib/animations';

export function LifecycleSection() {
  return (
    <section className="max-w-[var(--content-max)] mx-auto px-4 py-16 md:py-24">
      <SectionHeader
        title={HOME_LIFECYCLE.title}
        subtitle={HOME_LIFECYCLE.subtitle}
        titleSize="h4"
        align="center"
      />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {HOME_LIFECYCLE.columns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-4 bg-background rounded-md">
            {column.cards.map((card, cardIndex) => {
              const cardContent = (
                <motion.div
                  key={cardIndex}
                  className="bg-surface rounded-sm p-6 relative"
                  variants={staggerItem}
                  whileHover={scaleOnHover}
                >
                  <div className="absolute top-6 right-6 w-[44px] h-[44px] flex items-center justify-center border border-border rounded-full">
                    <ArrowUpRight className="w-5 h-5 text-foreground" />
                  </div>

                  <h3 className="text-card-heading text-foreground pr-14">{card.title}</h3>

                  <ul className="mt-3 space-y-1">
                    {card.items.map((item, i) => (
                      <li key={i} className="text-body-sm text-foreground">
                        {'> '}{item}
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
    </section>
  );
}
