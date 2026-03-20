import Image from 'next/image';
import { AnimatedSection } from '@/components/animations';
import { HOME_ABOUT } from '@/content/home';

export function AboutSection() {
  const { title, body } = HOME_ABOUT;
  const paragraphs = body.split('\n');

  return (
    <section className="mx-auto max-w-[var(--content-max)] px-4 py-16 md:py-24">
      <AnimatedSection
        as="div"
        className="bg-surface rounded-2xl p-6 md:p-[var(--section-padding)]"
      >
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div>
            <Image
              src="/images/team-photo.png"
              alt="Oona.works team"
              width={367}
              height={408}
              className="h-auto w-full rounded-2xl"
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
