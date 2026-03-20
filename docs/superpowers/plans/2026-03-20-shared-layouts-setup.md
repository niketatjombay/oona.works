# Shared Layouts + Inner Pages — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the shared `PageLayout`, extract shared sections from the home page, create all 8 inner pages (3 case studies, 4 use cases, 1 enterprise security) with full Figma content, pixel-accurate to the design.

**Architecture:** Single `PageLayout` component renders Banner → children → SharedCaseStudiesSection → SharedContactSection. Each page provides banner props and unique content as children. Shared sections are extracted from the home page to eliminate duplication. All content in dedicated files per page.

**Tech Stack:** Next.js 16.2.0, React 19, Tailwind CSS 4, Framer Motion, lucide-react, next/image, next/link, Figma MCP for pixel-accurate implementation

**Spec:** `docs/superpowers/specs/2026-03-20-shared-layouts-design.md`

**Critical rule:** Every subagent implementing a section MUST use the Figma MCP (`get_design_context` and `get_screenshot`) on the relevant Figma nodes to extract exact content, spacing, and styling. The spec provides architecture; Figma provides visual truth.

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `public/images/` (12 files) | Create | Hero + dashboard images from Figma |
| `src/components/sections/shared/SharedCaseStudiesSection.tsx` | Create | Extracted from home CaseStudiesSection |
| `src/components/sections/shared/SharedContactSection.tsx` | Create | Extracted from home ContactSection |
| `src/components/sections/shared/HighlightQuote.tsx` | Create | Pink quote, used by CS + enterprise |
| `src/components/sections/shared/index.ts` | Create | Barrel exports |
| `src/components/sections/home/CaseStudiesSection.tsx` | Modify | Thin wrapper around shared version |
| `src/components/sections/home/ContactSection.tsx` | Modify | Thin wrapper around shared version |
| `src/components/layouts/PageBanner.tsx` | Create | Header banner |
| `src/components/layouts/PageLayout.tsx` | Create | Layout shell |
| `src/components/layouts/index.ts` | Modify | Barrel exports |
| `src/components/sections/case-study/*.tsx` (4 files) | Create | Case study page sections |
| `src/components/sections/use-case/*.tsx` (4 files) | Create | Use case page sections |
| `src/components/sections/enterprise/*.tsx` (3 files) | Create | Enterprise security sections |
| `src/content/case-studies/*.ts` (4 files) | Create | 3 content files + barrel |
| `src/content/pages/*.ts` (6 files) | Create | 5 content files + barrel |
| `src/app/case-studies/*/page.tsx` (3 files) | Rewrite | Replace placeholders |
| `src/app/use-cases/*/page.tsx` (4 files) | Rewrite | Replace placeholders |
| `src/app/enterprise-security/page.tsx` | Rewrite | Replace placeholder |
| `src/types/index.ts` | Modify | Remove old CaseStudy, add new content types |
| `src/components/sections/index.ts` | Modify | Add all new section exports |

---

## Task 1: Download image assets from Figma

**Files:**
- Create: 12 images in `public/images/`

- [ ] **Step 1: Download all hero and dashboard images from Figma MCP**

Use `get_screenshot` for each node ID. Save to `public/images/`:

```
Case study heroes:
  Node 20023:605 → public/images/cs-hero-1.png
  Node 20023:761 → public/images/cs-hero-2.png
  Node 20131:91  → public/images/cs-hero-3.png

Use case heroes:
  Node 20024:1053 → public/images/uc-hero-workforce.png
  Node 20024:1172 → public/images/uc-hero-performance.png
  Node 20026:1292 → public/images/uc-hero-learning.png
  Node 20028:1420 → public/images/uc-hero-recruitment.png

Enterprise security hero:
  Node 20137:221 → public/images/es-hero.png

Use case dashboard screenshots:
  Node 20023:1045 → public/images/uc-dashboard-workforce.png
  Node 20024:1148 → public/images/uc-dashboard-performance.png
  Node 20026:1267 → public/images/uc-dashboard-learning.png
  Node 20028:1395 → public/images/uc-dashboard-recruitment.png
```

