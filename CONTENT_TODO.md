# Content To-Do

Everything below is needed from you to replace a placeholder currently live on the site, or to confirm a judgment call made during the Phase 2–4 rebuild. Nothing fabricated is published — every gap is marked in-page with `[ADD ...]` / `[CONTENT NEEDED]` / `[CONFIRM ...]` so it's visible to anyone reading the site, not just here.

## Blockers / decisions needed first

- **Formspree contact form** (`contact.html`) — not submitted-to during this work, since that sends a real notification through your Formspree account. Either say it's OK to send one real test message, or confirm it works from your Formspree dashboard yourself.
- **Digital forensics & network-analysis skills** — the original site listed forensics tooling (Sleuth Kit, Autopsy, FTK Imager, EaseUS) and broader compliance/malware-analysis claims. The new `skills.html` follows your brief's specific three-tier lists, which didn't include forensics tooling or compliance work, so those were dropped from the live page rather than guessed at. If you want digital forensics represented, tell me which tier it belongs in (professional / hands-on lab / drop) and I'll add it back with real evidence links if any exist.
- **GitHub profile link** (`contact.html`) — I linked `github.com/CyberChud` since that's the account hosting this repo. Confirm that's the profile you want public, or give me a different one.

## Homepage (`index.html`)

- Security Reporting & Automation featured card is tagged `[CONFIRM STATUS]` — is it Completed, Ongoing, or should it be marked In Development like the Infrastructure Security Lab?

## Experience (`experience.html`)

- `[ADD ROLE TITLE]`, `[ADD COMPANY NAME]`, `[ADD DATE RANGE]`
- 2–3 sentence role summary
- Any additional verified contributions beyond the ones already listed (drawn from your own prior site content: MPT engagements, vulnerability assessment/CVE analysis, security risk reporting, Python automation, cloud connector support)
- A verifiable outcome/metric (number of engagements, reports produced, etc.), if you're comfortable publishing one

## Certifications (`certifications.html`)

- CompTIA Security+ verification URL
- Confirm exact exam objectives/domains for the version you took (SY0-601 vs SY0-701) — the page currently uses a generic, safely-true description rather than guessing
- Badge image, only if CompTIA's usage terms allow publishing it

## Contact (`contact.html`)

- LinkedIn URL (nothing currently links to LinkedIn anywhere on the site)

## Micro Penetration Testing (`projects/micro-pentest.html`)

- A specific technical/process challenge — described without exposing any client-confidential detail
- Lessons learned
- Future improvements
- A publishable result/metric (e.g. engagement count, common finding categories, turnaround time) — only if it doesn't expose client information
- A sanitized screenshot (tool output or report excerpt) with all client-identifying info removed

## Endpoint Monitoring & Detection Lab (`projects/endpoint-monitoring.html`)

- Specific test events used to validate detection (e.g. simulated file tampering, failed-login bursts) and how alerts were verified
- A result/metric (custom rules written, alert types detected, build time)
- Lessons learned
- Screenshots: Wazuh dashboard, a triggered alert, an FIM detection event
- Repository link, if this lab's config is published anywhere

## Security Reporting & Automation (`projects/security-reporting-automation.html`)

- Confirm current status (Completed / Ongoing / In Development)
- 2–3 sentence overview of the specific problem this solved
- A result/metric (time saved per report, report volume processed)
- Specific Python libraries/frameworks used
- Screenshot of sample output (sanitized) or a simple pipeline diagram
- Repository link, if this can be published
- **Open question from the audit:** I found no source material for this project anywhere in the repo. Everything currently on the page is the safe, high-level description language from your own brief — if there's a real script/repo to describe more specifically, point me to it.

## Infrastructure Security Lab (`projects/infrastructure-security-lab.html`)

- Threat model — what it defends against, what's explicitly out of scope
- Build-phase breakdown
- Current progress
- Next milestone
- Diagram/screenshots once the build actually starts

## Client Website (`projects/client-website.html`)

- Screenshot — only if the client (Gem Box) has approved sharing images of their site publicly

## This Portfolio Site (`projects/portfolio-site.html`)

- Before/after screenshot comparing the original design to the current one

## Not yet started

- **Writing** (`writing.html`) — all 8 topics are marked "Planned." None are drafted. No fake completed articles were written, per your instructions.
- **Résumé** — still linked as a Google Drive share URL rather than a same-origin file, so the "View Résumé" button can't be a true one-click download. Commit a PDF into the repo if you want that fixed, or confirm the Drive link is fine as-is.

## Cross-cutting (not yet touched — flagged in `PORTFOLIO_AUDIT.md`, still open)

- Favicon
- Open Graph / Twitter Card images and tags
- Canonical URLs
- `robots.txt` / `sitemap.xml`
- Structured data (Person / CreativeWork)
