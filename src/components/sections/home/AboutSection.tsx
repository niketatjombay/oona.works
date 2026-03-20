import Image from 'next/image';
import { AnimatedSection } from '@/components/animations';
import { HOME_ABOUT } from '@/content/home';

export function AboutSection() {
  const { title, body } = HOME_ABOUT;
  const paragraphs = body.split('\n');

  return (
    <section className="max-w-[var(--content-max)] mx-auto px-4 py-16 md:py-24">
      <AnimatedSection as="div" className="bg-surface rounded-2xl p-[var(--section-padding)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <Image
              src="/images/team-photo.png"
              alt="Oona.works team"
              width={367}
              height={408}
              className="rounded-2xl w-full h-auto"
            />
          </div>
          <div>
            <h3 className="text-h3 text-foreground">{title}</h3>
            <div className="text-body-lg text-foreground mt-4">
              {paragraphs.map((paragraph, index) =>
                paragraph ? (
                  <p key={index} className={index > 0 ? 'mt-4' : ''}>
                    {paragraph}
                  </p>
                ) : null
              )}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
