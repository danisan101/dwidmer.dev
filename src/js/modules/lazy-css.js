// CSS Lazy Loading Module — loads non-critical styles after initial render
const nonCriticalCSSUrl = new URL('../../css/non-critical.css', import.meta.url).href;

export function initLazyCSS() {
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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadNonCriticalCSS);
    } else {
        loadNonCriticalCSS();
    }
}
