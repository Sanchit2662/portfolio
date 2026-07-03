# Sanchit Kumar — Dev Portfolio

A black terminal / TUI-themed developer portfolio built with React + Vite.
The whole site reads like a terminal session: a typed `whoami` intro, sections
rendered as command output, an `htop`-style skills panel, and projects as `ls -la`.

## Sections
- **about** — typed `whoami` prompt, name, role, CTAs
- **oss** — `git log --merged --oss`: CNCF stats + links to actual merged PRs (Prometheus, Kubescape, Volcano)
- **skills** — `tree skills/ -L 2`: collapsible directory tree of skill groups
- **projects** — `ls -la projects/`: repo rows with **live star counts from the GitHub API**;
  clicking a row opens a mini-terminal popup (README + stack), and its GitHub button
  auto-types `gh repo view … --web` before opening the repo
- **contact** — `ping sanchit --anywhere`: email / GitHub / LinkedIn cards
- **terminal** — a real interactive shell: `help`, `ls projects`, `cat about.md`,
  `open github`, `neofetch`, `theme <green|amber|cyan|light|dark>`, `crt on`, easter eggs
  (`sudo hire sanchit`, `rm -rf /`), ↑/↓ history and Tab completion
- **footer** — `exit 0`

The traffic-light dots actually work: **red** slides the window away but it comes
back ("you can't escape"), **yellow** minimizes it to a taskbar revealing a keyboard
/ command cheatsheet on the desktop (auto-restores in 10s, or click / press any key),
**green** truly maximizes. Global keyboard shortcuts: `/` or `ctrl+k` focus the
terminal, `1–6` jump to sections, `gg`/`G` top/bottom, `t` theme, `c` CRT; inside
the terminal `ctrl+l` clears and `ctrl+c` cancels the line.

The hero also shows a `neofetch`-style system-info card, and the whole site sits
in a bordered terminal window floating on a dot-grid "desktop". A titlebar toggle
(and `theme light|dark`) switches between the black and paper-light themes; theme,
accent and `crt` all persist across visits via localStorage.

## Run locally
```bash
npm install
npm run dev      # start dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the build
```

## Edit your content
All text, links, stats, skills and projects live in **`src/data/content.js`** —
change them there, no need to touch the components. Project rows fetch live
stars by matching the `repo` field to your GitHub repo names (`githubUser` in `PROFILE`).

## Deploy
Fully static. After `npm run build`, deploy `dist/` to any host:
- **Vercel / Netlify** — framework preset "Vite", build `npm run build`, output `dist`.
- **GitHub Pages** — push `dist/` or use an action.

Note: `public/og.svg` is used as the social-preview image. Some platforms
(Twitter/X, Slack) only accept raster OG images — for best results, export it
to a 1200×630 `og.png` and update the `og:image` meta tag in `index.html`.

## Tech
React 18, Vite 5, plain CSS, JetBrains Mono (Google Fonts). Live project stats
via the public GitHub API (cached per session, fails silently offline).
