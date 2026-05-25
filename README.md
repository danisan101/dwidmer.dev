# dwidmer.dev - Portfolio v2.0

Persönliches Portfolio mit Vite, modularem CSS und ES-Modulen.

## Features

- **Vite Build System** – schnelle Entwicklung und optimierte Production-Builds
- **Modulares CSS** – organisiert in separate Dateien ([src/css/critical.css](src/css/critical.css) als Bundle-Einstieg)
- **JavaScript Module** – ES6+ Module unter [src/js/](src/js/)
- **Performance**
  - Lazy Loading für Bilder
  - Spiele als separater Chunk, lazy geladen per Tastenkürzel
  - Reduzierte Font-Weights (Space Mono, Orbitron 700/900)
  - `prefers-reduced-motion` für Animationen
- **SEO**
  - Schema.org Person in [index.html](index.html)
  - Dynamische Meta-Beschreibung pro Section ([src/js/modules/seo.js](src/js/modules/seo.js))
  - Open Graph und Twitter Cards
- **Rechtliches**
  - [impressum.html](impressum.html)
  - [datenschutz.html](datenschutz.html) für die Website (Formular, Plausible, LocalStorage)
- **Interaktiv**
  - PowerShell-Intro (einmal pro Session)
  - Theme Hell/Dunkel mit LocalStorage
  - Easter Eggs: Snake `Ctrl+Alt+Shift+S`, Tetris `Ctrl+Alt+Shift+T`
- **Kontaktformular** – Validierung, FormSubmit, Datenschutz-Hinweis
- **CV** – PDF-Download
- **PWA** – Service Worker, [manifest.webmanifest](public/manifest.webmanifest), Favicon/Icons
- **Analytics** – Plausible (privacy-freundlich)

## Tech Stack

- **Build**: Vite 5
- **Styling**: CSS Modules (Imports)
- **JavaScript**: ES Modules
- **Fonts**: lokal (Space Mono, Orbitron)

## Setup

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # dist/
npm run preview
```

## Projektstruktur (Auszug)

```
├── index.html, datenschutz.html, impressum.html
├── src/css/          # critical.css importiert Sektionen
├── src/js/main.js    # Einstieg
├── src/js/modules/   # Feature-Module
├── public/           # Assets, Fonts, SW, Icons
└── vite.config.js
```

## Easter Eggs

- **Snake**: `Ctrl+Alt+Shift+S`
- **Tetris**: `Ctrl+Alt+Shift+T`

## Deployment

GitHub Pages / statisches Hosting: `npm run build`, `dist/` veröffentlichen.

## Roadmap

- [ ] Blog-Artikel (optional, Section derzeit nicht auf der Startseite)
- [ ] Testimonials / Case Studies mit Metriken
- [ ] Dediziertes OG-Bild (1200×630)
- [ ] Three.js-Hintergrund oder Terminal-Interface (optional)

Erledigt: PWA-Basis, Theme-Persistenz, Website-Datenschutz, Favicon, Performance-Aufräumen.

## License

© Daniel Widmer. Alle Rechte vorbehalten.

## Kontakt

- [dwidmer.dev](https://dwidmer.dev)
- [GitHub @danisan101](https://github.com/danisan101)
