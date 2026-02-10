// PWA and Homescreen Widget Module
import { log, error } from '../utils/logger.js';

export function initPWAFeatures() {
    log('📱 Initializing PWA Features...');
    
    // Create PWA manifest
    createPWAManifest();
    
    // Add install prompt
    addInstallPrompt();
    
    // Create homescreen widget
    createHomescreenWidget();
    
    // Add service worker
    registerServiceWorker();
    
    log('✅ PWA Features initialized!');
}

function createPWAManifest() {
    if (document.querySelector('link[rel="manifest"]')) {
        return;
    }

    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = '/manifest.webmanifest';
    document.head.appendChild(manifestLink);
}

function addInstallPrompt() {
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Create install button — matches monochrome terminal design
        const installButton = document.createElement('button');
        installButton.textContent = '> App installieren';
        installButton.className = 'pwa-install-btn';
        installButton.style.cssText = `
            position: fixed;
            bottom: 90px;
            left: 20px;
            padding: 0.6rem 1.2rem;
            background: var(--surface-alt, #151515);
            color: var(--light, #ffffff);
            border: 1px solid var(--surface-border-strong, rgba(255,255,255,0.35));
            border-radius: 4px;
            cursor: pointer;
            font-family: 'Space Mono', monospace;
            font-size: 0.8rem;
            letter-spacing: 0.05em;
            z-index: 1000;
            transition: border-color 0.2s ease, opacity 0.2s ease;
        `;

        installButton.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                log(`User response to the install prompt: ${outcome}`);
                deferredPrompt = null;
                installButton.remove();
            }
        });

        installButton.addEventListener('mouseenter', () => {
            installButton.style.borderColor = 'var(--light, #ffffff)';
        });

        installButton.addEventListener('mouseleave', () => {
            installButton.style.borderColor = 'var(--surface-border-strong, rgba(255,255,255,0.35))';
        });

        document.body.appendChild(installButton);

        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (installButton.parentNode) {
                installButton.style.opacity = '0';
                setTimeout(() => installButton.remove(), 300);
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
    if (!('serviceWorker' in navigator)) {
        return;
    }

    if (!import.meta.env.PROD) {
        log('Skipping Service Worker registration in development mode.');
        return;
    }

    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                log('✅ Service Worker registered:', registration);
            })
            .catch((registrationError) => {
                error('❌ Service Worker registration failed:', registrationError);
            });
    });
}
