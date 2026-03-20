import { AnimatedSection } from '@/components/animations';
import { SectionHeader } from '@/components/common/SectionHeader';

interface SecurityPillarsProps {
  title: string;
  pillars: { title: string; description: string }[];
}

export function SecurityPillars({ title, pillars }: SecurityPillarsProps) {
  return (
    <div className="mx-auto max-w-[var(--content-max)] px-4 py-12">
      <SectionHeader title={title} titleSize="h4" align="center" />
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {pillars.map((pillar, i) => (
          <AnimatedSection key={pillar.title} as="div" delay={i * 0.1}>
            <div className="bg-surface border-border rounded-md border p-6">
              <h4 className="text-card-heading text-foreground font-semibold">
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
