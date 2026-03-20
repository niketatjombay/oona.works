# Oona.Works — Home Page

## Context

This is Sub-project 4: building the complete Home page with all 9 sections, plus setting up route placeholders for every page in the site. The project foundation (Next.js 16, Tailwind CSS 4, Framer Motion), design tokens, and global components (Navbar, Footer, CTAButton, SectionHeader, AnimatedCounter) are already built.

All content is extracted verbatim from the Figma file (node 20008:16). No placeholder text — every string comes from Figma.

## Routing

### Full site route map

| Page | Route | Figma Node |
|------|-------|------------|
| Home | `/` | 20008:16 |
| Case Study 1 | `/case-studies/talent-intelligence` | 20023:413 |
| Case Study 2 | `/case-studies/performance-management` | 20023:647 |
| Case Study 3 | `/case-studies/learning-content` | 20023:771 |
| Workforce | `/use-cases/workforce` | 20023:901 |
| Performance | `/use-cases/performance` | 20024:1055 |
| Learning | `/use-cases/learning` | 20026:1175 |
| Recruitment | `/use-cases/recruitment` | 20028:1305 |
| Enterprise Security | `/enterprise-security` | 20137:120 |

### App Router structure

```
src/app/
  page.tsx                                    → / (Home — full build)
  case-studies/
    talent-intelligence/page.tsx              → placeholder
    performance-management/page.tsx           → placeholder
    learning-content/page.tsx                 → placeholder
  use-cases/
    workforce/page.tsx                        → placeholder
    performance/page.tsx                      → placeholder
    learning/page.tsx                         → placeholder
    recruitment/page.tsx                      → placeholder
  enterprise-security/page.tsx                → placeholder
```

Each placeholder page renders a centered title + "Coming soon" text with `generateMetadata()` for SEO. The full pages are built in later sub-projects.

### Constants update

`NAV_LINKS` in `src/lib/constants.ts` updates to:

```typescript
export const NAV_LINKS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Case Studies', href: '/case-studies/talent-intelligence' },
];
```

**Note:** The current `NAV_LINKS` has `href: '/case-studies'` which has no index page. This update changes it to link directly to the first case study. No `/case-studies` index route is created in this sub-project.

Additional route constants:

```typescript
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
```

## Files

### New files

| File | Responsibility |
|------|----------------|
| `src/content/home.ts` | All home page content from Figma |
| `src/components/sections/home/HeroSection.tsx` | Hero with headline, CTA, image |
| `src/components/sections/home/ValuePropSection.tsx` | Two white cards side by side |
| `src/components/sections/home/PlatformSection.tsx` | "HOW we do it" + screenshot |
| `src/components/sections/home/LifecycleSection.tsx` | Product category cards |
| `src/components/sections/home/StatsSection.tsx` | Value prop stats with scroll fade-in |
| `src/components/sections/home/WhyUsSection.tsx` | Feature cards |
| `src/components/sections/home/CaseStudiesSection.tsx` | Article cards |
| `src/components/sections/home/AboutSection.tsx` | Team photo + text |
| `src/components/sections/home/ContactSection.tsx` | Contact form |
| `src/components/sections/home/index.ts` | Barrel exports |
| 8 placeholder page files | Route placeholders |

### Modified files

| File | Change |
|------|--------|
| `src/app/page.tsx` | Rewrite — import and stack all 9 sections |
| `src/lib/constants.ts` | Add ROUTES constant, update NAV_LINKS |
| `src/components/sections/index.ts` | Re-export home sections |

### Image assets (from Figma)

| File | Source Node | Size |
|------|------------|------|
| `public/images/hero-image.png` | 20018:64 | 464×484 |
| `public/images/logo-mark.png` | 20008:334 | 352×164 |
| `public/images/platform-overview.png` | 20008:368 | 1380×512 |
| `public/images/team-photo.png` | 20010:63 | 367×408 |
| `public/images/case-study-1.jpg` | 20020:75 | 330×220 |
| `public/images/case-study-2.jpg` | 20020:81 | 330×220 |
| `public/images/case-study-3.jpg` | 20020:87 | 330×220 |
| `public/images/decorative-shape.svg` | 20008:573 | 150×74 |
| `public/images/accent-shape.svg` | 20008:355 | 162×90 |

## Home Page Sections

### 1. HeroSection — `'use client'`

**Layout:**
- Left side: Logo mark (352×164) + headline "Your AI Partner in HR Transformation!" (`text-h1 text-foreground`) + CTAButton primary "Talk to us" (`href="mailto:oona@oona.works"`)
- Right side: Hero image (464×484, rounded corners)
- Full-width `bg-background`, content centered at `max-w-[var(--content-max)]`
- Top padding accounts for transparent navbar (~180px)

