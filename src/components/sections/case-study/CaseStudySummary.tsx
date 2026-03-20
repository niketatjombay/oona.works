import { AnimatedSection } from '@/components/animations';

interface CaseStudySummaryProps {
  text: string;
}

export function CaseStudySummary({ text }: CaseStudySummaryProps) {
  return (
    <AnimatedSection
      as="div"
      className="mx-auto max-w-[var(--content-max)] px-4 py-8"
    >
      <p className="text-body text-foreground font-semibold">{text}</p>
    </AnimatedSection>
  );
}
