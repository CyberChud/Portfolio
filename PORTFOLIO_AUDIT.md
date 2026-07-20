# Portfolio Audit

Branch: `portfolio-audit-and-redesign`
Audited: live site at https://cyberchud.github.io/Portfolio/index.html and local source in this repo (`old-portfolio/`, matches deployed `main`).
Scope: Phase 1 of the redesign brief in `prompt for claude.txt` — inspection only, no content or design changes made yet.

---

## 1. Current repository architecture

- **Stack:** Hand-written static HTML/CSS/JS. No build step, no framework, no package.json. Fully GitHub Pages-compatible as-is (served from `main` at repo root, project page path `/Portfolio/`, not a custom domain).
- **Pages (7 HTML files, 10 incl. project subpages):**
  - `index.html`, `skills.html`, `projects.html`, `certifications.html`, `contact.html`
  - `projects/micro-pentest.html`, `projects/endpoint-monitoring.html`, `projects/client-website.html`, `projects/portfolio-site.html`
- **Shared assets:** `css/style.css` (one stylesheet, ~550 lines), `js/main.js` (27 lines, theme toggle only).
- **No images, no favicon, no manifest, no robots.txt, no sitemap.xml, no README, no CNAME, no `.nojekyll`.** Confirmed via full-repo grep — zero `<img>`, `aria-*`, `role=`, `og:`, `twitter:`, `canonical`, or `favicon` occurrences anywhere in the codebase.
- **Design system:** Monochrome "Nothing"-inspired — Space Grotesk (body/UI) + Space Mono (labels/mono) + Doto (dot-matrix display headline), CSS custom properties for a dark/light theme pair, numbered/labeled sections, hairline borders, pill buttons. Fonts loaded via `@import` in `style.css` from Google Fonts CDN — the only external dependency besides Formspree.
- **Theme system:** `data-theme="light"` attribute on `<html>`, toggled by `js/main.js`, persisted to `localStorage`. An inline script in every `<head>` reads `localStorage` before CSS loads to prevent a flash of the wrong theme — this is duplicated verbatim across all 10 pages.
- **Navigation:** Identical 5-item nav (`Home / Skills / Projects / Certifications / Contact`) hard-coded into every page's `<header>`, with the current page's link manually marked `class="active"`. No includes, no templating — every page carries a full copy of header, nav, and footer markup.
- **Forms:** One contact form (`contact.html`) posting to a live Formspree endpoint (`https://formspree.io/f/mayrzylb`). Not tested end-to-end in this pass (would send a real submission to a third-party service) — see Open Items.
- **Content model:** Everything is inline in HTML. No CMS, no data files, no per-project templating — each project subpage is a hand-written one-off article with its own ad hoc heading structure.

## 2. Existing strengths

- Consistent, well-executed visual identity — the dot-matrix "Doto" headline, mono labels, and hairline-bordered rows genuinely read as "instrument panel," not generic dev-portfolio.
- FOUC-safe theme switching (inline pre-CSS script) — verified live, no flash on load or toggle.
- Zero console errors or warnings from the site's own code (verified on the live deployment).
- Zero client-side dependencies beyond Google Fonts + Formspree — nothing to audit for supply-chain risk, no framework version drift.
- Internal links are all correct — every nav link, project card link, and back-link resolves to a real file; no 404s found.
- Mobile layout has a real (if minimal) responsive strategy: fluid `clamp()` type scale plus one `max-width: 600px` breakpoint that stacks nav/rows/link-rows into single columns. No JS-driven hamburger menu, which is appropriate for this content volume.
- Form fields use proper `<label for>` associations and `required` attributes — no ARIA needed for basic correctness there.
- Copy is honest already in tone (no fabricated metrics found), which fits the new positioning goal — this is a messaging/structure problem more than a "walk back false claims" problem.

## 3. UX problems

