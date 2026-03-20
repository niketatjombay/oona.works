# Oona.Works — Global Components + Shared Primitives

## Context

Oona.Works is an enterprise HR tech product website. The project foundation (Next.js 16, Tailwind CSS 4, Framer Motion) and design tokens (colors, typography, spacing, radii) are already in place. This spec covers the global components that appear on every page — Navbar, Footer, CTA button, section header, and animated counter — plus the constants file that externalizes all content strings.

The animation system already exists: `lib/animations.ts` (variants), `hooks/useScrollAnimation.ts`, `hooks/useCountUp.ts`, `components/animations/AnimatedSection.tsx`. This spec builds on that foundation.

Figma source: `https://www.figma.com/design/2t8t9FZNny5ms0HVTq7h2l/Oona.Works?node-id=20008-16`

## Files

| File | Action | Responsibility |
|------|--------|----------------|
| `src/components/common/Navbar.tsx` | Create | Site navigation with scroll-reactive behavior |
| `src/components/common/MobileMenu.tsx` | Create | Full-screen overlay mobile menu |
| `src/components/common/Footer.tsx` | Create | Site footer |
| `src/components/common/CTAButton.tsx` | Create | Marketing CTA button with variants |
| `src/components/common/SectionHeader.tsx` | Create | Reusable section title + subtitle pattern |
| `src/components/common/AnimatedCounter.tsx` | Create | Viewport-triggered stat counter |
| `src/components/common/index.ts` | Modify | Barrel exports for all common components |
| `src/lib/constants.ts` | Modify | All content strings, nav links, footer data, site config |
| `src/app/layout.tsx` | Modify | Add Navbar and Footer to root layout |
| `public/images/logo.png` | Create | Navbar logo asset (80x48) |
| `public/images/logo-footer.png` | Create | Footer logo asset (122x48) |

No changes to existing animation system files. The shadcn `button.tsx` is untouched.

## Navbar

### Behavior

**Default state (over hero):** Fully transparent background. No border, no shadow. The pill-shaped container is invisible — only the logo, links, and CTA button are visible against the hero content. Nav text uses `text-nav-text` color.

**Scrolled state (after ~80px scroll):** Smooth transition (300ms) to frosted glass — `backdrop-blur-lg` + `bg-surface/80` + `border border-border` + subtle shadow (`shadow-sm`). The pill shape becomes visible.

**Transition:** CSS transition on background-color, border-color, box-shadow, and backdrop-filter. Triggered by a scroll listener (or `useScrollAnimation` with a sentinel element).

### Layout (from Figma node 20008:316)

```
┌──────────────────────────────────────────────────────────────┐
│  [Logo 80x48]  Home │ Case Studies      ☰    [Contact Us]   │
│  left-[16px]   left-[88px]              center    right-[17px]│
└──────────────────────────────────────────────────────────────┘
```

- **Container:** `max-w-[var(--container-max)]` (1160px), centered, `h-[var(--nav-height)]` (84px), `rounded-pill` (40px), positioned `top-[var(--nav-offset)]` (24px) from page top.
- **Logo:** 80x48px image from `public/images/logo.png` using `next/image` (`<Image width={80} height={48}>`). Wrapped in `next/link` (`<Link href="/">`).
- **Nav links:** "Home" (links to `/` via `next/link`), vertical divider (`bg-border-light`, 1px × 16px), "Case Studies" (links to `/case-studies` via `next/link`). No dropdown chevron — the link navigates directly to the case studies page.
- **Menu button:** Hamburger icon (lucide-react `Menu`), 40x40px hit area, `rounded-pill`. Visible on desktop too per Figma. Opens `MobileMenu`. Must have `aria-label="Open menu"` and `aria-expanded={isMobileMenuOpen}`.
- **CTA button:** `CTAButton` with `variant="secondary"` — lime green, "Contact Us ~ Email", `href="mailto:oona@oona.works"`.

### Desktop vs Mobile

- **Desktop (≥768px):** Full layout as described. Nav links visible.
- **Mobile (<768px):** Hide nav links and divider. Show logo, hamburger, and CTA. CTA may also hide on very small screens (<480px) — hamburger provides access to everything.

