# Oona.Works — Design Token System

## Context

Oona.Works is an enterprise HR tech product website. The design tokens are extracted from the Figma file at `https://www.figma.com/design/2t8t9FZNny5ms0HVTq7h2l/Oona.Works?node-id=20008-16`. This spec defines the complete design token system as CSS custom properties — the single source of truth for colors, typography, spacing, shadows, and border radii. After this, no hex values or hardcoded font sizes should appear anywhere in the codebase.

The project uses Next.js 16.2.0, React 19, Tailwind CSS 4 (CSS-first `@theme` approach). Tokens are defined as CSS custom properties in `globals.css` and consumed via Tailwind utility classes.

## Files Modified

| File | Change |
|------|--------|
| `src/styles/globals.css` | Replace shadcn default tokens with Oona.Works design tokens. Update `@theme` block, `:root` variables, and `@layer base` styles. Remove dark mode block (not in Figma design). Fill placeholder sections. |
| `src/app/layout.tsx` | Remove Geist fonts. Add Poppins (400, 500, 600) + Inter (variable font) via `next/font/google`. Update `<html>` className with new font CSS variables. |

No new files created. No other files modified.

## Color Tokens

All colors extracted directly from the Figma design context. Defined as `:root` CSS custom properties and mapped in `@theme`.

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#F72685` | CTA buttons (hero "Talk to us", submit), accent headings (Section 3 heading), "Write to us" label |
| `--color-secondary` | `#AFFC42` | Navbar CTA ("Contact Us"), feature cards |
| `--color-secondary-light` | `#C0FF5C` | Feature card alternates (Section 4 "Why Us" cards) |
| `--color-foreground` | `#070708` | All headings, primary body text, dark button backgrounds ("Know More") |
| `--color-background` | `#F7F7F8` | Page background, section card backgrounds (Section 2A/2B/2C) |
| `--color-surface` | `#FFFFFF` | Cards, section backgrounds (1A, 1B, 3, 4B, 4C, 5), navbar pill, footer, inputs |
| `--color-border` | `#E9EAEC` | Input borders, card borders, navbar border, dividers, icon button borders |
| `--color-border-light` | `#D5D6D8` | Navbar vertical divider between nav links |
| `--color-muted` | `#535455` | Secondary body text in feature cards (non-bold portions) |
| `--color-muted-label` | `#A1A2A5` | Uppercase overline labels ("OONA.WORKS" in Section 5) |
| `--color-placeholder` | `#999999` | Input placeholder text, subtle body text |
| `--color-nav-text` | `#393A3C` | Navigation link text ("Home", "Case Studies") |

### shadcn compatibility mapping

shadcn components expect certain semantic tokens. Map them to Oona.Works tokens:

```css
--primary: #F72685;
--primary-foreground: #FFFFFF;
--secondary: #AFFC42;
--secondary-foreground: #070708;
--background: #F7F7F8;
--foreground: #070708;
--card: #FFFFFF;
--card-foreground: #070708;
--muted: #F7F7F8;
--muted-foreground: #535455;
--border: #E9EAEC;
--input: #E9EAEC;
--ring: #F72685;
--accent: #C0FF5C;
--accent-foreground: #070708;
--destructive: #EF4444;
--destructive-foreground: #FFFFFF;
--popover: #FFFFFF;
--popover-foreground: #070708;
```

## Typography Tokens

### Font families

| Token | Value | Usage |
|-------|-------|-------|
| `--font-heading` | `var(--font-poppins), sans-serif` | All headings (H1-H6). Intentionally same as `--font-body` for now; separated for future flexibility. |
| `--font-body` | `var(--font-poppins), sans-serif` | Body text, descriptions |
| `--font-ui` | `var(--font-inter), sans-serif` | Nav links, form labels, input text, overlines |

`--font-poppins` and `--font-inter` are CSS variables set by `next/font/google` in `layout.tsx`.

### Font setup in layout.tsx

```tsx
import { Poppins, Inter } from 'next/font/google';

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
```

Note: Inter is a variable font — no `weight` array needed. Poppins is not variable, so specific weights must be listed.

Applied to `<html>` element: `className={`${poppins.variable} ${inter.variable}`}`.

Remove all Geist font imports and references. Remove `--font-geist-sans` and `--font-geist-mono` from `@theme`.

### Type scale

The type scale is defined as composite `@utility` classes in `globals.css`. Tailwind v4 `@theme` only supports `--font-size-*` with `--font-size-*--line-height` (no letter-spacing or font-weight). Since our type tokens need all four properties, we use `@utility` directives to create complete typography classes.

