// Enhanced Project Hover Effects Module
import { log } from '../utils/logger.js';

export function initProjectHoverEffects() {
    log('🎯 Initializing Enhanced Project Hover Effects...');
    
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // Add enhanced hover effects
        card.style.cssText += `
            position: relative;
            overflow: hidden;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            transform-style: preserve-3d;
        `;
        
        // Create hover overlay
        const hoverOverlay = document.createElement('div');
        hoverOverlay.className = 'project-hover-overlay';
        hoverOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, 
                rgba(102, 126, 234, 0.9) 0%, 
                rgba(118, 75, 162, 0.9) 100%);
            opacity: 0;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 20px;
            z-index: 2;
        `;
        
        // Get project data based on index
        const projectData = getProjectData(index);
        
        hoverOverlay.innerHTML = `
            <div class="project-tech-stack" style="
                margin-bottom: 15px;
                font-size: 0.9rem;
                opacity: 0.8;
            ">
                ${projectData.techStack.join(' • ')}
            </div>
            
            <div class="project-features" style="
                margin-bottom: 20px;
                font-size: 0.8rem;
                line-height: 1.4;
            ">
                ${projectData.features.map(feature => `• ${feature}`).join('<br>')}
            </div>
            
            <div class="project-stats" style="
                display: flex;
                gap: 20px;
                font-size: 0.8rem;
                opacity: 0.9;
            ">
                <div>📊 ${projectData.stats.complexity}</div>
                <div>⏱️ ${projectData.stats.duration}</div>
                <div>🎯 ${projectData.stats.status}</div>
            </div>
            
            <div class="project-action" style="
                margin-top: 15px;
                padding: 8px 16px;
                background: rgba(255, 255, 255, 0.2);
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 20px;
                font-size: 0.8rem;
                cursor: pointer;
                transition: all 0.3s ease;
            ">
                ${projectData.action}
            </div>
        `;
        
        card.appendChild(hoverOverlay);
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotateX(5deg) rotateY(5deg)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            hoverOverlay.style.opacity = '1';
            
            // Add glitch effect
            addGlitchEffect(card);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            card.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            hoverOverlay.style.opacity = '0';
            
            // Remove glitch effect
            removeGlitchEffect(card);
        });
        
        // Add click handler for project action
        hoverOverlay.querySelector('.project-action').addEventListener('click', (e) => {
            e.stopPropagation();
            if (projectData.url) {
                window.open(projectData.url, '_blank');
            }
        });
    });
    
    log('✅ Enhanced Project Hover Effects initialized!');
}

function getProjectData(index) {
    const projects = [
        {
            techStack: ['HTML5', 'CSS3', 'JavaScript', 'Vite'],
            features: [
                'Retro-Terminal Design',
                'Interactive Games (Snake, Tetris)',
                '3D Parallax Effects',
                'AI Assistant Chatbot',
                'Performance Optimized'
            ],
            stats: {
                complexity: 'Advanced',
                duration: '2 Months',
                status: 'Live'
            },
            action: 'Explore Website',
            url: '/website.html'
        },
        {
            techStack: ['Swift', 'iOS', 'UI/UX', 'Mobile Design'],
            features: [
                'Minimalist Scorekeeper',
                'Intuitive Touch Interface',
                'Local Data Storage',
                'Clean Architecture',
                'App Store Ready'
            ],
            stats: {
                complexity: 'Intermediate',
                duration: '1 Month',
                status: 'Development'
            },
            action: 'View App Details',
            url: '/app.html'
        }
    ];
    
    return projects[index] || projects[0];
}

function addGlitchEffect(element) {
    element.style.filter = 'hue-rotate(10deg) saturate(1.2)';
    element.style.animation = 'glitch 0.3s ease-in-out';
}

function removeGlitchEffect(element) {
    element.style.filter = 'none';
    element.style.animation = 'none';
}
