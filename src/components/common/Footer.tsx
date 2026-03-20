import Image from 'next/image';
import { FOOTER_DATA, SITE_CONFIG } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[var(--content-max)] px-4 pb-8">
      <div className="flex flex-col gap-6 rounded-2xl bg-surface p-[var(--card-padding-lg)] md:flex-row md:items-center md:justify-between md:gap-0">
        <div className="flex flex-col gap-1">
          <span className="text-body-lg text-primary">
            {FOOTER_DATA.emailLabel}
          </span>
          <a
            href={`mailto:${FOOTER_DATA.email}`}
            className="text-body text-foreground transition-opacity hover:opacity-70"
          >
            {FOOTER_DATA.email}
          </a>
        </div>

        <Image
          src="/images/logo-footer.png"
          alt={SITE_CONFIG.name}
          width={122}
          height={48}
        />
      </div>

      <p className="mt-4 text-center text-body-sm text-muted-foreground">
        {FOOTER_DATA.copyright}
      </p>
    </footer>
  );
}