**Animation:**
- Logo mark: `fadeIn` with 0.2s delay
- Headline: `fadeUp` with stagger per line (use `staggerContainer` + `staggerItem`)
- CTA: `fadeUp` with 0.4s delay
- Hero image: `fadeRight` with 0.3s delay

**Mobile:** Stack vertically — headline + CTA above, image below (scaled down).

### 2. ValuePropSection — Server component (no `'use client'` directive; imports `AnimatedSection` as a client leaf)

**Layout:** Two white cards side by side, equal width.

**Left card** (`bg-surface`, `rounded-xl`, padding `var(--section-padding)`):
- Title: "Your clients are asking about AI... But, they don't want just advice and best practices — They also want real AI implementation!" (`text-h3 text-foreground`)
- Body: "oona.works can become your AI foundation..." (`text-body-lg text-foreground`)

**Right card** (same styling):
- Title: "What we do!" (`text-h3 text-foreground`)
- Body: "oona.works empowers HR consulting firms..." with bullet points and muted governance text (`text-body text-foreground`, governance text in `text-placeholder`)

Each card wraps in `AnimatedSection`. Mobile: stack vertically.

### 3. PlatformSection — Server component

**Layout:**
- `SectionHeader` centered: title="HOW we do it" (`titleSize="h4"`), subtitle="oona.works is an AI Orchestration platform that unifies..."
- Large platform screenshot below (1380×512, `rounded-2xl`), full content width
- Decorative accent SVG top-right (absolute positioned)

Wraps in `AnimatedSection`.

### 4. LifecycleSection — `'use client'`

**Layout:**
- `SectionHeader` centered: title="AI Intelligence across the HR Lifecycle" (`titleSize="h4"`), subtitle="With oona.works, consulting firms can deploy AI across the full HR ecosystem."
- 3 columns below, staggered vertically:
  - Column 1 (2 cards): Talent Intelligence → `/use-cases/workforce`, Performance Intelligence → `/use-cases/performance`
  - Column 2 (2 cards): Learning Intelligence → `/use-cases/learning`, Recruitment Intelligence → `/use-cases/recruitment`
  - Column 3 (1 card): HR Operations Intelligence (no link — informational)

**Each card:** `bg-surface` with `rounded-sm`, 24px padding. Contains:
- Heading (`text-card-heading text-foreground`)
- Bullet list (`text-body-sm text-foreground`)
- Arrow icon button top-right (border circle, 44px, lucide-react `ArrowUpRight`)

Cards link to their use-case pages via `next/link`. `scaleOnHover` on each card. Staggered entrance.

