// Glitch Effects Module
export function initGlitchEffects() {
    console.log('⚡ Initializing Glitch Effects...');
    
    // Add glitch CSS animations
    addGlitchStyles();
    
    // Apply glitch effects to interactive elements
    const interactiveElements = document.querySelectorAll('button, .project-card, .nav-links a, .easter-egg-btn');
    
    interactiveElements.forEach(element => {
        // Add glitch effect on hover
        element.addEventListener('mouseenter', () => {
            addGlitchEffect(element);
        });
        
        element.addEventListener('mouseleave', () => {
            removeGlitchEffect(element);
        });
        
        // Add random glitch effects
        if (Math.random() < 0.3) { // 30% chance
            setInterval(() => {
                if (Math.random() < 0.1) { // 10% chance every interval
                    triggerRandomGlitch(element);
                }
            }, 5000);
        }
    });
    
    // Add glitch effect to hero title
    const heroTitle = document.getElementById('heroTitle');
    if (heroTitle) {
        heroTitle.addEventListener('mouseenter', () => {
            addGlitchEffect(heroTitle);
        });
        
        heroTitle.addEventListener('mouseleave', () => {
            removeGlitchEffect(heroTitle);
        });
    }
    
    // Add glitch effect to typing animation
    const typedName = document.getElementById('typed-name');
    if (typedName) {
        // Trigger glitch during typing
        const observer = new MutationObserver(() => {
            if (Math.random() < 0.2) {
                triggerRandomGlitch(typedName);
            }
        });
        observer.observe(typedName, { childList: true, characterData: true });
    }
    
    console.log('✅ Glitch Effects initialized!');
}

function addGlitchStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
        }
        
        @keyframes glitch-text {
            0% { 
                transform: translate(0);
                filter: hue-rotate(0deg);
            }
            10% { 
                transform: translate(-1px, 1px);
                filter: hue-rotate(90deg);
            }
            20% { 
                transform: translate(1px, -1px);
                filter: hue-rotate(180deg);
            }
            30% { 
                transform: translate(-1px, -1px);
                filter: hue-rotate(270deg);
            }
            40% { 
                transform: translate(1px, 1px);
                filter: hue-rotate(360deg);
            }
            50% { 
                transform: translate(0);
                filter: hue-rotate(0deg);
            }
            100% { 
                transform: translate(0);
                filter: hue-rotate(0deg);
            }
        }
        
        @keyframes glitch-bg {
            0% { background-position: 0% 0%; }
            20% { background-position: 100% 0%; }
            40% { background-position: 0% 100%; }
            60% { background-position: 100% 100%; }
            80% { background-position: 0% 0%; }
            100% { background-position: 0% 0%; }
        }
        
        .glitch-effect {
            position: relative;
            overflow: hidden;
        }
        
        .glitch-effect::before,
        .glitch-effect::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: inherit;
            color: inherit;
            opacity: 0.8;
            mix-blend-mode: difference;
        }
        
        .glitch-effect::before {
            animation: glitch-text 0.3s ease-in-out;
            color: #ff0000;
            z-index: -1;
        }
        
        .glitch-effect::after {
            animation: glitch-text 0.3s ease-in-out 0.1s;
            color: #00ff00;
            z-index: -2;
        }
        
        .glitch-bg {
            background: linear-gradient(45deg, 
                #ff0000 0%, 
                #00ff00 25%, 
                #0000ff 50%, 
                #ffff00 75%, 
                #ff00ff 100%);
            background-size: 400% 400%;
            animation: glitch-bg 0.5s ease-in-out;
        }
    `;
    document.head.appendChild(style);
}

function addGlitchEffect(element) {
    element.classList.add('glitch-effect');
    element.style.animation = 'glitch 0.3s ease-in-out';
    
    // Add data-text attribute for pseudo-elements
    if (element.textContent) {
        element.setAttribute('data-text', element.textContent);
    }
    
    // Add random color shift
    const hue = Math.random() * 360;
    element.style.filter = `hue-rotate(${hue}deg) saturate(1.5)`;
    
    // Add background glitch for certain elements
    if (element.classList.contains('project-card') || element.classList.contains('easter-egg-btn')) {
        element.classList.add('glitch-bg');
        setTimeout(() => {
            element.classList.remove('glitch-bg');
        }, 500);
    }
}

function removeGlitchEffect(element) {
    element.classList.remove('glitch-effect', 'glitch-bg');
    element.style.animation = 'none';
    element.style.filter = 'none';
}

function triggerRandomGlitch(element) {
    if (!element) return;
    
    const glitchTypes = ['text', 'position', 'color', 'background'];
    const glitchType = glitchTypes[Math.floor(Math.random() * glitchTypes.length)];
    
    switch (glitchType) {
        case 'text':
            addGlitchEffect(element);
            setTimeout(() => removeGlitchEffect(element), 300);
            break;
            
        case 'position':
            element.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
            setTimeout(() => {
                element.style.transform = 'none';
            }, 100);
            break;
            
        case 'color':
            const hue = Math.random() * 360;
            element.style.filter = `hue-rotate(${hue}deg)`;
            setTimeout(() => {
                element.style.filter = 'none';
            }, 200);
            break;
            
        case 'background':
            element.classList.add('glitch-bg');
            setTimeout(() => {
                element.classList.remove('glitch-bg');
            }, 500);
            break;
    }
}
