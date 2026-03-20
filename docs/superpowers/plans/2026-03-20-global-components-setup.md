# Global Components — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the global components (Navbar, Footer, CTAButton, SectionHeader, AnimatedCounter) and constants file, then integrate into the root layout.

**Architecture:** All content externalized to `lib/constants.ts`. Components in `components/common/` use design tokens exclusively (no hardcoded colors/sizes). Client components use Framer Motion for animations. Server components import client components as leaves. Navbar is fixed-position with scroll-reactive frosted glass effect.

**Tech Stack:** Next.js 16.2.0, React 19, Tailwind CSS 4, Framer Motion, lucide-react, class-variance-authority, next/image, next/link

**Spec:** `docs/superpowers/specs/2026-03-20-global-components-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/lib/constants.ts` | Modify | All content strings externalized |
| `public/images/logo.png` | Create | Navbar logo (downloaded from Figma) |
| `public/images/logo-footer.png` | Create | Footer logo (downloaded from Figma) |
| `src/components/common/CTAButton.tsx` | Create | Marketing CTA with variants |
| `src/components/common/SectionHeader.tsx` | Create | Reusable section title pattern |
| `src/components/common/AnimatedCounter.tsx` | Create | Viewport-triggered stat counter |
| `src/components/common/MobileMenu.tsx` | Create | Full-screen overlay mobile menu |
| `src/components/common/Navbar.tsx` | Create | Scroll-reactive navigation |
| `src/components/common/Footer.tsx` | Create | Site footer |
| `src/components/common/index.ts` | Modify | Barrel exports |
| `src/app/layout.tsx` | Modify | Add Navbar + Footer |

---

## Task 1: Constants and logo assets

**Files:**
- Modify: `src/lib/constants.ts`
- Create: `public/images/logo.png`
- Create: `public/images/logo-footer.png`

- [ ] **Step 1: Write constants file**

Replace the contents of `src/lib/constants.ts` with:

```typescript
import type { NavItem, SiteConfig } from '@/types';

export const NAV_LINKS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Case Studies', href: '/case-studies' },
];

export const FOOTER_DATA = {
  emailLabel: 'Write to us',
  email: 'oona@oona.works',
  copyright: `© ${new Date().getFullYear()} Oona.Works. All rights reserved.`,
};

export const SITE_CONFIG: SiteConfig = {
  name: 'Oona.Works',
  description: 'Your AI Partner in HR Transformation',
  url: 'https://oona.works',
  ogImage: '/og-image.png',
  links: {},
};

export const CONTACT_EMAIL = 'oona@oona.works';
export const CONTACT_CTA_LABEL = 'Contact Us ~ Email';
```

- [ ] **Step 2: Download logo assets from Figma**

Create the `public/images/` directory and download the logo images from the Figma MCP asset server. Use the Figma MCP tools (`get_screenshot` or `get_design_context`) to get the logo node assets:

- Navbar logo (node `20008:318`): Save as `public/images/logo.png` (~80x48px)
- Footer logo (node `20009:36`): Save as `public/images/logo-footer.png` (~122x48px)

If the Figma MCP asset URLs are not accessible, create placeholder PNG files (solid rectangles) so the build doesn't break. The actual logos can be replaced later.

```bash
mkdir -p public/images
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/lib/constants.ts public/images/
git commit -m "feat: add site constants and logo assets"
```

---

## Task 2: CTAButton component

**Files:**
- Create: `src/components/common/CTAButton.tsx`

- [ ] **Step 1: Create CTAButton component**

Write to `src/components/common/CTAButton.tsx`:

```tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { scaleOnHover } from '@/lib/animations';

const ctaButtonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap transition-colors select-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground rounded-lg',
        secondary: 'bg-secondary text-secondary-foreground rounded-2xl',
        dark: 'bg-foreground text-primary-foreground rounded-2xl',
        submit: 'bg-primary text-primary-foreground rounded-full',
      },
      size: {
        sm: 'h-[40px] px-4 text-nav',
        default: 'h-[50px] px-6 text-button',
        lg: 'h-[60px] px-8 text-button',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

interface CTAButtonProps extends VariantProps<typeof ctaButtonVariants> {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export function CTAButton({
  variant = 'primary',
  size = 'default',
  href,
  children,
  className,
  onClick,
  type = 'button',
}: CTAButtonProps) {
  const classes = cn(ctaButtonVariants({ variant, size }), className);

  if (href && href.startsWith('/')) {
    return (
      <motion.div whileHover={scaleOnHover} className="inline-flex">
        <Link href={href} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={scaleOnHover}
        onClick={onClick}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      whileHover={scaleOnHover}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/common/CTAButton.tsx
git commit -m "feat: add CTAButton component with primary/secondary/dark/submit variants"
```

---

## Task 3: SectionHeader component

**Files:**
- Create: `src/components/common/SectionHeader.tsx`

- [ ] **Step 1: Create SectionHeader component**

Write to `src/components/common/SectionHeader.tsx`:

```tsx
import { cn } from '@/lib/utils';
import { AnimatedSection } from '@/components/animations';

interface SectionHeaderProps {
  overline?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  titleSize?: 'h2' | 'h3' | 'h4';
  className?: string;
}

const titleClasses = {
  h2: 'text-h2',
  h3: 'text-h3',
  h4: 'text-h4',
} as const;

export function SectionHeader({
  overline,
  title,
  subtitle,
  align = 'left',
  titleSize = 'h3',
  className,
}: SectionHeaderProps) {
  return (
    <AnimatedSection
      as="div"
      className={cn(
        'flex flex-col',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      {overline && (
        <span className="text-overline text-muted-label mb-2">{overline}</span>
      )}
      <h2 className={cn(titleClasses[titleSize], 'text-foreground')}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-body-lg text-foreground mt-4">{subtitle}</p>
      )}
    </AnimatedSection>
  );
}
```

