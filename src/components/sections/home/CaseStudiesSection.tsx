'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { HOME_CASE_STUDIES } from '@/content/home';
import { staggerContainer, staggerItem, scaleOnHover } from '@/lib/animations';

export function CaseStudiesSection() {
  const { title, articles } = HOME_CASE_STUDIES;

  return (
    <section className="max-w-[var(--content-max)] mx-auto px-4 py-16 md:py-24">
      <div className="bg-surface rounded-2xl p-[var(--section-padding)]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-h3 text-foreground">{title}</h2>
          <div className="size-16 rounded-full border border-border flex items-center justify-center">
            <ArrowUpRight size={32} />
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
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
                <div className="bg-surface border border-border rounded-md overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={330}
                    height={220}
                    className="w-full h-auto"
                  />
                  <p className="text-card-heading text-foreground px-8 py-6">
                    {article.title}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
