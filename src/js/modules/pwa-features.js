// PWA Module: links the web app manifest and registers the service worker.
// The site no longer pops up its own "install app" button; browsers still
// offer installation through their own UI because of the manifest.
import { log, error } from '../utils/logger.js';

export function initPWAFeatures() {
    linkManifest();
    registerServiceWorker();
}

function linkManifest() {
    if (document.querySelector('link[rel="manifest"]')) {
        return;
    }

    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = '/manifest.webmanifest';
    document.head.appendChild(manifestLink);
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
