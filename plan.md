# portfolioV5 — Build Roadmap

**Project:** Personal portfolio, v5 (full rewrite)
**Subject:** Romnick "Nick" S. Sevilla — Full Stack Web Developer & DevOps Enthusiast
**Repo:** https://github.com/nick0221/portfolioV5 (branch `main`)
**Content source of truth:** `nick0221/portfolio-v4.1` (live at https://nickdevs.vercel.app)
**Status:** Phase 1 — Scaffold & Design System
**Last updated:** 2026-10-22

---

## 1. Why this exists

v4.1 works and is live, but it is a data-render site: content arrays fed into generic section
components, with motion added on top. v5 is not a reskin. It is a **re-authored site with its own
visual idea**, built so that scrolling *is* the narrative device — the page should feel like it is
being drawn as you move through it.

Two rules that govern every decision below:

1. **No content regression.** v5 must ship every project, role, certificate and skill that v4.1
   carries, plus better presentation. A prettier site with less information is a downgrade.
2. **Nothing invented.** No fake metrics, no placeholder testimonials, no filler sections. If a
   number appears on screen it is derived from real content (13 projects, 3 roles, 4 certificates,
   10+ years).

---

## 2. Content inventory (locked from v4.1)

| Source file | Content | Destination in v5 |
|---|---|---|
| `aboutme.ts` | Name, title, email, links, CV path | `lib/content/profile.ts` |
| `experience.ts` | 3 roles (Freelance 2023–, Yamaha 2016–2023, ICLICK 2014–2016) | `lib/content/experience.ts` |
| `education.ts` | B.S. Information Technology, CPSU 2010–2014 | `lib/content/education.ts` |
| `certification.ts` | 4 certs (Google IT Support, Google Prompting, SoloLearn ×2) | `lib/content/certifications.ts` |
| `technical-skills.ts` | 6 categories, 32 skills with levels | `lib/content/skills.ts` |
| `portfolio.ts` | **13 projects**, each with 1–14 gallery images | `lib/content/projects.ts` |
| `title-description.ts` | SEO title/description | `app/layout.tsx` metadata |
| `public/project-images/` | 68 WebP screenshots, 16 folders | `public/projects/` (kept as-is) |
| `public/profile-pic.webp` | Portrait | `public/profile.webp` |
| `public/cv/*.pdf` | Resume PDF | `public/cv/…` |
| `public/og-image.webp` | Social card | `public/og.webp` |

**13 projects, verbatim titles:** Prestige Estates (real estate), BlackStag Barbershop,
LendWise (fintech), Portfolio v4, Portfolio v3, URBANKiX (ecommerce), QuickSell Detroit (intake
system), Portfolio v2, Valley & Coast (hotel reservation), Allacapan RHU (health unit MIS),
Online Pharmacy MIS, Advanced Service Kiosk MIS, Time Commitment Service System.

Empty in v4.1 and therefore omitted in v5: `publication.ts`, `news.ts` (both arrays empty).

---

## 3. Design direction — "The Drafting Table"

**Surface archetype (committed before any token):** **Decide/Learn**, with **Explore** as the
secondary surface for the project archive. This is a site that has to convince a hiring manager or
a client in under thirty seconds, then reward browsing.

**The idea:** an engineering drawing on warm paper. Nick's career starts on a manufacturing
shop floor (Yamaha, seven years, internal MIS and reporting) and moved to modern web work. The
site is built as a *spec sheet*: hairline rules, drawing-frame margins, numbered sections, mono
annotation labels, dimension ticks — with editorial serif headlines to stop it reading like a
dashboard.

**Why not the alternatives:** a dark terminal/DevOps theme is the default every developer portfolio
reaches for in 2026 (and looks auto-generated); a glassmorphic dark SaaS look is the strongest AI
tell there is. Warm paper + ink + one signal accent is rarer, calmer, and makes the project
screenshots — which are mostly light UI — sit naturally on the page instead of glowing on black.

### 3.1 Palette

| Token | Value | Use |
|---|---|---|
| `--paper` | `#F2EEE5` | Base canvas |
| `--paper-deep` | `#E7E2D5` | Recessed panels, image wells |
| `--ink` | `#12150F` | Primary text, rules at low alpha |
| `--ink-soft` | `#3B4038` | Body copy |
| `--muted` | `#6E7367` | Labels, secondary meta |
| `--rule` | `#CFC8B8` | Hairlines, drawing grid |
| `--accent` | `#B53C1F` | Text-safe signal (links, indices, active state) |
| `--accent-bright` | `#E8552B` | Canvas strokes, hover fills, large type accents |

One accent only. Accent is used for *state and structure* (section numbers, active nav, hover
underline draw), never as a decorative wash.

### 3.2 Typography (self-hosted — no `next/font/google`)

| Role | Face | Treatment |
|---|---|---|
| Display | **Instrument Serif** 400 (+ italic) | `clamp(2.75rem, 8vw, 7.5rem)`, leading `0.92`, tracking `-0.02em` |
| Body / UI | **Geist Sans** | 16–18px, leading `1.6`, max measure `62ch` |
| Annotation | **Geist Mono** | 11–12px, uppercase, tracking `0.14em`, used for labels only |

All three ship as local font files via npm (`geist`, `@fontsource/instrument-serif`) and are wired
through `next/font/local`. Mono is an *accent* face, never the body face.

### 3.3 Grid & frame

- 12 columns, max width `1440px`, gutter `clamp(20px, 4vw, 64px)`.
- Persistent hairline frame at the container edges (drafting border), `1px` in `--rule`.
- Vertical rhythm in `8px` steps. Section padding `clamp(96px, 14vh, 180px)`.
- Every section opens with the same header pattern: mono number `(01)`, hairline rule that draws
  in from the left, serif title, one-line mono subtitle. Consistency here is what makes the
  asymmetry elsewhere read as intentional.

### 3.4 What we explicitly will not do (anti-slop contract)

- ✗ violet/indigo "tech" gradients, mesh gradients, glow — the #1 AI tell
- ✗ glassmorphism, frosted cards
- ✗ three equal feature cards with rounded-square icon toppers
- ✗ oversized fake stats ("10x", "99%") that aren't in the source content
- ✗ invented testimonials (v4.1 has none — none will be fabricated)
- ✗ emoji as UI
- ✗ Inter as "the safe choice"
- ✗ motion that hides weak hierarchy (nothing animates that isn't load-bearing)
- ✗ parallax on body text

---

## 4. Interaction & motion spec

The signature: **the page draws itself as you scroll.** All motion is scroll-driven or
scroll-triggered, never autoplaying loops (the background being the one exception, and it reacts
to scroll rather than ignoring it).

### 4.1 Global — `DraftingField` canvas background

A fixed `<canvas>` behind all content, `aria-hidden`, `pointer-events: none`:

- A fine drafting grid at very low alpha, with **major/minor line weighting** (every 4th line).
- A **flow field** of short streamline strokes drifting across the grid; each stroke's angle is
  sampled from a cheap value-noise field so the motion is coherent, not random scatter.
- **Scroll coupling:** streamlines accelerate and their brightness rises with scroll velocity, and
  the field rotates a few degrees with scroll direction — the page feels *pulled* through
  space. Velocity decays to rest.
- **Cursor coupling:** a soft radial mask lifts the grid's contrast near the pointer (desktop only,
  disabled on touch).
- **Budget:** DPR capped at 2, ≤ 420 strokes on desktop / 140 on mobile, `requestAnimationFrame`
  paused on `visibilitychange`, full stop under `prefers-reduced-motion` (renders one static frame).
- Fallback: a static CSS grid on the same tokens if canvas context fails.

### 4.2 Section-by-section

| # | Section | Scroll behaviour |
|---|---|---|
| 00 | **Nav + rail** | Fixed thin top bar; left rail shows `01–07` index with the active section marked by an accent tick. Hairline progress line grows with document progress. |
| 01 | **Hero** | Display name revealed line-by-line through an overflow mask (staggered, expo-out). Under it a mono spec strip (`FULL-STACK / DEVOPS / PHILIPPINES / OPEN TO WORK`) that ticks. Portrait sits in a drawing-frame with corner ticks; on scroll it translates slightly slower than the text (image-only parallax). |
| 02 | **Profile** | Two-column: sticky mono label on the left, serif lede on the right that reveals word-group by word-group as it enters. Real details as a spec table — location, focus, current status, CV download. |
| 03 | **Selected Work** | 13 projects as **archive rows**, not a card grid. Each row: index `01`, serif title, stack tags, year/link; on hover the row's cover image is revealed in a follow-preview panel (desktop) or expands inline (mobile). Click opens the gallery modal. Scroll: rows mask-in with a stagger; the section's left column is sticky while the list moves past it. |
| 04 | **Capabilities** | Skills as a **calibration sheet**: 6 category blocks, each row a mono name + a dotted level meter whose dots fill in sequence on enter (staggered `60ms`), with the numeric level counting up. No bordered bars, no percentage pills. |
| 05 | **Experience** | Vertical **flow line** drawn by SVG `stroke-dashoffset` bound to scroll progress through the section; 3 nodes ignite as the line passes them. Bullets reveal per line. Yamaha and ICLICK link out. |
| 06 | **Education & Credentials** | Degree as a spec block; 4 certificates as drawing-index cards with issuer, date, and credential links. Hover raises the card 2px and draws its rule — no shadows beyond a hairline. |
| 07 | **Contact** | Oversized "Let's build something" in serif, email as a copy-to-clipboard control with a mono confirmation, GitHub / LinkedIn / CV as a bordered index list. Footer holds the drawing title block: `PORTFOLIO V5 / ROMNICK SEVILLA / 2026`. |

### 4.3 Motion primitives (shared, not per-section hacks)

`Reveal` (mask + translate), `DrawRule` (scaleX), `Counter` (rAF integer tween), `MeterFill`
(staggered dots), `LineDraw` (SVG path progress), `useScrollVelocity`, `useReducedMotion`.
Every primitive short-circuits to the final state under `prefers-reduced-motion`.

Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out), durations `600–900ms`; stagger `60–80ms`.
Nothing springs, nothing bounces.

