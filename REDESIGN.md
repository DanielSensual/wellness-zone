# Wellness Zone — Dark Premium Redesign

Read HANDOFF.md and BRAND_RESEARCH.md for full project context. This is a **MAJOR visual redesign** — the client says the current build looks too similar to the old WordPress site. New direction: **DARK & PREMIUM**.

Reference mockups are in the repo root if available, but follow the specs below as the source of truth.

---

## Design System Overhaul (globals.css)

Replace the entire light theme with a dark luxury theme. Update all CSS custom properties:

```css
:root {
  --background: #0A0A0A;
  --foreground: #E0E0E0;
  --brand: #9FCC3E;
  --brand-hover: #D8673D;
  --brand-glow: rgba(159, 204, 62, 0.15);
  --brand-light: #C3DD8A;
  --brand-pale: rgba(159, 204, 62, 0.1);
  --ink-dark: #FFFFFF;
  --surface: #141414;
  --surface-elevated: #1A1A1A;
  --border-subtle: rgba(159, 204, 62, 0.2);
}
```

Update `@theme inline` to expose all new tokens to Tailwind. Update `body` styles accordingly.

Add utility classes:
```css
::selection {
  background-color: #9FCC3E;
  color: #000;
}

/* Green glow utility for cards and CTAs */
.glow-green {
  box-shadow: 0 0 30px rgba(159, 204, 62, 0.1);
}

.glow-green-hover:hover {
  box-shadow: 0 0 40px rgba(159, 204, 62, 0.2);
}
```

---

## Component Redesign — Section by Section

### 1. Hero (Hero.tsx) — Full Cinematic Viewport

- `min-h-screen` with heavier dark overlay: `bg-black/70` instead of `bg-ink-dark/65`
- Add a subtle green accent glow line behind or under the headline (use a pseudo-element or a `div` with green gradient)
- Subhead: italic, slightly green-tinted (`text-brand-light` or `text-brand/80`)
- H1: pure white, bold, large
- CTA button: green with a subtle glow shadow `shadow-[0_0_20px_rgba(159,204,62,0.3)]`
- Keep transparent header overlay

### 2. Pillars / Services (Pillars.tsx) — Glassmorphism Cards

