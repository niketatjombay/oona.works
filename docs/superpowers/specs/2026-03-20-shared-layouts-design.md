# Oona.Works — Shared Layouts + All Inner Pages

## Context

This is Sub-project 5: building the shared `PageLayout` component and all 8 inner pages (3 case studies, 4 use cases, 1 enterprise security) with full Figma content. The layout renders a shared banner, page-specific children, and common bottom sections (Case Studies + Contact Form) on every page.

The home page is already complete and does NOT use this layout. Navbar and Footer are already in the root layout.

## Architecture

```
PageLayout
  ├── PageBanner (badge, title, subtitle, hero image, decorative shapes)
  ├── {children}  ← page-specific content
  ├── SharedCaseStudiesSection  ← same 3 article cards on every page
  └── SharedContactSection  ← same contact form on every page
```

All 8 inner pages use `PageLayout`. Each page provides its banner props and page-specific content as children.

## Files

### Layout components

| File | Action | Purpose |
|------|--------|---------|
| `src/components/layouts/PageLayout.tsx` | Create | Shell: Banner → children → shared sections |
| `src/components/layouts/PageBanner.tsx` | Create | Header banner with badge, title, subtitle, hero image, decorative shapes |
| `src/components/layouts/index.ts` | Modify | Barrel exports |

### Shared sections

| File | Action | Purpose |
|------|--------|---------|
| `src/components/sections/shared/SharedCaseStudiesSection.tsx` | Create | 3 article cards extracted from home |
| `src/components/sections/shared/SharedContactSection.tsx` | Create | Contact form extracted from home |
| `src/components/sections/shared/HighlightQuote.tsx` | Create | Pink highlighted quote (used by case studies + enterprise) |
| `src/components/sections/shared/index.ts` | Create | Barrel exports |

### Case study page sections

| File | Action | Purpose |
|------|--------|---------|
| `src/components/sections/case-study/CaseStudyProblem.tsx` | Create | Problem description text block |
| `src/components/sections/case-study/CaseStudySummary.tsx` | Create | Bold callout line |
| `src/components/sections/case-study/CaseStudyBody.tsx` | Create | Two columns: "How Oona Works" steps + "Key Outcomes" |
| `src/components/sections/case-study/index.ts` | Create | Barrel exports |

### Use case page sections

| File | Action | Purpose |
|------|--------|---------|
| `src/components/sections/use-case/UseCaseDashboard.tsx` | Create | Dashboard heading + screenshot |
| `src/components/sections/use-case/UseCaseStats.tsx` | Create | Stats row with AnimatedCounter |
| `src/components/sections/use-case/UseCasePlatform.tsx` | Create | "HOW we do it" platform overview |
| `src/components/sections/use-case/index.ts` | Create | Barrel exports |

### Enterprise security page sections

| File | Action | Purpose |
|------|--------|---------|
| `src/components/sections/enterprise/SecurityContent.tsx` | Create | Body text + "Why it matters" |
| `src/components/sections/enterprise/SecurityPillars.tsx` | Create | 6 cards in 3×2 grid |
| `src/components/sections/enterprise/index.ts` | Create | Barrel exports |

### Content files

| File | Action | Purpose |
|------|--------|---------|
| `src/content/case-studies/talent-intelligence.ts` | Create | CS1 — all text from Figma node 20023:413 |
| `src/content/case-studies/performance-management.ts` | Create | CS2 — all text from Figma node 20023:647 |
| `src/content/case-studies/learning-content.ts` | Create | CS3 — all text from Figma node 20023:771 |
| `src/content/case-studies/index.ts` | Create | Barrel exports |
| `src/content/pages/workforce.ts` | Create | Workforce — all text from Figma node 20023:901 |
| `src/content/pages/performance.ts` | Create | Performance — all text from Figma node 20024:1055 |
| `src/content/pages/learning.ts` | Create | Learning — all text from Figma node 20026:1175 |
| `src/content/pages/recruitment.ts` | Create | Recruitment — all text from Figma node 20028:1305 |
| `src/content/pages/enterprise-security.ts` | Create | Security — all text from Figma node 20137:120 |
| `src/content/pages/index.ts` | Create | Barrel exports |

### Page files (replace existing placeholders)