If a Figma node doesn't return an image via `get_screenshot`, try `get_design_context` to find the asset URL, then download with curl from `http://localhost:3845/assets/...`. If unavailable, create a placeholder.

- [ ] **Step 2: Commit**

```bash
git add public/images/
git commit -m "feat: download hero and dashboard images from Figma"
```

---

## Task 2: Shared sections (extract from home)

**Files:**
- Create: `src/components/sections/shared/SharedCaseStudiesSection.tsx`
- Create: `src/components/sections/shared/SharedContactSection.tsx`
- Create: `src/components/sections/shared/HighlightQuote.tsx`
- Create: `src/components/sections/shared/index.ts`
- Modify: `src/components/sections/home/CaseStudiesSection.tsx`
- Modify: `src/components/sections/home/ContactSection.tsx`

- [ ] **Step 1: Create SharedCaseStudiesSection**

Copy the ENTIRE contents of `src/components/sections/home/CaseStudiesSection.tsx` to `src/components/sections/shared/SharedCaseStudiesSection.tsx`. Rename the export from `CaseStudiesSection` to `SharedCaseStudiesSection`. The code is identical — same imports, same content source (`HOME_CASE_STUDIES`), same styling.

- [ ] **Step 2: Create SharedContactSection**

Copy the ENTIRE contents of `src/components/sections/home/ContactSection.tsx` to `src/components/sections/shared/SharedContactSection.tsx`. Rename the export from `ContactSection` to `SharedContactSection`. Code is identical.

- [ ] **Step 3: Create HighlightQuote**

Write to `src/components/sections/shared/HighlightQuote.tsx`:

```tsx
import { AnimatedSection } from '@/components/animations';
import { cn } from '@/lib/utils';

interface HighlightQuoteProps {
  text: string;
  className?: string;
}

export function HighlightQuote({ text, className }: HighlightQuoteProps) {
  return (
    <AnimatedSection
      as="div"
      className={cn(
        'max-w-[var(--content-max)] mx-auto px-4 py-12',
        className
      )}
    >
      <p className="text-h4 text-primary italic text-right md:ml-auto md:max-w-[60%]">
        {text}
      </p>
    </AnimatedSection>
  );
}
```

- [ ] **Step 4: Create barrel export**

Write to `src/components/sections/shared/index.ts`:

```typescript
export { SharedCaseStudiesSection } from './SharedCaseStudiesSection';
export { SharedContactSection } from './SharedContactSection';
export { HighlightQuote } from './HighlightQuote';
```

- [ ] **Step 5: Refactor home CaseStudiesSection to thin wrapper**

Replace `src/components/sections/home/CaseStudiesSection.tsx` with:

```tsx
import { SharedCaseStudiesSection } from '@/components/sections/shared';

export function CaseStudiesSection() {
  return <SharedCaseStudiesSection />;
}
```

- [ ] **Step 6: Refactor home ContactSection to thin wrapper**

Replace `src/components/sections/home/ContactSection.tsx` with:

```tsx
import { SharedContactSection } from '@/components/sections/shared';

export function ContactSection() {
  return <SharedContactSection />;
}
```

- [ ] **Step 7: Verify build**

Run: `npx next build`
Expected: Build succeeds. Home page should still work identically.

- [ ] **Step 8: Commit**

```bash
git add src/components/sections/shared/ src/components/sections/home/CaseStudiesSection.tsx src/components/sections/home/ContactSection.tsx
git commit -m "feat: extract shared CaseStudies and Contact sections, add HighlightQuote"
```

---

## Task 3: PageLayout and PageBanner

**Files:**
- Create: `src/components/layouts/PageBanner.tsx`
- Create: `src/components/layouts/PageLayout.tsx`
- Modify: `src/components/layouts/index.ts`

- [ ] **Step 1: Create PageBanner**

Write to `src/components/layouts/PageBanner.tsx`. Server component (no `'use client'`). Use the Figma MCP on any case study banner node (e.g., `20023:583` for CS1 banner) to get exact spacing, positioning of decorative shapes, dividers, badge pill, and hero image container.

