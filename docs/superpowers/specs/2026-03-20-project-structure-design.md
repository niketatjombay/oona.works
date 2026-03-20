# Oona.Works — Project Structure Setup

## Context

Oona.Works is an enterprise HR tech product website targeting Silicon Valley companies (Series B+, 500+ employees). The audience is VP of HR, CHROs, and enterprise IT decision-makers. Design bar: Linear.app, Vercel.com, Stripe.com.

The project is initialized with Next.js 16.2.0, React 19, TypeScript strict mode, Tailwind CSS 4, ESLint 9, and `@/*` path alias. Existing `postcss.config.mjs` with `@tailwindcss/postcss` must not be modified. This spec covers scaffolding the project structure, adding dependencies, and creating foundational utility code. No UI is built.

## Dependencies

### Production
| Package | Purpose |
|---------|---------|
| shadcn/ui | Component primitive base (installed via CLI) |
| framer-motion | All animations — scroll reveals, page transitions, hover states |
| react-countup | Stat counter animations |
| lucide-react | Icon library |
| clsx | Conditional class joining |
| tailwind-merge | Tailwind class conflict resolution |

**Not included:**
- `tailwindcss-animate` — incompatible with Tailwind CSS v4. shadcn/ui for TW v4 generates CSS-based animation utilities directly in `globals.css` via `@theme` and `@keyframes`.
- `next-themes` — deferred until the design system and theme are established (YAGNI for scaffolding phase).

### Dev
| Package | Purpose |
|---------|---------|
| prettier | Code formatting |
| prettier-plugin-tailwindcss | Automatic Tailwind class sorting |

## Folder Structure

```
(root)
  components.json                   → shadcn/ui configuration (created by CLI)
  postcss.config.mjs                → existing, do not modify
src/
  app/                              → Next.js App Router (exists)
  components/
    ui/                             → shadcn primitives (CLI-managed, do not manually edit)
    common/                         → shared components: Navbar, Footer, CTAButton, SectionHeader
      index.ts                      → barrel export (placeholder)
    sections/                       → page-specific section components
      index.ts                      → barrel export (placeholder)
    animations/                     → reusable Framer Motion wrappers
      AnimatedSection.tsx           → 'use client'; whileInView wrapper with fadeUp default
      index.ts                      → barrel export
    layouts/                        → page layout templates
      index.ts                      → barrel export (placeholder)
  lib/
    utils.ts                        → cn() helper (created by shadcn CLI)
    animations.ts                   → ALL Framer Motion variants centralized
    constants.ts                    → nav links, site metadata, routes (placeholder)
  hooks/
    useScrollAnimation.ts           → 'use client'; IntersectionObserver → [ref, isInView]
    useCountUp.ts                   → 'use client'; triggers count on viewport entry
  types/
    index.ts                        → all shared TypeScript interfaces
  content/
    home.ts                         → home page content (placeholder)
    case-studies/
      index.ts                      → barrel export (placeholder)
    pages/
      index.ts                      → barrel export (placeholder)
  styles/
    globals.css                     → moved from src/app/, tokens + scrollbar styling
```

## Files With Implementation

**Client directive:** All files using browser APIs or React hooks (`AnimatedSection.tsx`, `useScrollAnimation.ts`, `useCountUp.ts`) must begin with `'use client'`. Next.js 16 App Router defaults to Server Components.

### 1. `lib/animations.ts`

Centralized Framer Motion variants. Every animation in the app imports from here — no inline motion props scattered across components. This file is pure data (variant objects), not a component — no `'use client'` needed.

**Variants to define:**

| Name | Description |
|------|-------------|
| `fadeUp` | y: 40 → 0, opacity: 0 → 1, duration: 0.6s, ease: easeOut |
| `fadeIn` | opacity: 0 → 1, duration: 0.5s |
| `fadeDown` | y: -40 → 0, opacity: 0 → 1, duration: 0.6s |
| `fadeLeft` | x: -40 → 0, opacity: 0 → 1, duration: 0.6s |
| `fadeRight` | x: 40 → 0, opacity: 0 → 1, duration: 0.6s |
| `staggerContainer` | staggerChildren: 0.1, delayChildren: 0.1 |
| `staggerItem` | pairs with staggerContainer, uses fadeUp hidden/visible |
| `scaleOnHover` | whileHover: scale 1.02, shadow lift |
| `pageTransition` | initial/animate/exit for AnimatePresence route transitions |

