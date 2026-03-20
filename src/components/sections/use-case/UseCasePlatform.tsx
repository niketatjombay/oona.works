import Image from 'next/image';
import { SectionHeader } from '@/components/common';
import { AnimatedSection } from '@/components/animations';
import { HOME_PLATFORM } from '@/content/home';

export function UseCasePlatform() {
  return (
    <AnimatedSection className="max-w-[var(--content-max)] mx-auto px-4 py-16 md:py-24">
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
        className="w-full h-auto rounded-2xl mt-8"
      />
    </AnimatedSection>
  );
}
