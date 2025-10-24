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
    const spinnerChars = ['◐', '◓', '◑', '◒'];
    let charIndex = 0;

    setInterval(() => {
        spinners.forEach(spinner => {
            spinner.textContent = spinnerChars[charIndex];
        });
        charIndex = (charIndex + 1) % spinnerChars.length;
    }, 200);

    setInterval(() => {
        const asciiElements = document.querySelectorAll('.ascii-animation');
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

// Animated Statistics Counter
export function initAnimatedStats() {
    const stats = document.querySelectorAll('.stat-number[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.getAttribute('data-count'));
                const duration = 2000;
                const step = count / (duration / 16);
                let current = 0;
                
                const counter = setInterval(() => {
                    current += step;
                    if (current >= count) {
                        target.textContent = count;
                        clearInterval(counter);
                    } else {
                        target.textContent = Math.floor(current);
                    }
                }, 16);
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

// Skill Progress Bars Animation
export function initSkillProgress() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress-bar');
                if (progressBar) {
                    const width = progressBar.getAttribute('data-progress') || '90';
                    progressBar.style.width = width + '%';
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillItems.forEach(item => observer.observe(item));
}