Must include:
- `pt-[180px] pb-16` wrapper for navbar clearance
- `max-w-[var(--content-max)] mx-auto px-4`
- Two columns: left (decorative shape + dividers + badge + title + optional subtitle), right (hero image container)
- Decorative shape SVG: `next/image` from `/images/decorative-shape.svg`, 150×74
- Horizontal dividers: 1px `bg-border` lines matching Figma
- Badge: `inline-flex items-center rounded-full border border-border px-4 py-1 text-overline text-muted-label`
- Title: `text-h3 text-foreground mt-4`
- Subtitle: `text-body-lg text-foreground mt-4`
- Hero image: `next/image`, `rounded-xl`, inside a `bg-background rounded-2xl p-8` container
- Wraps in `AnimatedSection`

Props: `{ badge, title, subtitle?, heroImage, heroImageAlt }`

- [ ] **Step 2: Create PageLayout**

Write to `src/components/layouts/PageLayout.tsx`:

```tsx
import { SharedCaseStudiesSection } from '@/components/sections/shared/SharedCaseStudiesSection';
import { SharedContactSection } from '@/components/sections/shared/SharedContactSection';
import { PageBanner } from './PageBanner';

interface PageLayoutProps {
  badge: string;
  title: string;
  subtitle?: string;
  heroImage: string;
  heroImageAlt: string;
  children: React.ReactNode;
}

export function PageLayout({
  badge,
  title,
  subtitle,
  heroImage,
  heroImageAlt,
  children,
}: PageLayoutProps) {
  return (
    <>
      <PageBanner
        badge={badge}
        title={title}
        subtitle={subtitle}
        heroImage={heroImage}
        heroImageAlt={heroImageAlt}
      />
      {children}
      <SharedCaseStudiesSection />
      <SharedContactSection />
    </>
  );
}
```

- [ ] **Step 3: Update barrel exports**

Replace `src/components/layouts/index.ts` with:

```typescript
export { PageLayout } from './PageLayout';
export { PageBanner } from './PageBanner';
```

- [ ] **Step 4: Verify build**

Run: `npx tsc --noEmit && npx next build`

- [ ] **Step 5: Commit**

```bash
git add src/components/layouts/
git commit -m "feat: add PageLayout and PageBanner for inner pages"
```

---

## Task 4: Case study content files

**Files:**
- Create: `src/content/case-studies/talent-intelligence.ts`
- Create: `src/content/case-studies/performance-management.ts`
- Create: `src/content/case-studies/learning-content.ts`
- Create: `src/content/case-studies/index.ts`
- Modify: `src/types/index.ts`

- [ ] **Step 1: Add CaseStudyContent type to types/index.ts**

Add the `CaseStudyContent` interface to `src/types/index.ts`. Also REMOVE the old `CaseStudy` interface that was a placeholder.

```typescript
export interface CaseStudyContent {
  metadata: { title: string; description: string };
  banner: {
    badge: string;
    title: string;
    heroImage: string;
    heroImageAlt: string;
  };
  problem: string;
  summary: string;
  howItWorks: {
    title: string;
    steps: { number: number; title: string; description: string }[];
  };
  outcomes: {
    title: string;
    items: string[];
  };
  quote: string;
}
```

- [ ] **Step 2: Create all 3 case study content files**

For EACH file, use the Figma MCP (`get_design_context`) on the corresponding Figma node to extract ALL text verbatim. No placeholder text.

- `src/content/case-studies/talent-intelligence.ts` — Figma node `20023:413`. Use `get_design_context` on nodes `20023:560`, `20023:644`, `20023:639`, `20023:645` for specific text sections.
- `src/content/case-studies/performance-management.ts` — Figma node `20023:647`. Use nodes `20023:730`, `20023:733`, `20023:728`, `20023:770`.
- `src/content/case-studies/learning-content.ts` — Figma node `20023:771`. Use nodes `20131:66`, `20131:69`, `20131:64`, `20131:92`.

Each file exports a `CaseStudyContent` typed object. See the spec for the data structure.

- [ ] **Step 3: Create barrel export**

Write to `src/content/case-studies/index.ts`:

```typescript
export { TALENT_INTELLIGENCE } from './talent-intelligence';
export { PERFORMANCE_MANAGEMENT } from './performance-management';
export { LEARNING_CONTENT } from './learning-content';
```

