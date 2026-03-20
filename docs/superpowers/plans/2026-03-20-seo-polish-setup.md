# SEO & Polish — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add essential SEO (metadata, OG image, robots, sitemap), Vercel Analytics, prefers-reduced-motion support, and responsive fixes across all 9 pages.

**Architecture:** Metadata uses Next.js template pattern in root layout. Inner pages provide just the title; the suffix is added automatically. Reduced-motion support is a single-point fix in AnimatedSection plus targeted fixes in components that use motion.* directly. Responsive fixes are minimal Tailwind class additions.

**Tech Stack:** Next.js 16.2.0, @vercel/analytics, Framer Motion useReducedMotion

**Spec:** `docs/superpowers/specs/2026-03-20-seo-polish-design.md`

---

## File Map

| File | Action | Change |
|------|--------|--------|
| `package.json` | Modify | Add @vercel/analytics |
| `src/app/layout.tsx` | Modify | Enhanced metadata + Analytics component |
| `src/app/page.tsx` | Modify | Add metadata with absolute title |
| `src/app/robots.ts` | Create | Robots.txt generation |
| `src/app/sitemap.ts` | Create | Sitemap generation |
| `public/images/og-image.png` | Create | OG image from Figma |
| `src/lib/constants.ts` | Modify | Fix ogImage path |
| `src/app/case-studies/*/page.tsx` (3) | Modify | Drop manual title suffix |
| `src/app/use-cases/*/page.tsx` (4) | Modify | Drop manual title suffix |
| `src/app/enterprise-security/page.tsx` | Modify | Drop manual title suffix |
| `src/components/animations/AnimatedSection.tsx` | Modify | Add useReducedMotion |
| `src/components/sections/home/HeroSection.tsx` | Modify | Add useReducedMotion + responsive hero text |
| `src/components/sections/home/LifecycleSection.tsx` | Modify | Add useReducedMotion |
| `src/components/sections/shared/SharedCaseStudiesSection.tsx` | Modify | Add useReducedMotion |
| `src/components/sections/shared/SharedContactSection.tsx` | Modify | Responsive form grid |
| `src/components/sections/home/StatsSection.tsx` | Modify | Responsive stats + padding |
| `src/components/sections/home/ValuePropSection.tsx` | Modify | Responsive card padding |

---

## Task 1: Install Vercel Analytics + OG image

**Files:**
- Modify: `package.json`
- Create: `public/images/og-image.png`
- Modify: `src/lib/constants.ts`

- [ ] **Step 1: Install Vercel Analytics**

```bash
npm install @vercel/analytics
```

- [ ] **Step 2: Create OG image**

Use Figma MCP `get_screenshot` on the home page hero area (node `20008:16`) to capture a 1200×630 image. Save as `public/images/og-image.png`.

If Figma MCP doesn't produce a suitable image, create a simple placeholder PNG (1200×630, brand background color).

- [ ] **Step 3: Fix SITE_CONFIG ogImage path**

In `src/lib/constants.ts`, change `ogImage: '/og-image.png'` to `ogImage: '/images/og-image.png'`.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json public/images/og-image.png src/lib/constants.ts
git commit -m "feat: add Vercel Analytics dependency and OG image"
```

---

## Task 2: Root layout metadata + Analytics component

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Update layout.tsx**

Replace the metadata export and add Analytics import. The full file should become:

```tsx
import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { Analytics } from '@vercel/analytics/react';

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
  metadataBase: new URL('https://oona.works'),
  title: {
    default: 'Oona.Works — Your AI Partner in HR Transformation',
    template: '%s — Oona.Works',
  },
  description:
    'AI-powered HR transformation platform for enterprise consulting firms.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://oona.works',
    siteName: 'Oona.Works',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Oona.Works',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
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
        <Analytics />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npx tsc --noEmit && npx next build`

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: add metadata template, OG tags, and Vercel Analytics to root layout"
```

---

