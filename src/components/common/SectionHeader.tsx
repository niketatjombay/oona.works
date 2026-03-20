import { cn } from '@/lib/utils';
import { AnimatedSection } from '@/components/animations';

interface SectionHeaderProps {
  overline?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  titleSize?: 'h2' | 'h3' | 'h4';
  className?: string;
}

const titleClasses = {
  h2: 'text-h2',
  h3: 'text-h3',
  h4: 'text-h4',
} as const;

export function SectionHeader({
  overline,
  title,
  subtitle,
  align = 'left',
  titleSize = 'h3',
  className,
}: SectionHeaderProps) {
  return (
    <AnimatedSection
      as="div"
      className={cn(
        'flex flex-col',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      {overline && (
        <span className="text-overline text-muted-label mb-2">{overline}</span>
      )}
      {titleSize === 'h2' && (
        <h2 className={cn(titleClasses.h2, 'text-foreground')}>{title}</h2>
      )}
      {titleSize === 'h3' && (
        <h3 className={cn(titleClasses.h3, 'text-foreground')}>{title}</h3>
      )}
      {titleSize === 'h4' && (
        <h4 className={cn(titleClasses.h4, 'text-foreground')}>{title}</h4>
      )}
      {subtitle && (
        <p className="text-body-lg text-foreground mt-4">{subtitle}</p>
      )}
    </AnimatedSection>
  );
}