- [ ] **Step 4: Verify and commit**

```bash
npx tsc --noEmit
git add src/content/case-studies/ src/types/index.ts
git commit -m "feat: add case study content files with Figma text"
```

---

## Task 5: Case study page sections

**Files:**
- Create: `src/components/sections/case-study/CaseStudyProblem.tsx`
- Create: `src/components/sections/case-study/CaseStudySummary.tsx`
- Create: `src/components/sections/case-study/CaseStudyBody.tsx`
- Create: `src/components/sections/case-study/index.ts`

- [ ] **Step 1: Create CaseStudyProblem**

Server component. Receives `text: string`. Renders paragraphs (split by `\n`) in `text-body text-foreground`. Container: `max-w-[var(--content-max)] mx-auto px-4 py-12`. Wraps in `AnimatedSection`.

- [ ] **Step 2: Create CaseStudySummary**

Server component. Receives `text: string`. Renders the summary line in `text-body text-foreground font-semibold`. Container: `max-w-[var(--content-max)] mx-auto px-4 py-8`. Wraps in `AnimatedSection`.

- [ ] **Step 3: Create CaseStudyBody**

Server component. Receives `howItWorks: { title, steps[] }` and `outcomes: { title, items[] }`. Two-column grid with white cards. Left: numbered steps. Right: bullet list. Use Figma MCP on CS1 body nodes (`20023:642`, `20023:636`) for exact styling. Each card wraps in `AnimatedSection`.

- [ ] **Step 4: Create barrel export**

```typescript
export { CaseStudyProblem } from './CaseStudyProblem';
export { CaseStudySummary } from './CaseStudySummary';
export { CaseStudyBody } from './CaseStudyBody';
```

- [ ] **Step 5: Verify and commit**

```bash
npx tsc --noEmit
git add src/components/sections/case-study/
git commit -m "feat: add case study page section components"
```

---

## Task 6: Case study pages

**Files:**
- Rewrite: `src/app/case-studies/talent-intelligence/page.tsx`
- Rewrite: `src/app/case-studies/performance-management/page.tsx`
- Rewrite: `src/app/case-studies/learning-content/page.tsx`

- [ ] **Step 1: Create all 3 case study pages**

Each page follows this pattern:

```tsx
import type { Metadata } from 'next';
import { PageLayout } from '@/components/layouts';
import { CaseStudyProblem, CaseStudySummary, CaseStudyBody } from '@/components/sections/case-study';
import { HighlightQuote } from '@/components/sections/shared';
import { TALENT_INTELLIGENCE } from '@/content/case-studies';

const data = TALENT_INTELLIGENCE;

export const metadata: Metadata = {
  title: `${data.metadata.title} — Oona.Works`,
  description: data.metadata.description,
};

export default function TalentIntelligencePage() {
  return (
    <PageLayout
      badge={data.banner.badge}
      title={data.banner.title}
      heroImage={data.banner.heroImage}
      heroImageAlt={data.banner.heroImageAlt}
    >
      <CaseStudyProblem text={data.problem} />
      <CaseStudySummary text={data.summary} />
      <CaseStudyBody howItWorks={data.howItWorks} outcomes={data.outcomes} />
      <HighlightQuote text={data.quote} />
    </PageLayout>
  );
}
```

Create all 3 pages (talent-intelligence, performance-management, learning-content) using their respective content imports.

- [ ] **Step 2: Verify build**

Run: `npx next build`

- [ ] **Step 3: Commit**

```bash
git add src/app/case-studies/
git commit -m "feat: build 3 case study pages with full Figma content"
```

---

## Task 7: Use case content files

**Files:**
- Create: `src/content/pages/workforce.ts`
- Create: `src/content/pages/performance.ts`
- Create: `src/content/pages/learning.ts`
- Create: `src/content/pages/recruitment.ts`
- Create: `src/content/pages/index.ts`
- Modify: `src/types/index.ts`

- [ ] **Step 1: Add UseCaseContent type to types/index.ts**

