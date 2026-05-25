// Scroll Animations Module
export function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// ASCII Animation
export function initASCIIAnimations() {
    const spinners = document.querySelectorAll('.ascii-spinner');
    if (!spinners.length) return;

    const spinnerChars = ['◐', '◓', '◑', '◒'];
    let charIndex = 0;

    setInterval(() => {
        spinners.forEach(spinner => {
            spinner.textContent = spinnerChars[charIndex];
        });
        charIndex = (charIndex + 1) % spinnerChars.length;
    }, 200);

    const asciiElements = document.querySelectorAll('.ascii-animation');
    if (!asciiElements.length) return;

    setInterval(() => {
        asciiElements.forEach(element => {
            if (Math.random() < 0.3) {
                element.style.animation = 'none';
                setTimeout(() => {
                    element.style.animation = 'asciiGlow 3s ease-in-out infinite alternate';
                }, 100);
            }
        });
    }, 5000);
}
