import { HOME_VALUE_PROP } from '@/content/home';
import { AnimatedSection } from '@/components/animations';
import { cn } from '@/lib/utils';

function renderBodyParagraphs(body: string, className?: string) {
  return body.split('\n').map((line, i) =>
    line === '' ? (
      <br key={i} />
    ) : (
      <p key={i} className={className}>
        {line}
      </p>
    )
  );
}

function RightCardBody({ body }: { body: string }) {
  const lines = body.split('\n');
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === '') {
      elements.push(<br key={i} />);
    } else if (line.startsWith('•')) {
      elements.push(
        <p key={i} className="text-body text-foreground">
          {line}
        </p>
      );
    } else {
      // Intro sentence — bold and slightly larger
      elements.push(
        <p key={i} className="text-body text-foreground font-semibold">
          {line}
        </p>
      );
    }
  }

  return <>{elements}</>;
}

export function ValuePropSection() {
  const { leftCard, rightCard } = HOME_VALUE_PROP;

  return (
    <div className="mx-auto max-w-[var(--content-max)] px-4 py-16 md:py-24">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Left Card */}
        <AnimatedSection
          as="div"
          className={cn('bg-surface rounded-xl p-[var(--section-padding)]')}
        >
          <h3 className="text-h3 text-foreground">{leftCard.title}</h3>
          <div className="text-body-lg text-foreground mt-8">
            {renderBodyParagraphs(leftCard.body)}
          </div>
        </AnimatedSection>

        {/* Right Card */}
        <AnimatedSection
          as="div"
          delay={0.1}
          className={cn('bg-surface rounded-xl p-[var(--section-padding)]')}
        >
          <h3 className="text-h3 text-foreground">{rightCard.title}</h3>
          <div className="mt-4">
            <RightCardBody body={rightCard.body} />
          </div>
          {rightCard.governance && (
            <div className="mt-4">
              {rightCard.governance.split('\n').map((line, i) =>
                line === '' ? (
                  <br key={i} />
                ) : (
                  <p key={i} className="text-body-sm text-placeholder">
                    {line}
                  </p>
                )
              )}
            </div>
          )}
        </AnimatedSection>
      </div>
    </div>
  );
}
