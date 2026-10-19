// Parallax Effect Module
export function initParallax() {
    const parallaxContainer = document.querySelector('.parallax-container');
    if (!parallaxContainer) return;
    
    const spotlight = parallaxContainer.querySelector('.parallax-spotlight');
    let pointerX = -999;
    let pointerY = -999;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        pointerX = e.clientX;
        pointerY = e.clientY;
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    function animate() {
        // Smooth interpolation
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        
        const layers = parallaxContainer.querySelectorAll('.parallax-layer');
        layers.forEach((layer, index) => {
            const speed = (index + 1) * 10;
            const x = currentX * speed;
            const y = currentY * speed;
            layer.style.transform = `translate(${x}px, ${y}px)`;
            // The spotlight moves with its layer, so offset the pointer by the same amount
            if (spotlight && spotlight.parentElement === layer) {
                spotlight.style.setProperty('--spot-x', `${pointerX - x}px`);
                spotlight.style.setProperty('--spot-y', `${pointerY - y}px`);
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}




