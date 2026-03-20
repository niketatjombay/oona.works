import type { Metadata } from 'next';
import { PageLayout } from '@/components/layouts';
import {
  CaseStudyProblem,
  CaseStudySummary,
  CaseStudyBody,
} from '@/components/sections/case-study';
import { HighlightQuote } from '@/components/sections/shared';
import { LEARNING_CONTENT } from '@/content/case-studies';

const data = LEARNING_CONTENT;

export const metadata: Metadata = {
  title: data.metadata.title,
  description: data.metadata.description,
};

export default function LearningContentPage() {
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
