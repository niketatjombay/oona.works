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
  let pastFirstParagraph = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === '') {
      elements.push(<br key={i} />);
      pastFirstParagraph = true;
    } else if (line.startsWith('•')) {
      elements.push(
        <p key={i} className="typo-body text-foreground">
          {line}
        </p>
      );
    } else if (!pastFirstParagraph) {
      // First paragraph — bold and slightly larger
      elements.push(
        <p key={i} className="typo-body text-foreground font-semibold">
          {line}
        </p>
      );
    } else {
      // Subsequent paragraphs — normal weight
      elements.push(
        <p key={i} className="typo-body text-foreground">
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
    <div className="mx-auto max-w-[var(--content-max)] px-4 py-[var(--section-padding)] md:py-[var(--section-padding-lg)]">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Left Card */}
        <AnimatedSection
          as="div"
          className={cn(
            'bg-surface rounded-[20px] p-6 md:p-[var(--section-padding)]'
          )}
        >
          <h3 className="typo-h3 text-foreground">
            {leftCard.title.split('\n').map((line, i, arr) =>
              line === '' ? (
                <br key={i} />
              ) : (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && line !== '' && arr[i + 1] !== '' && (
                    <br />
                  )}
                </span>
              )
            )}
          </h3>
          <div className="typo-body-lg text-foreground mt-8">
            {renderBodyParagraphs(leftCard.body)}
          </div>
        </AnimatedSection>

        {/* Right Card */}
        <AnimatedSection
          as="div"
          delay={0.1}
          className={cn(
            'bg-surface rounded-[16px] p-6 md:p-[var(--section-padding)]'
          )}
        >
          <h3 className="typo-h3 text-foreground">{rightCard.title}</h3>
          <div className="mt-8">
            <RightCardBody body={rightCard.body} />
          </div>
          {rightCard.governance && (
            <div className="mt-4">
              {rightCard.governance.split('\n').map((line, i) =>
                line === '' ? (
                  <br key={i} />
                ) : (
                  <p key={i} className="typo-body-sm text-muted-foreground">
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
