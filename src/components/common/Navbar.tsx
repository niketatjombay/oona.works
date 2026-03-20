'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_LINKS, CONTACT_EMAIL, CONTACT_CTA_LABEL } from '@/lib/constants';
import { CTAButton } from './CTAButton';
import { MobileMenu } from './MobileMenu';

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'flex justify-center',
          'pt-[var(--nav-offset)]',
          className
        )}
      >
        <nav
          aria-label="Main navigation"
          className={cn(
            'flex w-full max-w-[var(--container-max)] items-center',
            'h-[var(--nav-height)] rounded-pill px-4',
            'transition-all duration-300',
            isScrolled
              ? 'border border-border bg-surface/80 shadow-sm backdrop-blur-lg'
              : 'border border-transparent bg-transparent'
          )}
        >
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo.png"
              alt="Oona.Works"
              width={80}
              height={48}
              priority
            />
          </Link>

          {/* Nav links — hidden on mobile */}
          <div className="ml-4 hidden items-center gap-0 md:flex">
            {NAV_LINKS.map((link, i) => (
              <div key={link.href} className="flex items-center">
                {i > 0 && (
                  <div className="mx-4 h-4 w-px bg-border-light" />
                )}
                <Link
                  href={link.href}
                  className="text-nav text-nav-text rounded-pill px-4 py-2 transition-colors hover:bg-muted"
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex size-10 items-center justify-center rounded-pill transition-colors hover:bg-muted"
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu size={24} className="text-nav-text" />
          </button>

          {/* CTA — hidden on very small screens */}
          <div className="ml-2 hidden sm:block">
            <CTAButton
              variant="secondary"
              size="sm"
              href={`mailto:${CONTACT_EMAIL}`}
            >
              {CONTACT_CTA_LABEL}
            </CTAButton>
          </div>
        </nav>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
