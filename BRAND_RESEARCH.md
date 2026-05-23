# Wellness Zone — Brand Research & Site Audit

> **Purpose:** Second-pass reference for the Next.js rebuild. Cursor Composer 2.5 is handling the first pass.

---

## 🎨 Exact Brand Color Palette (Extracted from CSS)

| Token | Hex | HSL | Usage |
|-------|-----|-----|-------|
| **Primary Green** | `#9FCC3E` | ~`hsl(80, 59%, 52%)` | CTAs, links, accents, selection highlight, menu hover, mobile toggle, input focus borders |
| **Secondary Orange** | `#D8673D` | ~`hsl(17, 64%, 54%)` | Button hover/focus state |
| **Body Text** | `#808285` | — | Default body, paragraph text |
| **Heading Text** | `#444444` | — | All h1–h6 and body headings |
| **Dark Text (blockquote)** | `#000000` | — | Blockquote color |
| **Background** | `#FFFFFF` | — | Page background |
| **Border** | `#DDDDDD` | — | Default borders (CSS var `--ast-border-color`) |
| **Submenu Border Top** | `#9FCC3E` | — | 2px solid top border on submenus |
| **Submenu Item Border** | `#E5E5E5` | — | Submenu divider lines |

### CSS Custom Properties (Astra theme globals)
```css
--ast-global-color-0: #0170B9;  /* Astra blue (unused in brand) */
--ast-global-color-1: #3A3A3A;
--ast-global-color-2: #3A3A3A;
--ast-global-color-3: #4B4F58;
--ast-global-color-4: #F5F5F5;
--ast-global-color-5: #FFFFFF;
--ast-global-color-6: #E5E5E5;
--ast-global-color-7: #424242;
--ast-global-color-8: #000000;
```

### Button Styling
```css
/* Default state */
background-color: #9FCC3E;
border-color: #9FCC3E;
color: #FFFFFF;
border-radius: 25px;  /* Fully rounded pill buttons */
padding: 10px 40px;

/* Hover/Focus state */
background-color: #D8673D;
border-color: #D8673D;
color: #000000;
```

---

## 🔤 Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| **Body** | Lato, sans-serif | 400 | 18px (1rem @ 112.5% root) |
| **H1** | Lato | 600 | 36px / line-height 1.4em |
| **H2** | Lato | 600 | 30px / line-height 1.3em |
| **H3** | Lato | — | 25px / line-height 1.3em |
| **H4** | Lato | — | 20px / line-height 1.2em |
| **H5** | Lato | — | 18px / line-height 1.2em |
| **H6** | Lato | — | 15px / line-height 1.25em |

> **Note:** Root font-size is `112.5%` (18px base). All `rem` values scale from this.

### Font Source
- Self-hosted Lato: `wellnesszone.com/wp-content/astra-local-fonts/lato/S6uyw4BMUTPHjx4wXg.woff2`
- For Next.js rebuild: use `next/font/google` with `Lato`

---

## 📝 Page Copy — Hero Section

**H1:** "Personal Training Catered to Your Needs, Goals & Lifestyle"

**Subhead:** "Let Your Passion for Life Fuel Your Motivation for Fitness"

**Primary CTA:** "Start Your Free Consultation" → links to /get-started

---

## 🏛️ The Three Pillars

### MOVE WELL — Personal Training
Personalized training programs designed for individual goals. Private, semi-private, and group sessions. Focus on functional fitness and custom workout routines tailored to needs, priorities, and lifestyles.

### EAT WELL — Nutrition Guidance
Nutritional guidance and planning to support fitness goals. No fad diets — sustainable eating strategies for long-term health.

### LIVE WELL — Coaching
Coaching and lifestyle support to maintain long-term health. Holistic approach connecting fitness, nutrition, and daily habits.

---

## 👥 Meet the Team — Bios

### Chris Rao — Founder, Coach
Emphasizes three principles: "Be strong. Be grateful. Be kind." His approach focuses on well-being as the foundation for meaningful success, utilizing a holistic strategy with a strong support team to help clients achieve goals.

### Nick Rao — Co-Founder, CPT, Director of Operations
Career began when he received a gym membership as a gift in high school. Focuses on "life functionality" — customizing workout routines based on the specific needs, priorities, and lifestyles of each client.

### Ben Windle — Partner, CPT, Director of Human Performance
Background as a competitive bodybuilder (ages 17–24). Passionate about self-development and pushing clients mentally and physically. Nearly a decade helping others create lasting habits through exercise and nutrition.

### Karol Feb — Partner, CPT, Director of Wellness
Mother of two. Turned to personal training after experiencing back pain that limited her active outdoor lifestyle. Dedicated to helping clients overcome physical limitations to live full, active lives.

