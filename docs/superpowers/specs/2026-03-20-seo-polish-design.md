# Oona.Works — SEO & Polish

## Context

This is the final sub-project. All 9 pages are built with full Figma content. This phase adds essential SEO, Vercel Analytics, accessibility improvements, and responsive fixes.

## Scope

| Area | What we do |
|------|------------|
| SEO | Metadata on every page (with template), OG image, robots.ts, sitemap.ts |
| Performance | Vercel Analytics |
| Accessibility | `prefers-reduced-motion` support in AnimatedSection |
| Responsive | Audit + fix common mobile issues |

## Files

| File | Action | Purpose |
|------|--------|---------|
| `src/app/layout.tsx` | Modify | Enhanced metadata with OG defaults + template, Vercel Analytics |
| `src/app/page.tsx` | Modify | Add metadata export for home page |
| `src/app/robots.ts` | Create | Robots.txt generation |
| `src/app/sitemap.ts` | Create | Sitemap generation using ROUTES |
| `public/images/og-image.png` | Create | Default Open Graph image (1200×630) |
| `src/components/animations/AnimatedSection.tsx` | Modify | Add prefers-reduced-motion support |
| `src/app/case-studies/*/page.tsx` (3 files) | Modify | Update metadata to use template (drop manual suffix) |
| `src/app/use-cases/*/page.tsx` (4 files) | Modify | Update metadata to use template |
| `src/app/enterprise-security/page.tsx` | Modify | Update metadata to use template |
| Various section components | Modify | Responsive fixes |
| `package.json` | Modify | Add @vercel/analytics |

## 1. SEO — Metadata

### Root layout metadata template

Update `src/app/layout.tsx` metadata to use the Next.js template pattern:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://oona.works'),
  title: {
    default: 'Oona.Works — Your AI Partner in HR Transformation',
    template: '%s — Oona.Works',
  },
  description: 'AI-powered HR transformation platform for enterprise consulting firms.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://oona.works',
    siteName: 'Oona.Works',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Oona.Works' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
};
```

### Home page metadata

Add to `src/app/page.tsx`:

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Oona.Works — Your AI Partner in HR Transformation' },
  description: 'AI-powered HR transformation platform for enterprise consulting firms. Deploy AI across the full HR ecosystem.',
};
```

Note: Uses `title: { absolute: '...' }` to bypass the template pattern and avoid a doubled title like "Oona.Works — ... — Oona.Works".

### Inner page metadata update

All 8 inner pages currently export metadata like:

```tsx
title: `${data.metadata.title} — Oona.Works`,
```

With the template pattern in the root layout, these should change to:

```tsx
title: data.metadata.title,
```

The ` — Oona.Works` suffix is now added automatically by the template. Update all 8 pages.

### OG image

Create a 1200×630px Open Graph image. Use the Figma MCP to screenshot the hero area of the home page, or create a simple branded image with the Oona.Works logo on the brand background color (#F7F7F8) with the primary accent (#F72685). Save as `public/images/og-image.png`.

Also update `SITE_CONFIG.ogImage` in `src/lib/constants.ts` from `'/og-image.png'` to `'/images/og-image.png'` to match the actual file location.

## 2. SEO — robots.ts + sitemap.ts

### robots.ts

Create `src/app/robots.ts`:

```typescript
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://oona.works/sitemap.xml',
  };
}
```

### sitemap.ts

Create `src/app/sitemap.ts`:

```typescript
import type { MetadataRoute } from 'next';
import { ROUTES } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://oona.works';
  const routes = [
    ROUTES.home,
    ...Object.values(ROUTES.caseStudies),
    ...Object.values(ROUTES.useCases),
    ROUTES.enterpriseSecurity,
  ];
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1 : 0.8,
  }));
}
```

## 3. Performance — Vercel Analytics

Install and add to root layout:

```bash
npm install @vercel/analytics
```

In `src/app/layout.tsx`, import and render after Footer:

```tsx
import { Analytics } from '@vercel/analytics/react';

<body className="flex min-h-full flex-col">
  <Navbar />
  <main className="flex-1">{children}</main>
  <Footer />
  <Analytics />
</body>
```

## 4. Accessibility — prefers-reduced-motion

### AnimatedSection update

Modify `src/components/animations/AnimatedSection.tsx` to skip animations when the user prefers reduced motion.

```tsx
'use client';

import { motion, type Variants, useReducedMotion } from 'framer-motion';
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
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const Element = as;
    return <Element className={className}>{children}</Element>;
  }

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

This is a single-point fix — since every animated section in the app uses `AnimatedSection`, this one change covers the entire site.

For `scaleOnHover` animations on CTAButton and card components, Framer Motion's global `reducedMotion` detection is respected by default when using `whileHover` — no additional changes needed.

**Note:** Some components use `motion.*` directly instead of `AnimatedSection` (e.g., `HeroSection`, `LifecycleSection`, `CaseStudiesSection`). These are NOT covered by the `AnimatedSection` fix. Add `useReducedMotion` checks to these components as well — same pattern: if reduced motion is preferred, render static elements without animation props.

## 5. Responsive — Code audit + fixes

### Known issues to check and fix

**HeroSection** (`src/components/sections/home/HeroSection.tsx`):
- `text-h1` is 64px — too large for 375px screens
- Fix: Add responsive classes. Replace `text-h1` with custom responsive sizing: `text-[36px] leading-[44px] md:text-h1` or use a responsive wrapper
- Verify hero image doesn't overflow on mobile

**Contact form** (`src/components/sections/shared/SharedContactSection.tsx`):
- First Name + Last Name `grid-cols-2` may be too cramped at 375px
- Fix: Change `grid-cols-2` to `grid-cols-1 sm:grid-cols-2`

**Stats grid** (`src/components/sections/home/StatsSection.tsx`):
- `text-display` (44px) may overflow on mobile
- Fix: Add responsive sizing on stat labels: `text-[28px] leading-[36px] md:text-display`
- The 2×2 stats grid should collapse to 1-column on very small screens: change `grid-cols-2` to `grid-cols-1 sm:grid-cols-2`
- The divider `col-span-2` must also become `col-span-1 sm:col-span-2` to match

**Section padding** — These components use `p-[var(--section-padding)]` (56px) which is too much on mobile:
- `src/components/sections/shared/SharedContactSection.tsx`
- `src/components/sections/home/StatsSection.tsx`
- `src/components/sections/home/ValuePropSection.tsx` (cards)
- Fix: Change to `p-6 md:p-[var(--section-padding)]`

**PageBanner** (`src/components/layouts/PageBanner.tsx`):
- Long case study titles may overflow on mobile
- Verify two-column layout stacks properly on mobile

**Section padding** — Verify that `p-[var(--section-padding)]` (56px) isn't excessive on mobile. May need `p-6 md:p-[var(--section-padding)]` on some components.

**Images** — Verify all `next/image` with fixed width/height have responsive `w-full h-auto` classes.

### Audit approach

For each fix:
1. Read the current component code
2. Identify the specific responsive issue
3. Apply the minimal fix (add/adjust responsive Tailwind classes)
4. Verify TypeScript compiles

Do NOT restructure components — just add responsive breakpoint classes where needed.

## What we do NOT do

- No per-page OG images
- No JSON-LD structured data
- No dynamic OG image generation
- No page transitions
- No visual device testing (code-level fixes only)
- No new components or content changes

## Out of Scope

- Lighthouse score optimization (can do later)
- Web Vitals monitoring setup
- Form backend integration
- CMS integration
