import type { Metadata } from 'next';
import { PageLayout } from '@/components/layouts';
import { UseCaseDashboard, UseCaseStats, UseCasePlatform } from '@/components/sections/use-case';
import { WORKFORCE } from '@/content/pages';

const data = WORKFORCE;

export const metadata: Metadata = {
  title: `${data.metadata.title} — Oona.Works`,
  description: data.metadata.description,
};

export default function WorkforcePage() {
  return (
    <PageLayout
      badge={data.banner.badge}
      title={data.banner.title}
      subtitle={data.banner.subtitle}
      heroImage={data.banner.heroImage}
      heroImageAlt={data.banner.heroImageAlt}
    >
      <UseCaseDashboard
        title={data.dashboard.title}
        subtitle={data.dashboard.subtitle}
        image={data.dashboard.image}
        imageAlt={data.dashboard.imageAlt}
      />
      <UseCaseStats stats={data.stats} />
      <UseCasePlatform />
    </PageLayout>
  );
}