```typescript
export type UseCaseStat = {
  type: 'static';
  display: string;
  label: string;
} | {
  type: 'animated';
  value: number;
  suffix?: string;
  label: string;
};

export interface UseCaseContent {
  metadata: { title: string; description: string };
  banner: {
    badge: string;
    title: string;
    subtitle: string;
    heroImage: string;
    heroImageAlt: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    image: string;
    imageAlt: string;
  };
  stats: UseCaseStat[];
}
```

- [ ] **Step 2: Create all 4 use case content files**

Use Figma MCP on each node to extract ALL text. See spec for content details:
- `workforce.ts` — Figma `20023:901`
- `performance.ts` — Figma `20024:1055`
- `learning.ts` — Figma `20026:1175`
- `recruitment.ts` — Figma `20028:1305`

Each exports a `UseCaseContent` typed object. All stats that are ranges (e.g., "60-70%") use `type: 'static'` with `display` string. Single numbers can use `type: 'animated'`.

- [ ] **Step 3: Create barrel export**

```typescript
export { WORKFORCE } from './workforce';
export { PERFORMANCE } from './performance';
export { LEARNING } from './learning';
export { RECRUITMENT } from './recruitment';
```

- [ ] **Step 4: Verify and commit**

```bash
npx tsc --noEmit
git add src/content/pages/ src/types/index.ts
git commit -m "feat: add use case content files with Figma text"
```

---

## Task 8: Use case page sections

**Files:**
- Create: `src/components/sections/use-case/UseCaseDashboard.tsx`
- Create: `src/components/sections/use-case/UseCaseStats.tsx`
- Create: `src/components/sections/use-case/UseCasePlatform.tsx`
- Create: `src/components/sections/use-case/index.ts`

- [ ] **Step 1: Create UseCaseDashboard**

Server component. Receives `{ title, subtitle, image, imageAlt }`. Uses `SectionHeader` centered with `titleSize="h4"`. Screenshot below using `next/image`, `rounded-2xl`. Wraps in `AnimatedSection`.

- [ ] **Step 2: Create UseCaseStats**

`'use client'` component. Receives `stats` array. Renders a responsive row. For `type: 'animated'` stats, uses `AnimatedCounter`. For `type: 'static'` stats, renders display text in `text-h3 text-foreground` with label in `text-body-sm text-muted-foreground`.

- [ ] **Step 3: Create UseCasePlatform**

Server component. No props — reads `HOME_PLATFORM` from `@/content/home`. Uses `SectionHeader` centered. Platform screenshot `next/image` from `/images/platform-overview.png` (1380×512). Wraps in `AnimatedSection`.

- [ ] **Step 4: Create barrel export + verify + commit**

```bash
npx tsc --noEmit
git add src/components/sections/use-case/
git commit -m "feat: add use case page section components"
```

---

## Task 9: Use case pages

**Files:**
- Rewrite: `src/app/use-cases/workforce/page.tsx`
- Rewrite: `src/app/use-cases/performance/page.tsx`
- Rewrite: `src/app/use-cases/learning/page.tsx`
- Rewrite: `src/app/use-cases/recruitment/page.tsx`

- [ ] **Step 1: Create all 4 use case pages**

Each follows this pattern:

```tsx
import type { Metadata } from 'next';
import { PageLayout } from '@/components/layouts';
import { UseCaseDashboard, UseCaseStats, UseCasePlatform } from '@/components/sections/use-case';
import { WORKFORCE } from '@/content/pages';

const data = WORKFORCE;

export const metadata: Metadata = {
  title: `${data.metadata.title} — Oona.Works`,
  description: data.metadata.description,
};

export default function WorkforcePage() {
  return (
    <PageLayout
      badge={data.banner.badge}
      title={data.banner.title}
      subtitle={data.banner.subtitle}
      heroImage={data.banner.heroImage}
      heroImageAlt={data.banner.heroImageAlt}
    >
      <UseCaseDashboard
        title={data.dashboard.title}
        subtitle={data.dashboard.subtitle}
        image={data.dashboard.image}
        imageAlt={data.dashboard.imageAlt}
      />
      <UseCaseStats stats={data.stats} />
      <UseCasePlatform />
    </PageLayout>
  );
}
```

Create all 4 pages using their respective content imports.

- [ ] **Step 2: Verify build + commit**

