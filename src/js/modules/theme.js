// Theme Toggle Module with Smooth Transition
export function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    if (!themeToggle) return;
    
    // Always start in dark mode
    body.classList.remove('light-mode');
    themeToggle.textContent = 'DARK';
    themeToggle.setAttribute('aria-pressed', 'false');

    themeToggle.addEventListener('click', () => {
        // Add transition class for smooth color changes
        body.style.transition = 'background 0.5s ease, color 0.5s ease';
        
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        themeToggle.textContent = isLight ? 'LIGHT' : 'DARK';
        themeToggle.setAttribute('aria-pressed', isLight ? 'true' : 'false');
        
        // Optional: Add particle effect on toggle
        createThemeParticles(isLight);
    });
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