---

## 5. Architecture

```
portfolioV5/
├── plan.md                      ← this file (progress log at the bottom)
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── src/
│   ├── app/
│   │   ├── layout.tsx           fonts, metadata, OG, skip link
│   │   ├── page.tsx             section composition only
│   │   ├── globals.css          tokens, base, frame, print
│   │   ├── not-found.tsx        on-brand 404
│   │   ├── error.tsx            on-brand error boundary
│   │   └── loading.tsx
│   ├── components/
│   │   ├── background/DraftingField.tsx
│   │   ├── chrome/  Nav, ScrollRail, Footer, ThemeNote
│   │   ├── motion/  Reveal, DrawRule, Counter, MeterFill, LineDraw
│   │   ├── sections/ Hero, Profile, Work, Capabilities, Experience,
│   │   │            Credentials, Contact
│   │   └── ui/      SectionHeader, MonoLabel, SpecRow, ProjectModal
│   ├── lib/
│   │   ├── content/ profile, experience, education, certifications,
│   │   │            skills, projects, section-order
│   │   ├── hooks/   useScrollVelocity, useReducedMotion, useActiveSection,
│   │   │            usePointerFine
│   │   └── utils.ts cn()
│   └── types/content.ts
└── public/  projects/, profile.webp, og.webp, cv/, favicon/
```

**Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript strict, Tailwind CSS v4
(`@theme` tokens), Framer Motion 12 for orchestration only (the canvas and counters are hand-written
rAF). No UI kit, no component library, no CSS-in-JS.

**Server/client split:** every section is a server component that renders its copy in SSR HTML;
only the interactive leaves (`DraftingField`, `Reveal`, `Counter`, modal, copy button) are
`"use client"`. This keeps the page indexable and the first paint content-full.

---

## 6. Phases & acceptance criteria

### Phase 0 — Recon & content lock ✅
- [x] Inventory v4.1 content and assets; confirm 13 projects / 3 roles / 4 certs / 32 skills
- [x] Stage assets into the new repo (68 WebP screenshots, CV, portrait, OG)
- [x] Commit the roadmap before writing code

### Phase 1 — Scaffold & design system
- [ ] Next 16 + TS strict + Tailwind v4 + Framer Motion, self-hosted fonts
- [ ] Token layer (`@theme`): paper/ink/rule/accent, type scale, spacing, easing
- [ ] Container frame, section header pattern, mono label, spec row primitives
- [ ] `npx next build` green; SSR HTML contains the name and title

### Phase 2 — Motion & background layer
- [ ] `DraftingField` canvas: grid + flow field + scroll velocity + pointer mask + fallbacks
- [ ] Motion primitives with reduced-motion short-circuits
- [ ] Frame-budget check: stable on throttle, no layout thrash, rAF paused when hidden