- **Positioning mismatch:** Hero and meta description both foreground "Cybersecurity Services & Micro-Penetration Testing," which reads as a freelance-services offering, not a security-engineering job candidate. This is the core issue the repositioning phase needs to fix.
- **No Featured Work / proof section on the homepage** — a recruiter has to click into Projects to see anything concrete. The brief's "15 seconds to understand direction" goal isn't met by the current homepage.
- **Projects index is a bare link list** — no status, category, tech stack, or outcome visible until you click in. All 4 items are visually equal weight, including a general web-dev client project that competes for attention with the security work.
- **No Experience or Writing pages/nav items exist yet** — both are net-new per the brief.
- **Résumé button is misleading:** `index.html:40` sets `download` on an `<a>` pointing at a Google Drive share URL. The `download` attribute is ignored by browsers for cross-origin URLs, so the button doesn't actually trigger a download — it opens Drive's viewer. Needs either a same-origin PDF or corrected UX (labeled "View Résumé," opens in new tab).
- **Inconsistent inline styling:** several pages hand-tune spacing with `style="margin-top: var(--space-sm)"` etc. directly on elements (e.g. every page's `<h1 class="display-md" style="...">`) instead of a class. Works fine visually but is copy-paste debt that will compound as more pages are added.

## 4. Content problems

- Site-wide framing centers on penetration-testing services rather than the target infrastructure/vulnerability-management/security-engineering direction.
- No Experience page — professional background is absent from the site entirely today; only exists in the linked résumé.
- Skills page presents everything as flat, equal-confidence claims (e.g., "Malware analysis," "Regulatory compliance — GDPR, HIPAA," AWS IAM configuration) with no distinction between professional experience, personal-lab work, and things merely exposed to. The brief specifically wants this three-tier honesty split.
- Certifications page has one credential (Security+, March 2024) and a vague "additional certifications in progress" line with nothing concrete behind it.
- No case-study depth anywhere — the two security projects (`micro-pentest.html`, `endpoint-monitoring.html`) are solid starting points but lack the full structure the brief wants (objective, environment, decisions/tradeoffs, results, lessons learned, screenshots/diagrams — all currently absent).
- `client-website.html` (Tailwind/GSAP marketing site for a friend) is a general web-dev project displayed with equal visual priority to the security work, which the brief explicitly says to avoid.
- No "Currently Building" / "Active Learning" content exists — nothing communicates forward trajectory (IaC, Linux hardening, network segmentation, etc.).
- No Writing/Notes section exists.
- Personal ZIP code (`15234`) is published in plaintext on both `index.html` and `contact.html` — the brief asks for city/state-level only ("Pittsburgh, Pennsylvania").

## 5. Accessibility issues

- **Color contrast fails on secondary text, in both themes** (verified visually on the live site in addition to computing contrast ratios from the CSS custom properties):
  - `--text-disabled` (`#666` dark / `#999` light) is used for default-state nav links, `.caption`, and the project-card arrow. Computed contrast against the page background is **~3.66:1 in dark mode and ~2.61:1 in light mode** — both fail WCAG AA's 4.5:1 minimum for normal-size text (nav links and captions are 11–12px, not "large text").
  - `--interactive` light-mode value (`#007AFF` on `#FFFFFF`) computes to **~4.03:1**, also just under the 4.5:1 AA threshold for the body-sized email/article links that use it.
- **Heading structure is incomplete:** on `index.html`, the "About" and "Focus Areas" sections use `<span class="label">` instead of `<h2>` — a screen-reader user navigating by heading will skip these sections entirely. Project/skills/certifications pages do use real `<h1>`/`<h2>` correctly, so this is localized but real.
- **No `prefers-reduced-motion` handling anywhere** in `style.css`, despite `html { scroll-behavior: smooth }` and multiple `transition` rules. Current motion is subtle (opacity/color/border transitions, no large-scale animation), so the risk is low, but the brief explicitly asks for reduced-motion compatibility and there's currently zero accommodation.
- **No skip-to-content link** — keyboard users must tab through the full header/nav on every page load to reach main content.
- **No `aria-current="page"`** on the active nav link — it's conveyed visually only (`class="active"` + color + underline), not exposed to assistive tech. `nav` also has no `aria-label` (minor, since there's only one nav landmark per page).
- Focus states rely entirely on browser defaults — functional (no `outline: none` anywhere), but not verified against the dark theme's near-black surface, and not enhanced per the brief's "clear focus styles" ask.

## 6. Technical debt

