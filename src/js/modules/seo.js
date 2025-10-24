// SEO Module - Dynamic Meta Tags & Structured Data
export function initSEO() {
    addStructuredData();
    updateMetaTags();
}

function addStructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Daniel Widmer",
        "jobTitle": "Creative Developer & Digital Artist",
        "description": "Senior Business Analyst und App Developer mit Expertise in Frontend Development, UI/UX Design und Mobile App Development.",
        "url": "https://dwidmer.dev",
        "sameAs": [
            "https://github.com/danisan101",
            "https://www.linkedin.com/in/daniel-widmer-26426a173"
        ],
        "knowsAbout": [
            "JavaScript",
            "HTML5",
            "CSS3",
            "Swift",
            "Node.js",
            "Python",
            "UI/UX Design",
            "Mobile App Development"
        ],
        "alumniOf": {
            "@type": "Organization",
            "name": "Weiterbildung in Web Development"
        },
        "hasOccupation": [
            {
                "@type": "Occupation",
                "name": "Senior Business Analyst",
                "startDate": "2017"
            },
            {
                "@type": "Occupation",
                "name": "App Developer",
                "startDate": "2024"
            }
        ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    // Add BreadcrumbList
    const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://dwidmer.dev/"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Über mich",
                "item": "https://dwidmer.dev/#about"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "Projekte",
                "item": "https://dwidmer.dev/#projects"
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": "Kontakt",
                "item": "https://dwidmer.dev/#contact"
            }
        ]
    };

    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.text = JSON.stringify(breadcrumbData);
    document.head.appendChild(breadcrumbScript);
}

function updateMetaTags() {
    // Update canonical URL based on hash
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash;
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            canonical.href = `https://dwidmer.dev/${hash}`;
        }
    });
}

// Add meta description dynamically based on section
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




