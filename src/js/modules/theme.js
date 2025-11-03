// Theme Toggle Module with Smooth Transition
const THEME_STORAGE_KEY = 'dw-theme';

export function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    if (!themeToggle) return;

    const storedTheme = getStoredTheme();
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const initialTheme = storedTheme || (prefersLight ? 'light' : 'dark');

    applyTheme(initialTheme, body, themeToggle, Boolean(storedTheme));

    if (!storedTheme && window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
        const handleChange = (event) => {
            applyTheme(event.matches ? 'light' : 'dark', body, themeToggle, false);
        };

        if (typeof mediaQuery.addEventListener === 'function') {
            mediaQuery.addEventListener('change', handleChange);
        } else if (typeof mediaQuery.addListener === 'function') {
            mediaQuery.addListener(handleChange);
        }
    }

    themeToggle.addEventListener('click', () => {
        // Add transition class for smooth color changes
        body.style.transition = 'background 0.5s ease, color 0.5s ease';

        const nextTheme = body.classList.contains('light-mode') ? 'dark' : 'light';
        applyTheme(nextTheme, body, themeToggle);

        // Optional: Add particle effect on toggle
        createThemeParticles(nextTheme === 'light');
    });
}

function applyTheme(theme, body, toggle, updateStorage = true) {
    if (theme === 'light') {
        body.classList.add('light-mode');
    } else {
        body.classList.remove('light-mode');
    }

    toggle.textContent = theme === 'light' ? 'LIGHT' : 'DARK';
    toggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');

    if (updateStorage) {
        storeTheme(theme);
    }
}

function getStoredTheme() {
    try {
        return localStorage.getItem(THEME_STORAGE_KEY);
    } catch (error) {
        return null;
    }
}

function storeTheme(theme) {
    try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
        // Ignore storage errors (e.g., private mode)
    }
}

function createThemeParticles(isLight) {
    const colors = isLight ? ['#000000'] : ['#ffffff'];
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = Math.random() * window.innerHeight + 'px';
        particle.style.width = Math.random() * 5 + 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 2000);
    }
}



