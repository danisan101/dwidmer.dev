// Parallax Effect Module (mouse-based background layers)
import { prefersReducedMotion } from '../utils/motion.js';

export function initParallax() {
    if (prefersReducedMotion()) return;

    const parallaxContainer = document.querySelector('.parallax-container');
    if (!parallaxContainer) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animate() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        const layers = parallaxContainer.querySelectorAll('.parallax-layer');
        layers.forEach((layer, index) => {
            const speed = (index + 1) * 10;
            layer.style.transform = `translate(${currentX * speed}px, ${currentY * speed}px)`;
        });

        requestAnimationFrame(animate);
    }

    animate();
}
