# Wellness Zone — Project Brain

> **Living context doc.** Read this first before making changes.  
> **Last updated:** June 9, 2026  
> **Next milestone:** Meeting **Friday** — Chris may not respond for a few days before then.

---

## One-line status

**The site looks good and the owner wants to keep it that way.** Priority is a **simple lead + notification system** (questionnaire + phone/in-person consult paths), not more visual features.

---

## What the owner wants (confirmed — Nick relaying gym feedback)

Chris (founder, ~55), Carol (coach, ~40), and Nick (~27, ops) need a **straightforward intake** so leads are never missed when Chris is busy.

### Design direction
- **Keep the current look** — they like the demo/site aesthetic
- **Simple, not gimmicky** — no extra gizmos; accessible for coaches across age ranges
- **Straight to the point** — clear consult CTA, no “wait and hope we call you” feeling

### Functional goals
1. **Free consult flow** — in-person (studio) OR phone/online consultation
2. **~10 question questionnaire** — capture goals/focus before first contact so coaches can “hit the ground running”
3. **Multi-person notifications** — alert **Chris, Carol, and Nick** when someone completes intake (email and/or SMS)
4. **Phone fallback** — prominent call option: (407) 599-5800
5. **No lead left behind** — system should feel reliable; Chris missing leads is the pain point

### Explicitly NOT the goal right now
- Full visual redesign
- Complex CRM, portals, or “enterprise” features
- Demo/agency sections in production (see Packages note below)

---

## Decisions pending from Chris (get answers at Friday meeting)

| # | Question | Notes |
|---|----------|-------|
| 1 | **Final ~10 questionnaire questions** | Draft below — needs owner approval |
| 2 | **Notification recipients** | Email addresses + cell numbers for Chris, Carol, Nick |
| 3 | **Consult routing** | Everyone gets every lead, or round-robin? First responder wins? |
| 4 | **Phone consult** | Outbound call from coach vs. Calendly self-book vs. “we’ll call you” |
| 5 | **In-person** | Walk-in OK or appointment-only? |
| 6 | **Primary CTA wording** | “Book Your Free Consultation” vs. current “Start Your Free Consultation” |

### Draft questionnaire (10 questions — for Chris to edit)

1. What is your main fitness goal?
2. How long have you been exercising consistently?
3. Any injuries, pain, or physical limitations we should know about?
4. How many days per week can you realistically train?
5. Preferred time of day (morning / afternoon / evening)?
6. Have you worked with a personal trainer before?
7. What has been your biggest obstacle so far?
8. Interested in nutrition guidance? (yes / no / not sure)
9. How did you hear about Wellness Zone?
10. Anything else we should know before we talk?

**Also collect:** first name, last name, email, phone (required), consult type (in-person / phone), best time to reach.

---

## What’s already built (repo state)

**Path:** `/Users/danielcastillo/Gym Website/`  
**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind v4 · Vercel deploy target

### Routes
| Route | Purpose |
|-------|---------|
| `/` | Landing: Hero → Pillars → Team → Reviews → Location → CtaBanner → Packages* |
| `/get-started` | Intake form (light — not 10 questions yet) |
| `/privacy-policy` | Privacy page |
| `/api/reviews` | Google Places proxy (ISR 2h) |

\* **Packages** = agency upsell with Stripe links — **hide/remove before client production** unless explicitly wanted.

### Intake (existing — needs expansion)
- **Fields today:** first name, last name, email, phone, best time, interests (Move/Eat/Live Well multi-select)
- **Validation:** Zod + react-hook-form + honeypot
- **Submission:** Server Action → `lib/intake/send.ts`
- **Providers (env):** `resend` | `webhook` | `calendly` — dev mode logs to console
- **Email today:** single `INTAKE_TO_EMAIL` (default `GetFit@WellnessZone.com`)

### Design (owner likes this — don’t break)
- Dark cinematic theme, brand green `#9FCC3E`, hover orange `#D8673D`
- Hero: looping video (`/public/images/hero.mp4`) + 3D headline + scroll indicator
- Pillars: full-width alternating L/R/L rows
- Team: horizontal snap-scroll portrait cards
- Location: stats banner + map embed
- Extras: light/dark toggle, 6-color palette, glassmorphism, Tilt3D hover — **nice but not business-critical**

### Fonts
- Body: **Lato**
- Display: **Oswald** (REDESIGN_V2 spec said Syne — not implemented; owner hasn’t asked to change)