### Implementation

`'use client'` component. Uses `useState` for `isScrolled` (triggered by `useEffect` with scroll listener, threshold 80px, `{ passive: true }`) and `isMobileMenuOpen`. Fixed position with `z-50`.

```tsx
interface NavbarProps {
  className?: string;
}
```

## MobileMenu

### Behavior

Full-screen overlay. Opens with Framer Motion `AnimatePresence`. Dark background (`bg-foreground/95`). Centered navigation links in large text (`text-h3`). Each link animates in with stagger.

### Layout

```
┌──────────────────────────────────────┐
│                              [✕]     │
│                                      │
│              Home                    │
│              Case Studies            │
│              Contact Us              │
│                                      │
│                                      │
└──────────────────────────────────────┘
```

- **Close button:** Top-right, lucide-react `X` icon, 48x48 hit area.
- **Links:** Centered vertically, `text-h3` size, white text, staggered fadeUp entrance. Reads from `NAV_LINKS` plus an additional "Contact Us" entry with `href="mailto:oona@oona.works"` (from `CONTACT_EMAIL` and `CONTACT_CTA_LABEL` constants). Uses `next/link` for internal hrefs, `<a>` for mailto.
- **Background:** `bg-foreground/95` with `backdrop-blur-sm`.
- **Animation:** Container fades in (opacity 0→1, 200ms). Links stagger in with `staggerContainer` + `staggerItem` from `lib/animations.ts`.

### Implementation

`'use client'` component. Uses `AnimatePresence` + `motion.div`.

```tsx
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}
```

Renders a fixed overlay (`position: fixed`, `inset-0`, `z-50`). Locks body scroll when open via `useEffect` that sets `document.body.style.overflow = 'hidden'` and restores on cleanup. Must close on Escape key press (`useEffect` with `keydown` listener).

**Accessibility:**
- Close button: `aria-label="Close menu"`
- Overlay: `role="dialog"`, `aria-modal="true"`
- Focus trap: first focusable element receives focus on open

## Footer

### Layout (from Figma node 20009:24)

White rounded card inside the content area. Two elements:

```
┌──────────────────────────────────────────────────────┐
│  Write to us                              [Logo]     │
│  oona@oona.works                          122x48     │
└──────────────────────────────────────────────────────┘
```

- **Container:** `max-w-[var(--content-max)]` (1140px), `bg-surface`, `rounded-2xl` (24px), `p-[var(--card-padding-lg)]` (48px).
- **Left side:** "Write to us" label in `text-body-lg text-primary`. Below: "oona@oona.works" as a `mailto:` link in `text-body text-foreground`.
- **Right side:** Logo image (122x48px) from `public/images/logo-footer.png`, aligned right and vertically centered. Use `next/image` (`<Image>`) with explicit `width={122} height={48}` props.
- **Below the card:** Copyright text, small, muted. Year is dynamic via `new Date().getFullYear()`.

### Implementation

Server component (no client interactivity needed). Reads from constants.

```tsx
// No props — reads from FOOTER_DATA and SITE_CONFIG in constants
```

## CTAButton

### Purpose

Marketing CTA button for the Oona.Works site. Separate from the shadcn `Button` which is for app/form UI. The CTAButton is pill-shaped, larger, with hover animations.

### Variants (from Figma)

