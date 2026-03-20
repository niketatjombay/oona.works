import Image from 'next/image';
import { AnimatedSection } from '@/components/animations';

interface PageBannerProps {
  badge: string;
  title: string;
  subtitle?: string;
  heroImage: string;
  heroImageAlt: string;
}

export function PageBanner({
  badge,
  title,
  subtitle,
  heroImage,
  heroImageAlt,
}: PageBannerProps) {
  return (
    <AnimatedSection as="section" className="bg-background">
      <div className="pt-[180px] pb-16">
        <div className="mx-auto max-w-[var(--content-max)] px-4">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            {/* Left column */}
            <div>
              {/* Decorative shape with dividers */}
              <div className="flex items-center gap-0">
                <div className="bg-border h-px w-10" />
                <Image
                  src="/images/decorative-shape.svg"
                  alt=""
                  width={150}
                  height={74}
                />
                <div className="bg-border h-px flex-1" />
              </div>

              {/* Badge pill */}
              <div className="mt-8">
                <span className="text-overline text-muted-label inline-flex items-center rounded-full border border-border px-4 py-1">
                  {badge}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-h3 text-foreground mt-4">{title}</h1>

              {/* Optional subtitle */}
              {subtitle && (
                <p className="text-body-lg text-foreground mt-4">{subtitle}</p>
              )}
            </div>

            {/* Right column — hero image */}
            <div className="bg-background rounded-2xl p-8">
              <Image
                src={heroImage}
                alt={heroImageAlt}
                width={600}
                height={400}
                className="h-auto w-full rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
