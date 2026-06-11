# React Developer Portfolio

A modern, responsive portfolio website for a React web developer.
Built with **React 19** and **Vite** — no UI framework, just clean CSS.

## ✨ Features

- **Dark / light theme** with system preference detection, persisted in `localStorage`
- **Fully responsive** — mobile hamburger menu, fluid typography, adaptive grids
- **Scroll animations** — sections reveal on scroll via `IntersectionObserver` (respects `prefers-reduced-motion`)
- **Active section highlighting** in the navbar while scrolling
- **Sections**: Hero, About, Skills, Projects, Experience timeline, Contact form, Footer
- **Contact form** that opens the visitor's mail client (no backend required)
- **Accessible**: semantic HTML, keyboard navigation, focus styles, ARIA labels
- **SEO ready**: meta description, Open Graph tags

## 🚀 Getting started

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

## ✏️ Make it yours

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

## 📁 Project structure

```
src/
├── components/      # One component per section + shared Icon
├── data/
│   └── portfolio.js # ← all editable content
├── hooks/
│   ├── useActiveSection.js
│   ├── useReveal.js
│   └── useTheme.js
├── App.jsx
├── index.css        # design system + all styles
└── main.jsx
```

## 📦 Deploying

The site is fully static. After `npm run build`, deploy the `dist/` folder to
Netlify, Vercel, GitHub Pages, Cloudflare Pages or any static host.
