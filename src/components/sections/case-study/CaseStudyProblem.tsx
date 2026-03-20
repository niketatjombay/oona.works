import { AnimatedSection } from '@/components/animations';

interface CaseStudyProblemProps {
  text: string;
}

export function CaseStudyProblem({ text }: CaseStudyProblemProps) {
  const paragraphs = text.split('\n').filter(Boolean);

  return (
    <AnimatedSection
      as="div"
      className="max-w-[var(--content-max)] mx-auto px-4 py-12"
    >
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="text-body text-foreground">
          {paragraph}
        </p>
      ))}
    </AnimatedSection>
  );
}
