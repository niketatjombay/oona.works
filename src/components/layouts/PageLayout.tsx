import { ScrollProgress } from '@/components/common/ScrollProgress';
import { SharedCaseStudiesSection } from '@/components/sections/shared/SharedCaseStudiesSection';
import { SharedContactSection } from '@/components/sections/shared/SharedContactSection';
import { PageBanner } from './PageBanner';

interface PageLayoutProps {
  badge: string;
  title: string;
  subtitle?: string;
  heroImage: string;
  heroImageAlt: string;
  children: React.ReactNode;
}

export function PageLayout({
  badge,
  title,
  subtitle,
  heroImage,
  heroImageAlt,
  children,
}: PageLayoutProps) {
  return (
    <>
      <ScrollProgress />
      <PageBanner
        badge={badge}
        title={title}
        subtitle={subtitle}
        heroImage={heroImage}
        heroImageAlt={heroImageAlt}
      />
      {children}
      <SharedCaseStudiesSection />
      <SharedContactSection />
    </>
  );
}
