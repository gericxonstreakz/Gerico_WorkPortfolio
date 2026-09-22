# Gerico Alagon | Work Portfolio

My Minecraft-inspired portfolio brings together my work in fraud and risk operations, virtual assistance, and software engineering.

**Live site:** [gericxonstreakz.github.io/Gerico_WorkPortfolio](https://gericxonstreakz.github.io/Gerico_WorkPortfolio/)

The home page has my profile, work history, selected projects, and contact links. The [Inventory](https://gericxonstreakz.github.io/Gerico_WorkPortfolio/inventory/) lists my skills and tools, and the [Curriculum Vitae page](https://gericxonstreakz.github.io/Gerico_WorkPortfolio/curriculum-vitae/) has a PDF copy of my CV.

## Projects

- [FraudOps](https://gericxonstreakz.github.io/Gerico_WorkPortfolio/builds/fraudops/)
- [NMIS Website](https://gericxonstreakz.github.io/Gerico_WorkPortfolio/builds/nmis/)
- [Yearbook Management System](https://gericxonstreakz.github.io/Gerico_WorkPortfolio/builds/yearbook/)
- [Anti-Procrastination System](https://gericxonstreakz.github.io/Gerico_WorkPortfolio/builds/anti-procrastination/)

The [All Builds page](https://gericxonstreakz.github.io/Gerico_WorkPortfolio/allbuilds/) shows all four together.

## Run locally

From the repository folder:

```bash
python -m http.server 4173 --directory dist
```

Then open [http://127.0.0.1:4173/](http://127.0.0.1:4173/).

The site uses HTML, CSS, and JavaScript in `dist/`. Images, project files, and the Curriculum Vitae are in `dist/assets/`. It is static and does not connect to a database.

Pushes to `main` publish the `dist` folder through the GitHub Pages workflow in `.github/workflows/deploy.yml`.
