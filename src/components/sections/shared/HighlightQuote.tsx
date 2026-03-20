import { AnimatedSection } from '@/components/animations';
import { cn } from '@/lib/utils';

interface HighlightQuoteProps {
  text: string;
  className?: string;
}

export function HighlightQuote({ text, className }: HighlightQuoteProps) {
  return (
    <AnimatedSection
      as="div"
      className={cn('mx-auto max-w-[var(--content-max)] px-4 py-12', className)}
    >
      <p className="text-h4 text-primary text-right italic md:ml-auto md:max-w-[60%]">
        {text}
      </p>
    </AnimatedSection>
  );
}
