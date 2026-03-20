import type { Metadata } from 'next';
import { PageLayout } from '@/components/layouts';
import { SecurityContent, SecurityPillars } from '@/components/sections/enterprise';
import { HighlightQuote } from '@/components/sections/shared';
import { ENTERPRISE_SECURITY } from '@/content/pages/enterprise-security';

const data = ENTERPRISE_SECURITY;

export const metadata: Metadata = {
  title: `${data.metadata.title} — Oona.Works`,
  description: data.metadata.description,
};

export default function EnterpriseSecurityPage() {
  return (
    <PageLayout
      badge={data.banner.badge}
      title={data.banner.title}
      heroImage={data.banner.heroImage}
      heroImageAlt={data.banner.heroImageAlt}
    >
      <SecurityContent body={data.body} whyTitle={data.whyTitle} whyText={data.whyText} />
      <HighlightQuote text={data.quote} />
      <SecurityPillars title={data.pillarsTitle} pillars={data.pillars} />
    </PageLayout>
  );
}
