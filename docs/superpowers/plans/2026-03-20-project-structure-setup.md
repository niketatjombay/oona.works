# Project Structure Setup — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold the Oona.Works project with production-grade folder structure, dependencies, animation utilities, TypeScript types, and dev tooling — without writing any UI.

**Architecture:** Layered structure inside `src/` — types and lib at the base, hooks built on lib, components built on hooks. All animation logic centralized in `lib/animations.ts`, consumed by `AnimatedSection` wrapper and hooks. Content files are pure data, separated from rendering.

**Tech Stack:** Next.js 16.2.0, React 19, TypeScript strict, Tailwind CSS 4, Framer Motion, shadcn/ui, react-countup, Prettier

**Spec:** `docs/superpowers/specs/2026-03-20-project-structure-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `package.json` | Modify | Add production + dev dependencies |
| `.prettierrc` | Create | Prettier config with Tailwind plugin |
| `components.json` | Create (via CLI) | shadcn/ui configuration |
| `src/lib/utils.ts` | Create (via CLI) | `cn()` class merge helper |
| `src/styles/globals.css` | Move + Modify | Relocated from `src/app/`, add token placeholders |
| `src/app/layout.tsx` | Modify | Update globals.css import path |
| `src/types/index.ts` | Create | All shared TypeScript interfaces |
| `src/lib/animations.ts` | Create | Centralized Framer Motion variants |
| `src/lib/constants.ts` | Create | Placeholder for site constants |
| `src/hooks/useScrollAnimation.ts` | Create | IntersectionObserver hook |
| `src/hooks/useCountUp.ts` | Create | Viewport-triggered counter hook |
| `src/components/animations/AnimatedSection.tsx` | Create | Framer Motion whileInView wrapper |
| `src/components/animations/index.ts` | Create | Barrel export |
| `src/components/common/index.ts` | Create | Placeholder barrel |
| `src/components/sections/index.ts` | Create | Placeholder barrel |
| `src/components/layouts/index.ts` | Create | Placeholder barrel |
| `src/content/home.ts` | Create | Placeholder |
| `src/content/case-studies/index.ts` | Create | Placeholder barrel |
| `src/content/pages/index.ts` | Create | Placeholder barrel |

---

## Task 1: Install production dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install production packages**

```bash
npm install framer-motion react-countup lucide-react clsx tailwind-merge
```

- [ ] **Step 2: Install dev packages**

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

- [ ] **Step 3: Verify installation**

Run: `npm ls framer-motion react-countup lucide-react clsx tailwind-merge prettier prettier-plugin-tailwindcss`
Expected: All packages listed with versions, no `MISSING` errors.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add production and dev dependencies for project scaffolding"
```

---

## Task 2: Initialize shadcn/ui

**Important:** This must run BEFORE moving `globals.css`. The CLI expects it at `src/app/globals.css`.

**Files:**
- Create (via CLI): `components.json`, `src/lib/utils.ts`
- Modify (via CLI): `src/app/globals.css` (CSS variables injected)

**Reference:** Check `node_modules/next/dist/docs/` if the CLI reports any Next.js 16 compatibility issues.

**Note:** The `src/components/ui/` directory is not created in this task — it will be created later when individual shadcn components are added via `npx shadcn add <component>`.

- [ ] **Step 1: Run shadcn init**

```bash
npx shadcn@latest init
```

When prompted:
- Style: **New York**
- Base color: **Neutral**
- CSS variables: **yes**

The CLI will auto-detect the `@/*` path alias from `tsconfig.json` and configure paths accordingly.

- [ ] **Step 2: Verify files created**

Check that these exist:
- `components.json` at project root
- `src/lib/utils.ts` containing the `cn()` function (uses `clsx` + `tailwind-merge`)

Run: `cat src/lib/utils.ts`
Expected: Contains `import { clsx } from "clsx"` and `import { twMerge } from "tailwind-merge"` and exports `cn()`.

- [ ] **Step 3: Verify globals.css was updated**

Run: `cat src/app/globals.css`
Expected: shadcn has added CSS variables (like `--background`, `--foreground`, `--card`, `--primary`, etc.) to the file.

- [ ] **Step 4: Commit**

```bash
git add components.json src/lib/utils.ts src/app/globals.css
git commit -m "feat: initialize shadcn/ui with New York style and Neutral base"
```

---

## Task 3: Configure Prettier

**Files:**
- Create: `.prettierrc`

- [ ] **Step 1: Create `.prettierrc`**