| File | Uses |
|------|------|
| `src/app/case-studies/talent-intelligence/page.tsx` | PageLayout + CaseStudy sections |
| `src/app/case-studies/performance-management/page.tsx` | PageLayout + CaseStudy sections |
| `src/app/case-studies/learning-content/page.tsx` | PageLayout + CaseStudy sections |
| `src/app/use-cases/workforce/page.tsx` | PageLayout + UseCase sections |
| `src/app/use-cases/performance/page.tsx` | PageLayout + UseCase sections |
| `src/app/use-cases/learning/page.tsx` | PageLayout + UseCase sections |
| `src/app/use-cases/recruitment/page.tsx` | PageLayout + UseCase sections |
| `src/app/enterprise-security/page.tsx` | PageLayout + Enterprise sections |

Each page file exports `metadata` (static) for SEO:

```tsx
import type { Metadata } from 'next';
import { CONTENT } from '@/content/...';

export const metadata: Metadata = {
  title: `${CONTENT.metadata.title} — Oona.Works`,
  description: CONTENT.metadata.description,
};
```

### Modified files

| File | Change |
|------|--------|
| `src/components/sections/home/CaseStudiesSection.tsx` | Refactor to wrap SharedCaseStudiesSection |
| `src/components/sections/home/ContactSection.tsx` | Refactor to wrap SharedContactSection |
| `src/components/sections/index.ts` | Add shared, case-study, use-case, enterprise exports |
| `src/components/layouts/index.ts` | Add PageLayout, PageBanner exports |

## PageLayout

Server component. Renders banner, children, and shared bottom sections.

```tsx
interface PageLayoutProps {
  badge: string;
  title: string;
  subtitle?: string;
  heroImage: string;
  heroImageAlt: string;
  children: React.ReactNode;
}
```

Renders:
1. `<PageBanner {...bannerProps} />`
2. `{children}` — page-specific content
3. `<SharedCaseStudiesSection />`
4. `<SharedContactSection />`

## PageBanner

Server component (imports `AnimatedSection` as client leaf). The header banner pattern shared across all 8 inner pages.

```tsx
interface PageBannerProps {
  badge: string;
  title: string;
  subtitle?: string;
  heroImage: string;
  heroImageAlt: string;
}
```

**Layout from Figma (consistent across all pages):**
- Full section: `bg-background`
- Top padding: `pt-[180px] pb-16` for transparent navbar
- Content: `max-w-[var(--content-max)] mx-auto px-4`
- Two columns: `grid grid-cols-1 md:grid-cols-2 gap-8 items-start`

**Left column:**
- Decorative shape SVG (reuse `public/images/decorative-shape.svg`, 150×74) + horizontal dividers (1px `bg-border` lines, positioned to match Figma)
- Badge pill: `inline-flex items-center rounded-full border border-border px-4 py-1 text-overline text-muted-label` (uses `muted-label` color consistent with overlines throughout the site; verify against Figma during implementation)
- Title: `text-h3 text-foreground mt-4` (wraps naturally for long case study titles)
- Subtitle (optional): `text-body-lg text-foreground mt-4`

**Right column:**
- Container: `bg-background rounded-2xl p-8`
- Hero image: `next/image` with appropriate dimensions, `rounded-xl`

Wraps in `AnimatedSection` with `fadeUp`.

## SharedCaseStudiesSection

Extracted from home page's `CaseStudiesSection`. Identical 3-card layout: header row (title + arrow icon) + 3 article cards. Content reads from `HOME_CASE_STUDIES` in `content/home.ts`.

`'use client'` component (uses Framer Motion for `scaleOnHover` and stagger).

After creating this, refactor the home page's `CaseStudiesSection` to import and render `SharedCaseStudiesSection` directly — eliminating code duplication.

## SharedContactSection

Extracted from home page's `ContactSection`. Identical form layout: overline, heading, subtitle, decorative shape on left; form with validation on right. Content reads from `HOME_CONTACT` in `content/home.ts`.

`'use client'` component (uses `useState` for form state).

After creating this, refactor the home page's `ContactSection` to import and render `SharedContactSection` directly.

## HighlightQuote

Shared component used by case study pages and enterprise security page. Pink highlighted quote text.

```tsx
interface HighlightQuoteProps {
  text: string;
  className?: string;
}
```

- Text: `text-h4 text-primary italic`
- Right-aligned on desktop: `text-right md:ml-auto md:max-w-[60%]`
- Wraps in `AnimatedSection`

