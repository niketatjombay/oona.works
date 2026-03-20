import { AnimatedSection } from '@/components/animations';
import { SectionHeader } from '@/components/common/SectionHeader';

interface SecurityPillarsProps {
  title: string;
  pillars: { title: string; description: string }[];
}

export function SecurityPillars({ title, pillars }: SecurityPillarsProps) {
  return (
    <div className="max-w-[var(--content-max)] mx-auto px-4 py-12">
      <SectionHeader title={title} titleSize="h4" align="center" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {pillars.map((pillar, i) => (
          <AnimatedSection key={pillar.title} as="div" delay={i * 0.1}>
            <div className="bg-surface rounded-md p-6 border border-border">
              <h4 className="text-card-heading font-semibold text-foreground">
                {pillar.title}
              </h4>
              <p className="text-body-sm text-muted">{pillar.description}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
