# Home Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete Oona.Works Home page with 9 sections, set up all site routes with placeholder pages, and extract all content/assets from Figma.

**Architecture:** Each section is a self-contained component in `src/components/sections/home/`. All content lives in `src/content/home.ts` — zero hardcoded strings in components. Sections are client or server components depending on animation needs. The page (`src/app/page.tsx`) is a thin orchestrator that stacks sections.

**Tech Stack:** Next.js 16.2.0, React 19, Tailwind CSS 4, Framer Motion, lucide-react, next/image, next/link

**Spec:** `docs/superpowers/specs/2026-03-20-home-page-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/lib/constants.ts` | Modify | Add ROUTES, update NAV_LINKS |
| `src/content/home.ts` | Rewrite | All home page content from Figma |
| `public/images/` | Create (9 images) | Hero, logo mark, platform, team, case studies, decorative |
| `src/app/case-studies/talent-intelligence/page.tsx` | Create | Placeholder |
| `src/app/case-studies/performance-management/page.tsx` | Create | Placeholder |
| `src/app/case-studies/learning-content/page.tsx` | Create | Placeholder |
| `src/app/use-cases/workforce/page.tsx` | Create | Placeholder |
| `src/app/use-cases/performance/page.tsx` | Create | Placeholder |
| `src/app/use-cases/learning/page.tsx` | Create | Placeholder |
| `src/app/use-cases/recruitment/page.tsx` | Create | Placeholder |
| `src/app/enterprise-security/page.tsx` | Create | Placeholder |
| `src/components/sections/home/HeroSection.tsx` | Create | Hero |
| `src/components/sections/home/ValuePropSection.tsx` | Create | Two white cards |
| `src/components/sections/home/PlatformSection.tsx` | Create | Platform overview |
| `src/components/sections/home/LifecycleSection.tsx` | Create | Product cards |
| `src/components/sections/home/StatsSection.tsx` | Create | Stats grid |
| `src/components/sections/home/WhyUsSection.tsx` | Create | Feature cards |
| `src/components/sections/home/CaseStudiesSection.tsx` | Create | Article cards |
| `src/components/sections/home/AboutSection.tsx` | Create | Team section |
| `src/components/sections/home/ContactSection.tsx` | Create | Contact form |
| `src/components/sections/home/index.ts` | Create | Barrel exports |
| `src/components/sections/index.ts` | Modify | Re-export home |
| `src/app/page.tsx` | Rewrite | Stack all 9 sections |

---

## Task 1: Constants, routes, and content file

**Files:**
- Modify: `src/lib/constants.ts`
- Rewrite: `src/content/home.ts`

- [ ] **Step 1: Update constants with ROUTES and fix NAV_LINKS**

Replace the contents of `src/lib/constants.ts` with:

```typescript
import type { NavItem, SiteConfig } from '@/types';

export const ROUTES = {
  home: '/',
  caseStudies: {
    talentIntelligence: '/case-studies/talent-intelligence',
    performanceManagement: '/case-studies/performance-management',
    learningContent: '/case-studies/learning-content',
  },
  useCases: {
    workforce: '/use-cases/workforce',
    performance: '/use-cases/performance',
    learning: '/use-cases/learning',
    recruitment: '/use-cases/recruitment',
  },
  enterpriseSecurity: '/enterprise-security',
  contact: 'mailto:oona@oona.works',
} as const;

export const NAV_LINKS: NavItem[] = [
  { label: 'Home', href: ROUTES.home },
  { label: 'Case Studies', href: ROUTES.caseStudies.talentIntelligence },
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

- [ ] **Step 2: Create home content file**

Replace the contents of `src/content/home.ts` with the full content from Figma. Use the Figma MCP (`get_design_context` on node `20008:16`) to extract the exact text for `HOME_VALUE_PROP.rightCard.body` (from node `20008:132`). The content file must include all typed interfaces and exports as specified in the spec. All text must come verbatim from Figma — no placeholder `'...'` values.

The file should export: `HOME_HERO`, `HOME_VALUE_PROP`, `HOME_PLATFORM`, `HOME_LIFECYCLE`, `HOME_STATS`, `HOME_WHY_US`, `HOME_CASE_STUDIES`, `HOME_ABOUT`, `HOME_CONTACT` — all matching the spec's content structure exactly.

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

- [ ] **Step 4: Commit**

```bash
git add src/lib/constants.ts src/content/home.ts
git commit -m "feat: add ROUTES constants and home page content from Figma"
```

---

## Task 2: Image assets and placeholder routes

**Files:**
- Create: 9 images in `public/images/`
- Create: 8 placeholder page files

- [ ] **Step 1: Download images from Figma MCP**

Use the Figma MCP tools (`get_screenshot`) to download each image asset. Save to `public/images/`:

```
Node 20018:64 → public/images/hero-image.png (hero photo, 464×484)
Node 20008:334 → public/images/logo-mark.png (OonaWorks logo mark, 352×164)
Node 20008:368 → public/images/platform-overview.png (platform screenshot, 1380×512)
Node 20010:63 → public/images/team-photo.png (team photo, 367×408)
Node 20020:75 → public/images/case-study-1.jpg (article thumbnail)
Node 20020:81 → public/images/case-study-2.jpg (article thumbnail)
Node 20020:87 → public/images/case-study-3.jpg (article thumbnail)
Node 20008:573 → public/images/decorative-shape.svg (contact section)
Node 20008:355 → public/images/accent-shape.svg (platform section)
```

If the Figma MCP asset server is not available, create minimal placeholder files so the build doesn't break.

- [ ] **Step 2: Create all 8 placeholder pages**

Each placeholder follows this pattern (adjust title and description for each):

`src/app/case-studies/talent-intelligence/page.tsx`:
```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Talent Intelligence Case Study — Oona.Works',
  description: 'Transforming talent intelligence at a global agro chemical company.',
};

