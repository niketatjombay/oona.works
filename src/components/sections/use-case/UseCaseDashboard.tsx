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
    <AnimatedSection className="max-w-[var(--content-max)] mx-auto px-4 py-12">
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
        className="w-full h-auto rounded-2xl mt-8"
      />
    </AnimatedSection>
  );
}
