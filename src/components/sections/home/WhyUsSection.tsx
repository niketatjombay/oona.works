import { SectionHeader, CTAButton } from '@/components/common';
import { AnimatedSection } from '@/components/animations';
import { HOME_WHY_US } from '@/content/home';
import { staggerContainer, staggerItem } from '@/lib/animations';

export function WhyUsSection() {
  const { title, subtitle, cards, securityCta } = HOME_WHY_US;

  return (
    <section className="max-w-[var(--content-max)] mx-auto px-4 py-16 md:py-24">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        titleSize="h4"
        align="center"
      />

      <AnimatedSection as="div" variant={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
        {cards.map((card, index) => (
          <AnimatedSection
            key={index}
            as="div"
            variant={staggerItem}
            delay={index * 0.1}
            className={`rounded-md border border-surface p-6 ${
              index === 1 ? 'bg-secondary' : 'bg-secondary-light'
            }`}
          >
            <p className="text-body-lg">
              {card.prefix && (
                <span className="text-muted">{card.prefix}</span>
              )}
              <span className="font-semibold text-foreground">{card.bold}</span>
              <span className="text-muted">{card.rest}</span>
            </p>
          </AnimatedSection>
        ))}
      </AnimatedSection>

      <div className="mt-8 flex justify-center">
        <CTAButton variant="primary" href={securityCta.href}>
          {securityCta.label}
        </CTAButton>
      </div>
    </section>
  );
}