| Variant | Background | Text Color | Radius | Usage |
|---------|-----------|------------|--------|-------|
| `primary` | `bg-primary` (#F72685) | white | `rounded-lg` (16px) | Hero "Talk to us" |
| `secondary` | `bg-secondary` (#AFFC42) | foreground | `rounded-2xl` (24px) | Navbar "Contact Us" |
| `dark` | `bg-foreground` (#070708) | white | `rounded-2xl` (24px) | "Know More" buttons |
| `submit` | `bg-primary` (#F72685) | white | `rounded-full` (80px) | Form "Submit" |

### Sizes

| Size | Height | Padding | Font |
|------|--------|---------|------|
| `sm` | 40px | px-4 | `text-nav` (14px) |
| `default` | 50px | px-6 | `text-button` (16px) |
| `lg` | 60px | px-8 | `text-button` (16px) |

### Hover animation

Uses `scaleOnHover` from `lib/animations.ts` — scale 1.02, shadow lift, 200ms transition. Implemented via Framer Motion `whileHover`.

### Implementation

`'use client'` component. Renders as:
- `motion.button` when no `href` (or `type="submit"`)
- Framer Motion-wrapped `next/link` (`<Link>`) when `href` starts with `/` (internal navigation)
- `motion.a` when `href` is external or `mailto:`

The `type` prop is only relevant when rendering as a button (no `href`). When `href` is provided, `type` is ignored.

```tsx
interface CTAButtonProps {
  variant?: 'primary' | 'secondary' | 'dark' | 'submit';
  size?: 'sm' | 'default' | 'lg';
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}
```

Uses `class-variance-authority` (already installed) for variant management, matching the pattern in the shadcn button.

## SectionHeader

### Purpose

Reusable pattern that appears across multiple sections in the Figma design. Combines an optional overline label, a heading, and an optional subtitle.

### Examples from Figma

- "OONA.WORKS" (overline) + "Get in touch!" (h2) + "We would love to..." (subtitle) — left aligned
- "AI Intelligence across the HR Lifecycle" (h4) + "With oona.works, consulting firms..." (subtitle) — center aligned
- "HOW we do it" (h4) + "oona.works is an AI Orchestration platform..." (subtitle) — center aligned
- "Case Studies" (h3) — left aligned, no subtitle

### Implementation

Server component — no hooks, no browser APIs, no `'use client'`. It imports and renders `AnimatedSection` (a client component) as a wrapper. This is valid in React 19 / Next.js App Router: a server component can render a client component as a leaf, as long as it only passes serializable props (children, className, strings).

```tsx
interface SectionHeaderProps {
  overline?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  titleSize?: 'h2' | 'h3' | 'h4';
  className?: string;
}
```

- **Overline:** `text-overline text-muted-label` (14px, uppercase, tracked)
- **Title:** Uses the specified `titleSize` utility class (`text-h2`, `text-h3`, or `text-h4`). Color: `text-foreground` by default, but accepts className override for accent colors.
- **Subtitle:** `text-body-lg text-foreground` (20px)
- **Spacing:** 8px gap between overline and title, 16px gap between title and subtitle.

## AnimatedCounter

### Purpose

Displays a large animated number with a label. Triggers count-up animation when entering the viewport.

### Layout

```
  2-3X
  INCREASE IN PROJECT VALUE
```

- **Number:** `text-display text-foreground` (44px, Poppins Medium)
- **Label:** `text-overline text-foreground` (14px, uppercase, tracked)

### Implementation

`'use client'` component. Uses the existing `useCountUp` hook from `src/hooks/useCountUp.ts`.

```tsx
interface AnimatedCounterProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}
```

The `ref` from `useCountUp` goes on the container div (for viewport detection), and `countUpRef` goes on the number element.

## Constants (`lib/constants.ts`)

All content strings externalized. No hardcoded strings in components.

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

## Layout Integration

`src/app/layout.tsx` is modified to include Navbar and Footer:

```tsx
<body className="flex min-h-full flex-col">
  <Navbar />
  <main className="flex-1">{children}</main>
  <Footer />
</body>
```

The Navbar is fixed-position so it overlays content. The `<main>` does NOT need top padding — the hero section handles its own spacing to account for the transparent navbar.

## Asset Requirements

Two logo images need to be downloaded from the Figma assets and placed in `public/images/`:

- `logo.png` — Navbar logo, ~80x48px
- `logo-footer.png` — Footer logo, ~122x48px

These are extracted from the Figma MCP asset URLs during implementation.

## Out of Scope

- No page content or sections (deferred to home page build)
- No route setup beyond what exists
- No dark mode
- No dropdown menu for "Case Studies" (direct link for now)
- No form components
- No shadcn Button modifications
