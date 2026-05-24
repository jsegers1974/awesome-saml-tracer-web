# Awesome SAML Tracer — Chrome Web Store Listing Copy

Ready-to-paste copy for the Chrome Web Store listing. The Web Store dropped its
dedicated keywords field years ago, so **discovery now comes almost entirely
from the extension name + the description text** — that's why this draft is
keyword-dense. Paste each section into the matching field in the Developer
Dashboard.

---

## 1. Extension name

**Recommended:** keep it as **`Awesome SAML Tracer`**.

The store's listing name is pulled from the `name` field in `manifest.json`, so
changing it means editing the manifest and pushing a new review. Chrome's
program policies also discourage keyword-stuffing the name itself. Keep the name
clean and do the keyword work in the summary and description below.

If you ever do want a descriptive variant, the mildest acceptable form is:

> `Awesome SAML Tracer – SAML & JWT Decoder`

…but the plain name is the safer choice and is fine to ship with.

---

## 2. Summary (short description)

Shown in search results and at the top of the listing. **132-character limit.**

**Recommended (125 chars):**

```
Capture, decode & debug SAML SSO traffic. Automatic SAMLResponse decoding, built-in JWT decoder, HTML reports — 100% private.
```

**Alternate (127 chars):**

```
Capture & decode SAML SSO traffic in Chrome. Automatic SAMLResponse decoding, JWT decoder, HTML reports — 100% local & private.
```

---

## 3. Detailed description

Paste the block below verbatim into the **Description** field. It uses plain
text with CAPS headers and `•` bullets because the Web Store does not render
Markdown — it only preserves line breaks and auto-links URLs. Well under the
16,000-character limit.

```
Debug SAML SSO without the headache.

Awesome SAML Tracer is a modern Chrome extension for capturing, decoding, and sharing SAML single sign-on (SSO) traffic — right inside your browser. Trigger a login and every SAMLRequest and SAMLResponse is decoded the moment it happens: issuer, destination, subject, conditions, status, and a clean, friendly-name attributes table. No more copy-pasting base64 into an online SAML decoder.

A FAMILIAR TOOL, REBUILT FOR TODAY

If you've used the original SAML-tracer, you'll feel right at home. Awesome SAML Tracer is a full-featured, Manifest V3 replacement — it keeps everything that worked and adds the things you always wished it had: a built-in JWT decoder, one-click HTML reports, an errors-only view, and domain highlighting. Exports use the same SAML-tracer JSON capture format, so files move freely between tools and teammates.

KEY FEATURES

• Automatic SAML decoding — SAMLRequest and SAMLResponse messages appear and decode in real time. Redirect and POST bindings are both handled automatically, with the raw XML one click away.
• Friendly attribute table — every SAML attribute is shown by friendly name, full URN, and value, so you can read an assertion like plain English instead of squinting at raw XML.
• Built-in JWT decoder — paste any JSON Web Token to split it into header, payload, and signature, with a Highlights panel that surfaces issuer, audience, expiry, and whether the token has expired.
• Four focused views — switch instantly between SAML-only, All Traffic, Errors (4xx/5xx), and the JWT decoder. A live search bar filters by URL, method, or status.
• One-click sharing — generate a self-contained HTML report, copy a decoded entry as formatted plain text, or export structured JSON. Perfect for support tickets and bug reports.
• SAML-tracer compatible — import and export the same JSON capture format as the original SAML-tracer extension.
• Domain highlighting & pinned info bar — mark your IdP and SP domains with a gold star (wildcards supported), pin the headers and SAML parameters you care about into a copy-ready info bar, and extract tenant or config IDs straight from URL paths.
• DevTools panel — runs as a dedicated panel inside Chrome DevTools, right where you already debug network traffic.

PRIVATE BY DESIGN

Your SAML traffic never leaves your device. Awesome SAML Tracer captures traffic locally and stores it using Chrome's own storage APIs. There are no servers, no analytics, no third-party services, and no tracking — nothing is ever transmitted. The developer can't see your captures, and neither can anyone else. No account and no sign-up required.

WHO IT'S FOR

Identity and access management (IAM) engineers, SSO and identity administrators, security engineers, application developers integrating authentication, IT support and helpdesk teams, and consultants who troubleshoot federated login every day.

WORKS WITH ANY SAML IDENTITY PROVIDER

Awesome SAML Tracer decodes standard SAML 2.0 traffic, so it works with Okta, Microsoft Entra ID (Azure AD), Active Directory Federation Services (ADFS), Ping Identity, OneLogin, Auth0, Google Workspace, Shibboleth, Keycloak, and any other SAML-compliant identity provider (IdP) or service provider (SP).

FREE TO USE

Awesome SAML Tracer is completely free. Requires Chrome 111 or later (Manifest V3).

• Website: https://ast-web.pages.dev/
• How-to guide: https://ast-web.pages.dev/how-to.html
• Source code & issue tracker: https://github.com/jsegers1974/awesome-saml-tracer
• Support the project: https://ko-fi.com/samldev

Install it, pin it to your toolbar, trigger a login, and watch the SAML messages decode themselves.

Awesome SAML Tracer is an independent project and is not affiliated with, or endorsed by, the original SAML-tracer extension or its authors.
```

---

## 4. Other listing fields

- **Category:** `Developer Tools`
- **Language:** English
- **Screenshots:** use the `assets/ast-help-*.png` set (1280×800 or 640×400).
  Suggested order: All Traffic view → SAML decoded view → Settings → Errors
  view. The first screenshot is the most important — make it the decoded SAML
  view if you can, since that's the headline feature.
- **Small promo tile (440×280):** can be built from `assets/awesome-saml-tracer-banner.png`.
- **Store icon:** `assets/icon-128.png`.

---

## 5. Notes & follow-ups

- **SAML-tracer mentions are deliberate but measured.** The name appears only
  where it genuinely helps a reader (positioning + compatibility), plus a clear
  "not affiliated" disclaimer at the end. This taps the existing search demand
  from people who know the original tool without keyword-stuffing a name that
  isn't yours — which keeps you on the right side of Chrome's metadata policy.
- **Keyword coverage** in the description: SAML, SSO, single sign-on, SAMLRequest,
  SAMLResponse, SAML decoder, JWT / JSON Web Token decoder, Manifest V3,
  DevTools, IdP, service provider, IAM, federated login, assertions, plus the
  major identity providers (Okta, Entra ID / Azure AD, ADFS, Ping, OneLogin,
  Auth0, Shibboleth, Keycloak).
- **Beyond the description**, the Web Store listing also needs a single-purpose
  statement and a justification for every permission the extension requests
  (e.g. `webRequest`, `storage`, host permissions). Happy to draft those next —
  they're a common reason listings get held up in review.