### SEO / polish (done)
- OG image, favicon, JSON-LD LocalBusiness, sitemap, robots
- Vercel Analytics + Speed Insights
- Branded 404, error boundary, intake loading skeleton

### Spec docs (reference only)
| File | Relevance |
|------|-----------|
| `BRAIN.md` | **This file — current priorities** |
| `HANDOFF.md` | Original architecture (partially outdated) |
| `CONVERSION_V3.md` | Copy/SEO pass — **not started**; align with owner “simple” goal before implementing wholesale |
| `REDESIGN.md` / `REDESIGN_V2.md` | Visual passes — largely done |

---

## Recommended build plan (after Friday meeting)

### Phase 1 — Simple intake (P0)
1. Expand Zod schema + form with ~10 questions + consult type (in-person / phone)
2. Single-screen or two-step form — large labels, minimal friction
3. Confirmation page/state: “We received your info — a coach will reach out within one business day” + call link
4. Multi-recipient email: `INTAKE_TO_EMAIL=chris@...,carol@...,nick@...` (or separate env vars)

### Phase 2 — Don’t miss leads (P1)
5. Optional **SMS via Twilio** on submit to coach cell numbers
6. Email subject/body formatted for quick scan (goals summary, consult type, phone, best time)

### Phase 3 — Production cleanup (P1)
7. Remove or hide `Packages.tsx` from homepage
8. Unify CTA copy site-wide per Chris (“Book Your Free Consultation”)
9. Hero trust bar if desired (26+ years · 5.0★ · 5 trainers · Winter Park) — optional, keep simple
10. Wire production env vars on Vercel; test end-to-end submit

### Phase 4 — Later (only if requested)
- Calendly embed for self-scheduling
- CRM webhook (HubSpot/Zapier)
- CONVERSION_V3 sections (FAQ, Who We Help, etc.) — only if owner wants more copy, not more UI

---

## Environment variables (production checklist)

```env
NEXT_PUBLIC_SITE_URL=https://wellnesszone.com

# Reviews (optional — fallback testimonials work without)
GOOGLE_PLACES_API_KEY=
GOOGLE_PLACE_ID=

# Intake — REQUIRED for production
INTAKE_PROVIDER=resend
RESEND_API_KEY=
INTAKE_FROM_EMAIL=Wellness Zone <consultations@verified-domain.com>
INTAKE_TO_EMAIL=chris@...,carol@...,nick@...   # extend send.ts for multiple recipients

# Optional
INTAKE_WEBHOOK_URL=          # Zapier/HubSpot
CALENDLY_URL=                # if using calendly provider
# TWILIO_*                   # if SMS alerts added
```

---

## Key people & business context

| Person | Role | Notes |
|--------|------|-------|
| **Chris Rao** | Founder, coach | Primary face of business; busy — often misses leads |
| **Nick Rao** | Co-founder, ops | Driving this rebuild; wants to stay in the loop on every lead |
| **Karol Feb** | Partner, CPT, Director of Wellness | Owner said “Carol” — confirm spelling/email with Chris |
| **Ben Windle** | Partner, CPT | On team page; not mentioned for notifications yet |
| **Kyle Morton** | CPT, CES | On team page; not mentioned for notifications yet |

**Location:** 2635 Temple Drive, Winter Park, FL 32789  
**Phone:** (407) 599-5800  
**Email:** GetFit@WellnessZone.com  
**In business since:** 2000 (26+ years — use for credibility)

---

## Commands

```bash
cd "/Users/danielcastillo/Gym Website"
npm run dev
npm run lint && npm run build
```

---

## Message to send Chris (template)

> We’ll keep the site looking like the demo and add a simple free-consult flow: a short questionnaire, choice of in-person or phone consult, and instant notifications to you, Carol, and Nick so no lead goes unanswered. Once you confirm the questions and who gets alerts, we can wire it up quickly.

---

## For the next AI session

1. **Read this file first** — owner priority is intake + notifications, not design experiments
2. **Wait for Friday meeting outcomes** before implementing questionnaire copy or notification list
3. **If implementing without Chris:** use draft questions above, multi-email in `send.ts`, keep UI dead simple
4. **Do not** add Packages/Stripe/agency content to production deploy
5. **Do not** apologize for timeline — Nick said don’t; Chris is slow to respond and that’s expected
