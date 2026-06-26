# Sanchit Kumar — Dev Portfolio

A retro / pixel-art "gamified" developer portfolio in a **dark theme**, built with React + Vite.

## Sections
- **Hero** — name, role, intro, CTAs (View Projects / Hire Me)
- **Player Stats** — skill bars + achievement badges (50+ CNCF PRs, LFX Mentee 2026)
- **Quest Log** — project cards linking to GitHub repos
- **Start Co-op** — contact form (opens your mail client via `mailto:`)
- **Footer** — quick links + social (GitHub, LinkedIn, Email)

## Run locally
```bash
npm install
npm run dev      # start dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the build
```

## Edit your content
All text, links, skills and projects live in **`src/data/content.js`** — change them there,
no need to touch the components.

## Deploy
The site is fully static. After `npm run build`, deploy the `dist/` folder to any host:
- **Vercel / Netlify** — import the repo, framework preset "Vite", build `npm run build`, output `dist`.
- **GitHub Pages** — push `dist/` or use an action.

## Tech
React 18, Vite 5, plain CSS (Google Fonts: Press Start 2P, Space Grotesk, JetBrains Mono).