All animations use `transform` and `opacity` only (GPU-accelerated). No `width`, `height`, `top`, `left` animations.

### 2. `hooks/useScrollAnimation.ts`

`'use client'` — uses IntersectionObserver (browser API).

Custom hook wrapping IntersectionObserver.

```typescript
function useScrollAnimation(options?: { threshold?: number; rootMargin?: string; once?: boolean }): [ref: RefCallback, isInView: boolean]
```

- Default threshold: 0.1
- Default rootMargin: "0px"
- Default once: true (triggers once, disconnects observer)
- Returns a ref callback and boolean

### 3. `hooks/useCountUp.ts`

`'use client'` — uses React hooks.

Hook that combines `react-countup` trigger with viewport detection. Uses `useScrollAnimation` internally. Count-up auto-triggers when element enters viewport.

```typescript
function useCountUp(options: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}): {
  ref: RefCallback;        // attach to the container element for viewport detection
  countUpRef: RefObject;   // attach to the element where the number renders
  inView: boolean;         // whether the element is in view
}
```

The hook auto-starts the count when `inView` becomes true. No manual `start()` is exposed — the viewport trigger is the only activation mechanism.

**Usage example:**
```tsx
function StatCard({ end, label, suffix }: Stat) {
  const { ref, countUpRef, inView } = useCountUp({ end, suffix });
  return (
    <div ref={ref}>
      <span ref={countUpRef} />
      <p>{label}</p>
    </div>
  );
}
```

### 4. `components/animations/AnimatedSection.tsx`

`'use client'` — uses Framer Motion.

Reusable wrapper component.

```typescript
interface AnimatedSectionProps {
  children: React.ReactNode;
  variant?: Variants;       // defaults to fadeUp
  className?: string;
  delay?: number;           // additional delay in seconds
  as?: 'div' | 'section';  // HTML element, defaults to 'section'
}
```

Uses `motion[as]` with `whileInView`, `viewport={{ once: true, margin: "-100px" }}`. Applies the variant from `lib/animations.ts`.

### 5. `types/index.ts`

Shared interfaces:

| Interface | Fields |
|-----------|--------|
| `NavItem` | label, href, children?: NavItem[] |
| `CaseStudy` | slug, title, company, industry, summary, metrics: Stat[], coverImage, content: string (markdown/MDX) |
| `PageContent` | title, description, hero: SectionContent, sections: SectionContent[] |
| `SectionContent` | id, title, subtitle?: string, content: string, features?: Feature[] |
| `Feature` | title, description, icon?: string |
| `Testimonial` | quote, author, role, company, avatar?: string |
| `Stat` | value: number, label, prefix?: string, suffix?: string |
| `FooterLink` | label, href, external?: boolean |
| `SiteConfig` | name, description, url, ogImage, links: { twitter?, linkedin?, github? } |

## Configuration Changes

### Order of operations
1. Run `npx shadcn@latest init` **first** (while `globals.css` is at `src/app/globals.css`)
2. Move `globals.css` to `src/styles/globals.css`
3. Update import in `src/app/layout.tsx`
4. Update `cssVariables` path in `components.json` if needed

### shadcn/ui initialization
Run `npx shadcn@latest init` with:
- Style: New York
- Base color: Neutral (placeholder — will change with design)
- CSS variables: yes
- Path aliases as configured in tsconfig

This creates `components.json` (at project root) and `lib/utils.ts` with the `cn()` helper.

### `.prettierrc`
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### `globals.css` relocation
Move `src/app/globals.css` → `src/styles/globals.css`. Update the import in `src/app/layout.tsx`. Add placeholder comment sections for design tokens and scrollbar styling.

## Placeholder Files

These files get a single comment and empty export — just enough to establish the folder and import path:

- `components/common/index.ts`
- `components/sections/index.ts`
- `components/layouts/index.ts`
- `content/home.ts`
- `content/case-studies/index.ts`
- `content/pages/index.ts`
- `lib/constants.ts`

## Out of Scope

- No UI components (Navbar, Footer, pages, sections)
- No brand colors or design tokens (waiting for design)
- No specific shadcn component installs
- No page.tsx or layout.tsx content changes (beyond globals.css import path)
- No deployment configuration