```bash
npx next build
git add src/app/use-cases/
git commit -m "feat: build 4 use case pages with full Figma content"
```

---

## Task 10: Enterprise security content, sections, and page

**Files:**
- Create: `src/content/pages/enterprise-security.ts`
- Create: `src/components/sections/enterprise/SecurityContent.tsx`
- Create: `src/components/sections/enterprise/SecurityPillars.tsx`
- Create: `src/components/sections/enterprise/index.ts`
- Rewrite: `src/app/enterprise-security/page.tsx`
- Modify: `src/types/index.ts`

- [ ] **Step 1: Add EnterpriseSecurityContent type to types/index.ts**

```typescript
export interface EnterpriseSecurityContent {
  metadata: { title: string; description: string };
  banner: {
    badge: string;
    title: string;
    heroImage: string;
    heroImageAlt: string;
  };
  body: string;
  whyTitle: string;
  whyText: string;
  quote: string;
  pillarsTitle: string;
  pillars: { title: string; description: string }[];
}
```

- [ ] **Step 2: Create enterprise security content file**

Use Figma MCP on node `20137:120` to extract ALL text. Use `get_design_context` on specific nodes: `20137:189` (body), `20137:243` (why section), `20137:231` (pillars). Export as `ENTERPRISE_SECURITY` typed object.

- [ ] **Step 3: Create SecurityContent section**

Server component. Receives `{ body, whyTitle, whyText }`. Renders body paragraphs + "Why it matters" subheading + description. Uses `text-body`, `text-h4`. Wraps in `AnimatedSection`.

- [ ] **Step 4: Create SecurityPillars section**

Server component. Receives `{ title, pillars[] }`. 6 cards in 3×2 grid. Each card: `bg-surface rounded-md p-6 border border-border`, title in `text-card-heading font-semibold`, description in `text-body-sm text-muted`. Cards wrap in `AnimatedSection` with stagger.

- [ ] **Step 5: Create barrel export + page**

Barrel: `src/components/sections/enterprise/index.ts`

Page: `src/app/enterprise-security/page.tsx` — uses `PageLayout` + `SecurityContent` + `HighlightQuote` + `SecurityPillars`. **Important:** Import content directly from `@/content/pages/enterprise-security` (not from the barrel `@/content/pages`) since the barrel is not updated until Task 11.

- [ ] **Step 6: Verify build + commit**

```bash
npx next build
git add src/content/pages/enterprise-security.ts src/components/sections/enterprise/ src/app/enterprise-security/ src/types/index.ts
git commit -m "feat: build enterprise security page with full Figma content"
```

---

## Task 11: Update barrel exports and content index files

**Files:**
- Modify: `src/components/sections/index.ts`
- Modify: `src/content/pages/index.ts` (may need creation if placeholder)

- [ ] **Step 1: Update sections barrel export**

Replace `src/components/sections/index.ts` with:

```typescript
export * from './home';
export * from './shared';
export * from './case-study';
export * from './use-case';
export * from './enterprise';
```

- [ ] **Step 2: Ensure content barrel exports exist**

`src/content/pages/index.ts`:
```typescript
export { WORKFORCE } from './workforce';
export { PERFORMANCE } from './performance';
export { LEARNING } from './learning';
export { RECRUITMENT } from './recruitment';
export { ENTERPRISE_SECURITY } from './enterprise-security';
```

- [ ] **Step 3: Verify and commit**

```bash
npx tsc --noEmit
git add src/components/sections/index.ts src/content/pages/index.ts
git commit -m "feat: update barrel exports for all section types"
```

---

## Task 12: Final verification

- [ ] **Step 1: Full build**

Run: `npx next build`
Expected: All 12 routes build successfully (/, 3 case studies, 4 use cases, 1 enterprise security, plus /_not-found).

- [ ] **Step 2: TypeScript check**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Lint**

Run: `npm run lint`

- [ ] **Step 4: Prettier**

Run: `npx prettier --check "src/**/*.{ts,tsx,css}"`
If needed: `npm run format`

- [ ] **Step 5: Commit if formatting needed**

```bash
git add -A
git commit -m "chore: apply Prettier formatting after inner pages build"
```
