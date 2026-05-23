# Wellness Zone

Production-ready marketing site for [Wellness Zone](https://wellnesszone.com) — personal training, nutrition guidance, and coaching in Winter Park, FL.

Built with **Next.js** (App Router), **TypeScript**, and **Tailwind CSS**.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
  app/                 # Routes (landing, /get-started, API)
  components/          # UI, layout, page sections
  lib/content/         # Site copy (typed data)
  lib/intake/          # Form schema + pluggable submission
  lib/reviews/         # Google Places reviews fetch
  lib/seo/             # JSON-LD schema
public/images/         # Brand assets (from live site)
```

## Environment variables

Copy `.env.example` to `.env.local`:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URL for metadata/sitemap |
| `GOOGLE_PLACES_API_KEY` | For live reviews | Server-side Places API key |
| `GOOGLE_PLACE_ID` | For live reviews | Google Place ID for Wellness Zone |
| `INTAKE_PROVIDER` | Production | `resend`, `webhook`, or `calendly` |
| `RESEND_API_KEY` | If using Resend | Email delivery API key |
| `INTAKE_TO_EMAIL` | If using Resend | Default: `GetFit@WellnessZone.com` |
| `INTAKE_FROM_EMAIL` | If using Resend | Verified sender in Resend |
| `INTAKE_WEBHOOK_URL` | If using webhook | HubSpot, Zapier, etc. |
| `CALENDLY_URL` | If using Calendly | Post-submit booking link |

### Development

Without env vars, the intake form logs submissions to the server console. Reviews show curated fallback testimonials from the original site.

## Google Places API setup

1. Create a [Google Cloud](https://console.cloud.google.com) project.
2. Enable **Places API (New)**.
3. Create an API key restricted to server use (IP or no referrer for server-side only).
4. Find the Place ID using the [Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder) for "Wellness Zone" at 2635 Temple Drive, Winter Park, FL.
5. Add `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID` to `.env.local` and Vercel.

**Note:** The Places API returns up to ~5 reviews. The UI links to Google Maps for all reviews.

## Intake form providers

### Resend (email)

```env
INTAKE_PROVIDER=resend
RESEND_API_KEY=re_...
INTAKE_TO_EMAIL=GetFit@WellnessZone.com
INTAKE_FROM_EMAIL=Wellness Zone <consultations@yourdomain.com>
```

Verify your sending domain in Resend before production.

### Webhook (CRM)

```env
INTAKE_PROVIDER=webhook
INTAKE_WEBHOOK_URL=https://hooks.zapier.com/...
```

Payload is JSON with all form fields plus `submittedAt` and `source`.

### Calendly

```env
INTAKE_PROVIDER=calendly
CALENDLY_URL=https://calendly.com/your-link
INTAKE_WEBHOOK_URL=...  # optional, to store lead before redirect
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Add environment variables from `.env.example`.
4. Deploy. Point `wellnesszone.com` DNS to Vercel when ready.

```bash
npm run build
```

## Brand colors

Extracted from the live WordPress/Elementor site (confirm with client):

| Token | Hex |
|-------|-----|
| Primary / accent | `#9FCC3E` |
| Light accent | `#C3DD8A` |
| Pale accent | `#D5E7AF` |
| Body text | `#444444` |
| Headings | `#333333` |

## Awaiting client input

- [ ] Confirm brand hex values
- [ ] Choose intake destination (`resend`, `webhook`, or `calendly`)
- [ ] Provide Google Places API key + Place ID
- [ ] Opening hours for LocalBusiness schema (optional)
- [ ] Higher-resolution hero image or video (optional)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
