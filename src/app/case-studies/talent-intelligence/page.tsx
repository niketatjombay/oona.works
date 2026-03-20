import type { Metadata } from 'next';
import { PageLayout } from '@/components/layouts';
import {
  CaseStudyProblem,
  CaseStudySummary,
  CaseStudyBody,
} from '@/components/sections/case-study';
import { HighlightQuote } from '@/components/sections/shared';
import { TALENT_INTELLIGENCE } from '@/content/case-studies';

const data = TALENT_INTELLIGENCE;

export const metadata: Metadata = {
  title: `${data.metadata.title} — Oona.Works`,
  description: data.metadata.description,
};

export default function TalentIntelligencePage() {
  return (
    <PageLayout
      badge={data.banner.badge}
      title={data.banner.title}
      heroImage={data.banner.heroImage}
      heroImageAlt={data.banner.heroImageAlt}
    >
      <CaseStudyProblem text={data.problem} />
      <CaseStudySummary text={data.summary} />
      <CaseStudyBody howItWorks={data.howItWorks} outcomes={data.outcomes} />
      <HighlightQuote text={data.quote} />
    </PageLayout>
  );
}