Server component (no `'use client'`; imports `AnimatedSection` as client leaf).

## Case Study Page Structure

All 3 case study pages follow this identical structure, differing only in content:

```tsx
<PageLayout badge="CASE STUDY" title={data.banner.title} heroImage={...}>
  <CaseStudyProblem text={data.problem} />
  <CaseStudySummary text={data.summary} />
  <CaseStudyBody howItWorks={data.howItWorks} outcomes={data.outcomes} />
  <HighlightQuote text={data.quote} />
</PageLayout>
```

### CaseStudyProblem

Server component. Full-width text block.

- Container: `max-w-[var(--content-max)] mx-auto px-4 py-12`
- Text: `text-body text-foreground`, rendered as paragraphs split by `\n`
- Wraps in `AnimatedSection`

### CaseStudySummary

Server component. Bold callout line.

- Container: `max-w-[var(--content-max)] mx-auto px-4 py-8`
- Text: `text-body text-foreground` with key phrases in `font-semibold`
- Wraps in `AnimatedSection`

### CaseStudyBody

Server component. Two columns side by side.

- Container: `max-w-[var(--content-max)] mx-auto px-4 py-12`
- Grid: `grid grid-cols-1 md:grid-cols-2 gap-6`
- Left card: `bg-surface rounded-xl p-[var(--section-padding)]`
  - Title: "How Oona Works" in `text-h3 text-foreground`
  - Steps: numbered list, each step has `number` (bold), `title` (bold), `description`
  - `text-body-sm text-foreground`
- Right card: same styling
  - Title: "Key Outcomes" in `text-h3 text-foreground`
  - Items: bullet list in `text-body-sm text-foreground`
- Each card wraps in `AnimatedSection`

### Content type for case studies

**Note:** The existing `CaseStudy` interface in `src/types/index.ts` was created as a generic placeholder during scaffolding. It does not match the actual Figma data structure. The new `CaseStudyContent` interface below replaces it. Remove the old `CaseStudy` interface from `types/index.ts` during implementation.

```typescript
interface CaseStudyContent {
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

### Case study content (from Figma)

**CS1 — Talent Intelligence (20023:413):**
- Badge: "CASE STUDY"
- Title: "Transforming talent intelligence at a global agro chemical company."
- Problem: Full text from Figma node 20023:560 (Section 1A heading)
- Summary: "oona.works implemented an AI-powered Talent Intelligence system to create a dynamic, data-driven approach to leadership pipelines."
- How It Works: 7 numbered steps from Figma node 20023:644
- Key Outcomes: bullet list from Figma node 20023:639
- Quote: "By adding an AI intelligence layer to existing HR systems, oona.works helped the organization convert fragmented HR data into actionable succession planning insights at scale."
- Hero image: from Figma node 20023:605

**CS2 — Performance Management (20023:647):**
- Badge: "CASE STUDY"
- Title: "Bringing Consistency to Performance Management at a Leading BFSI Company"
- Problem: Full text from Figma node 20023:730
- Summary: "oona.works implemented an AI-powered Performance Intelligence system to standardize KPI frameworks and enable structured manager-led performance conversations."
- How It Works: 6 numbered steps from Figma node 20023:733
- Key Outcomes: bullet list from Figma node 20023:728
- Quote: "By adding an AI intelligence layer to performance management, oona.works helped the organization convert fragmented HR KPIs and unstructured reviews into a consistent, data-driven performance system."
- Hero image: from Figma node 20023:761

**CS3 — Learning Content (20023:771):**
- Badge: "CASE STUDY"
- Title: '"Always-updated" learning content for a Leading Securities Depository'
- Problem: Full text from Figma node 20131:66
- Summary: "oona.works implemented an AI-powered Learning Intelligence system to transform existing organizational content into role-relevant learning experiences at scale."
- How It Works: 6 numbered steps from Figma node 20131:69
- Key Outcomes: bullet list from Figma node 20131:64
- Quote: "By adding an AI intelligence layer on top of existing knowledge repositories, oona.works helped the organization transform fragmented documentation into an 'always-updated' learning platform."
- Hero image: from Figma node 20131:91

## Use Case Page Structure

All 4 use case pages follow this identical structure:

```tsx
<PageLayout badge="USE CASES" title={data.banner.title} subtitle={data.banner.subtitle} heroImage={...}>
  <UseCaseDashboard title={data.dashboard.title} subtitle={data.dashboard.subtitle} image={data.dashboard.image} />
  <UseCaseStats stats={data.stats} />
  <UseCasePlatform />
