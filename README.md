# Minecraft-inspired portfolio

A responsive Minecraft-inspired portfolio with an inventory-style toolkit, animated character, live dual-timezone clock, selectable accent palette, experience switcher, résumé viewer, detailed project case studies, accessible navigation, and a GitHub Pages deployment workflow.

## Make it yours

The main identity, Legal VA specialty, technical skills, and contact details are already personalized for Gerico Alagon. Open `dist/index.html` in a text editor whenever you want to update:

- the introduction or professional roles
- the Gmail, GitHub, LinkedIn, and Instagram links
- the four featured projects and project statistics
- the current quest, previous work experience, and availability status

The colors, spacing, compact single-screen layout, Satoshi typography, case-study layouts, and accent-aware panel hover states are in `dist/styles.css`. The theme switch, daylight-compatible accent palette, dual clocks, animated activity, experience switcher, remembered sound preference, subtle block-style hover sound, copy-email action, current year, and responsive footer behavior are in `dist/script.js`. Sound defaults to on; switching it off is remembered across refreshes. The “Book a Meet” button uses the Cal.com embed configured in `dist/index.html` for `gerico-tl5oic/15min`.

### Portfolio routes

- `/` — compact main portfolio
- `/inventory/` — detailed skills, tools, and usage guide
- `/resume/` — résumé preview and PDF download
- `/allbuilds/` — all four selected builds
- `/builds/fraudops/` — FraudOps case study, gallery, and demo video
- `/builds/nmis/` — NMIS case study, gallery, and user manual
- `/builds/yearbook/` — Yearbook Management System case study
- `/builds/anti-procrastination/` — Anti-Procrastination System case study

Build screenshots and supporting files are organized under `dist/assets/builds`. The résumé PDF and its browser-friendly preview are in `dist/assets/resume`.

### Portrait and animated character

The portrait and Minecraft-style character frames are stored in `dist/assets`:

- `profile-photo.jpg` — player profile portrait
- `avatar-wave.png` — waving hello
- `avatar-work.png` — working at a laptop
- `avatar-coffee.png` — taking a coffee break
- `avatar-sleep.png` — sleeping

The hero automatically cycles through these four activities. The timing and labels can be changed near the `avatarStage` section in `dist/script.js`.

## Create the GitHub repository

This project is configured for the public repository `Gerico_WorkPortfolio` on the GitHub account `gericxonstreakz`.

1. Sign in to GitHub and select **New repository**.
2. Enter `Gerico_WorkPortfolio` as the repository name.
3. Set visibility to **Public** and create the repository without adding starter files.
4. Upload this project’s contents so `.github`, `dist`, and `README.md` are at the top level of the repository.
5. Commit to the `main` branch.
6. Open **Settings → Pages** and set **Source** to **GitHub Actions**.
7. Open the **Actions** tab. The “Deploy portfolio to GitHub Pages” workflow will publish the site.

The first deployment can take a few minutes. Future pushes to `main` deploy automatically.

## Using Git instead of the upload screen

From this project folder, run:

```bash
git init
git add .
git commit -m "Launch portfolio"
git branch -M main
git remote add origin https://github.com/gericxonstreakz/Gerico_WorkPortfolio.git
git push -u origin main
```

Then select **GitHub Actions** under **Settings → Pages**.

The published project URL will be `https://gericxonstreakz.github.io/Gerico_WorkPortfolio/`.

## About the database

This portfolio is static, so it does not need a database. Never put a Neon/PostgreSQL connection string in HTML, CSS, JavaScript, or a public GitHub repository—the password would be visible to everyone. If you later add a guestbook, blog editor, or contact-message storage, place database access behind a server-side API and store the connection string as a secret in that service.
