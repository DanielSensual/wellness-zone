# Wellness Zone — V2 Creative Overhaul

## Overview
The dark theme is locked. Now we need to break out of the generic template feel.
Three big changes: **typography**, **section layouts**, and **trainer presentation**.

---

## 1. Typography Overhaul — Cinematic Display Font

### Add a second font for headlines
Keep Lato for body text. Add **"Syne"** (Google Font) as the display/headline font.
Syne is bold, geometric, and has real presence — perfect for a premium fitness brand.

In `layout.tsx`:
```tsx
import { Lato, Syne } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});
```

Add `${syne.variable}` to the `<html>` className.

In `globals.css`, add to `@theme inline`:
```css
--font-display: var(--font-syne);
```

### Typography Rules
- **H1 (Hero):** Syne, 800 weight, text-5xl to text-8xl, uppercase tracking-tight
- **H2 (Section titles):** Syne, 700 weight, text-4xl to text-5xl, uppercase
- **H3 (Card titles):** Syne, 600 weight
- **Body, labels, meta:** Lato (unchanged)

### 3D Text Effect on Hero H1
Create a CSS 3D text effect on the hero headline using layered text-shadows and perspective:

```css
.text-3d {
  text-shadow:
    0 1px 0 rgba(159, 204, 62, 0.4),
    0 2px 0 rgba(159, 204, 62, 0.3),
    0 3px 0 rgba(159, 204, 62, 0.2),
    0 4px 0 rgba(159, 204, 62, 0.1),
    0 5px 15px rgba(0, 0, 0, 0.6),
    0 10px 40px rgba(159, 204, 62, 0.08);
}
```

Apply this class to the hero H1. The green shadow layers create a subtle 3D depth
effect with a cinematic green glow falloff.

### Gradient Text on Section Headings
For H2 section titles, use a green-to-white gradient text effect:

```css
.text-gradient-brand {
  background: linear-gradient(135deg, #9FCC3E 0%, #FFFFFF 70%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## 2. Pillars / Services — Break the 3-Box Layout

### New Layout: Full-Width Stacked Feature Sections

Replace the 3 equal cards with **full-width horizontal sections** that alternate
image and text placement. Each pillar gets its own dramatic row.

```
┌─────────────────────────────────────────────┐
│  [IMAGE]          │  MOVE WELL              │
│  (left 50%)       │  Subtitle + description │
│                   │  + CTA link             │
├─────────────────────────────────────────────┤
│  EAT WELL         │          [IMAGE]        │
│  Subtitle + desc  │          (right 50%)    │
│  + CTA link       │                         │
├─────────────────────────────────────────────┤
│  [IMAGE]          │  LIVE WELL              │
│  (left 50%)       │  Subtitle + description │
│                   │  + CTA link             │
└─────────────────────────────────────────────┘
```

### Implementation
- Each pillar is a full-width `flex` row (alternating `flex-row` / `flex-row-reverse`)
- Image side: 50% width with the pillar image, dark overlay, and a subtle green border
- Text side: 50% width, vertically centered content
- Title: Syne, uppercase, with green gradient text
- A small green accent line (4px wide, 60px long) above each title
- Description in light gray
- "Learn more →" link in green at bottom
- On mobile: stack vertically, image on top
- Add `<Reveal>` animation wrapper to each row
- Separate each row with subtle spacing (py-0, no gap — they should feel connected)

### Keep the pricing CTA box below the pillars
Style it as a full-width banner with a green gradient border on top:
`border-t-2 border-brand`

---

## 3. Team Section — Horizontal Scroll Showcase

### New Layout: Large Portrait Cards with Horizontal Scroll

Replace the grid with a **horizontally scrollable row of large trainer cards**
that feel cinematic and premium.

```
← scroll →
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│          │ │          │ │          │ │          │ │          │
│  PHOTO   │ │  PHOTO   │ │  PHOTO   │ │  PHOTO   │ │  PHOTO   │
│  (tall)  │ │  (tall)  │ │  (tall)  │ │  (tall)  │ │  (tall)  │
│          │ │          │ │          │ │          │ │          │
│──────────│ │──────────│ │──────────│ │──────────│ │──────────│
│ Name     │ │ Name     │ │ Name     │ │ Name     │ │ Name     │
│ Role     │ │ Role     │ │ Role     │ │ Role     │ │ Role     │
│ Bio...   │ │ Bio...   │ │ Bio...   │ │ Bio...   │ │ Bio...   │
└──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘
```

### Implementation
- Container: `overflow-x-auto` with `snap-x snap-mandatory` for snap scrolling
- Hide default scrollbar: use `scrollbar-hide` utility or CSS `::-webkit-scrollbar { display: none }`
- Each card: `min-w-[300px] sm:min-w-[340px]` with `snap-center`
- Card style:
  - `bg-surface-elevated rounded-2xl overflow-hidden`
  - Full-bleed photo on top (aspect-[3/4], object-cover) — NOT circular
  - Photo has a subtle green gradient overlay at the bottom for text readability
  - Dark content area below with name, role, bio
- Photo overlay gradient: `bg-gradient-to-t from-surface-elevated via-transparent to-transparent`
- Name: Syne font, white, bold
- Role: green, uppercase, tracking-wide, small text
- Bio: light gray, small text, maybe 3 lines with line-clamp
- On hover: card lifts slightly (`hover:-translate-y-1 transition-transform duration-300`)
  and green border appears (`hover:ring-1 hover:ring-brand/40`)
- Add left/right scroll indicators (green chevron arrows) on desktop
- On mobile: natural horizontal scroll with snap

### Scroll Indicator Arrows
Add floating arrow buttons on left and right edges of the scroll container:
- Semi-transparent dark bg with green arrow icon
- onClick: scroll the container by one card width
- Hide left arrow when scrolled to start, right when scrolled to end
- Only show on desktop (hidden on mobile — swipe is intuitive)

---

## 4. Additional Section Enhancements

### Reviews Section
- Keep the current dark card grid BUT make the cards slightly larger
- Add a large pull-quote style for the first review (span 2 columns, bigger text)
- Star rating: use green-filled stars

### Location Section
- Add a full-width dark band with the gym's key stats before the map:
  ```
  26+ YEARS  |  5 EXPERT TRAINERS  |  5.0★ GOOGLE RATING  |  WINTER PARK, FL
  ```
  Each stat: Syne font, large number in green, label in white/60
  This creates visual impact and credibility before the contact info

### Hero Section
- Keep full-screen dark with the 3D text
- Add a subtle animated green gradient line that pulses slowly behind the headline
  (CSS animation, horizontal line, opacity pulse from 0.3 to 0.6 over 4s)
- Below the CTA button, add a small "scroll" indicator:
  a bouncing down-arrow icon in white/40

---

## File Changes Expected

| File | Change |
|------|--------|
| `layout.tsx` | Add Syne font |
| `globals.css` | Add font-display, text-3d, text-gradient-brand, scrollbar-hide |
| `Hero.tsx` | 3D text class, Syne font, scroll indicator, green pulse line |
| `Pillars.tsx` | Complete rewrite — stacked alternating layout |
| `Team.tsx` | Complete rewrite — horizontal scroll cards |
| `Reviews.tsx` | Featured first review, larger cards |
| `Location.tsx` | Add stats banner above map |
| `SectionHeading.tsx` | Use Syne font, gradient text option |
| `Button.tsx` | No change |
| `Header.tsx` | No change |
| `Footer.tsx` | No change |

---

## Verification

```bash
npm run lint && npm run build
```

Zero errors. All routes generate. Test horizontal scroll on both desktop and mobile viewports.
