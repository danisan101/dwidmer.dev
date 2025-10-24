// PWA and Homescreen Widget Module
export function initPWAFeatures() {
    console.log('📱 Initializing PWA Features...');
    
    // Create PWA manifest
    createPWAManifest();
    
    // Add install prompt
    addInstallPrompt();
    
    // Create homescreen widget
    createHomescreenWidget();
    
    // Add service worker
    registerServiceWorker();
    
    console.log('✅ PWA Features initialized!');
}

function createPWAManifest() {
    const manifest = {
        name: "Daniel Widmer - Portfolio",
        short_name: "DW Portfolio",
        description: "Creative Developer & Digital Artist Portfolio",
        start_url: "/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#000000",
        orientation: "portrait-primary",
        icons: [
            {
                src: "/favicon.ico",
                sizes: "192x192",
                type: "image/x-icon"
            },
            {
                src: "/favicon.ico",
                sizes: "512x512",
                type: "image/x-icon"
            }
        ],
        categories: ["portfolio", "developer", "creative"],
        lang: "de",
        scope: "/",
        id: "dwidmer-portfolio"
    };
    
    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = 'data:application/json,' + encodeURIComponent(JSON.stringify(manifest));
    document.head.appendChild(manifestLink);
}

function addInstallPrompt() {
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Create install button
        const installButton = document.createElement('button');
        installButton.textContent = '📱 App installieren';
        installButton.style.cssText = `
            position: fixed;
            bottom: 90px;
            left: 20px;
            padding: 12px 20px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-family: 'Space Mono', monospace;
            font-size: 0.9rem;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
        `;
        
        installButton.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`User response to the install prompt: ${outcome}`);
                deferredPrompt = null;
                installButton.remove();
            }
        });
        
        installButton.addEventListener('mouseenter', () => {
            installButton.style.transform = 'scale(1.05)';
            installButton.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';
        });
        
        installButton.addEventListener('mouseleave', () => {
            installButton.style.transform = 'scale(1)';
            installButton.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
        });
        
        document.body.appendChild(installButton);
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (installButton.parentNode) {
                installButton.remove();
            }
        }, 10000);
    });
}

function createHomescreenWidget() {
    // Create widget data for when app is installed
    const widgetData = {
        name: "Daniel's Portfolio",
        description: "Quick access to portfolio and contact",
        icon: "🤖",
        shortcuts: [
            {
                name: "Kontakt",
                short_name: "Contact",
                description: "Kontaktformular öffnen",
                url: "/#contact",
                icons: [{ src: "/favicon.ico", sizes: "96x96" }]
            },
            {
                name: "Projekte",
                short_name: "Projects",
                description: "Projekte anzeigen",
                url: "/#projects",
                icons: [{ src: "/favicon.ico", sizes: "96x96" }]
            },
            {
                name: "Spiele",
                short_name: "Games",
                description: "Snake & Tetris spielen",
                url: "/#games",
                icons: [{ src: "/favicon.ico", sizes: "96x96" }]
            }
        ]
    };
    
    // Add widget meta tags
    const widgetMeta = document.createElement('meta');
    widgetMeta.name = 'mobile-web-app-capable';
    widgetMeta.content = 'yes';
    document.head.appendChild(widgetMeta);
    
    const appleMeta = document.createElement('meta');
    appleMeta.name = 'apple-mobile-web-app-capable';
    appleMeta.content = 'yes';
    document.head.appendChild(appleMeta);
    
    const appleStatusBar = document.createElement('meta');
    appleStatusBar.name = 'apple-mobile-web-app-status-bar-style';
    appleStatusBar.content = 'black-translucent';
    document.head.appendChild(appleStatusBar);
}

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        const swCode = `
            const CACHE_NAME = 'dwidmer-portfolio-v1';
            const urlsToCache = [
                '/',
                '/index.html',
                '/src/css/critical.css',
                '/src/js/main.js',
                '/favicon.ico'
            ];
            
            self.addEventListener('install', (event) => {
                event.waitUntil(
                    caches.open(CACHE_NAME)
                        .then((cache) => cache.addAll(urlsToCache))
                );
            });
            
            self.addEventListener('fetch', (event) => {
                event.respondWith(
                    caches.match(event.request)
                        .then((response) => {
                            if (response) {
                                return response;
                            }
                            return fetch(event.request);
                        })
                );
            });
        `;
        
        const blob = new Blob([swCode], { type: 'application/javascript' });
        const swUrl = URL.createObjectURL(blob);
        
        navigator.serviceWorker.register(swUrl)
            .then((registration) => {
                console.log('✅ Service Worker registered:', registration);
            })
            .catch((error) => {
                console.log('❌ Service Worker registration failed:', error);
            });
    }
}
