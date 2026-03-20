import Image from 'next/image';
import { SectionHeader } from '@/components/common';
import { AnimatedSection } from '@/components/animations';
import { HOME_PLATFORM } from '@/content/home';

export function UseCasePlatform() {
  return (
    <AnimatedSection className="mx-auto max-w-[var(--content-max)] px-4 py-16 md:py-24">
      <SectionHeader
        title={HOME_PLATFORM.title}
        subtitle={HOME_PLATFORM.subtitle}
        titleSize="h4"
        align="center"
      />
      <Image
        src="/images/platform-overview.png"
        alt="Platform overview"
        width={1380}
        height={512}
        className="mt-8 h-auto w-full rounded-2xl"
      />
    </AnimatedSection>
  );
}
