# React Developer Portfolio — "Parkour" Edition

A modern, responsive portfolio website for a React web developer, designed as a
**scroll journey**: a winding course is drawn down the page as you scroll, with
a runner that follows your progress from checkpoint to checkpoint.
Built with **React 19**, **Vite**, **GSAP ScrollTrigger** and **Lenis**.

## The wow effects

- **Opening curtain** — a loader counts to 100, then the panels split open to
  reveal the hero
- **Journey path** — an SVG course winds through the whole page, draws itself
  as you scroll, and a rocket travels along it, lighting up section checkpoints
- **Progressive 3D discovery** — every section rises out of the page depth
  (perspective + rotation, scrubbed to your scroll) so the site reveals itself
  scene by scene
- **Pinned horizontal gallery with coverflow** — the Projects section locks to
  the screen, vertical scrolling carries you sideways through the cards, and
  side cards lean away in 3D (with snapping and a live `03 / 06` counter)
- **Buttery smooth scrolling** via Lenis, synced with ScrollTrigger
- **Hero entrance** — masked word-by-word title reveal with 3D rotation, an
  interactive code card that tilts toward your cursor, then layers separate
  with parallax as you scroll away
- **Animated counters**, 3D flip-in stat cards, door-swing timeline cards,
  a skills marquee, magnetic buttons and a cursor glow
- **Lucide icons** everywhere (no emojis) — plus hand-drawn brand SVGs for
  GitHub / LinkedIn / X, since Lucide doesn't ship brand logos

## Also included

- **Dark / light theme** with system preference detection, persisted in `localStorage`
- **Fully responsive** — mobile hamburger menu, fluid typography, adaptive grids
- **Active section highlighting** in the navbar while scrolling
- **Contact form** that opens the visitor's mail client (no backend required)
- **Accessible**: semantic HTML, keyboard navigation, focus styles, ARIA labels —
  and every animation is disabled under `prefers-reduced-motion`
- **SEO ready**: meta description, Open Graph tags

## Getting started

```bash
# install dependencies
npm install

# start the dev server (http://localhost:5173)
npm run dev

# build for production (output in dist/)
npm run build

# preview the production build
npm run preview
```

## Make it yours

All the content lives in **one file**: [`src/data/portfolio.js`](src/data/portfolio.js)

- `profile` — name, role, intro, email, socials, availability badge
- `about` — bio paragraphs and the stats cards
- `skillGroups` — skill categories and technologies
- `projects` — project cards (title, description, tags, gradient colors, links)
- `experience` — the work history timeline
- `navLinks` — navbar entries

Colors, fonts and spacing are defined as CSS custom properties at the top of
[`src/index.css`](src/index.css) — change `--accent-1` / `--accent-2` to re-theme
the whole site.

## Project structure

```
src/
├── components/      # One component per section + shared Icon
├── data/
│   └── portfolio.js # ← all editable content
├── hooks/
│   ├── useActiveSection.js
│   ├── useMagnetic.js
│   ├── useSmoothScroll.js
│   └── useTheme.js
├── lib/
│   └── gsapSetup.js
├── App.jsx
├── index.css        # design system + all styles
└── main.jsx
```

## Deploying

The site is fully static. After `npm run build`, deploy the `dist/` folder to
Netlify, Vercel, GitHub Pages, Cloudflare Pages or any static host.
