'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { X, ChevronRight } from 'lucide-react';
import { NAV_LINKS, CONTACT_EMAIL, CONTACT_CTA_LABEL } from '@/lib/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

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

  // Build flat menu links with children expanded
  const menuLinks: { label: string; href: string; isChild?: boolean }[] = [];
  NAV_LINKS.forEach((link) => {
    menuLinks.push({ label: link.label, href: link.href });
    if (link.children) {
      link.children.forEach((child) => {
        menuLinks.push({ label: child.label, href: child.href, isChild: true });
      });
    }
  });
  menuLinks.push({ label: CONTACT_CTA_LABEL, href: `mailto:${CONTACT_EMAIL}` });

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
      <nav className="flex-1 px-6">
        <div className="flex flex-col gap-1">
          {menuLinks.map((link) => {
            const linkClasses = link.isChild
              ? 'typo-body-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg px-8 py-3 transition-colors'
              : 'typo-nav text-foreground hover:bg-muted rounded-lg px-4 py-3 transition-colors flex items-center justify-between';

            if (link.href.startsWith('/')) {
              return (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  onClick={onClose}
                  className={linkClasses}
                >
                  {link.label}
                  {!link.isChild && (
                    <ChevronRight size={16} className="text-muted-foreground" />
                  )}
                </Link>
              );
            }

            return (
              <a
                key={link.href + link.label}
                href={link.href}
                onClick={onClose}
                className={linkClasses}
              >
                {link.label}
                {!link.isChild && (
                  <ChevronRight size={16} className="text-muted-foreground" />
                )}
              </a>
            );
          })}
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
            {/* Backdrop */}
            <div
              className="bg-foreground/40 fixed inset-0 z-50"
              onClick={onClose}
              aria-hidden="true"
            />
            {/* Drawer */}
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-foreground/40 fixed inset-0 z-50"
            onClick={onClose}
            aria-hidden="true"
          />
          {/* Drawer — slides in from right */}
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
