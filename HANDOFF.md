# Wellness Zone — Handoff for Claude Opus 4.7 Trinity

## Project Overview

**Client:** Wellness Zone (personal training, nutrition coaching, lifestyle coaching)
**Location:** 2635 Temple Drive, Winter Park, FL 32789
**Owners:** Chris Rao (Founder) & Nick Rao (Co-Founder) — brothers, 26 years in business
**Existing site:** https://wellnesszone.com (WordPress/Elementor — this is the rebuild)

## Project Location

```
/Users/danielcastillo/Gym Website/
```

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4
- **Fonts:** Lato (via next/font/google)
- **Deploy target:** Vercel
- **Form handling:** Server Actions + Zod + react-hook-form
- **Intake providers:** Resend (email), Webhook (CRM), Calendly (booking)

## Architecture

```
src/
  app/
    page.tsx                    # Landing page (Hero → Pillars → Team → Reviews → Location)
    layout.tsx                  # Root layout (Lato font, JSON-LD, metadata)
    globals.css                 # Design tokens (CSS custom properties + Tailwind @theme)
    robots.ts / sitemap.ts      # SEO
    get-started/
      page.tsx                  # Intake form page
      IntakeForm.tsx            # Client component — Zod-validated form
      actions.ts                # Server action — routes to Resend/Webhook/Calendly
    api/reviews/route.ts        # Google Places API proxy (ISR cached)
  components/
    layout/Header.tsx           # Transparent header (overlays hero)
    layout/Footer.tsx           # Dark footer with contact + social
    sections/Hero.tsx           # Full-viewport hero with CTA
    sections/Pillars.tsx        # Move Well / Eat Well / Live Well cards
    sections/Team.tsx           # 5 trainer cards with expandable bios
    sections/Reviews.tsx        # Google Reviews (live API or fallback)
    sections/Location.tsx       # Contact info + embedded Google Map
    ui/Button.tsx               # Pill button (green → orange hover)
    ui/CTAButton.tsx            # Pre-configured "Start Your Free Consultation"
    ui/Container.tsx            # Max-width wrapper
    ui/SectionHeading.tsx       # Section title + subtitle
    ui/StarRating.tsx           # Star display for reviews
  lib/
    content/site.ts             # Site name, tagline, hero copy
    content/team.ts             # 5 trainer bios + images
    content/pillars.ts          # Three pillars content
    content/contact.ts          # Address, phone, email, social, maps
    content/reviews-fallback.ts # Curated reviews when no API key
    intake/schema.ts            # Zod schema for intake form
    intake/send.ts              # Pluggable submission (Resend/Webhook/Calendly)
    reviews/google.ts           # Google Places API fetch + cache
    seo/schema.ts               # JSON-LD LocalBusiness schema
    utils/cn.ts                 # clsx + tailwind-merge utility
```

## Brand Design System (CONFIRMED from live site CSS)

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| **Primary Green** | `#9FCC3E` | CTAs, links, accents, selection |
| **Hover Orange** | `#D8673D` | Button hover/focus (orange with black text) |
| **Light Green** | `#C3DD8A` | Light accent backgrounds |
| **Pale Green** | `#D5E7AF` | Card borders, subtle backgrounds |
| **Body Text** | `#808285` | Paragraph text, general copy |
| **Heading Text** | `#444444` | h1–h6, dark ink elements |
| **Background** | `#FFFFFF` | Page background |
| **Surface** | `#F5F5F5` | Alternating section backgrounds |

### Typography
- **Font:** Lato (Google Fonts)
- **Weights:** 300 (light), 400 (regular), 700 (bold)
- **Base size:** 18px (root font-size 112.5%)
- **H1:** 36px / bold / line-height 1.4em
- **H2:** 30px / bold / line-height 1.3em

### Buttons
- Pill shape (`rounded-full`)
- Default: `bg-brand text-white`
- Hover: `bg-[#D8673D] text-black`
- Padding: 10px 40px (md) / responsive sizes

### Key Design Patterns
- Transparent header overlaying hero on homepage
- `::selection { background: #9FCC3E; color: #000 }`
- Scroll-to-top button (not yet implemented)
- Mobile nav at md breakpoint (768px Tailwind default)

## What's Been Completed

