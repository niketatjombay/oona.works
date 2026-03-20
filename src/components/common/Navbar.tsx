'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, ChevronDown } from 'lucide-react';
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 right-0 left-0 z-50',
          'flex justify-center',
          'pt-[var(--nav-offset)]',
          className
        )}
      >
        <nav
          aria-label="Main navigation"
          className={cn(
            'flex w-full max-w-[var(--container-max)] items-center',
            'rounded-pill h-[var(--nav-height)] px-4',
            'transition-all duration-300',
            isScrolled
              ? 'border-border bg-surface/80 border shadow-sm backdrop-blur-lg'
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
          <div
            className="ml-4 hidden items-center gap-0 md:flex"
            ref={dropdownRef}
          >
            {NAV_LINKS.map((link, i) => (
              <div key={link.href} className="flex items-center">
                {i > 0 && <div className="bg-border-light mx-4 h-4 w-px" />}

                {link.children ? (
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === link.label ? null : link.label
                        )
                      }
                      className="typo-nav text-nav-text rounded-pill hover:bg-muted focus-visible:ring-primary flex items-center gap-1 px-4 py-2 transition-colors focus-visible:ring-2 focus-visible:outline-none"
                      aria-expanded={openDropdown === link.label}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={cn(
                          'transition-transform duration-200',
                          openDropdown === link.label && 'rotate-180'
                        )}
                      />
                    </button>

                    {openDropdown === link.label && (
                      <div className="border-border bg-surface absolute top-full left-0 mt-2 w-64 rounded-xl border p-2 shadow-lg">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpenDropdown(null)}
                            className="typo-nav text-nav-text hover:bg-muted block rounded-lg px-4 py-3 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="typo-nav text-nav-text rounded-pill hover:bg-muted px-4 py-2 transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Menu button — hidden on desktop where nav links are visible */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="rounded-pill hover:bg-muted focus-visible:ring-primary flex size-10 items-center justify-center transition-colors focus-visible:ring-2 focus-visible:outline-none md:hidden"
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
