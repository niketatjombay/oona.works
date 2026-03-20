import { AnimatedSection } from '@/components/animations';

interface CaseStudyBodyProps {
  howItWorks: {
    title: string;
    steps: { number: number; title: string; description: string }[];
  };
  outcomes: {
    title: string;
    items: string[];
  };
}

export function CaseStudyBody({ howItWorks, outcomes }: CaseStudyBodyProps) {
  return (
    <div className="max-w-[var(--content-max)] mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatedSection
          as="div"
          className="bg-surface rounded-xl p-[var(--section-padding)]"
        >
          <h3 className="text-h3 text-foreground mb-6">{howItWorks.title}</h3>
          <ul className="space-y-4">
            {howItWorks.steps.map((step) => (
              <li key={step.number}>
                <p className="text-body-sm text-foreground font-semibold">
                  {step.number}. {step.title}
                </p>
                <p className="text-body-sm text-foreground">
                  {step.description}
                </p>
              </li>
            ))}
          </ul>
        </AnimatedSection>

        <AnimatedSection
          as="div"
          className="bg-surface rounded-xl p-[var(--section-padding)]"
          delay={0.1}
        >
          <h3 className="text-h3 text-foreground mb-6">{outcomes.title}</h3>
          <ul className="list-disc pl-6 space-y-2">
            {outcomes.items.map((item, index) => (
              <li key={index} className="text-body-sm text-foreground">
                {item}
              </li>
            ))}
          </ul>
        </AnimatedSection>
      </div>
    </div>
  );
}