Write to `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

- [ ] **Step 2: Add format script to package.json**

Add to `scripts` in `package.json`:

```json
"format": "prettier --write \"src/**/*.{ts,tsx,css,json}\""
```

- [ ] **Step 3: Verify Prettier works**

Run: `npx prettier --check src/app/layout.tsx`
Expected: Either "All matched files use Prettier code style!" or formatting differences shown (not an error about config).

- [ ] **Step 4: Commit**

```bash
git add .prettierrc package.json
git commit -m "feat: add Prettier config with Tailwind class sorting"
```

---

## Task 4: Relocate globals.css and add token placeholders

**Files:**
- Move: `src/app/globals.css` → `src/styles/globals.css`
- Modify: `src/app/layout.tsx` (update import path)

- [ ] **Step 1: Create styles directory and move file**

```bash
mkdir -p src/styles
mv src/app/globals.css src/styles/globals.css
```

- [ ] **Step 2: Add placeholder sections to globals.css**

Append the following comment sections to the end of `src/styles/globals.css` (after existing content):

```css
/* ==========================================================================
   Design Tokens (populated after design phase)
   ========================================================================== */

/* ==========================================================================
   Scrollbar Styling
   ========================================================================== */

/* ==========================================================================
   Animation Keyframes (shadcn/Tailwind v4 CSS-based animations)
   ========================================================================== */
```

- [ ] **Step 3: Update import in layout.tsx**

In `src/app/layout.tsx`, change:

```typescript
import "./globals.css";
```

to:

```typescript
import "@/styles/globals.css";
```

- [ ] **Step 4: Update CSS path in components.json**

After moving `globals.css`, check `components.json` for any CSS path reference (e.g., `tailwind.css` or similar). If it points to `src/app/globals.css`, update it to `src/styles/globals.css`.

- [ ] **Step 5: Verify the app still builds**

Run: `npx next build`
Expected: Build succeeds with no errors about missing CSS.

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css src/styles/globals.css src/app/layout.tsx components.json
git commit -m "feat: relocate globals.css to src/styles/ with token placeholders"
```

---

## Task 5: Create TypeScript interfaces

**Files:**
- Create: `src/types/index.ts`

- [ ] **Step 1: Create types file**

Write to `src/types/index.ts`:

```typescript
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Stat {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export interface Feature {
  title: string;
  description: string;
  icon?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface SectionContent {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  features?: Feature[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  company: string;
  industry: string;
  summary: string;
  metrics: Stat[];
  coverImage: string;
  content: string;
}

export interface PageContent {
  title: string;
  description: string;
  hero: SectionContent;
  sections: SectionContent[];
}

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/types/index.ts
git commit -m "feat: add shared TypeScript interfaces for content types"
```

---

## Task 6: Create animation variants

**Files:**
- Create: `src/lib/animations.ts`

- [ ] **Step 1: Create animations file**

Write to `src/lib/animations.ts`:

```typescript
import type { Variants, TargetAndTransition } from 'framer-motion';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// Used with whileHover prop, not with variants/whileInView
export const scaleOnHover: TargetAndTransition = {
  scale: 1.02,
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
  transition: { duration: 0.2, ease: 'easeOut' },
};

// Uses initial/animate/exit keys for AnimatePresence (not hidden/visible).
// Do NOT pass to AnimatedSection — use with AnimatePresence directly.
export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/animations.ts
git commit -m "feat: add centralized Framer Motion animation variants"
```

---

## Task 7: Create useScrollAnimation hook

**Files:**
- Create: `src/hooks/useScrollAnimation.ts`

- [ ] **Step 1: Create hook file**

Write to `src/hooks/useScrollAnimation.ts`:

```typescript
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollAnimation(
  options: UseScrollAnimationOptions = {}
): [ref: (node: Element | null) => void, isInView: boolean] {
  const { threshold = 0.1, rootMargin = '0px', once = true } = options;
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<Element | null>(null);

  const cleanup = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const ref = useCallback(
    (node: Element | null) => {
      cleanup();
      elementRef.current = node;

      if (!node) return;

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (once) {
              cleanup();
            }
          } else if (!once) {
            setIsInView(false);
          }
        },
        { threshold, rootMargin }
      );

      observerRef.current.observe(node);
    },
    [threshold, rootMargin, once, cleanup]
  );

  return [ref, isInView];
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useScrollAnimation.ts
git commit -m "feat: add useScrollAnimation hook with IntersectionObserver"
```

---

## Task 8: Create useCountUp hook

**Files:**
- Create: `src/hooks/useCountUp.ts`

**Note:** This hook wraps `react-countup`'s `useCountUp`. It creates a ref internally, passes it to react-countup, and auto-triggers when the element enters the viewport via `useScrollAnimation`.

- [ ] **Step 1: Create hook file**

Write to `src/hooks/useCountUp.ts`:

```typescript
'use client';

import { useEffect, useRef } from 'react';
import { useCountUp as useCountUpLib } from 'react-countup';
import { useScrollAnimation } from './useScrollAnimation';

interface UseCountUpOptions {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export function useCountUp(options: UseCountUpOptions) {
  const { end, duration = 2, prefix = '', suffix = '' } = options;
  const countUpRef = useRef<HTMLElement>(null) as React.RefObject<HTMLElement>;
  const hasStarted = useRef(false);
  const [scrollRef, inView] = useScrollAnimation({ threshold: 0.3 });

  const { start } = useCountUpLib({
    ref: countUpRef,
    end,
    duration,
    prefix,
    suffix,
    startOnMount: false,
  });

  useEffect(() => {
    if (inView && !hasStarted.current) {
      hasStarted.current = true;
      start();
    }
  }, [inView, start]);

  return {
    ref: scrollRef,
    countUpRef,
    inView,
  };
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors. (If react-countup types cause issues, check if `@types/react-countup` is needed — typically react-countup ships its own types.)

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useCountUp.ts
git commit -m "feat: add useCountUp hook with viewport-triggered counter"
```

---

## Task 9: Create AnimatedSection component

**Files:**
- Create: `src/components/animations/AnimatedSection.tsx`
- Create: `src/components/animations/index.ts`

- [ ] **Step 1: Create AnimatedSection component**

Write to `src/components/animations/AnimatedSection.tsx`:

```tsx
'use client';

import { motion, type Variants } from 'framer-motion';
import { fadeUp } from '@/lib/animations';

interface AnimatedSectionProps {
  children: React.ReactNode;
  variant?: Variants;
  className?: string;
  delay?: number;
  as?: 'div' | 'section';
}

const motionComponents = {
  div: motion.div,
  section: motion.section,
};

export function AnimatedSection({
  children,
  variant = fadeUp,
  className,
  delay = 0,
  as = 'section',
}: AnimatedSectionProps) {
  const Component = motionComponents[as];

  return (
    <Component
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      transition={delay > 0 ? { delay } : undefined}
      className={className}
    >
      {children}
    </Component>
  );
}
```

- [ ] **Step 2: Create barrel export**

Write to `src/components/animations/index.ts`:

```typescript
export { AnimatedSection } from './AnimatedSection';
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/animations/
git commit -m "feat: add AnimatedSection wrapper component with Framer Motion"
```

---

## Task 10: Create placeholder files and remaining folders

**Files:**
- Create: `src/components/common/index.ts`
- Create: `src/components/sections/index.ts`
- Create: `src/components/layouts/index.ts`
- Create: `src/content/home.ts`
- Create: `src/content/case-studies/index.ts`
- Create: `src/content/pages/index.ts`
- Create: `src/lib/constants.ts`

- [ ] **Step 1: Create all placeholder files**

Each file gets the same pattern — a comment describing its purpose and an empty export:

`src/components/common/index.ts`:
```typescript
// Shared components: Navbar, Footer, CTAButton, SectionHeader
export {};
```

`src/components/sections/index.ts`:
```typescript
// Page-specific section components
export {};
```

`src/components/layouts/index.ts`:
```typescript
// Page layout templates: CaseStudyLayout, ProductPageLayout
export {};
```

`src/content/home.ts`:
```typescript
// Home page content data
export {};
```

`src/content/case-studies/index.ts`:
```typescript
// Case study content — one file per case study
export {};
```

`src/content/pages/index.ts`:
```typescript
// Product page content: workforce, performance, learning, recruitment, security
export {};
```

`src/lib/constants.ts`:
```typescript
// Site-wide constants: nav links, site metadata, routes
export {};
```

- [ ] **Step 2: Verify all directories exist**

Run: `find src -type d | sort`
Expected output should include:
```
src/components/animations
src/components/common
src/components/layouts
src/components/sections
src/content
src/content/case-studies
src/content/pages
src/hooks
src/lib
src/styles
src/types
```

- [ ] **Step 3: Commit**

```bash
git add src/components/common/ src/components/sections/ src/components/layouts/ src/content/ src/lib/constants.ts
git commit -m "feat: add placeholder files for all project directories"
```

---

## Task 11: Final verification

- [ ] **Step 1: Run full build**

Run: `npx next build`
Expected: Build succeeds with no errors.

- [ ] **Step 2: Run linter**

Run: `npm run lint`
Expected: No errors.

- [ ] **Step 3: Run Prettier check**

Run: `npx prettier --check "src/**/*.{ts,tsx,css}"`
Expected: Either all files formatted, or run `npm run format` to fix, then re-check.

- [ ] **Step 4: If formatting was needed, commit**

```bash
git add -A
git commit -m "chore: apply Prettier formatting to all source files"
```
