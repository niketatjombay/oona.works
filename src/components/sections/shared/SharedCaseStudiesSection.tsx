'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { HOME_CASE_STUDIES } from '@/content/home';
import { staggerContainer, staggerItem, scaleOnHover } from '@/lib/animations';

export function SharedCaseStudiesSection() {
  const { title, articles } = HOME_CASE_STUDIES;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mx-auto max-w-[var(--content-max)] px-4 py-[var(--section-padding)] md:py-[var(--section-padding-lg)]">
      <div className="bg-surface rounded-2xl p-6 md:p-[var(--section-padding)]">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="typo-h3 text-foreground">{title}</h2>
          <div className="border-border flex size-16 items-center justify-center rounded-full border">
            <ArrowUpRight size={32} />
          </div>
        </div>

        {shouldReduceMotion ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {articles.map((article) => (
              <div
                key={article.href}
                className="transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <Link href={article.href}>
                  <div className="bg-surface border-border overflow-hidden rounded-[12px] border">
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={330}
                      height={220}
                      className="h-auto w-full"
                    />
                    <p className="typo-card-heading text-foreground px-8 py-6">
                      {article.title}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {articles.map((article) => (
              <motion.div
                key={article.href}
                variants={staggerItem}
                whileHover={scaleOnHover}
              >
                <Link href={article.href}>
                  <div className="bg-surface border-border overflow-hidden rounded-[12px] border">
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={330}
                      height={220}
                      className="h-auto w-full"
                    />
                    <p className="typo-card-heading text-foreground px-8 py-6">
                      {article.title}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