</PageLayout>
```

### UseCaseDashboard

Server component. Dashboard heading + screenshot.

- Container: `max-w-[var(--content-max)] mx-auto px-4 py-12`
- `SectionHeader` centered: title (e.g., "LIVE Talent Intelligence Dashboard"), `titleSize="h4"`, subtitle "(Illustrative and fully customizable...)", `align="center"`
- Screenshot: `next/image`, full content width, `rounded-2xl`, `mt-8`
- Wraps in `AnimatedSection`

### UseCaseStats

`'use client'` component. Row of 3-4 stats using `AnimatedCounter`.

- Container: `max-w-[var(--content-max)] mx-auto px-4 py-12`
- Grid: `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8` (adapts to stat count)
- Each stat: `AnimatedCounter` with `value`, `suffix`, `label`
- For stats that are ranges (e.g., "60-70%"), display as static text in `text-h3` since ranges can't be animated as single numbers

### UseCasePlatform

Server component. Same content as the home page's platform section — "HOW we do it" heading + platform screenshot. Reuses `HOME_PLATFORM` content from `content/home.ts` for title and subtitle. The platform screenshot image is at `public/images/platform-overview.png` (already downloaded in Sub-project 4).

- Uses `SectionHeader` centered with `titleSize="h4"`
- Platform screenshot: `next/image` with `src="/images/platform-overview.png"`, `width={1380} height={512}`, `rounded-2xl`
- Wraps in `AnimatedSection`

### Content type for use cases

```typescript
interface UseCaseContent {
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
  stats: ({
    type: 'static';
    display: string;
    label: string;
  } | {
    type: 'animated';
    value: number;
    suffix?: string;
    label: string;
  })[];
}
```

### Use case content (from Figma)

**Workforce (20023:901):**
- Title: "Talent Intelligence"
- Subtitle: "With oona.works, consulting firms can show their clients:\n> LIVE Talent Readiness Dashboards\n> LIVE Visibility into Workforce Skills, Capabilities & Gaps"
- Dashboard title: "LIVE Talent Intelligence Dashboard"
- Stats: 60-70% / Reduced time spent on analysis | 40-60 hrs / saved per month | 20-35% / Increase in internal role fulfilment | Faster / Talent deployment
- Hero image: from Figma node 20024:1053

**Performance (20024:1055):**
- Title: "Performance Intelligence"
- Subtitle: "With oona.works, consulting firms can show their clients:\n> Instant KPI Validation & Goal Cascading Dashboards\n> On-the-go, AI-generated Performance Scripts for managers."
- Dashboard title: "LIVE Performance Intelligence Dashboard"
- Stats: 50-60% / Reduced in time spent on performance review prep | 15-20% / Improvement in goal alignment | 20-30% / Improvement in quality of feedback
- Hero image: from Figma node 20024:1172

**Learning (20026:1175):**
- Title: "Learning Intelligence"
- Subtitle: "With oona.works, consulting firms help clients with:\n> Auto generation of learning content\n> Learning completion & assessment scores\n> Instant learning gap fulfilment"
- Dashboard title: "LIVE Learning Intelligence Dashboard"
- Stats: 70-90% / Reduction in learning content creation time | 5-10X / Faster training content generation | 30-50% / Acceleration in Skill Acquisition
- Hero image: from Figma node 20026:1292

**Recruitment (20028:1305):**
- Title: "Recruitment Intelligence"
- Subtitle: "With oona.works, consulting firms help clients with:\n> LIVE Candidate Filtering & Role fitment dashboard\n> New hire integration success metrics"
- Dashboard title: "LIVE Recruitment Intelligence Dashboard"
- Stats: 70-75% / Reduction in time to screen candidates | 40-60hrs / of recruiter time saved monthly | 30-40% / Reduction in time to hire
- Hero image: from Figma node 20028:1420

## Enterprise Security Page Structure

```tsx
<PageLayout badge={data.banner.badge} title={data.banner.title} heroImage={...}>
  <SecurityContent text={data.body} whyTitle={data.whyTitle} whyText={data.whyText} />
  <HighlightQuote text={data.quote} />
  <SecurityPillars title={data.pillarsTitle} pillars={data.pillars} />
