'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_LINKS, CONTACT_EMAIL, CONTACT_CTA_LABEL } from '@/lib/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Reset expanded sections when menu closes
  useEffect(() => {
    if (!isOpen) setExpandedSection(null);
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key + focus trap
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab') {
        const dialog = document.querySelector('[role="dialog"]');
        if (!dialog) return;
        const focusable = dialog.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const toggleSection = (label: string) => {
    setExpandedSection(expandedSection === label ? null : label);
  };

  const drawerContent = (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-end p-6">
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="bg-muted hover:bg-border focus-visible:ring-primary flex size-10 items-center justify-center rounded-full transition-colors focus-visible:ring-2 focus-visible:outline-none"
          aria-label="Close menu"
        >
          <X size={20} className="text-foreground" />
        </button>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 overflow-y-auto px-6">
        <div className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => {
            // Items with children: collapsible accordion
            if (link.children) {
              const isExpanded = expandedSection === link.label;
              return (
                <div key={link.label}>
                  <button
                    onClick={() => toggleSection(link.label)}
                    className="typo-nav text-foreground hover:bg-muted flex w-full items-center justify-between rounded-lg px-4 py-3 transition-colors"
                    aria-expanded={isExpanded}
                  >
                    {link.label}
                    <ChevronDown
                      size={16}
                      className={cn(
                        'text-muted-foreground transition-transform duration-200',
                        isExpanded && 'rotate-180'
                      )}
                    />
                  </button>

                  {/* Collapsible children */}
                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-200',
                      isExpanded
                        ? 'max-h-[500px] opacity-100'
                        : 'max-h-0 opacity-0'
                    )}
                  >
                    <div className="flex flex-col gap-1 pb-1 pl-4">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className="typo-body-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg px-4 py-2.5 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            // Simple links (Home, etc.)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="typo-nav text-foreground hover:bg-muted rounded-lg px-4 py-3 transition-colors"
              >
                {link.label}
              </Link>
            );
          })}

          {/* Separator */}
          <div className="border-border my-2 border-t" />

          {/* Contact link */}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            onClick={onClose}
            className="typo-nav text-foreground hover:bg-muted rounded-lg px-4 py-3 transition-colors"
          >
            {CONTACT_CTA_LABEL}
          </a>
        </div>
      </nav>

      {/* Footer */}
      <div className="border-border border-t p-6">
        <p className="typo-body-sm text-muted-foreground">oona@oona.works</p>
      </div>
    </div>
  );

  if (shouldReduceMotion) {
    return (
      <>
        {isOpen && (
          <>
            <div
              className="bg-foreground/40 fixed inset-0 z-50"
              onClick={onClose}
              aria-hidden="true"
            />
            <div
              className="bg-surface fixed top-0 right-0 z-50 h-full w-[300px] shadow-2xl"
              role="dialog"
              aria-modal="true"
            >
              {drawerContent}
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-foreground/40 fixed inset-0 z-50"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-surface fixed top-0 right-0 z-50 h-full w-[300px] shadow-2xl"
            role="dialog"
            aria-modal="true"
          >
            {drawerContent}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