**Column backgrounds:** Each column has a `bg-background` rounded container behind its cards, with half the height filled (matching Figma's split-background effect).

### 5. StatsSection — `'use client'`

**Layout:** White card (`bg-surface`, `rounded-2xl`), two halves:

**Left side:**
- Heading in `text-h3 text-primary`: "How your $150K HR consulting project can become a $450K AI transformation engagement with oona.works"
- Body: "Simply because we empower you to:" (`text-body-lg`)
- CTAButton dark "Know More" (`href={ROUTES.contact}` — scrolls to contact or opens mailto)

**Right side:** 2×2 grid:
- Row 1: "WIN" + "AI-led HR transformation mandates" | "COMPETE" + "with tech-first consulting firms"
- Divider line (`bg-border`)
- Row 2: "2-3X" + "INCREASE IN PROJECT VALUE" | "40–60% FASTER" + "delivery"

Stats use `text-display` for the big number and `text-overline` for the label. All four stats are static text — "WIN", "COMPETE", "2-3X", "40–60% FASTER" are display labels, not animated counters. (The range "40-60%" cannot be meaningfully animated with a single-number counter.) `AnimatedCounter` is not used here; these are wrapped in `AnimatedSection` for scroll-triggered fade-in instead.

### 6. WhyUsSection — Server component

**Layout:**
- `SectionHeader` centered: title="Why US?", subtitle="Because nobody knows HR + AI like oona.works" (`titleSize="h4"`)
- 3 cards in a row, alternating `bg-secondary-light` and `bg-secondary`:
  - Card 1: "**Team** with deep HR expertise, and real product building experience"
  - Card 2: "AI agents trained on millions of **real-world HR data** points, methodologies & frameworks."
  - Card 3: "**Modular integrations** with HRMS, ATS, LMS, payroll & performance systems."
- Below/beside cards: "Enterprise Grade Security" pill (CTAButton primary, links to `/enterprise-security`)

Each card: `rounded-md`, `border border-surface`, 24px padding. Bold words use `font-semibold text-foreground`, rest uses `text-foreground` or `text-muted`.

Cards wrap in `AnimatedSection` with stagger.

### 7. CaseStudiesSection — Server component

**Layout:**
- Left: `SectionHeader` with title="Case Studies" (`titleSize="h3"`)
- Right: Arrow link icon (circular border, 64px, lucide-react `ArrowUpRight`)
- Below: 3 article cards in a row

**Each card:** `bg-surface`, `border border-border`, `rounded-md`, overflow hidden.
- Image (330×220) at top using `next/image`
- Title below in `text-card-heading text-foreground`, padding 32px horizontal

Cards link to case study pages:
1. "Transforming talent intelligence..." → `/case-studies/talent-intelligence`
2. "Bringing Consistency to Performance..." → `/case-studies/performance-management`
3. "'Always-updated' learning content..." → `/case-studies/learning-content`

`scaleOnHover` on each card. Stagger entrance.

### 8. AboutSection — Server component

**Layout:** White card (`bg-surface`, `rounded-2xl`), two columns:
- Left: Team photo (367×408, rounded) using `next/image`
- Right: "About Us" heading (`text-h3`) + body text (`text-body-lg`)

Wraps in `AnimatedSection`. Mobile: stack vertically — image above, text below.

### 9. ContactSection — `'use client'`

**Layout:** White card (`bg-surface`, `rounded-lg`), two halves:

**Left side:**
- Overline "OONA.WORKS" (`text-overline text-muted-label`)
- Heading "Get in touch!" (`text-h2 text-foreground`)
- Subtitle: "We would love to show you the power of AI for HR transformation!" (`text-body-lg`)
- Decorative shape SVG (150×74)

**Right side:** Contact form with fields:
- First Name + Last Name (side by side, each half width)
- Email (full width)
- "Tell us more." (textarea, full width)
- Submit button (CTAButton `variant="submit"` `size="lg"`, full width)

**Form implementation:**
- `useState` for form data (`firstName`, `lastName`, `email`, `message`)
- `useState` for `isSubmitted` boolean
- Client-side validation: all fields required, email format check (regex)
- `onSubmit`: `e.preventDefault()`, validate, log form data to console, set `isSubmitted = true`
- Success state: replace form with "Thank you! We'll be in touch." message
- Input styling: `bg-surface border border-border rounded-sm` with `focus:ring-2 focus:ring-primary`, placeholder text uses `text-placeholder`
- Labels use `text-nav text-foreground` (Inter Medium 14px)

**Form field labels** (from Figma):
- "First Name" (label) / "First Name" (placeholder)
- "Last Name" (label) / "Last Name" (placeholder)
- "Email" (label) / "Email" (placeholder)
- "Tell us more." (label) / no placeholder

### Content file (`src/content/home.ts`)

All text extracted verbatim from Figma. Typed interfaces defined at the top of the file (co-located with the data, not in `types/index.ts`, since these shapes are home-page-specific):

```typescript
interface HeroContent { headline: string; ctaLabel: string; ctaHref: string; }
interface CardContent { title: string; body: string; governance?: string; }
interface LifecycleCard { title: string; items: string[]; href?: string; }
interface LifecycleColumn { cards: LifecycleCard[]; }
interface StatItem { label: string; sublabel: string; }
interface WhyUsCard { bold: string; prefix?: string; rest: string; }
interface ArticleCard { title: string; image: string; href: string; }
interface FormField { label: string; placeholder: string; }
```

Structured as typed exports:

```typescript
export const HOME_HERO = {
  headline: 'Your AI Partner in\nHR Transformation!',
  ctaLabel: 'Talk to us',
  ctaHref: 'mailto:oona@oona.works',
};

export const HOME_VALUE_PROP = {
  leftCard: {
    title: "Your clients are asking about AI... But, they don't want just advice and best practices — They also want real AI implementation!",
    body: "oona.works can become your AI foundation for HR transformation projects!\n\nYou bring the consulting expertise.\noona.works provides the AI foundation to deliver intelligence at scale.",
  },
  rightCard: {
    title: 'What we do!',
    body: '...', // Full text from Figma node 20008:132
    governance: 'All while ensuring\nEnterprise-grade data governance  I  Full audit trails  I  Secure access',
  },
};

export const HOME_PLATFORM = {
  title: 'HOW we do it',
  subtitle: "oona.works is an AI Orchestration platform that unifies an organization's HR systems (HRMS, ATS, LMS, PMS) into a single data layer, then adds AI-driven insights on top.",
};

export const HOME_LIFECYCLE = {
  title: 'AI Intelligence across the HR Lifecycle',
  subtitle: 'With oona.works, consulting firms can deploy AI across the full HR ecosystem.',
  columns: [
    {
      cards: [
        {
          title: 'Talent Intelligence',
          items: ['Competency Architecture', 'Skills Intelligence', 'Internal Talent Marketplace with Learning Paths', 'Live Succession Planning'],
          href: '/use-cases/workforce',
        },
        {
          title: 'Performance Intelligence',
          items: ['Goal Alignment', 'KPI Validation & Calibration', 'AI Guided Performance Conversations'],
          href: '/use-cases/performance',
        },
      ],
    },
    {
      cards: [
        {
          title: 'Learning Intelligence',
          items: ['AI Generated Learning Content (Policy, Functional, Regulatory)', 'Skill Simulation Engine', 'Always-on AI Coaching'],
          href: '/use-cases/learning',
        },
        {
          title: 'Recruitment Intelligence',
          items: ['Candidate Filtering & Matching', 'Automated Interview & Evaluation', 'New Hire Success'],
          href: '/use-cases/recruitment',
        },
      ],
    },
    {
      cards: [
        {
          title: 'HR Operations Intelligence',
          items: ['HR MIS Dashboard', 'Policy & Benefits Chatbot', 'Attrition Intelligence', 'and more…'],
          href: undefined, // No dedicated page
        },
      ],
    },
  ],
};

export const HOME_STATS = {
  heading: 'How your $150K\nHR consulting project can become a $450K AI transformation engagement with oona.works',
  subtitle: 'Simply because we empower you to:',
  ctaLabel: 'Know More',
  ctaHref: 'mailto:oona@oona.works',
  stats: [
    { label: 'WIN', sublabel: 'AI-led HR transformation mandates' },
    { label: 'COMPETE', sublabel: 'with tech-first consulting firms' },
    { label: '2-3X', sublabel: 'INCREASE IN PROJECT VALUE' },
    { label: '40–60% FASTER', sublabel: 'delivery' },
  ],
};

export const HOME_WHY_US = {
  title: 'Why US?',
  subtitle: 'Because nobody knows HR + AI like oona.works',
  cards: [
    { bold: 'Team', rest: 'with deep HR expertise, and real product building experience' },
    { bold: 'real-world HR data', prefix: 'AI agents trained on millions of ', rest: ' points, methodologies & frameworks.' },
    { bold: 'Modular integrations', rest: ' with HRMS, ATS, LMS, payroll & performance systems.' },
  ],
  securityCta: { label: 'Enterprise Grade Security', href: '/enterprise-security' },
};

export const HOME_CASE_STUDIES = {
  title: 'Case Studies',
  articles: [
    { title: 'Transforming talent intelligence at a global agro chemical company.', image: '/images/case-study-1.jpg', href: '/case-studies/talent-intelligence' },
    { title: 'Bringing Consistency to Performance Management at a Leading BFSI Company', image: '/images/case-study-2.jpg', href: '/case-studies/performance-management' },
    { title: '"Always-updated" learning content for a Leading Securities Depository', image: '/images/case-study-3.jpg', href: '/case-studies/learning-content' },
  ],
};

export const HOME_ABOUT = {
  title: 'About Us',
  body: 'The founding team is a group of HR tech founders who built & ran a sustainable company for 15 years.\n\nThey are now combining their HR domain expertise with innovation in AI to redefine HR!',
};

export const HOME_CONTACT = {
  overline: 'OONA.WORKS',
  title: 'Get in touch!',
  subtitle: 'We would love to show you the power of AI for HR transformation!',
  submitLabel: 'Submit',
  successMessage: 'Thank you! We\'ll be in touch soon.',
  fields: {
    firstName: { label: 'First Name', placeholder: 'First Name' },
    lastName: { label: 'Last Name', placeholder: 'Last Name' },
    email: { label: 'Email', placeholder: 'Email' },
    message: { label: 'Tell us more.', placeholder: '' },
  },
};
```

## Page component (`src/app/page.tsx`)

Thin orchestrator that imports sections and stacks them:

```tsx
import { HeroSection } from '@/components/sections/home/HeroSection';
import { ValuePropSection } from '@/components/sections/home/ValuePropSection';
// ... etc

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

Each section handles its own max-width, padding, and spacing. The page just stacks them.

## Shared patterns

- Every section uses `max-w-[var(--content-max)]` (1140px) centered with `mx-auto px-4`
- Section vertical spacing: `py-16 md:py-24` (responsive)
- All images use `next/image` with explicit width/height and `alt` text
- All internal links use `next/link`
- All animations use variants from `lib/animations.ts`
- All content read from `content/home.ts` — zero hardcoded strings in components

## Accessibility

- All images have descriptive `alt` text
- Form inputs have associated `<label>` elements
- Form validation errors shown inline with `aria-describedby`
- Color contrast meets WCAG AA (verified against token values)
- `prefers-reduced-motion`: Framer Motion respects this by default (`useReducedMotion`)

## Out of Scope

- No page transitions between routes (deferred to Sub-project 5: Shared Layouts)
- No case study or use-case page content (placeholder pages only)
- No case studies listing page (`/case-studies` without a slug)
- No CMS or form backend
- No social proof logo section (not clearly defined in Figma)