export default function TalentIntelligencePage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center pt-[132px]">
      <div className="text-center">
        <h1 className="text-h3 text-foreground">Talent Intelligence</h1>
        <p className="text-body-lg text-muted-foreground mt-4">Coming soon</p>
      </div>
    </div>
  );
}
```

Create all 8 pages with appropriate titles:
- `src/app/case-studies/talent-intelligence/page.tsx` — "Talent Intelligence"
- `src/app/case-studies/performance-management/page.tsx` — "Performance Management"
- `src/app/case-studies/learning-content/page.tsx` — "Learning Content"
- `src/app/use-cases/workforce/page.tsx` — "Workforce Intelligence"
- `src/app/use-cases/performance/page.tsx` — "Performance Intelligence"
- `src/app/use-cases/learning/page.tsx` — "Learning Intelligence"
- `src/app/use-cases/recruitment/page.tsx` — "Recruitment Intelligence"
- `src/app/enterprise-security/page.tsx` — "Enterprise Grade Security"

- [ ] **Step 3: Verify the app builds**

Run: `npx next build`
Expected: Build succeeds with all new routes.

- [ ] **Step 4: Commit**

```bash
git add public/images/ src/app/case-studies/ src/app/use-cases/ src/app/enterprise-security/
git commit -m "feat: add image assets and placeholder pages for all routes"
```

---

## Task 3: HeroSection

**Files:**
- Create: `src/components/sections/home/HeroSection.tsx`

- [ ] **Step 1: Create HeroSection**

Write to `src/components/sections/home/HeroSection.tsx`. This is a `'use client'` component.

The hero has:
- Logo mark image (352×164) with fadeIn animation
- Headline lines using staggerContainer + staggerItem for per-line entrance
- CTAButton primary with fadeUp delay
- Hero image on the right with fadeRight
- Top padding ~180px for transparent navbar
- Content max-width `var(--content-max)`, centered
- Mobile: stack vertically

Read content from `HOME_HERO` in `@/content/home`. Use `next/image` for both images. Use animation variants from `@/lib/animations` (`fadeIn`, `fadeUp`, `fadeRight`, `staggerContainer`, `staggerItem`). Use `CTAButton` from `@/components/common`.

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/home/HeroSection.tsx
git commit -m "feat: add HeroSection with staggered entrance animations"
```

---

## Task 4: ValuePropSection

**Files:**
- Create: `src/components/sections/home/ValuePropSection.tsx`

- [ ] **Step 1: Create ValuePropSection**

Server component (no `'use client'`). Two white cards side by side.

