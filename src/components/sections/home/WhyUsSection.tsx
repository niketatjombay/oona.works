import { SectionHeader, CTAButton } from '@/components/common';
import { AnimatedSection } from '@/components/animations';
import { HOME_WHY_US } from '@/content/home';
import { staggerContainer, staggerItem } from '@/lib/animations';

export function WhyUsSection() {
  const { title, subtitle, cards, securityCta } = HOME_WHY_US;

  return (
    <section className="mx-auto max-w-[var(--content-max)] px-4 py-[var(--section-padding)] md:py-[var(--section-padding-lg)]">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        titleSize="h4"
        align="center"
      />

      <AnimatedSection
        as="div"
        variant={staggerContainer}
        className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        {cards.map((card, index) => (
          <AnimatedSection
            key={index}
            as="div"
            variant={staggerItem}
            delay={index * 0.1}
            className={`border-border rounded-md border p-6 md:p-[var(--card-padding-lg)] ${
              index === 1 ? 'bg-secondary' : 'bg-secondary-light'
            }`}
          >
            <p className="typo-body-lg">
              {card.prefix && (
                <span className="text-muted-foreground">{card.prefix}</span>
              )}
              <span className="text-foreground font-semibold">{card.bold}</span>
              <span className="text-muted-foreground">{card.rest}</span>
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
