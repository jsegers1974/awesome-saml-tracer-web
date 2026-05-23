# Deploying the Awesome SAML Tracer website

This site is **plain static HTML, CSS and JS** — there is no build step and no
dependencies to install. Deploying it means copying these files onto any static
host. All internal links are **relative**, so the site works whether it's served
from a domain root or a sub-path.

```
.
├── index.html        Home / landing page
├── how-to.html       How-to guide
├── support.html      Support & FAQ
├── privacy.html      Privacy policy
├── css/styles.css
├── js/main.js
├── assets/           logo, icons, favicon, screenshots
├── .nojekyll         tells GitHub Pages to skip Jekyll processing
└── DEPLOY.md         this file
```

Hosting is still to be decided — instructions for the three best free options
are below. All three are free for a site like this; pick on convenience.

---

## Option A — GitHub Pages

Easiest if the site lives in (or beside) the existing GitHub repo.

1. Put these files in a repository — either their own repo, or a `docs/` folder
   or a `gh-pages` branch of the extension repo.
2. On GitHub: **Settings → Pages**.
3. Under **Build and deployment**, set **Source = Deploy from a branch**, choose
   the branch and the folder (`/root` or `/docs`), then **Save**.
4. After a minute the site is live at
   `https://<username>.github.io/<repo>/`.

**Custom domain:** add it under Settings → Pages → Custom domain. GitHub creates
a `CNAME` file and provisions HTTPS automatically.

> Note: GitHub's terms discourage primarily *commercial / transactional* sites.
> A marketing + support site is fine; if you later add checkout or licensing
> logic, move to Cloudflare Pages (see Option B).

---

## Option B — Cloudflare Pages  *(recommended if you plan to monetize)*

Unlimited bandwidth, commercial use allowed on the free tier, and Cloudflare
Workers available later for any license/payment backend.

**Drag-and-drop (no Git needed):**
1. Sign in at <https://dash.cloudflare.com> → **Workers & Pages** → **Create** →
   **Pages** → **Upload assets**.
2. Drag this whole folder in, give the project a name, and **Deploy**.
3. The site is live at `https://<project>.pages.dev`.

**Connect a Git repo (auto-deploys on every push):**
1. **Workers & Pages → Create → Pages → Connect to Git**, pick the repo.
2. **Framework preset:** None. **Build command:** leave empty.
   **Build output directory:** `/` (or the sub-folder containing `index.html`).
3. **Save and Deploy.**

**Custom domain:** Pages project → **Custom domains → Set up a domain**. SSL is
automatic.

---

## Option C — Netlify

Famous for the simplest first deploy.

**Drag-and-drop:**
1. Go to <https://app.netlify.com/drop> and drag this folder onto the page.
2. The site is instantly live on a `*.netlify.app` URL.

**Connect a Git repo:**
1. **Add new site → Import an existing project**, pick the repo.
2. **Build command:** leave empty. **Publish directory:** `/` (or the sub-folder).
3. **Deploy site.**

**Custom domain:** Site configuration → **Domain management → Add a domain**.

> Note: Netlify's free tier caps bandwidth at 100 GB/month and nudges
> commercial projects toward paid plans.

---

## After deploying — two small follow-ups

1. **Chrome Web Store link** — already wired to
   `https://chromewebstore.google.com/detail/pilkjgooejhajccieiebbihilnclbpej`.
   If the listing URL ever changes, find-and-replace that string across the
   four `.html` files.

2. **Social preview (optional)** — the `og:image` and `og:` tags in each page's
   `<head>` use a relative path. For richest link previews on Slack/Twitter/etc.,
   change `og:image` to the **absolute** URL of `assets/icon-128.png` once you
   know your final domain, and add an `og:url` meta tag.

No other configuration is required.
