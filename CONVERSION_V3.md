# Wellness Zone — Conversion & SEO Optimization (V3)

> **IMPORTANT:** Do NOT do a full visual redesign. Keep the dark background,
> lime accent color (#9FCC3E), Oswald headlines, cinematic images, and luxury
> personal-training feel. This is a CONTENT and UX optimization pass.

Read HANDOFF.md and BRAND_RESEARCH.md for project context.

---

## Core Problem

The current site looks credible but sells too softly. The homepage needs to
answer immediately:
1. Who is this for?
2. What problems does Wellness Zone solve?
3. Why should the visitor trust them?
4. What happens during the consultation?
5. What should the visitor click next?

**Primary CTA:** "Book Your Free Consultation" (consistent everywhere)
**Secondary CTA:** Phone link: (407) 599-5800

---

## 1. Hero Section — Rewrite Copy

**Replace** the current hero headline with:
> "Personal Training in Winter Park Built Around Your Body, Goals, and Life"

**Replace** the current subheadline with:
> "Private coaching for strength, mobility, nutrition, and long-term wellness.
> Wellness Zone helps you move better, feel stronger, and build a sustainable
> fitness routine with expert support."

**Hero CTAs:**
- Primary button: "Book Your Free Consultation" (links to /get-started)
- Secondary text link: "Call (407) 599-5800" (tel: link)

**Trust bar** — visible above the fold on desktop AND mobile:
> 26+ Years Experience · 5.0★ Google Rating · 5 Expert Trainers · Winter Park, FL

Style: horizontal row of stats inside/below the hero. Dark bg, green accent
numbers, white/60 labels. Keep it compact.

---

## 2. New "Who We Help" Section

Place **after hero/trust bar, before Three Pillars**.

Create a new file: `src/components/sections/WhoWeHelp.tsx`

**Headline:** "Built for Real Life, Not Fitness Trends"

**Subheadline:** "Wellness Zone is for people who want expert guidance,
sustainable progress, and a body that performs better in everyday life."

**Cards/bullet blocks** (use dark cards with green accent, match existing style):
- Build strength without wrecking your joints
- Improve mobility, posture, and daily function
- Get back to an active lifestyle after pain, injury, or inconsistency
- Lose fat while building sustainable habits
- Train with expert coaching instead of guessing alone

---

## 3. Featured Testimonial Near Top

Place **after "Who We Help"** or beside it on desktop.

Create: `src/components/sections/FeaturedTestimonial.tsx`

**Quote:**
> "After a back injury left me unable to continue the active lifestyle I once
> led, I knew I needed to change things. I had never weight trained, and frankly
> was intimidated by it, but after meeting with Chris I decided to give it a
> try. After 6 months I met my goals and have maintained them for 15 months.
> But most importantly, I'm back to the active lifestyle I love!"

**Attribution:** Luann B.

Style: large pull-quote, dark card, green left border or quotation mark accent.
Keep it visually impactful but compact.

---

## 4. Tighten Three Pillars Copy

Update content in `src/lib/content/pillars.ts`. Keep the three-pillar structure
and existing images. Replace long paragraphs with conversion-focused copy:

**Move Well:**
- Label: "Personal Training"
- Copy: "Your body should not just look better. It should perform better. Our
  personal training helps you build strength, improve movement quality, reduce
  limitations, and feel more capable in everyday life."
- CTA text: "Start Moving Better"

**Eat Well:**
- Label: "Nutrition Guidance"
- Copy: "No extreme diets. No generic meal plans. We help you create a
  sustainable approach to food that balances structure, enjoyment, and
  long-term results."
- CTA text: "Build Your Nutrition Plan"

**Live Well:**
- Label: "Lifestyle Coaching"
- Copy: "Fitness works best when your lifestyle supports it. Our coaching helps
  you overcome obstacles, stay consistent, and build systems that make progress
  easier."
- CTA text: "Create Your Plan"

---

## 5. New "Common Goals" Section

Place **after Three Pillars, before Programs/Pricing**.

Create: `src/components/sections/CommonGoals.tsx`

**Headline:** "Common Goals We Help With"

**Grid of cards** (responsive, 2-col mobile, 4-col desktop):
- Back pain and movement limitations
- Strength loss after inactivity
- Weight loss and body recomposition
- Injury recovery support
- Better posture and mobility
- Functional strength for daily life
- Long-term fitness consistency
- More confidence in and out of the gym

Style: dark cards, green icon or check, white text. Compact.

---

## 6. Improve Programs & Pricing

Update the pricing CTA box in `Pillars.tsx` (or create a separate section).

**Headline:** "Programs Built Around Your Goals"

**Copy:** "Every client starts with a complimentary consultation. We learn about
your goals, movement needs, schedule, and lifestyle, then recommend the right
training plan based on your budget and availability."

**Sub-block:** "What Your Free Consultation Includes"
- Goal and lifestyle discussion
- Movement and training needs review
- Personalized program recommendation
- Nutrition and coaching options
- Clear next steps with no pressure

**CTA:** "Schedule My Free Consultation"

---

## 7. Improve Coach Cards

Update `src/components/sections/Team.tsx` and `src/lib/content/team.ts`.

For each coach card:
- Keep image, name, and title
- Add a `specialties` field
- Show shorter 2-3 sentence preview (add `shortBio` field to team data)
- Full bio in expandable `<details>` or "Read More" toggle

**Specialties to add:**
- Chris Rao: Fitness strategy, strength, mindset, goal achievement
- Nick Rao: Custom training, lifestyle fitness, schedule flexibility
- Ben Windle: Strength, bodybuilding, nutrition habits, performance
- Karol Feb: Wellness, mobility, active lifestyle, strength and function
- Kyle Morton: Corrective exercise, mobility, injury recovery, sustainable routines

Do NOT remove original long bios — preserve in expandable content for SEO.

---

## 8. Improve Reviews Section

- Move at least one review higher (the featured testimonial handles this)
- Remove/hide: "Showing featured testimonials. Connect Google Places API for live reviews."
- Replace with: "Real client stories from Wellness Zone members."
- Keep Google reviews link

---

## 9. Improve Location Section

Keep address, phone, email, map. Add local SEO copy:

> "Located in Winter Park, Wellness Zone provides private personal training,
> corrective exercise, nutrition guidance, and lifestyle coaching for clients
> across Winter Park, Orlando, Maitland, and surrounding Central Florida
> communities."

---

## 10. New FAQ Section

Create: `src/components/sections/FAQ.tsx`

**Headline:** "Frequently Asked Questions"

Use `<details>/<summary>` for accessible accordions. Style with dark cards,
green accents on open state.

**FAQs:**

Q: Do I need gym experience to start?
A: No. Wellness Zone works with clients at different fitness levels and builds each program around your current ability, goals, and lifestyle.

Q: Can you help with back pain, injuries, or movement limitations?
A: Yes. The team includes corrective exercise expertise and focuses on helping clients move better, build strength, and regain confidence safely.

Q: Do you offer nutrition guidance?
A: Yes. Nutrition guidance is built around sustainable habits, personal preferences, and long-term consistency instead of extreme dieting.

Q: How often should I train?
A: Training frequency depends on your goals, schedule, and starting point. Your coach will recommend the best structure during your consultation.

Q: What happens during the free consultation?
A: You will discuss your goals, lifestyle, movement needs, and available schedule. The team will recommend a plan that fits your situation.

Q: Where are you located?
A: Wellness Zone is located at 2635 Temple Drive, Winter Park, FL 32789.

---

## 11. Sticky Mobile CTA

Add a sticky bottom bar on mobile only:

Create: `src/components/ui/StickyMobileCTA.tsx`

- Primary: "Book Free Consultation" → /get-started
- Secondary: "Call" → tel:+14075995800
- Hidden on desktop (`md:hidden`)
- iOS safe-area padding: `pb-[env(safe-area-inset-bottom)]`
- Dark bg with green CTA button
- Does NOT block footer content or form fields
- Add to layout.tsx

---

## 12. Header Navigation Update

- CTA text: "Free Consultation" (keep)
- Add phone number visible in mobile menu
- Ensure CTA is prominent on desktop

---

## 13. SEO Updates

**Update metadata in layout.tsx:**

Title: "Personal Training in Winter Park, FL | Wellness Zone"

Description: "Wellness Zone offers private personal training, corrective
exercise, nutrition guidance, and lifestyle coaching in Winter Park, FL.
Book your free consultation today."

**OG tags:** Update og:title and og:description to match.
Twitter card: summary_large_image (already set).

**JSON-LD schema** — update `src/lib/seo/schema.ts`:
- areaServed: add Orlando, Maitland, Central Florida
- description: update to match new meta description
- Verify telephone format: +14075995800

**Sitemap:** already includes all routes — verify.

---

## 14. Updated Page Structure (top to bottom)

```
Header (dark glass, transparent on homepage)
Hero (new copy + trust bar + dual CTAs)
Who We Help (new section)
Featured Testimonial (new section)
Three Pillars (tightened copy)
Common Goals (new section)
Programs & Pricing (improved)
Team (improved cards with specialties)
Reviews (cleaned up)
FAQ (new section)
Location (with local SEO copy)
Footer
Sticky Mobile CTA (mobile only)
```

---

## 15. Files to Create/Modify

| Action | File |
|--------|------|
| CREATE | `src/components/sections/WhoWeHelp.tsx` |
| CREATE | `src/components/sections/FeaturedTestimonial.tsx` |
| CREATE | `src/components/sections/CommonGoals.tsx` |
| CREATE | `src/components/sections/FAQ.tsx` |
| CREATE | `src/components/ui/StickyMobileCTA.tsx` |
| MODIFY | `src/app/page.tsx` (add new sections in order) |
| MODIFY | `src/app/layout.tsx` (SEO metadata, add StickyMobileCTA) |
| MODIFY | `src/lib/content/site.ts` (hero copy) |
| MODIFY | `src/lib/content/pillars.ts` (tightened copy + CTA text) |
| MODIFY | `src/lib/content/team.ts` (add specialties + shortBio) |
| MODIFY | `src/lib/seo/schema.ts` (expanded areaServed, description) |
| MODIFY | `src/components/sections/Hero.tsx` (new copy, trust bar, dual CTAs) |
| MODIFY | `src/components/sections/Pillars.tsx` (individual CTA per pillar) |
| MODIFY | `src/components/sections/Team.tsx` (specialties, short preview) |
| MODIFY | `src/components/sections/Reviews.tsx` (remove dev scaffolding text) |
| MODIFY | `src/components/sections/Location.tsx` (local SEO paragraph) |
| MODIFY | `src/components/layout/Header.tsx` (phone in mobile menu) |

---

## 16. Do NOT Break

- Existing routes: `/`, `/get-started`, `/privacy-policy`
- Tel and mailto links
- Google Maps link and embed
- Social links
- Dark theme, animations, Oswald font
- Higgsfield images (hero + pillars)
- Vercel Analytics / Speed Insights
- Form logic, Zod schema, server actions

---

## 17. Verification

```bash
npm run lint && npm run build
```

Zero errors. All routes generate. Test mobile sticky CTA doesn't overlap form.

---

## Tone Guidelines

- Premium, clear, local, trustworthy, direct
- NOT a generic gym franchise
- NO aggressive hype
- NO medical/injury outcome promises
- NO fake review counts unless API is connected