- **Full header/nav/footer/theme-script duplication across all 10 pages.** Any nav change (adding Experience/Writing, per the brief) means editing 10 files by hand. With this repo intentionally staying build-free and GitHub Pages-only, the realistic options are: (a) keep duplicating carefully — fine at current scale, or (b) add a minimal no-build include mechanism (e.g., a tiny fetch-based partial loader, or GitHub Pages' native Jekyll `_includes` since Pages supports Jekyll natively without a custom build step). Recommend deciding this explicitly before Phase 3 adds ~4+ new pages, rather than defaulting to more copy-paste.
- **Fonts loaded via CSS `@import`** (`style.css:6`) rather than `<link rel="preload/stylesheet">` in `<head>` — `@import` is render-blocking in a way that delays font discovery until the stylesheet itself has been fetched and parsed, costing a full extra round-trip on first load. No `preconnect` to `fonts.googleapis.com`/`fonts.gstatic.com` either.
- **No SEO/sharing infrastructure at all:** no meta descriptions on 9 of 10 pages (only `index.html` has one), no canonical URLs, no Open Graph/Twitter Card tags, no favicon, no structured data, no `robots.txt`, no `sitemap.xml`. All explicitly requested in the brief.
- **Scattered inline `style=""` attributes** instead of utility classes for one-off spacing — low risk but inconsistent with the brief's "avoid inline styles" guidance.
- **No `.gitignore`/README/LICENSE** — not urgent, but worth adding a minimal README with local-preview and deploy instructions per the brief's final-deliverables requirement.

## 7. Proposed changes (high-level, matching brief phases)

- **Phase 2 (positioning/nav):** Rewrite hero, About, and meta description around security-engineering/vulnerability-management/automation positioning; add Experience and Writing to nav; fix the heading-structure gap on the homepage; decide on the nav-duplication approach before adding new pages.
- **Phase 3 (project storytelling):** Rebuild Projects index with status/category/tech-stack per card, grouped by category, with `client-website.html` de-emphasized relative to the security projects; define one reusable case-study section template and apply it to the two existing security case studies; add Security Reporting & Automation and Infrastructure Security Lab (IN DEVELOPMENT) as new project shells.
- **Phase 4 (evidence/credibility):** Restructure Skills into the three-tier (Professional / Personal-project / Currently learning) model; expand Certifications with issuer/date/verification-link fields; add the new Experience page; add a homepage "Currently Building" section.
- **Cross-cutting:** add favicon + basic OG/Twitter tags + meta descriptions + canonical URLs + `robots.txt`/`sitemap.xml`; fix the two contrast failures by darkening/lightening the disabled-text tokens (or reserving them for strictly decorative use and promoting real secondary text to `--text-secondary`); add a `prefers-reduced-motion` block; add a skip-link and `aria-current="page"`; replace the ZIP code with "Pittsburgh, Pennsylvania"; fix or relabel the résumé button.

## 8. Assumptions

- The deployed site (`cyberchud.github.io/Portfolio`) and this repo's `main` branch are the same content — confirmed by diffing local files against the live DOM/text for the homepage.
- `new-site/` (sibling folder, untracked by git) is an exact, unmodified copy of this repo with no independent changes — confirmed via `diff -rq`. Treating this repo (`old-portfolio/`, the one with git history and the GitHub remote) as the actual working copy going forward; `new-site/` appears to be a leftover duplicate rather than a divergent branch of work.
- The Formspree endpoint (`mayrzylb`) was **not submitted to** during this audit, since doing so sends a real notification through a third-party service tied to your account — confirming it works requires either your say-so to submit a real test message, or you confirming from the Formspree dashboard directly.
- No images/diagrams exist anywhere in the repo, so every visual (architecture diagrams, screenshots, certification badge) referenced in the brief will need to be created or supplied from scratch — none can be "improved," only added net-new.
- Contrast numbers above are computed from the CSS custom property values using the standard WCAG relative-luminance formula, cross-checked against a visual read of the live site in both themes — not run through an automated axe/Lighthouse pass in this session.

## 9. Content I still need from you

Tracked in full in `CONTENT_TODO.md` (to be created in Phase 4 per the brief) — flagging the immediate blockers here:
- Confirmation on the Formspree form: OK to send one real test submission, or will you verify it from your Formspree dashboard yourself?
- GitHub repo links (if any) for the Wazuh lab and the reporting-automation project — currently no `[repo link]` exists anywhere in the projects.
- Whether "Security Reporting and Automation" has real source material in *any* repo to draw from, or needs to be written from a from-scratch description you provide.
- Verified employment dates/titles/companies for the new Experience page.
- LinkedIn URL (not present anywhere currently).
- Certification verification URL for Security+, if you want it linked.
- Any real screenshots/diagrams for the Wazuh lab (architecture, alert examples) — currently zero images exist in the repo.
- Decision on the résumé link: keep the Google Drive link (and fix the button copy/behavior), or commit a PDF into the repo so `download` actually works same-origin.

---

**Next step (not yet started):** Phase 2 — homepage repositioning and navigation changes — pending your review of this audit.
