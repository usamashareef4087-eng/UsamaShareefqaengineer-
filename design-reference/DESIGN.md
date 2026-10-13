---
name: Executive Precision
colors:
  surface: '#f9f9f7'
  surface-dim: '#dadad8'
  surface-bright: '#f9f9f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4f2'
  surface-container: '#eeeeec'
  surface-container-high: '#e8e8e6'
  surface-container-highest: '#e2e3e1'
  on-surface: '#1a1c1b'
  on-surface-variant: '#434655'
  inverse-surface: '#2f3130'
  inverse-on-surface: '#f1f1ef'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#505f78'
  on-secondary: '#ffffff'
  secondary-container: '#d0e0fe'
  on-secondary-container: '#54637c'
  tertiary: '#943700'
  on-tertiary: '#ffffff'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d4e3ff'
  secondary-fixed-dim: '#b7c7e4'
  on-secondary-fixed: '#0b1c32'
  on-secondary-fixed-variant: '#38475f'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#f9f9f7'
  on-background: '#1a1c1b'
  surface-variant: '#e2e3e1'
typography:
  display-hero:
    fontFamily: Inter
    fontSize: 3.5rem
    fontWeight: '600'
    lineHeight: 4rem
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Inter
    fontSize: 2.25rem
    fontWeight: '600'
    lineHeight: 2.75rem
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Inter
    fontSize: 2.5rem
    fontWeight: '600'
    lineHeight: 3rem
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: 2.25rem
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: '500'
    lineHeight: 2.25rem
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.6rem
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.4rem
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '500'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.05em
  metric-display:
    fontFamily: Inter
    fontSize: 3rem
    fontWeight: '700'
    lineHeight: 3.25rem
    letterSpacing: -0.03em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-desktop: 2rem
  margin: 1rem
  margin-tablet: 2.5rem
  margin-desktop: 4rem
  space-xs: 0.5rem
  space-sm: 1rem
  space-md: 1.5rem
  space-lg: 2rem
  space-xl: 3rem
  space-2xl: 4rem
---

## Brand & Style

This design system establishes an executive, highly authoritative visual presence tailored for strategic technology consulting, quality engineering leadership, and enterprise advisory. Built on the principles of Swiss Modernism, it conveys precision, intellectual clarity, and institutional reliability. 

The aesthetic is characterized by generous architectural whitespace, disciplined asymmetric typographic contrast, and restrained architectural lines. It deliberately avoids decorative gradients, trendy skeuomorphic flourishes, and excessive visual noise. The emotional takeaway is quiet competence, senior-level diligence, and operational maturity.

## Colors

The palette is engineered around high legibility, understated tonal contrast, and intentional focal points.

- **Background Base (`#FAFAF8`):** A warm, editorial white canvas that softens eye strain and imparts a bespoke paper feel.
- **Surface Alt / Container (`#F3F5F7`):** A cool, soft off-white used to group secondary modules, table backgrounds, and structural callouts.
- **Brand & Primary Text (`#14243A`):** Deep Navy providing commanding contrast for primary headlines, body text, and prominent branding anchors.
- **Secondary Text / Metadata (`#586579`):** Slate Gray providing subtle hierarchy for captions, supporting metrics, and metadata without fading into illegibility.
- **Primary Accent (`#2563EB`):** A decisive, professional cobalt blue reserved for key call-to-actions, active indicators, and interactive states.
- **Hover & Active Accent (`#1D4ED8`):** A deeper cobalt state providing immediate tactile confirmation.
- **Structural Borders (`#E4E8ED`):** Hairline structural rules defining layout geometry without visually segmenting the interface.

## Typography

The typographic hierarchy relies solely on `Inter`, drawing upon Swiss international typographic style. The type scales dynamically to prioritize reading flow and strict hierarchical discipline. 

Tight negative tracking on large weights (`letter-spacing: -0.025em` to `-0.03em`) creates a dense, editorial headline structure. Running body text maintains balanced line-heights (`1.6` ratio) for readability in reports, case analyses, and technical consulting deliverables. Small labels and metadata leverage small uppercase configurations with widened tracking (`0.05em`) to ground analytical metrics and status indicators.

## Layout & Spacing

A mathematical 8px base rhythm governs all layout, margins, and gaps.

