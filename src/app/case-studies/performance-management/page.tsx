import type { Metadata } from 'next';
import { PageLayout } from '@/components/layouts';
import {
  CaseStudyProblem,
  CaseStudySummary,
  CaseStudyBody,
  NextCaseStudy,
} from '@/components/sections/case-study';
import { HighlightQuote } from '@/components/sections/shared';
import { PERFORMANCE_MANAGEMENT } from '@/content/case-studies';

const data = PERFORMANCE_MANAGEMENT;

export const metadata: Metadata = {
  title: data.metadata.title,
  description: data.metadata.description,
};

export default function PerformanceManagementPage() {
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
      <NextCaseStudy currentSlug="performance-management" />
    </PageLayout>
  );
}