## Task 3: Home page metadata + robots + sitemap

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/app/robots.ts`
- Create: `src/app/sitemap.ts`

- [ ] **Step 1: Add metadata to home page**

Add at the top of `src/app/page.tsx` (before the imports of sections):

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Oona.Works — Your AI Partner in HR Transformation' },
  description:
    'AI-powered HR transformation platform for enterprise consulting firms. Deploy AI across the full HR ecosystem.',
};
```

- [ ] **Step 2: Create robots.ts**

Write to `src/app/robots.ts`:

```typescript
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://oona.works/sitemap.xml',
  };
}
```

- [ ] **Step 3: Create sitemap.ts**

Write to `src/app/sitemap.ts`:

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

- [ ] **Step 4: Verify and commit**

```bash
npx tsc --noEmit && npx next build
git add src/app/page.tsx src/app/robots.ts src/app/sitemap.ts
git commit -m "feat: add home metadata, robots.txt, and sitemap generation"
```

---

## Task 4: Update inner page metadata (drop manual suffix)

**Files:**
- Modify: 8 inner page files

- [ ] **Step 1: Update all 8 pages**

In each file, change the metadata title from:

```tsx
title: `${data.metadata.title} — Oona.Works`,
```

to:

```tsx
title: data.metadata.title,
```

Files to update:
1. `src/app/case-studies/talent-intelligence/page.tsx`
2. `src/app/case-studies/performance-management/page.tsx`
3. `src/app/case-studies/learning-content/page.tsx`
4. `src/app/use-cases/workforce/page.tsx`
5. `src/app/use-cases/performance/page.tsx`
6. `src/app/use-cases/learning/page.tsx`
7. `src/app/use-cases/recruitment/page.tsx`
8. `src/app/enterprise-security/page.tsx`

This is a simple find-and-replace in each file. The root layout template `%s — Oona.Works` now adds the suffix automatically.

- [ ] **Step 2: Verify and commit**

```bash
npx tsc --noEmit
git add src/app/case-studies/ src/app/use-cases/ src/app/enterprise-security/
git commit -m "feat: update inner page metadata to use root layout template"
```

---

## Task 5: Accessibility — prefers-reduced-motion

**Files:**
- Modify: `src/components/animations/AnimatedSection.tsx`
- Modify: `src/components/sections/home/HeroSection.tsx`
- Modify: `src/components/sections/home/LifecycleSection.tsx`
- Modify: `src/components/sections/shared/SharedCaseStudiesSection.tsx`

- [ ] **Step 1: Update AnimatedSection**

Replace `src/components/animations/AnimatedSection.tsx` with the version from the spec that includes `useReducedMotion`. When `shouldReduceMotion` is true, render a plain HTML element without Framer Motion.

- [ ] **Step 2: Add useReducedMotion to HeroSection**

Read `src/components/sections/home/HeroSection.tsx`. It uses `motion.div` directly for stagger animations. Add:

```tsx
import { useReducedMotion } from 'framer-motion';
const shouldReduceMotion = useReducedMotion();
```

When `shouldReduceMotion` is true, render the same JSX structure but replace `motion.div` with plain `div` and remove `variants`, `initial`, `animate`, `whileInView` props. Keep the layout and styling identical.

- [ ] **Step 3: Add useReducedMotion to LifecycleSection**

Same pattern as HeroSection — read the file, add the hook, conditionally render without animation when reduced motion is preferred.

- [ ] **Step 4: Add useReducedMotion to SharedCaseStudiesSection**

Same pattern — this component uses `motion.div` with `staggerContainer`/`staggerItem`/`scaleOnHover`. When reduced motion is preferred, render plain `div` elements without animation props.

- [ ] **Step 5: Add useReducedMotion to MobileMenu**

Read `src/components/common/MobileMenu.tsx`. It uses `motion.div` and `motion.nav` with stagger animations for the overlay. Add `useReducedMotion` — when reduced motion is preferred, render the overlay and links without animation (instant show/hide, no stagger). Keep the AnimatePresence for mount/unmount but skip the opacity/transform transitions.

