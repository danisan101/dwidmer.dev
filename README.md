# dwidmer.dev - Portfolio v2.0

Mein persönliches Portfolio – komplett überarbeitet mit modernem Build-Setup!

## 🚀 Features

- ✅ **Vite Build System** - Schnelle Entwicklung & optimierte Production-Builds
- ✅ **Modulares CSS** - Organisiert in separate Dateien für bessere Wartbarkeit
- ✅ **JavaScript Module** - Clean Code mit ES6+ Modulen
- ✅ **Performance-Optimierungen**
  - Lazy Loading für Bilder
  - Optional CRT-Effekte (Toggle)
  - Code Splitting
  - Asset Minification
- ✅ **SEO-Optimiert**
  - Strukturierte Daten (Schema.org)
  - Dynamische Meta-Tags
  - Open Graph & Twitter Cards
- ✅ **Interactive Features**
  - Mouse Parallax Effect
  - Animated Statistics Counter
  - Skill Progress Visualizations
  - Smooth Theme Transitions
  - Easter Eggs (Snake & Tetris)
- ✅ **Blog Section** (Ready for Content)
- ✅ **Code Showcase** with Syntax Highlighting
- ✅ **Testimonials Section**
- ✅ **Besseres Kontaktformular**
  - Real-time Validation
  - Smooth Feedback
  - Confetti Animation on Success
- ✅ **CV Download** als PDF (Fixed!)
- ✅ **Privacy-Friendly Analytics** (Plausible)

## 🛠 Tech Stack

- **Build Tool**: Vite
- **Styling**: Pure CSS (modular)
- **JavaScript**: ES6+ Modules
- **Animations**: CSS + Canvas
- **Icons**: SVG
- **Fonts**: Google Fonts (Space Mono, Orbitron)

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

## 📁 Projektstruktur

```
dwidmer.dev/
├── src/
│   ├── css/
│   │   ├── main.css           # Main CSS Entry Point
│   │   ├── reset.css          # Reset & Base Styles
│   │   ├── effects.css        # CRT & Parallax Effects
│   │   ├── navigation.css     # Navigation Styles
│   │   ├── components.css     # Reusable Components
│   │   ├── hero.css           # Hero Section
│   │   ├── about.css          # About Section
│   │   ├── projects.css       # Projects Grid
│   │   ├── contact.css        # Contact Form
│   │   ├── games.css          # Snake & Tetris
│   │   ├── blog.css           # Blog Section
│   │   ├── code-showcase.css  # Code Editor
│   │   └── footer.css         # Footer
│   └── js/
│       ├── main.js            # Main JS Entry Point
│       └── modules/
│           ├── loading.js
│           ├── typing.js
│           ├── theme.js
│           ├── crt-toggle.js
│           ├── navigation.js
│           ├── parallax.js
│           ├── animations.js
│           ├── lazy-loading.js
│           ├── contact.js
│           ├── cv-download.js
│           ├── snake.js
│           ├── tetris.js
│           ├── seo.js
│           └── analytics.js
├── assets/
│   ├── me1.png
│   ├── schaellesau.png
│   └── website.png
├── index.html
├── app.html
├── website.html
├── app-privacy.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎮 Easter Eggs

- **Snake**: `Ctrl+Alt+Shift+G`
- **Tetris**: `Ctrl+Alt+Shift+T`
- **CRT Toggle**: Button in Navigation
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