**Note:** This is a server component (no `'use client'`). It imports `AnimatedSection` (a client component) as a leaf — valid in React 19 / Next.js App Router because only serializable props are passed.

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/common/SectionHeader.tsx
git commit -m "feat: add SectionHeader component with overline/title/subtitle pattern"
```

---

## Task 4: AnimatedCounter component

**Files:**
- Create: `src/components/common/AnimatedCounter.tsx`

- [ ] **Step 1: Create AnimatedCounter component**

Write to `src/components/common/AnimatedCounter.tsx`:

```tsx
'use client';

import { cn } from '@/lib/utils';
import { useCountUp } from '@/hooks/useCountUp';

interface AnimatedCounterProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  label,
  prefix,
  suffix,
  duration,
  className,
}: AnimatedCounterProps) {
  const { ref, countUpRef } = useCountUp({
    end: value,
    prefix,
    suffix,
    duration,
  });

  return (
    <div ref={ref} className={cn('flex flex-col', className)}>
      <span ref={countUpRef} className="text-display text-foreground" />
      <span className="text-overline text-foreground mt-2">{label}</span>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/common/AnimatedCounter.tsx
git commit -m "feat: add AnimatedCounter component with viewport-triggered count-up"
```

---

## Task 5: MobileMenu component

**Files:**
- Create: `src/components/common/MobileMenu.tsx`

- [ ] **Step 1: Create MobileMenu component**

Write to `src/components/common/MobileMenu.tsx`:

```tsx
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
      // Focus the close button for accessibility
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
      // Focus trap: cycle Tab within the dialog
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
          className="fixed inset-0 z-50 bg-foreground/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute right-6 top-6 flex size-12 items-center justify-center text-white"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

          {/* Navigation links */}
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
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/common/MobileMenu.tsx
git commit -m "feat: add MobileMenu full-screen overlay with stagger animations"
```

---

## Task 6: Navbar component

**Files:**
- Create: `src/components/common/Navbar.tsx`

**Dependencies:** CTAButton (Task 2) and MobileMenu (Task 5) must be built first.

- [ ] **Step 1: Create Navbar component**

Write to `src/components/common/Navbar.tsx`:

```tsx
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
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/common/Navbar.tsx
git commit -m "feat: add Navbar with transparent-to-frosted-glass scroll behavior"
```

---

## Task 7: Footer component

**Files:**
- Create: `src/components/common/Footer.tsx`

- [ ] **Step 1: Create Footer component**

Write to `src/components/common/Footer.tsx`:

```tsx
import Image from 'next/image';
import { FOOTER_DATA, SITE_CONFIG } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[var(--content-max)] px-4 pb-8">
      {/* Main footer card */}
      <div className="flex flex-col gap-6 rounded-2xl bg-surface p-[var(--card-padding-lg)] md:flex-row md:items-center md:justify-between md:gap-0">
        {/* Left: Contact info */}
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

        {/* Right: Logo */}
        <Image
          src="/images/logo-footer.png"
          alt={SITE_CONFIG.name}
          width={122}
          height={48}
        />
      </div>

      {/* Copyright */}
      <p className="mt-4 text-center text-body-sm text-muted-foreground">
        {FOOTER_DATA.copyright}
      </p>
    </footer>
  );
}
```

**Note:** This is a server component (no `'use client'`). No interactivity needed.

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/common/Footer.tsx
git commit -m "feat: add Footer component with contact info and logo"
```

---

## Task 8: Barrel exports and layout integration

**Files:**
- Modify: `src/components/common/index.ts`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Update barrel exports**

Replace the contents of `src/components/common/index.ts` with:

```typescript
export { Navbar } from './Navbar';
export { MobileMenu } from './MobileMenu';
export { Footer } from './Footer';
export { CTAButton } from './CTAButton';
export { SectionHeader } from './SectionHeader';
export { AnimatedCounter } from './AnimatedCounter';
```

- [ ] **Step 2: Update layout.tsx**

Replace the contents of `src/app/layout.tsx` with:

```tsx
import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-poppins',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Oona.Works — Your AI Partner in HR Transformation',
  description:
    'AI-powered HR transformation platform for enterprise consulting firms.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 4: Verify the app builds**

Run: `npx next build`
Expected: Build succeeds. (The page will look different — Navbar and Footer will render with the existing page.tsx content.)

- [ ] **Step 5: Commit**

```bash
git add src/components/common/index.ts src/app/layout.tsx
git commit -m "feat: integrate Navbar and Footer into root layout"
```

---

## Task 9: Final verification

- [ ] **Step 1: Run full build**

Run: `npx next build`
Expected: Build succeeds.

- [ ] **Step 2: Run TypeScript check**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Run linter**

Run: `npm run lint`
Expected: No errors.

- [ ] **Step 4: Run Prettier check and fix**

Run: `npx prettier --check "src/**/*.{ts,tsx,css}"`
If files need formatting:
```bash
npm run format
```
Then re-check.

- [ ] **Step 5: If formatting was needed, commit**

```bash
git add -A
git commit -m "chore: apply Prettier formatting after global components"
```