- [ ] **Step 6: Verify and commit**

```bash
npx tsc --noEmit
git add src/components/animations/AnimatedSection.tsx src/components/sections/home/HeroSection.tsx src/components/sections/home/LifecycleSection.tsx src/components/sections/shared/SharedCaseStudiesSection.tsx src/components/common/MobileMenu.tsx
git commit -m "feat: add prefers-reduced-motion support across all animated components"
```

---

## Task 6: Responsive fixes

**Files:**
- Modify: `src/components/sections/home/HeroSection.tsx`
- Modify: `src/components/sections/shared/SharedContactSection.tsx`
- Modify: `src/components/sections/home/StatsSection.tsx`
- Modify: `src/components/sections/home/ValuePropSection.tsx`

- [ ] **Step 1: Fix HeroSection responsive text**

Read `src/components/sections/home/HeroSection.tsx`. Find where `text-h1` is used on the headline. The `text-h1` utility sets `font-size: 64px` which is too large at 375px.

Replace the class with responsive sizing: `text-[36px] leading-[44px] tracking-[-1px] md:text-h1`

Also verify the hero image has `w-full h-auto` for responsive sizing.

- [ ] **Step 2: Fix SharedContactSection form grid**

Read `src/components/sections/shared/SharedContactSection.tsx`. Find the First Name + Last Name grid. Change `grid-cols-2` to `grid-cols-1 sm:grid-cols-2`.

Also change the card padding from `p-[var(--section-padding)]` to `p-6 md:p-[var(--section-padding)]`.

- [ ] **Step 3: Fix StatsSection responsive**

Read `src/components/sections/home/StatsSection.tsx`. Apply these fixes:
- Change stat label class from `text-display` to `text-[28px] leading-[36px] md:text-display`
- Change stats grid from `grid-cols-2` to `grid-cols-1 sm:grid-cols-2`
- Change divider from `col-span-2` to `col-span-1 sm:col-span-2`
- Change card padding from `p-[var(--section-padding)]` to `p-6 md:p-[var(--section-padding)]`

- [ ] **Step 4: Fix ValuePropSection card padding**

Read `src/components/sections/home/ValuePropSection.tsx`. Change card padding from `p-[var(--section-padding)]` to `p-6 md:p-[var(--section-padding)]`.

- [ ] **Step 5: Fix additional section padding**

These components also use `p-[var(--section-padding)]` and need the same `p-6 md:p-[var(--section-padding)]` fix:
- `src/components/sections/case-study/CaseStudyBody.tsx` (both left and right cards)
- `src/components/sections/shared/SharedCaseStudiesSection.tsx` (the outer card)
- `src/components/sections/home/AboutSection.tsx` (the card)

Read each file, find the `p-[var(--section-padding)]` class, and change to `p-6 md:p-[var(--section-padding)]`.

- [ ] **Step 6: Verify PageBanner responsive**

Read `src/components/layouts/PageBanner.tsx`. Verify:
- Uses `grid-cols-1 md:grid-cols-2` (should already stack on mobile)
- Title text doesn't use an excessively large size on mobile
- Hero image has `w-full h-auto`

If any fix is needed, apply it. If it passes, no change required.

- [ ] **Step 7: Verify and commit**

```bash
npx tsc --noEmit && npx next build
git add src/components/sections/ src/components/layouts/
git commit -m "feat: add responsive fixes for mobile breakpoints"
```

---

## Task 7: Final verification

- [ ] **Step 1: Full build**

Run: `npx next build`
Expected: All routes build successfully.

- [ ] **Step 2: TypeScript + lint**

Run: `npx tsc --noEmit && npm run lint`

- [ ] **Step 3: Prettier**

Run: `npx prettier --check "src/**/*.{ts,tsx,css}"`
If needed: `npm run format`

- [ ] **Step 4: Commit if formatting needed**

```bash
git add -A
git commit -m "chore: apply Prettier formatting after SEO & Polish"
```