</PageLayout>
```

### SecurityContent

Server component. Body text with subheading.

- Container: `max-w-[var(--content-max)] mx-auto px-4 py-12`
- Main text: `text-body text-foreground`
- "Why it matters" subheading: `text-h4 text-foreground mt-8`
- Description paragraphs below
- Wraps in `AnimatedSection`

### SecurityPillars

Server component. 6 cards in 3×2 grid.

- Container: `max-w-[var(--content-max)] mx-auto px-4 py-12`
- Heading: `text-h4 text-foreground text-center` or use `SectionHeader`
- Grid: `grid grid-cols-1 md:grid-cols-3 gap-4 mt-8`
- Each card: `bg-surface rounded-md p-6 border border-border`
  - Title: `text-card-heading font-semibold text-foreground`
  - Description: `text-body-sm text-muted`
- Each card wraps in `AnimatedSection` with stagger

### Content type for enterprise security

```typescript
interface EnterpriseSecurityContent {
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

### Enterprise Security content (from Figma 20137:120)

- Badge: "AI ORCHESTRATION FOR HR TRANSFORMATION"
- Title: "The intelligent data backbone that turns fragmented HR systems into a governed, auditable, AI-powered workforce platform."
- Body: Full descriptive text from Figma node 20137:189 (Section 1A)
- Quote: '"Not just intelligent — but trustworthy, auditable, and built to grow as HR's strategic ambitions do."'
- Pillars title: "Core Value Pillars"
- 6 Pillars from Figma node 20137:231 (Section 4):
  1. Unified Intelligence — "Eliminates fragmentation across people systems..."
  2. Governance by Design — "Role-based access controls, client-scoped data isolation..."
  3. AI Orchestration — "LLM-powered assistants backed by OpenAI, Anthropic, Azure..."
  4. Enterprise Scale — "Multi-tenant architecture serves a single business unit..."
  5. Full Traceability — "Record-level provenance with authorship and timestamps..."
  6. Reliable at Volume — "Asynchronous background processing handles high-volume..."
- Hero image: from Figma node 20137:221

## Image assets needed

All downloaded from Figma MCP during implementation:

| File | Source | Used by |
|------|--------|---------|
| `public/images/cs-hero-1.png` | 20023:605 | Case Study 1 |
| `public/images/cs-hero-2.png` | 20023:761 | Case Study 2 |
| `public/images/cs-hero-3.png` | 20131:91 | Case Study 3 |
| `public/images/uc-hero-workforce.png` | 20024:1053 | Workforce |
| `public/images/uc-hero-performance.png` | 20024:1172 | Performance |
| `public/images/uc-hero-learning.png` | 20026:1292 | Learning |
| `public/images/uc-hero-recruitment.png` | 20028:1420 | Recruitment |
| `public/images/es-hero.png` | 20137:221 | Enterprise Security |
| `public/images/uc-dashboard-workforce.png` | 20023:1045 | Workforce dashboard |
| `public/images/uc-dashboard-performance.png` | 20024:1148 | Performance dashboard |
| `public/images/uc-dashboard-learning.png` | 20026:1267 | Learning dashboard |
| `public/images/uc-dashboard-recruitment.png` | 20028:1395 | Recruitment dashboard |

## Pixel-perfect implementation note

Every component must be implemented pixel-accurate to Figma. During implementation, each subagent MUST use the Figma MCP (`get_design_context` and `get_screenshot`) on the specific nodes to extract exact spacing, sizing, colors, font styles, and layout details. The spec provides the architectural structure and content; the Figma MCP provides the visual precision.

## What we reuse

- `AnimatedSection`, `SectionHeader`, `CTAButton`, `AnimatedCounter` — existing components
- `HOME_CASE_STUDIES`, `HOME_CONTACT`, `HOME_PLATFORM` — existing content for shared sections
- Animation variants from `lib/animations.ts`
- All design tokens from `globals.css`

## Out of Scope

- No page transitions between routes (deferred to Sub-project 9)
- No sticky scroll progress indicator for case studies
- No "next case study" navigation at bottom of case studies
- No feature tabs or connecting line animations for use cases
- No SVG stroke animation for security checklist
