import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AnimatedSection } from '@/components/animations';
import { CASE_STUDY_ORDER } from '@/content/case-studies';
import { NEXT_CASE_STUDY_LABEL } from '@/lib/constants';

interface NextCaseStudyProps {
  currentSlug: string;
}

export function NextCaseStudy({ currentSlug }: NextCaseStudyProps) {
  const currentIndex = CASE_STUDY_ORDER.findIndex(
    (cs) => cs.slug === currentSlug
  );
  const nextIndex = (currentIndex + 1) % CASE_STUDY_ORDER.length;
  const next = CASE_STUDY_ORDER[nextIndex];

  return (
    <AnimatedSection
      as="div"
      className="mx-auto max-w-[var(--content-max)] px-4 py-12"
    >
      <p className="text-overline text-muted-label mb-4">
        {NEXT_CASE_STUDY_LABEL}
      </p>
      <Link href={`/case-studies/${next.slug}`}>
        <div className="bg-surface border-border flex items-center gap-6 overflow-hidden rounded-2xl border p-6 transition-shadow hover:shadow-lg">
          <Image
            src={next.image}
            alt={next.title}
            width={200}
            height={133}
            className="rounded-md"
          />
          <div className="flex-1">
            <h3 className="text-card-heading text-foreground">{next.title}</h3>
          </div>
          <ArrowRight size={24} className="text-muted-foreground shrink-0" />
        </div>
      </Link>
    </AnimatedSection>
  );
}
