import Image from 'next/image';
import { HOME_PLATFORM } from '@/content/home';
import { SectionHeader } from '@/components/common';
import { AnimatedSection } from '@/components/animations';

export function PlatformSection() {
  return (
    <section className="relative mx-auto max-w-[var(--content-max)] px-4 py-[var(--section-padding)] md:py-[var(--section-padding-lg)]">
      <Image
        src="/images/accent-shape.svg"
        alt=""
        width={162}
        height={90}
        className="pointer-events-none absolute top-0 right-[-40px] opacity-50"
        aria-hidden
      />
      <SectionHeader
        title={HOME_PLATFORM.title}
        subtitle={HOME_PLATFORM.subtitle}
        titleSize="h4"
        align="center"
      />
      <AnimatedSection as="div" delay={0.2} className="mt-12 w-full">
        <Image
          src="/images/platform-overview.png"
          alt="Platform overview"
          width={1380}
          height={512}
          className="w-full rounded-2xl"
        />
      </AnimatedSection>
    </section>
  );
}
