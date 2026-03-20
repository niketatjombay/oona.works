'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { X } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { NAV_LINKS, CONTACT_EMAIL, CONTACT_CTA_LABEL } from '@/lib/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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

  const menuLinks = [
    ...NAV_LINKS,
    { label: CONTACT_CTA_LABEL, href: `mailto:${CONTACT_EMAIL}` },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-foreground/95 fixed inset-0 z-50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute top-6 right-6 flex size-12 items-center justify-center text-white"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

          <motion.nav
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex h-full flex-col items-center justify-center gap-8"
          >
            {menuLinks.map((link) => (
              <motion.div key={link.href} variants={staggerItem}>
                {link.href.startsWith('/') ? (
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="text-h3 text-white transition-opacity hover:opacity-80"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    onClick={onClose}
                    className="text-h3 text-white transition-opacity hover:opacity-80"
                  >
                    {link.label}
                  </a>
                )}
              </motion.div>
            ))}
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
