# portfolioV5

Portfolio of **Romnick S. Sevilla** — full-stack web developer and DevOps
enthusiast. Built as a *drafting table*: warm paper, ink, hairlines and
numbered sheets, with a canvas flow field that reacts to the reader's scroll.

**Live:** https://portfolio-v5-two-alpha.vercel.app
**Predecessor:** [portfolio-v4.1](https://github.com/nick0221/portfolio-v4.1) · https://nickdevs.vercel.app

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, TypeScript strict |
| Styling | Tailwind CSS v4 (`@theme` tokens, no UI kit) |
| Motion | Framer Motion 12 for orchestration; canvas + counters hand-written |
| Type | Instrument Serif (self-hosted), Geist Sans, Geist Mono |
| Hosting | Vercel |

## What is actually custom here

- **`DraftingField`** (`src/components/background/DraftingField.tsx`) — a
  canvas grid rasterised once per resize, with a flow field of short strokes
  whose angle comes from cheap coherent noise, coupled to scroll velocity and
  pointer position. Stroke counts tier by viewport, DPR caps at 2, rAF pauses
  when the tab is hidden, and `prefers-reduced-motion` renders a single static
  frame.
- **Motion primitives** (`src/components/motion/`) — `Reveal`, `MaskLine`,
  `DrawRule`, `Counter`. Every one short-circuits to the final state under
  reduced motion, and the page is fully readable with JS disabled.
- **Work archive** (`src/components/sections/WorkArchive.tsx`) — thirteen
  projects as typographic rows with a cursor-follow preview, rather than a
  card grid. Each row opens a sheet with the real screenshot gallery.
- **Calibration meters** (`SkillMeter.tsx`) — dotted levels that light in
  sequence, in place of percentage bars that imply precision nobody has.

## Structure

```
src/
├── app/            layout (fonts, metadata, JSON-LD), page, 404, error, loading, tokens
├── components/
│   ├── background/ DraftingField canvas
│   ├── chrome/     Nav, ScrollRail, Footer
│   ├── motion/     Reveal, MaskLine, DrawRule, Counter
│   ├── sections/   Hero, Profile, Work, Capabilities, Experience,
│   │               Credentials, Contact + ProjectModal, SkillMeter
│   └── ui/         SectionHeader, ActionLink
├── lib/
│   ├── content/    profile, projects, experience, education,
│   │               certifications, skills, sections, links
│   └── hooks/      useActiveSection, usePointerFine
└── types/          content shapes
```

Content lives in `src/lib/content/*.ts` and is ported from v4.1 — edit there,
never in component markup.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run build
```

Static verification without a Next server (useful in sandboxes where
`next start` cannot bind):

```bash
STATIC_EXPORT=1 npm run build   # emits out/
python3 -m http.server 8088 --directory out
```

## Notes

- Fonts are self-hosted (`geist` + local woff2 for Instrument Serif) — no
  build-time Google Fonts fetch.
- Images ship as pre-sized WebP; galleries are lazy-loaded with fixed aspect
  boxes so nothing shifts.
- A print stylesheet turns the site into a clean document: chrome hidden,
  external links expanded, sections kept whole.

---

Content, copy and screenshots © Romnick S. Sevilla.
