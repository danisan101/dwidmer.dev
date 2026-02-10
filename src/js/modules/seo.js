// SEO Module - Dynamic Meta Tags
// Note: Structured Data (Schema.org) is defined statically in index.html <head>
// to avoid duplicate JSON-LD blocks and ensure crawlers see it immediately.

export function initSEO() {
    updateMetaTags();
}

function updateMetaTags() {
    // Update canonical URL based on hash — always strip the hash
    window.addEventListener('hashchange', () => {
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            const url = new URL(window.location.href);
            url.hash = '';
            canonical.href = url.toString();
        }
    });
}

// Update meta description dynamically based on visible section
export function updateSectionMeta(section) {
    const descriptions = {
        'home': 'Portfolio von Daniel Widmer – Creative Developer & Digital Artist',
        'about': 'Über Daniel Widmer – Senior Business Analyst und App Developer',
        'projects': 'Projekte von Daniel Widmer – Web und Mobile Apps',
        'contact': 'Kontakt zu Daniel Widmer – Lass uns zusammenarbeiten'
    };

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && descriptions[section]) {
        metaDesc.content = descriptions[section];
    }
}