### Kyle Morton — CPT, CES, Director of Corrective Exercise
Focus on helping clients create lifelong fitness habits using a holistic approach. Grew up active in sports and the outdoors. Developed a passion for corrective exercise after enduring and overcoming severe arm injuries during his college baseball career.

---

## ⭐ Google Reviews

- **Rating:** 5.0 stars
- **Count:** ~44 reviews
- **Google Maps Place ID:** Search "Wellness Zone, 2635 Temple Dr, Winter Park, FL 32789"

### Common Review Themes
- "Result-driven team" — not just a gym
- Clients training there 17+ years
- Weight loss results (up to 75 lbs)
- Injury recovery and functional fitness
- Personalized, patient, and knowledgeable trainers
- Focus on long-term wellness, not fad approaches

### Google Reviews Integration Options
1. **Google Places API** — Fetch reviews server-side, cache, render. Requires Google Cloud API key with Places API enabled. Limited to 5 most relevant reviews.
2. **Third-party widget** — Elfsight, ReviewsOnMyWebsite, etc. (adds external dependency)
3. **Static/manual** — Pull reviews once, hardcode. Simplest, no API cost.

**Recommendation:** Use Google Places API with server-side caching (ISR) for freshness without per-request cost. Fall back to 5 curated static reviews if API key isn't provided.

---

## 📋 Intake Form (Current WordPress — WPForms #69)

### Current Fields
| Field | Type | Required |
|-------|------|----------|
| First Name | text | Yes |
| Last Name | text | Yes |
| Email Address | email | Yes |
| Phone Number | text | No |
| Best time to reach me | checkbox (Morning / Afternoon / Evening) | No |
| Interested in | checkbox (Moving Well / Eating Well / Living Well) | No |

### Anti-spam
- Hidden honeypot field (field_4, visually hidden)
- Google reCAPTCHA v3 (site key: `6LeDv0osAAAAAAHwoC4xxLvm6D455upawikIb4wQ`)

### Form Submission
- Currently posts to WPForms backend (WordPress AJAX)
- For rebuild: wire to Resend (transactional email to GetFit@WellnessZone.com) or CRM webhook

---

## 📍 Location & Contact

| Field | Value |
|-------|-------|
| **Address** | 2635 Temple Drive, Winter Park, FL 32789 |
| **Phone** | (407) 599-5800 |
| **Email** | GetFit@WellnessZone.com |
| **Facebook** | https://www.facebook.com/MyWellnessZone/ |
| **Instagram** | https://www.instagram.com/wellnesszone/ |
| **Business entity** | The Wellness Zone Inc. (Florida corp since 2000) |
| **Registered Agent** | Christopher Rao |

---

## 🔧 Technical Notes from Current Site

### Current Stack (WordPress)
- **Theme:** Astra (v4.13.2) + Astra Pro addon
- **Page Builder:** Elementor (v4.0.8) + Elementor Pro (v4.0.4)
- **Forms:** WPForms Pro (v1.10.0.5)
- **Performance:** WP Rocket (lazy load, script deferral, CSS optimization)
- **Header:** Transparent header on homepage
- **Logo:** 36px max-width (small wordmark or icon)
- **Scroll-to-top:** Enabled, right-aligned, shows on both desktop and mobile

### SEO Current State
- **Title:** "Personal Training | Coaching | Wellness Zone"
- **Plugin:** Yoast SEO v27.6
- **Speculation Rules:** Prefetch enabled (conservative eagerness)
- **Privacy Policy:** https://wellnesszone.com/privacy-policy/

### Layout Notes
- Single-page design — all content on homepage
- Transparent header overlay on hero
- Mobile breakpoint: 921px (nav collapse)
- Container: 1200px max-width (Astra default)
- Selection highlight uses brand green (#9FCC3E) with black text

---

## 🖼️ Image Assets Needed

The following images need to be pulled from the live site or provided by the client:
- Logo (currently 36px — need high-res SVG or PNG)
- Team headshots (5 trainers: Chris, Nick, Ben, Karol, Kyle)
- Hero background image
- Pillar section imagery
- Gym/facility photos

### Image URLs to Extract
- Check `wellnesszone.com/wp-content/uploads/` for team photos and brand assets
- Elementor backgrounds may be inline CSS — inspect sections for background-image URLs

---

## 🎯 Second Pass Priorities

1. **Color accuracy** — Match `#9FCC3E` primary and `#D8673D` hover exactly
2. **Typography** — Lato font at 18px base (112.5% root)
3. **Button style** — Pill shape (25px radius), green to orange hover
4. **Transparent header** — Header overlays hero image
5. **Form parity** — Match existing WPForms fields exactly
6. **Mobile-first** — Current site breaks at 921px
7. **Image extraction** — Pull actual team photos and hero from WordPress uploads
8. **Selection color** — Green selection with black text
9. **LocalBusiness schema** — Structured data for Winter Park location
10. **Google Reviews** — API integration or curated static fallback
