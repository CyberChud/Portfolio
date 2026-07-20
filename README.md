# Portfolio

Zach Mariskanish's cybersecurity / security engineering portfolio. Static HTML, CSS, and a small vanilla-JS theme toggle — no build step, no framework, no dependencies beyond Google Fonts (loaded via CSS) and Formspree (contact form backend).

Live at: https://cyberchud.github.io/Portfolio/index.html

## Local preview

No build step is required. Two options:

**Open directly** — double-click `index.html`, or open it in a browser via `file://`. Every link and asset uses relative paths, so this works for browsing the site as-is.

**Serve locally** (recommended — matches how the deployed site actually behaves, and required if you want to test the contact form's network request):

```
python -m http.server 8000
```

Then visit `http://localhost:8000/index.html`. Any static-file server works the same way (`npx serve`, VS Code's Live Server extension, etc.) — the site has no server-side requirements.

## Repository structure

```
index.html, skills.html, projects.html, certifications.html,
contact.html, experience.html, writing.html   — top-level pages
projects/                                     — one HTML file per case study
css/style.css                                 — the entire design system (single file)
js/main.js                                    — theme toggle only
```

There's no templating: header, nav, and footer are duplicated in every page by hand. See `PORTFOLIO_AUDIT.md` for the reasoning and the tradeoff this implies as more pages get added.

## Deployment

This repo is already configured for GitHub Pages, serving from the `main` branch root (**Settings → Pages** on GitHub). Deployment is:

1. Merge changes into `main` (this work currently lives on the `portfolio-audit-and-redesign` branch — nothing here is live until it's merged).
2. Push `main` to `origin`.
3. GitHub Pages rebuilds automatically, usually within a minute or two. No CI step, no artifact to build — it serves the HTML/CSS/JS files as committed.

Nothing in this repo deploys or publishes automatically as part of local work — merging and pushing `main` are separate, deliberate steps.

## Other docs in this repo

- `PORTFOLIO_AUDIT.md` — architecture audit and the reasoning behind the Phase 1–4 rebuild.
- `CONTENT_TODO.md` — every placeholder currently live on the site (`[ADD ...]`, `[CONTENT NEEDED]`, `[CONFIRM ...]`), consolidated into one checklist.
- `PROJECT_TEMPLATE.md` — a questionnaire to fill out before adding any new project, so new case studies follow the same structure as the existing ones.