### Phase 3 — Sections
- [ ] Hero, Profile, Work (archive rows + hover preview), Capabilities, Experience,
      Credentials, Contact
- [ ] All 13 projects render with covers, stacks, links; every v4.1 field represented
- [ ] Project gallery modal wired to the real `projectGallery` arrays (keyboard + ESC + focus trap)

### Phase 4 — Craft pass
- [ ] Responsive at 375 / 768 / 1024 / 1440 / 1920; no horizontal scroll anywhere
- [ ] Type scale re-tuned per breakpoint; serif never orphans a single word
- [ ] Hover/focus states on every interactive element; 44px minimum targets
- [ ] Print stylesheet (portfolio → clean PDF)

### Phase 5 — Quality gates
- [ ] `tsc --noEmit`, `eslint`, `next build` all clean
- [ ] Lighthouse: performance ≥ 90 desktop, ≥ 80 mobile; accessibility ≥ 95; SEO = 100
- [ ] Keyboard-only pass: skip link → nav → work rows → modal → contact
- [ ] Contrast check on every text/background pair (AA)
- [ ] `prefers-reduced-motion` pass: no motion, all content visible

### Phase 6 — Ship
- [ ] README with screenshots, stack, local setup
- [ ] Deploy to Vercel, verify the live URL renders the built commit
- [ ] Update repo description/homepage, link back from profile

---

## 7. Budgets

| Metric | Target |
|---|---|
| LCP (mobile, 4G) | < 2.5s |
| CLS | < 0.05 |
| First-load JS | < 180 KB gzip |
| Canvas frame time | < 8ms on desktop, < 12ms mobile |
| Hero image | ≤ 120 KB (WebP, sized) |
| Gallery images | lazy, explicit width/height, no CLS |

---

## 8. Risks

1. **Canvas jank on low-end Android** — mitigated by stroke-count tiers, DPR cap, and a static
   CSS-grid fallback; verify with CPU throttling.
2. **Gallery payload** — 68 screenshots at 27 MB total. Only covers load with the list; gallery
   images load on modal open, `loading="lazy"`, sized.
3. **Font weight** — three families could cost ~150 KB. Subset to latin, preload only the display
   face; mono/sans are `swap`.
4. **Over-animation** — the fastest way to make this feel like a demo reel. Rule: if a motion
   does not clarify structure or state, it does not ship.
5. **Scope** — 13 projects with galleries is a content job, not a coding job. Build the frame
   first, then fill; never chase a perfect single section while the rest is unbuilt.

---

## 9. Progress log

| Date | Phase | What changed | Commit |
|---|---|---|---|
| 2026-10-22 | 0 | Recon of v4.1 complete; assets staged; roadmap authored | `chore: add build roadmap` |
