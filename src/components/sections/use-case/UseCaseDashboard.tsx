import Image from 'next/image';
import { SectionHeader } from '@/components/common';
import { AnimatedSection } from '@/components/animations';

interface UseCaseDashboardProps {
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
}

export function UseCaseDashboard({
  title,
  subtitle,
  image,
  imageAlt,
}: UseCaseDashboardProps) {
  return (
    <AnimatedSection className="mx-auto max-w-[var(--content-max)] px-4 py-12">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        titleSize="h4"
        align="center"
      />
      <Image
        src={image}
        alt={imageAlt}
        width={1140}
        height={524}
        className="mt-8 h-auto w-full rounded-2xl"
      />
    </AnimatedSection>
  );
}
