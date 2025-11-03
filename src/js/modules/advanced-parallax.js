// Advanced 3D Parallax Effects Module
import { log } from '../utils/logger.js';

export function initAdvancedParallax() {
    log('🎨 Initializing Advanced 3D Parallax Effects...');
    
    // Create 3D layers
    createParallaxLayers();
    
    // Enhanced scroll-based 3D transforms
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const rate2 = scrolled * -0.3;
        const rate3 = scrolled * -0.1;
        
        // 3D Transform layers
        const layers = document.querySelectorAll('.parallax-layer');
        layers.forEach((layer, index) => {
            const speed = (index + 1) * 0.1;
            const yPos = -(scrolled * speed);
            const rotateX = scrolled * 0.1;
            const rotateY = scrolled * 0.05;
            
            layer.style.transform = `
                translate3d(0, ${yPos}px, 0) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
                perspective(1000px)
            `;
        });
        
        // 3D Card effects for selected sections
        const sections = document.querySelectorAll('[data-parallax-section]');
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
                const rotateX = (progress - 0.5) * 10;
                const translateZ = progress * 50;
                
                section.style.transform = `
                    translate3d(0, 0, ${translateZ}px)
                    rotateX(${rotateX}deg)
                    perspective(1000px)
                `;
                section.style.opacity = progress;
            } else {
                section.style.transform = '';
                section.style.opacity = '';
            }
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Mouse-based 3D effects
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const parallaxContainer = document.querySelector('.parallax-container');
        if (parallaxContainer) {
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            
            parallaxContainer.style.transform = `
                translate3d(${moveX}px, ${moveY}px, 0) 
                perspective(1000px)
            `;
        }
    });
    
    log('✅ Advanced 3D Parallax Effects initialized!');
}

function createParallaxLayers() {
    const container = document.querySelector('.parallax-container');
    if (!container) return;
    
    // Create multiple 3D layers
    for (let i = 0; i < 5; i++) {
        const layer = document.createElement('div');
        layer.className = `parallax-layer parallax-layer-${i + 1}`;
        layer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at ${20 + i * 15}% ${30 + i * 10}%, 
                rgba(255, 255, 255, ${0.02 - i * 0.003}) 0%, 
                transparent 50%);
            transform-style: preserve-3d;
            will-change: transform;
        `;
        container.appendChild(layer);
    }
}