| Class | Font | Size | Line Height | Letter Spacing | Weight |
|-------|------|------|-------------|----------------|--------|
| `text-h1` | Poppins | 64px | 83.2px (1.3) | -1.92px | 500 |
| `text-h2` | Poppins | 56px | 67.2px (1.2) | -1.68px | 500 |
| `text-h3` | Poppins | 32px | 40px (1.25) | -1.2px | 500 |
| `text-h4` | Poppins | 32px | 40px (1.25) | -0.96px | 500 |
| `text-display` | Poppins | 44px | 56px (1.27) | 0 | 500 |
| `text-card-title` | Poppins | 24px | 28px (1.17) | 0 | 600 |
| `text-card-heading` | Poppins | 18px | 24px (1.33) | -0.54px | 500 |
| `text-body-lg` | Poppins | 20px | 32px (1.6) | -0.32px | 400 |
| `text-body` | Poppins | 18px | 24px (1.33) | 0 | 400 |
| `text-body-sm` | Poppins | 14px | 24px (1.71) | -0.28px | 400 |
| `text-overline` | Inter | 14px | 25.2px (1.8) | 1.12px | 500 |
| `text-nav` | Inter | 14px | 24px (1.71) | 0 | 500 |
| `text-button` | Poppins | 16px | 24px (1.5) | 0 | 500 |
| `text-button-lg` | Poppins | 24px | 32px (1.33) | 0 | 500 |

**`text-h3` vs `text-h4`:** Both are 32px/40px but with different letter-spacing. `text-h3` (-1.2px) is used for standalone section headings (e.g., "What we do!", "Case Studies"). `text-h4` (-0.96px) is used for centered section titles with subtitles below (e.g., "Why US?", "AI Intelligence across the HR Lifecycle"). Both are needed per the Figma design.

**Implementation approach:** Each type class is a `@utility` directive in `globals.css`:

```css
@utility text-h1 {
  font-family: var(--font-heading);
  font-size: 64px;
  line-height: 83.2px;
  letter-spacing: -1.92px;
  font-weight: 500;
}
```

This gives us classes like `text-h1`, `text-body-lg`, `text-overline` etc. that apply the complete type style in one class. These are composable with other Tailwind utilities — e.g., `text-h1 text-primary` works as expected.

## Border Radius Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `8px` | Inputs, small cards, list item cards |
| `--radius-md` | `12px` | Feature cards, list items, case study cards |
| `--radius-lg` | `16px` | Section cards (Section 1B, 5), hero CTA |
| `--radius-xl` | `20px` | Content sections (Section 1A) |
| `--radius-2xl` | `24px` | Large sections (3, 4B, 4C), dark buttons, footer, images |
| `--radius-pill` | `40px` | Navbar pill, nav link hover states |
| `--radius-full` | `80px` | Submit button, circular icon buttons |

## Spacing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--container-max` | `1160px` | Navbar container width |
| `--content-max` | `1140px` | Section content max-width |
| `--section-padding` | `56px` | Default internal section padding |
| `--section-padding-lg` | `72px` | Larger section padding (Section 3) |
| `--card-padding` | `24px` | Card internal padding |
| `--card-padding-lg` | `48px` | Large card padding (footer container) |
| `--nav-height` | `84px` | Navbar pill height |
| `--nav-offset` | `24px` | Navbar top offset from page edge |

All spacing tokens use `px` intentionally for pixel-perfect Figma fidelity. This is a fixed-width marketing site, not a fluid app.

## globals.css Structure

The file should be structured in this order:

1. **Imports** — `@import 'tailwindcss'`, `@import 'tw-animate-css'`, `@import 'shadcn/tailwind.css'`
2. **Custom variant** — `@custom-variant dark`
3. **`:root` block** — All CSS custom properties (shadcn semantic tokens mapped to Oona.Works hex values, plus Oona.Works-specific tokens for border-light, muted-label, placeholder, nav-text, secondary-light, surface, spacing, nav-height)
4. **`@theme inline` block** — Map `:root` variables to Tailwind tokens (colors, radii, fonts, font-sizes, spacing)
5. **`@layer base`** — Global element styles (border, outline, body bg/color, html font, selection color)
6. **Scrollbar styling** — Custom scrollbar to match design aesthetic
7. **Animation keyframes** — Placeholder for future CSS animations

### What gets removed

- `.dark` block (no dark mode in this design)
- All `oklch()` color values (replaced with hex)
- Geist font references (`--font-geist-sans`, `--font-geist-mono`)
- Sidebar tokens (not used in marketing site)
- Chart tokens (not used)

### What gets kept

- `@import` lines for tailwindcss, tw-animate-css, shadcn/tailwind.css
- `@custom-variant dark` (keep for potential future use, costs nothing)
- `@layer base` structure (updated with new tokens)
- `--destructive` token (shadcn components may need it)

## Out of Scope

- No dark mode tokens
- No component-level tokens (deferred to Sub-project 3)
- No shadcn component theme overrides
- No new files created
- No changes to animation variants, hooks, or components
