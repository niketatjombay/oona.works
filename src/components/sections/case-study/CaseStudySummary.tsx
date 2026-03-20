import { AnimatedSection } from '@/components/animations';

interface CaseStudySummaryProps {
  text: string;
}

export function CaseStudySummary({ text }: CaseStudySummaryProps) {
  return (
    <AnimatedSection
      as="div"
      className="max-w-[var(--content-max)] mx-auto px-4 py-8"
    >
      <p className="text-body text-foreground font-semibold">{text}</p>
    </AnimatedSection>
  );
}
