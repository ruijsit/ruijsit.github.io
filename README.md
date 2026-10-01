# ruijsit.nl

Website of Ruijs IT. Plain HTML, CSS and JavaScript: no build step, no frameworks. Built to run on GitHub Pages.

## Structure

```
index.html                         One-page site: hero, services, about, contact
diensten/3cx-voip-support.html     Service page: 3CX & VoIP support (with FAQ)
diensten/pbx-manager.html          Service page: PBX Manager
diensten/talkdesk.html             Service page: Talkdesk
diensten/jambonz.html              Service page: Jambonz
diensten/flowfuse-node-red.html    Service page: FlowFuse & Node-RED
assets/css/style.css               All styling (colours and sizes as variables at the top)
assets/js/main.js                  Language switch, mobile menu, screenshot tabs
assets/js/i18n.js                  English translations
assets/img/, assets/logo/          Images and logo (og-image.jpg = social sharing preview)
404.html                           "Page not found" page (served by GitHub Pages)
robots.txt, sitemap.xml            For search engines
```

## Editing text (Dutch/English)

- **Dutch** is the default language and lives directly in the HTML.
- **English** lives in `assets/js/i18n.js`, linked to an element through its `data-i18n="key"` attribute.
- Attributes (alt text, links, meta description) work the same way via `data-i18n-alt`, `data-i18n-href`, `data-i18n-content`, etc.
- To add new text: put `data-i18n="new.key"` on the element and add `"new.key": "English text"` to `i18n.js`.

The chosen language is remembered in the visitor's browser. A link with `?lang=en` opens the site in English directly.

## Adding a service

1. Copy an existing page in `diensten/` and change its content.
2. Update the `<head>`: title, description, canonical URL, `og:` tags and the JSON-LD block.
3. Add a card to the `#diensten` section in `index.html`.
4. Add the page to the footer links on every page and to `sitemap.xml`.
5. Add the English texts to `i18n.js`.

The header and footer are repeated on every page; when you change them, update all pages.

## SEO

Every page has:

- a unique `<title>` and meta description (Dutch, with English in `i18n.js`);
- a canonical URL on `https://ruijsit.nl/`;
- Open Graph and Twitter tags for link previews, using `assets/img/og-image.jpg`;
- structured data (JSON-LD): the company (`ProfessionalService`) on the homepage, `Service` or `SoftwareApplication` plus a breadcrumb on each service page, and `FAQPage` on the 3CX & VoIP support page.

Search engines index the Dutch version. The English version is a language switch on the same URL, so it isn't indexed separately.

After going live, submit `https://ruijsit.nl/sitemap.xml` in Google Search Console and Bing Webmaster Tools. When you change a page, update its `<lastmod>` date in `sitemap.xml`.

## Previewing locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Going live on ruijsit.nl

To serve the site from GitHub Pages on the ruijsit.nl domain:

1. Enable GitHub Pages in the repository settings (branch `main`, folder `/`).
2. Set *Custom domain* to `ruijsit.nl` (GitHub then creates a `CNAME` file).
3. Point the DNS records of `ruijsit.nl` to GitHub Pages and tick *Enforce HTTPS*.