- Section background: `bg-surface` (#141414)
- Section heading: white text
- Cards: glassmorphism effect
  - `bg-white/5 backdrop-blur-sm border border-[rgba(159,204,62,0.15)]`
  - On hover: `border-brand/60` with `glow-green-hover` shadow
  - Smooth transition: `transition-all duration-300`
- Pillar titles: white with a green underline accent (`border-b-2 border-brand`)
- Pillar subtitles: `text-brand`
- Body text: `text-foreground` (#E0E0E0)
- Remove the existing background images from the cards OR darken them significantly with an overlay. If you keep images, add `bg-black/60` overlay.
- The pricing CTA box at the bottom: `bg-surface-elevated` with green border

### 3. Team (Team.tsx) — Circular Headshots with Green Ring

- Section background: `bg-background` (#0A0A0A)
- Section heading: white
- Grid: keep 3-col on desktop, 2-col tablet, 1-col mobile
- Trainer cards:
  - Dark card: `bg-surface-elevated rounded-2xl p-6`
  - Photo: circular with a **3px green ring** — `ring-2 ring-brand rounded-full`
  - Name: white, bold
  - Role: `text-brand` (green)
  - Bio expand/collapse: style the `<details>` summary in green
  - Body text: light gray
- CTA below: green button with glow

### 4. Reviews (Reviews.tsx) — Dark Testimonial Cards

- Section background: `bg-surface` (#141414)
- Cards: `bg-surface-elevated rounded-2xl p-6`
  - Add a subtle green left border: `border-l-4 border-brand`
  - Star ratings: green stars (already using brand color — verify)
  - Quote text: white/light gray
  - Author name: white bold
  - Time: `text-foreground/60`
  - Footer divider: `border-brand/20`
- "Read all reviews" link: green, stays the same

### 5. Location (Location.tsx) — Dark Map Section

- Section background: `bg-background` (#0A0A0A)
- All text: white headings, light gray body
- Phone/email links: `text-brand hover:underline`
- Google Maps embed: if possible, use `&maptype=roadmap` with dark styling. Or simply add a dark border around the iframe: `border border-brand/20 rounded-2xl`
- CTA: green button

### 6. Header (Header.tsx) — Dark Frosted Glass

- Background: `bg-black/30 backdrop-blur-md` (frosted dark glass effect)
- Remove any white backgrounds (including mobile menu — make it dark too)
- Desktop nav links: `text-white/80 hover:text-brand`
- Mobile menu panel: `bg-surface-elevated` with `text-white`
- Mobile menu links: white text, green hover
- CTA button: keep green pill
- Logo: white (invert filter already applied — keep it)

### 7. Footer (Footer.tsx) — Near Black

- Background: `bg-[#050505]` (very dark)
- All text: white or white/80
- Links: green on hover
- Social SVG icons: `text-white/70 hover:text-brand`
- Border top: `border-brand/10`
- Copyright: `text-white/40`

### 8. Get-Started / Intake (get-started/page.tsx + IntakeForm.tsx)

- Page background: `bg-background` (#0A0A0A)
- Heading: white
- Subtext: light gray
- Form card: `bg-surface-elevated rounded-2xl p-6 sm:p-8`
- Input fields:
  - `bg-white/5 border-brand/20 text-white placeholder:text-white/30`
  - Focus: `focus:border-brand focus:ring-brand/30`
- Radio buttons and checkboxes: green accent (already using `accent-brand`)
- Interest cards: dark borders, green on checked
  - `border-brand/20` default → `border-brand bg-brand/10` when checked
- Submit button: full-width green with glow
- Back link: `text-foreground/70 hover:text-brand`

### 9. Intake Success State (IntakeForm.tsx)

- Success card: `bg-brand/10 border border-brand/30`
- Checkmark circle: keep green
- Text: white heading, light gray body

### 10. Not-Found (not-found.tsx) — Dark 404

- Background: `bg-background`
- "404" text: `text-brand` (big green number)
- Heading: white
- Body: light gray
- Buttons: green primary, green outline variant

### 11. Error Page (error.tsx) — Dark Error

- Same dark treatment as 404
- Retry button: green

### 12. Privacy Policy (privacy-policy/page.tsx)

- Dark background, white text
- Links in green
- Keep content the same

### 13. Loading Skeleton (get-started/loading.tsx)

- Skeleton bars: `bg-white/10 animate-pulse` on dark background
- Match the dark form card layout

---

## UI Components to Update

### Button.tsx
- Primary: `bg-brand text-black hover:bg-brand-hover hover:text-black` (keep)
- Add glow to primary: `shadow-[0_0_20px_rgba(159,204,62,0.2)]`
- Outline: `border-2 border-brand text-brand hover:bg-brand/10`
- Ghost: `text-white hover:bg-white/5`

### SectionHeading.tsx
- Title: `text-white` (was text-ink-dark, which is now white anyway)
- Subtitle: `text-foreground` (light gray)

### CTAButton.tsx
- No changes needed (inherits from Button)

### Container.tsx
- No changes needed

### StarRating.tsx
- Ensure stars use `text-brand` for filled stars
- Empty stars: `text-white/20`

### ScrollToTop.tsx
- Dark background: `bg-surface-elevated border border-brand/20`
- Icon: `text-brand`
- Hover: `bg-surface-elevated glow-green`

### Reveal.tsx
- No changes needed (animation wrapper)

---

## Key Design Principles

1. **Contrast**: White text on dark backgrounds. Green only for accents, CTAs, and interactive elements.
2. **Glow effects**: Subtle green glows (box-shadow) on cards and buttons — not overdone, just enough to feel premium.
3. **Glass morphism**: Use `bg-white/5 backdrop-blur-sm` for elevated surfaces, NOT solid white cards.
4. **Transitions**: All hover states should transition smoothly (`transition-all duration-300`).
5. **Consistency**: Every section should feel cohesive in the dark theme. No section should feel "light" or out of place.
6. **Typography hierarchy**: Headings in pure white, body in #E0E0E0, secondary/meta text in white/60.
7. **Green restraint**: Green is the accent, not the dominant color. Use it for borders, underlines, links, CTAs, and subtle glows — but most surfaces should be dark grays.

---

## Verification

After all changes:
```bash
npm run lint && npm run build
```

Must produce **zero errors**. All 11 routes should generate successfully.

---

## Don't Change

- Content/copy (all text stays the same)
- Page structure and routing
- Form logic, Zod schema, server actions
- Google Reviews API integration
- SEO metadata and JSON-LD
- Sitemap and robots.txt
- Image file paths (team photos, hero, pillars)
- Vercel Analytics / Speed Insights