- **Grid Construction:** A strict 12-column responsive fluid grid on desktop (max width constraint of `1280px` for optimal eye travel), reflowing to 6 columns on tablet, and 4 columns on mobile.
- **Rhythm & Cadence:** Generous section spacing (`space-2xl` or 64px–96px) separates narrative blocks, signaling quiet confidence through whitespace. Content density is controlled through uniform padding tokens (`space-sm` for inline controls, `space-md` for cards, `space-lg` for callout groupings).
- **Responsive Adaptations:**
  - **Mobile (< 768px):** Side margin collapses to `1rem` (16px), gutters to `1.5rem` (24px). Horizontal multi-column comparisons stack vertically.
  - **Tablet (768px - 1024px):** Margins expand to `2.5rem` (40px). Metrics and cards transition to 2-column matrices.
  - **Desktop (> 1024px):** Margins set to `4rem` (64px) with maximum container bounds centered, ensuring expansive whitespace bordering high-density technical insights.

## Elevation & Depth

Visual hierarchy is constructed through flat tonal layering and precise hairline borders rather than heavy elevation.

- **Surface Tiers:** Content surfaces sit on `#FAFAF8` (primary background), layered over `#F3F5F7` (secondary surface), cleanly delineated with 1px hairline borders in `#E4E8ED`.
- **Minimal Ambient Shadowing:** Floating elements (such as executive dropdown menus, fixed navigation headers, and modal dialogs) use a subtle, tinted ambient shadow: `0 4px 20px -2px rgba(20, 36, 58, 0.05)`. This creates separation through soft tonal gradation rather than aggressive contrast.
- **Interactive State Depth:** Hover actions do not raise cards off the page; instead, they transition border colors from `#E4E8ED` to `#586579` or `#2563EB`, reinforcing an architectonic, structured sensibility.

## Shapes

The design system employs a soft, highly tailored geometric language (`roundedness: 1`):

- **Micro and Standard Elements:** Form inputs, action buttons, chips, and code snippets use `0.25rem` (4px) corner radii. This preserves crisp, tailored borders while softening raw brutalist corners.
- **Structural Containers:** Cards, feature panels, and modals adopt `rounded-lg` at `0.5rem` (8px). 
- **Pill Exceptions:** Restricted strictly to numerical count badges and active/inactive status dots to provide clear categorical separation from functional interactive buttons.

## Components

### Buttons
- **Primary:** Solid `#2563EB` fill, `#FAFAF8` label text, `0.25rem` corner radius, `0.75rem 1.5rem` padding. Transitions on hover to `#1D4ED8`. Active state deepens to `#1E40AF`.
- **Secondary / Outline:** Background `#FAFAF8`, 1px solid `#E4E8ED` border, `#14243A` text. Hover shifts border color to `#14243A` and background to `#F3F5F7`.
- **Ghost / Minimal:** Transparent background, `#14243A` text, underlined with a 1px border on hover, paired with an inline trailing arrow for case study links.

### Input Fields & Controls
- **Text Inputs:** Height 44px, background `#FAFAF8`, border 1px solid `#E4E8ED`, radius `0.25rem`, text `#14243A`, placeholder `#586579`. Focus ring: 1px border `#2563EB` with an offset outline of `2px rgba(37, 99, 235, 0.15)`.
- **Checkboxes & Radios:** Hairline 1.5px border `#E4E8ED` on `#FAFAF8`. Checked state transitions fill to `#2563EB` with white interior indicator glyph.

### Cards & Consulting Panels
- Background `#FAFAF8`, framed in a 1px solid `#E4E8ED` border, with internal padding of `1.5rem` or `2rem`.
- Header section separated by an optional hairline border. Used extensively for QA audit matrices, methodology milestones, and consulting deliverables.
- Hover states subtly tint the entire border to `#2563EB` with no transform elevation.

### Status Chips & QA Badges
- Compact padding (`0.25rem 0.625rem`), radius `0.25rem`, typography `label-sm`.
- **Passed / Production Ready:** Background `#ECFDF5`, text `#065F46`, border 1px solid `#A7F3D0`.
- **Defect / Action Required:** Background `#FEF2F2`, text `#991B1B`, border 1px solid `#FECACA`.
- **Advisory / Architecture:** Background `#EFF6FF`, text `#1E40AF`, border 1px solid `#BFDBFE`.

### Key Metric & KPI Callout
- Displays executive testing throughput, automation coverage, and consulting outcomes.
- Structured with `metric-display` in `#14243A`, stacked over an all-caps `label-sm` description in `#586579`. Separated horizontally by 1px vertical borders `#E4E8ED`.