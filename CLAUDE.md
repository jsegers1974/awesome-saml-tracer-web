# Awesome SAML Tracer — Website

Marketing and support website for the [Awesome SAML Tracer](https://chromewebstore.google.com/detail/pilkjgooejhajccieiebbihilnclbpej) Chrome extension.

## Project structure

All deployable files live inside `awesome-saml-tracer-web/`:

```
awesome-saml-tracer-web/
├── index.html        Landing page
├── how-to.html       How-to guide
├── support.html      Support & FAQ
├── privacy.html      Privacy policy
├── css/styles.css    All styles — plain CSS, no preprocessor
├── js/main.js        Minimal vanilla JS (mobile nav toggle, footer year)
├── assets/           logo.svg, favicon.svg, icon-16/48/128.png, screenshots
├── .nojekyll         Disables Jekyll on GitHub Pages
└── DEPLOY.md         Deployment options (GitHub Pages / Cloudflare Pages / Netlify)
```

## Tech stack

- **Plain static HTML/CSS/JS** — zero build step, zero dependencies, nothing to install.
- CSS uses custom properties (design tokens) defined in `:root` in `styles.css`. Dark mode is handled via `@media (prefers-color-scheme: dark)`.
- JS is a single IIFE in `main.js`; keep it vanilla with no external libraries.
- All internal links are **relative** so the site works from any sub-path.

## Design tokens (css/styles.css)

| Token | Light | Purpose |
|---|---|---|
| `--accent` | `#3367d6` | Brand blue, matches extension |
| `--hero-1/2` | `#0c1124` / `#1a1040` | Dark indigo hero gradient |
| `--radius` | `12px` | Card corner radius |
| `--maxw` | `1120px` | Container max-width |

## Key external links (find-and-replace if they change)

- Chrome Web Store: `https://chromewebstore.google.com/detail/pilkjgooejhajccieiebbihilnclbpej`
- GitHub repo: `https://github.com/jsegers1974/awesome-saml-tracer`
- Ko-fi: `https://ko-fi.com/samldev`

## Deployment

No build command. Publish the `awesome-saml-tracer-web/` directory as-is to any static host. See `awesome-saml-tracer-web/DEPLOY.md` for step-by-step instructions for GitHub Pages, Cloudflare Pages, and Netlify.

## Local development

No build step — just serve the `awesome-saml-tracer-web/` directory over HTTP.

```bash
# Python (nothing to install)
python3 -m http.server 8080 --directory awesome-saml-tracer-web/awesome-saml-tracer-web

# Or with Node/npx
npx serve awesome-saml-tracer-web/awesome-saml-tracer-web
```

Then open `http://localhost:8080` in Chrome. Do not open `.html` files directly via `file://` — browsers block some relative resource loads that way and it won't match production behavior.

## Common tasks

- **Add a new page:** copy an existing `.html` file as a template; update the `<nav>` active link and `<title>`/meta tags.
- **Update screenshots:** drop new PNGs into `assets/` and update the `src` attributes in the relevant HTML files.
- **Change branding color:** update `--accent` and `--accent-hover` in `css/styles.css`.
- **Update the Chrome Web Store URL:** find-and-replace across all four `.html` files.
- **Fix the `og:image` for social previews:** replace the relative `assets/icon-128.png` path with the absolute URL once the final domain is known.
