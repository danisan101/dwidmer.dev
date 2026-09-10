# dwidmer.dev - Portfolio v2.0

Mein persönliches Portfolio – komplett überarbeitet mit modernem Build-Setup!

## Features

- **Design-System** - Ein Satz Tokens für Farbe, Abstand, Typografie, Radius, Elevation und Bewegung
- **Monochrom** - Streng schwarzweiss, Hell- und Dunkelmodus über dieselben Tokens
- **Eine gemeinsame Basis** - Alle neun Seiten laden `site.css`, keine duplizierten Style-Blöcke
- **Keine Laufzeit-Abhängigkeiten** - Reines HTML, CSS und ES-Module, gebaut mit Vite
- **Lokale Schriften** - Space Mono in zwei Schnitten als woff2, kein externer Font-Dienst
- **Barrierefreiheit** - Skip-Link, Fokus-Ringe, `prefers-reduced-motion`, Inhalt auch ohne JavaScript lesbar
- **SEO** - Strukturierte Daten (Schema.org), Open Graph und Twitter Cards
- **PWA** - Service Worker und Web App Manifest
- **Kontaktformular** - Validierung ohne Farbcodierung, Rückmeldung über Rahmen, Gewicht und Zeichen
- **Lebenslauf** - Als PDF herunterladbar oder direkt druckbar
- **Easter Eggs** - Snake und Tetris
- **Analytics** - Plausible, ohne Cookies

## Tech Stack

- **Build Tool**: Vite
- **Styling**: Handgeschriebenes CSS, modular, ohne Framework
- **JavaScript**: ES6+ Module, keine Laufzeit-Abhängigkeiten
- **Icons**: Inline SVG
- **Fonts**: Space Mono, lokal ausgeliefert

## 📦 Setup & Development

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Öffnet automatisch http://localhost:3000

### Production Build

```bash
npm run build
```

Erstellt optimierte Dateien im `dist/` Ordner.

### Preview Production Build

```bash
npm run preview
```

## Projektstruktur

```
dwidmer.dev/
├── src/
│   ├── css/
│   │   ├── tokens.css          # Design Tokens — einzige Quelle der Wahrheit
│   │   ├── base.css            # Reset, Dokument-Defaults, Fokus, Skip-Link, Punkteraster
│   │   ├── fonts.css           # Space Mono 400/700
│   │   ├── components.css      # Seitenlayout, Karte, Buttons
│   │   ├── navigation.css      # Navigation
│   │   ├── footer.css          # Footer
│   │   ├── site.css            # Gemeinsame Basis — von JEDER Seite geladen
│   │   ├── home.css            # site.css + Startseiten-Abschnitte
│   │   ├── page-project.css    # site.css + Projektseiten
│   │   ├── page-legal.css      # site.css + Impressum und Datenschutz
│   │   ├── hero.css / about.css / projects.css / contact.css
│   │   ├── terminal-styles.css # Der eine verbleibende Fensterrahmen
│   │   ├── games.css           # Snake & Tetris
│   │   └── print.css           # Druckansicht des Lebenslaufs
│   └── js/
│       ├── main.js             # Einstiegspunkt Startseite
│       ├── subpage.js          # Einstiegspunkt aller übrigen Seiten
│       └── modules/
│           ├── theme.js        # Hell/Dunkel, persistent über localStorage
│           ├── navigation.js   # Mobiles Menü, Smooth Scroll, aktiver Zustand
│           ├── typing.js       # Tipp-Animation im Hero
│           ├── parallax.js     # Punkteraster im Hintergrund
│           ├── animations.js   # Scroll-Reveal
│           ├── contact.js      # Formularvalidierung und Versand
│           ├── cv-download.js  # Druck des Lebenslaufs
│           ├── year.js         # Copyright-Jahr im Footer
│           ├── snake.js / tetris.js
│           ├── pwa-features.js / seo.js / analytics.js / performance.js
│           └── utils/logger.js
├── public/
│   ├── fonts/                  # Space Mono 400/700 (woff2)
│   ├── assets/                 # Bilder und Lebenslauf-PDF
│   └── favicon.svg
├── index.html                  # Startseite
├── app.html / monodot.html / katoro.html / website.html
├── impressum.html / app-privacy.html / monodot-privacy.html / katoro-privacy.html
├── package.json
├── vite.config.js
└── README.md
```

## Easter Eggs

- **Snake**: `Ctrl+Alt+Shift+S`
- **Tetris**: `Ctrl+Alt+Shift+T`
- **Console Art**: Öffne die Browser-Konsole

## 🔧 Deployment

Die Website kann auf jedem statischen Hosting deployed werden:

### GitHub Pages
```bash
npm run build
# Deploy den dist/ Ordner
```

### Netlify / Vercel
- Einfach das Repository verbinden
- Build Command: `npm run build`
- Publish Directory: `dist`

## 📝 TODO / Roadmap

- [ ] Blog-Artikel schreiben
- [ ] Echte Testimonials hinzufügen
- [ ] Mehr Projekte dokumentieren
- [ ] PWA Features (Service Worker)
- [ ] Dark/Light Mode Persistenz
- [ ] 3D Background mit Three.js
- [ ] Terminal-Interface Feature

## 📄 License

© 2025 Daniel Widmer. Alle Rechte vorbehalten.

## 🤝 Kontakt

- Website: [dwidmer.dev](https://dwidmer.dev)
- GitHub: [@danisan101](https://github.com/danisan101)
- LinkedIn: [Daniel Widmer](https://www.linkedin.com/in/daniel-widmer-26426a173)