- Import `AnimatedSection` from `@/components/animations` and `HOME_VALUE_PROP` from `@/content/home`
- Left card: title in `text-h3`, body in `text-body-lg`
- Right card: title in `text-h3`, body text in `text-body` (bold intro portion uses `font-semibold`), bullets, and governance text in `text-placeholder` color
- Each card: `bg-surface rounded-xl p-[var(--section-padding)]`
- Wrapper: `max-w-[var(--content-max)] mx-auto px-4 py-16 md:py-24`
- Grid: `grid grid-cols-1 md:grid-cols-2 gap-6`
- Each card wrapped in `AnimatedSection`

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/home/ValuePropSection.tsx
git commit -m "feat: add ValuePropSection with two white cards"
```

---

## Task 5: PlatformSection

**Files:**
- Create: `src/components/sections/home/PlatformSection.tsx`

- [ ] **Step 1: Create PlatformSection**

Server component. Uses `SectionHeader` centered with `titleSize="h4"`. Large platform screenshot below using `next/image` (1380×512, `rounded-2xl`). Decorative accent SVG (`/images/accent-shape.svg`) positioned absolutely top-right of the section using `next/image`. Content from `HOME_PLATFORM`. Wraps in `AnimatedSection`.

- [ ] **Step 2: Verify and commit**

Run: `npx tsc --noEmit`

```bash
git add src/components/sections/home/PlatformSection.tsx
git commit -m "feat: add PlatformSection with overview screenshot"
```

---

## Task 6: LifecycleSection

**Files:**
- Create: `src/components/sections/home/LifecycleSection.tsx`

- [ ] **Step 1: Create LifecycleSection**

`'use client'` component. Uses `SectionHeader`, then a 3-column grid of product cards.

- Content from `HOME_LIFECYCLE` (columns → cards → title, items, href)
- Each card: `bg-surface rounded-sm p-6`, heading in `text-card-heading`, bullet list in `text-body-sm` with `>` prefix items
- Arrow icon button top-right using lucide-react `ArrowUpRight` (44px border circle)
- Cards with `href` link to use-case pages via `next/link`
- `scaleOnHover` on each card via `motion.div` wrapper
- Staggered entrance using `staggerContainer` + `staggerItem`
- Column backgrounds: `bg-background rounded-md` behind each column
- Grid: `grid grid-cols-1 md:grid-cols-3 gap-6`
- Mobile: single column

- [ ] **Step 2: Verify and commit**

Run: `npx tsc --noEmit`

```bash
git add src/components/sections/home/LifecycleSection.tsx
git commit -m "feat: add LifecycleSection with product category cards"
```

---

## Task 7: StatsSection

**Files:**
- Create: `src/components/sections/home/StatsSection.tsx`

- [ ] **Step 1: Create StatsSection**

`'use client'` component (uses `AnimatedSection` for scroll entrance).

- White card: `bg-surface rounded-2xl p-[var(--section-padding)]`
- Two columns: left (heading + body + CTA) and right (2×2 stats grid)
- Left: heading in `text-h3 text-primary`, body in `text-body-lg`, CTAButton dark "Know More" with `href={ROUTES.contact}`
- Right: 2×2 grid. Each stat: big label in `text-display`, sublabel in `text-overline`. Horizontal divider `bg-border` between rows.
- Content from `HOME_STATS`
- Grid: `grid grid-cols-1 md:grid-cols-2 gap-8`
- Stats grid: `grid grid-cols-2 gap-8`
- Wrap in `AnimatedSection`

- [ ] **Step 2: Verify and commit**

Run: `npx tsc --noEmit`

```bash
git add src/components/sections/home/StatsSection.tsx
git commit -m "feat: add StatsSection with value prop and stats grid"
```

---

## Task 8: WhyUsSection

**Files:**
- Create: `src/components/sections/home/WhyUsSection.tsx`

- [ ] **Step 1: Create WhyUsSection**

Server component. `SectionHeader` centered. 3 lime green cards. CTAButton primary for security.

- Content from `HOME_WHY_US`
- Cards: alternating `bg-secondary-light` and `bg-secondary`, `rounded-md border border-surface p-6`
- Text: prefix + bold word + rest. Bold in `font-semibold text-foreground`, rest in `text-muted`
- Security CTA: CTAButton primary linking to `/enterprise-security`
- Grid: `grid grid-cols-1 md:grid-cols-3 gap-4`
- Each card wraps in `AnimatedSection` with stagger

- [ ] **Step 2: Verify and commit**

Run: `npx tsc --noEmit`

```bash
git add src/components/sections/home/WhyUsSection.tsx
git commit -m "feat: add WhyUsSection with feature cards and security CTA"
```

---

## Task 9: CaseStudiesSection

**Files:**
- Create: `src/components/sections/home/CaseStudiesSection.tsx`

- [ ] **Step 1: Create CaseStudiesSection**

Server component. Header row with title left and arrow icon right. 3 article cards below.

- Content from `HOME_CASE_STUDIES`
- Header row: `SectionHeader` with `titleSize="h3"` on left, circular arrow icon (lucide-react `ArrowUpRight`, 64px, `border border-border rounded-full`) on right
- Each card: `bg-surface border border-border rounded-md overflow-hidden`
- Card image: `next/image` 330×220 at top
- Card title: `text-card-heading text-foreground` with 32px horizontal padding
- Cards link to case study pages via `next/link`
- `scaleOnHover` via `motion.div` wrapper (import from `framer-motion`, needs `'use client'` — or keep as server and skip hover animation)
- Grid: `grid grid-cols-1 md:grid-cols-3 gap-6`

This must be a `'use client'` component since the spec requires `scaleOnHover` (Framer Motion) and stagger entrance animations.

- [ ] **Step 2: Verify and commit**

Run: `npx tsc --noEmit`

```bash
git add src/components/sections/home/CaseStudiesSection.tsx
git commit -m "feat: add CaseStudiesSection with article cards"
```

---

## Task 10: AboutSection

**Files:**
- Create: `src/components/sections/home/AboutSection.tsx`

- [ ] **Step 1: Create AboutSection**

Server component. White card with team photo left, text right.

- Content from `HOME_ABOUT`
- Card: `bg-surface rounded-2xl p-[var(--section-padding)]`
- Left: Team photo `next/image` 367×408, `rounded-2xl`
- Right: "About Us" in `text-h3`, body in `text-body-lg`
- Grid: `grid grid-cols-1 md:grid-cols-2 gap-8 items-center`
- Wraps in `AnimatedSection`
- Mobile: stack, image above text

- [ ] **Step 2: Verify and commit**

Run: `npx tsc --noEmit`

```bash
git add src/components/sections/home/AboutSection.tsx
git commit -m "feat: add AboutSection with team photo and description"
```

---

## Task 11: ContactSection

**Files:**
- Create: `src/components/sections/home/ContactSection.tsx`

- [ ] **Step 1: Create ContactSection**

`'use client'` component. Contact form with validation.

- Content from `HOME_CONTACT`
- White card: `bg-surface rounded-lg p-[var(--section-padding)]`
- Two columns: left (overline, heading, subtitle, decorative SVG), right (form)
- Left: overline in `text-overline text-muted-label`, title in `text-h2`, subtitle in `text-body-lg`, decorative shape SVG using `next/image`
- Right: Form with `useState` for `{ firstName, lastName, email, message }` and `isSubmitted`
- Fields: First Name + Last Name side by side, Email full width, Textarea full width
- Labels: `text-nav text-foreground`
- Inputs: `bg-surface border border-border rounded-sm h-[56px] px-3 text-body-sm focus:ring-2 focus:ring-primary focus:outline-none w-full`
- Textarea: same styling but `h-[160px] py-3 resize-none`
- Placeholder text: `text-placeholder`
- Submit: CTAButton `variant="submit"` `size="lg"` `type="submit"` `className="w-full"`
- Validation: all fields required, email regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`. Display inline errors below each field with `aria-describedby` linking input to its error message.
- onSubmit: prevent default, validate, console.log, set isSubmitted true
- Success state: replace form with successMessage centered

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/home/ContactSection.tsx
git commit -m "feat: add ContactSection with validated form"
```

---

## Task 12: Page assembly, barrel exports, and final verification

**Files:**
- Create: `src/components/sections/home/index.ts`
- Modify: `src/components/sections/index.ts`
- Rewrite: `src/app/page.tsx`

- [ ] **Step 1: Create barrel exports**

`src/components/sections/home/index.ts`:
```typescript
export { HeroSection } from './HeroSection';
export { ValuePropSection } from './ValuePropSection';
export { PlatformSection } from './PlatformSection';
export { LifecycleSection } from './LifecycleSection';
export { StatsSection } from './StatsSection';
export { WhyUsSection } from './WhyUsSection';
export { CaseStudiesSection } from './CaseStudiesSection';
export { AboutSection } from './AboutSection';
export { ContactSection } from './ContactSection';
```

`src/components/sections/index.ts`:
```typescript
export * from './home';
```

- [ ] **Step 2: Rewrite page.tsx**

Replace `src/app/page.tsx` with:

```tsx
import {
  HeroSection,
  ValuePropSection,
  PlatformSection,
  LifecycleSection,
  StatsSection,
  WhyUsSection,
  CaseStudiesSection,
  AboutSection,
  ContactSection,
} from '@/components/sections/home';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ValuePropSection />
      <PlatformSection />
      <LifecycleSection />
      <StatsSection />
      <WhyUsSection />
      <CaseStudiesSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npx next build`
Expected: Build succeeds with all routes and sections.

- [ ] **Step 4: Run full verification**

```bash
npx tsc --noEmit
npm run lint
npx prettier --check "src/**/*.{ts,tsx,css}"
```

If Prettier needs fixes: `npm run format` then re-check.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/ src/app/page.tsx
git commit -m "feat: assemble Home page with all 9 sections"
```

- [ ] **Step 6: If formatting was needed, commit separately**

```bash
git add -A
git commit -m "chore: apply Prettier formatting after Home page build"
```
