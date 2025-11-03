// Analytics Module - Plausible Integration (Privacy-Friendly)
import { log } from '../utils/logger.js';

export function initAnalytics() {
    // Check if user has consented (if needed)
    // const hasConsent = localStorage.getItem('analyticsConsent');
    // if (!hasConsent) return;
    
    // Add Plausible script
    if (!document.querySelector('script[data-domain="dwidmer.dev"]')) {
        const script = document.createElement('script');
        script.defer = true;
        script.setAttribute('data-domain', 'dwidmer.dev');
        script.src = 'https://plausible.io/js/script.js';
        document.head.appendChild(script);
    }
    
    // Track custom events
    trackPageInteractions();
}

function trackPageInteractions() {
    // Track CTA clicks
    document.querySelectorAll('.cta-button').forEach(btn => {
        btn.addEventListener('click', () => {
            trackEvent('CTA Click', { button: btn.textContent });
        });
    });
    
    // Track project clicks
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.project-title')?.textContent || 'Unknown';
            trackEvent('Project Click', { project: title });
        });
    });
    
    // Track form submissions
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', () => {
            trackEvent('Form Submit', { form: 'contact' });
        });
    }
    
    // Track Easter Egg activations
    document.addEventListener('keydown', (e) => {
        if (e.shiftKey && e.altKey && e.ctrlKey) {
            const key = e.key.toLowerCase();
            if (key === 's') {
                trackEvent('Easter Egg', { game: 'snake' });
            } else if (key === 't') {
                trackEvent('Easter Egg', { game: 'tetris' });
            }
        }
    });
}

function trackEvent(eventName, props = {}) {
    if (typeof window.plausible !== 'undefined') {
        window.plausible(eventName, { props });
    } else {
        log('Analytics Event:', eventName, props);
    }
}




