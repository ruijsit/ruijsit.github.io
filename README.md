# ruijsit.nl

Website van Ruijs IT. Plain HTML, CSS en JavaScript — geen build-stap, geen frameworks. Draait op GitHub Pages.

## Structuur

```
index.html                         One-pager: hero, diensten, over ons, contact
diensten/3cx-voip-support.html     Detailpagina 3CX & VoIP-support (met FAQ)
diensten/pbx-manager.html          Detailpagina PBX Manager
diensten/talkdesk.html             Detailpagina Talkdesk
diensten/jambonz.html              Detailpagina Jambonz
diensten/flowfuse-node-red.html    Detailpagina FlowFuse & Node-RED
assets/css/style.css               Alle styling (kleuren als variabelen bovenaan)
assets/js/main.js                  Taalwissel, mobiel menu, screenshot-tabs
assets/js/i18n.js                  Engelse vertalingen
assets/img/, assets/logo/          Afbeeldingen en logo
```

## Teksten aanpassen (NL/EN)

- **Nederlands** staat direct in de HTML.
- **Engels** staat in `assets/js/i18n.js`, gekoppeld via het `data-i18n="sleutel"` attribuut op het element.
- Attributen (alt-tekst, links, meta description) werken hetzelfde via `data-i18n-alt`, `data-i18n-href`, `data-i18n-content`, enz.
- Nieuwe tekst toevoegen: zet `data-i18n="nieuwe.sleutel"` op het element en voeg `"nieuwe.sleutel": "English text"` toe in `i18n.js`.

De gekozen taal wordt onthouden in de browser. Een link met `?lang=en` opent de site direct in het Engels.

## Nieuwe dienst toevoegen

1. Kopieer een bestaande pagina in `diensten/` en pas de inhoud aan.
2. Voeg een kaart toe in de sectie `#diensten` in `index.html`.
3. Voeg de Engelse teksten toe in `i18n.js`.

Header en footer staan op elke pagina; pas ze bij een wijziging op alle pagina's aan.

## Lokaal bekijken

```
python3 -m http.server 8000
```

Open daarna http://localhost:8000.

## Live zetten op ruijsit.nl

Het domein wijst nu nog naar de oude server. Om het via GitHub Pages te laten lopen:

1. Zet in de repo-instellingen GitHub Pages aan (branch `main`, map `/`).
2. Stel bij *Custom domain* `ruijsit.nl` in (GitHub maakt dan een `CNAME`-bestand aan).
3. Zet de DNS-records van `ruijsit.nl` om naar GitHub Pages en vink *Enforce HTTPS* aan.
