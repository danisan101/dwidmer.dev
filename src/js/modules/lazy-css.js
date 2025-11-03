// CSS Lazy Loading Module
const nonCriticalCSSUrl = new URL('../../css/non-critical.css', import.meta.url).href;
const criticalCSSUrl = new URL('../../css/critical.css', import.meta.url).href;

export function initLazyCSS() {
    // Load non-critical CSS after page load
    const loadNonCriticalCSS = () => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = nonCriticalCSSUrl;
        link.media = 'print';
        link.onload = function() {
            this.media = 'all';
        };
        document.head.appendChild(link);
    };

    // Load after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadNonCriticalCSS);
    } else {
        loadNonCriticalCSS();
    }

    // Preload critical resources
    const preloadCriticalResources = () => {
        const criticalCSS = document.createElement('link');
        criticalCSS.rel = 'preload';
        criticalCSS.href = criticalCSSUrl;
        criticalCSS.as = 'style';
        criticalCSS.onload = function() {
            this.rel = 'stylesheet';
        };
        document.head.appendChild(criticalCSS);
    };

    preloadCriticalResources();
}
