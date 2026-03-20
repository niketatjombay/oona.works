import { AnimatedSection } from '@/components/animations';

interface SecurityContentProps {
  body: string;
  whyTitle: string;
  whyText: string;
}

export function SecurityContent({
  body,
  whyTitle,
  whyText,
}: SecurityContentProps) {
  return (
    <AnimatedSection
      as="div"
      className="mx-auto max-w-[var(--content-max)] px-4 py-12"
    >
      {body.split('\n').map((paragraph, i) => (
        <p key={i} className="text-body text-foreground">
          {paragraph}
        </p>
      ))}
      <h3 className="text-h4 text-foreground mt-8">{whyTitle}</h3>
      {whyText.split('\n').map((paragraph, i) => (
        <p key={i} className="text-body text-foreground mt-4">
          {paragraph}
        </p>
      ))}
    </AnimatedSection>
  );
}