### Cursor Composer First Pass
- [x] Full Next.js project scaffold with App Router
- [x] All 5 sections: Hero, Pillars, Team, Reviews, Location
- [x] /get-started intake form with Zod validation + honeypot
- [x] 3 pluggable intake providers (Resend, Webhook, Calendly)
- [x] Google Places API integration with ISR cache + fallback
- [x] JSON-LD LocalBusiness schema
- [x] OG tags, robots.txt, sitemap.xml
- [x] Team photos pulled from live WordPress site
- [x] Hero image, pillar images pulled
- [x] Typed content data files

### Antigravity Second Pass (Design Accuracy)
- [x] Added `--brand-hover: #D8673D` to CSS tokens
- [x] Fixed body text to `#808285` (was #444)
- [x] Added `::selection` with brand green + black text
- [x] Button hover: green → orange (#D8673D) with black text
- [x] Transparent header overlaying hero (absolute positioning, white text)
- [x] Logo inverted to white on transparent header
- [x] Hero expanded to min-h-screen with pt-20 for header offset
- [x] Build verified — passes clean

## Remaining Work (Prioritized Punch List)

### P0 — Must Fix Before Client Review
1. **Verify team photos render correctly** — Images were pulled from WordPress, confirm they load (check file sizes, formats)
2. **Test responsive layout** — Run through mobile/tablet/desktop, check nav toggle, hero text sizing
3. **Scroll behavior** — Smooth scroll to anchor sections from nav works, but verify header offset (scroll-mt-20 may need adjusting for transparent header)
4. **Get-started page header** — Should NOT be transparent on the intake page (only on homepage). Currently shares same Header component. Consider adding a `transparent` prop or using pathname detection.

### P1 — Enhance Before Deploy
5. **Scroll-to-top button** — Original site has one (right-aligned, both devices). Add a floating button component.
6. **Micro-animations** — Add entrance animations to pillar cards, team cards, and review cards (use Intersection Observer or Tailwind motion plugin)
7. **Privacy Policy page** — Original site has one at /privacy-policy/. Create a basic route.
8. **Favicon** — Replace the default Next.js favicon with Wellness Zone's actual favicon
9. **OG image** — Generate a proper 1200x630 OG image instead of the square logo

### P2 — Production Polish
10. **Google Maps embed** — Verify the embed URL in contact.ts actually loads (may need API key)
11. **Form submission testing** — Test Resend integration end-to-end with real API key
12. **Lighthouse audit** — Run full Lighthouse, optimize LCP (hero image), CLS, INP
13. **Error boundary** — Add error.tsx and not-found.tsx pages
14. **Loading states** — Add loading.tsx for the intake page
15. **Analytics** — Add GA4 / Vercel Analytics script

### P3 — Nice to Have
16. **View Transitions API** — Smooth page transitions between landing and /get-started
17. **Social icons** — Replace text "Facebook" / "Instagram" in footer with actual SVG icons
18. **Testimonial carousel** — If more than 3 reviews, add horizontal scroll or pagination
19. **Dark mode** — Not requested but the brand could support it

## Environment Variables (for .env.local)

```env
NEXT_PUBLIC_SITE_URL=https://wellnesszone.com
GOOGLE_PLACES_API_KEY=            # For live Google reviews
GOOGLE_PLACE_ID=                  # Wellness Zone's Google Place ID
INTAKE_PROVIDER=resend            # or webhook, calendly
RESEND_API_KEY=                   # For email delivery
INTAKE_TO_EMAIL=GetFit@WellnessZone.com
INTAKE_FROM_EMAIL=Wellness Zone <consultations@wellnesszone.com>
```

## Commands

```bash
cd "/Users/danielcastillo/Gym Website"
npm run dev      # Dev server on :3000
npm run build    # Production build (currently passes clean)
npm run lint     # ESLint
```

## Brand Research Reference

Full brand research document with extracted CSS values, all trainer bios, review themes, form field mapping, and WordPress audit notes:

```
/Users/danielcastillo/.gemini/antigravity/brain/73f8038b-96de-4068-bb97-cbf265832484/wellness_zone_research.md
```

## Key Context

- **This is a client project for Ghost AI Systems** (Daniel's AI agency)
- The rebuild replaces a WordPress/Elementor/Astra/WPForms stack with Next.js
- Client wants their existing colors kept exactly — hex values are confirmed
- Form currently submits via WPForms → WordPress — rebuild needs to wire to Resend or webhook
- Google Reviews: 5.0 stars, ~44 reviews — excellent social proof, make them prominent
- Business has been operating since 2000 (Florida corp) — use this for credibility
