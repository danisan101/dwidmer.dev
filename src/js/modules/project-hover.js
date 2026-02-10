// Enhanced Project Hover Effects Module — Monochrome
import { log } from '../utils/logger.js';

export function initProjectHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach((card, index) => {
        card.style.cssText += `
            position: relative;
            overflow: hidden;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            transform-style: preserve-3d;
        `;

        // Monochrome hover overlay
        const hoverOverlay = document.createElement('div');
        hoverOverlay.className = 'project-hover-overlay';
        hoverOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.88);
            opacity: 0;
            transition: opacity 0.3s ease;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 20px;
            z-index: 2;
            color: #ffffff;
        `;

        const projectData = getProjectData(index);

        hoverOverlay.innerHTML = `
            <div style="margin-bottom: 15px; font-size: 0.9rem; opacity: 0.7; letter-spacing: 0.1em;">
                ${projectData.techStack.join(' · ')}
            </div>
            <div style="margin-bottom: 20px; font-size: 0.8rem; line-height: 1.5; opacity: 0.85;">
                ${projectData.features.map(f => `• ${f}`).join('<br>')}
            </div>
            <div style="display: flex; gap: 20px; font-size: 0.75rem; opacity: 0.6; letter-spacing: 0.05em;">
                <div>${projectData.stats.complexity}</div>
                <div>${projectData.stats.duration}</div>
                <div>${projectData.stats.status}</div>
            </div>
            <div class="project-action" style="
                margin-top: 18px;
                padding: 8px 18px;
                background: transparent;
                border: 1px solid rgba(255, 255, 255, 0.4);
                border-radius: 3px;
                font-size: 0.8rem;
                font-family: 'Space Mono', monospace;
                cursor: pointer;
                transition: border-color 0.2s ease, background 0.2s ease;
                color: #ffffff;
                letter-spacing: 0.05em;
            ">
                ${projectData.action}
            </div>
        `;

        card.appendChild(hoverOverlay);

        // Let clicks pass through the overlay to the <a> tag underneath
        hoverOverlay.style.pointerEvents = 'none';

        // But keep the action button clickable
        const actionBtn = hoverOverlay.querySelector('.project-action');
        actionBtn.style.pointerEvents = 'auto';

        actionBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (projectData.url) {
                window.location.href = projectData.url;
            }
        });

        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
            hoverOverlay.style.opacity = '1';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '';
            hoverOverlay.style.opacity = '0';
        });

        actionBtn.addEventListener('mouseenter', () => {
            actionBtn.style.borderColor = 'rgba(255, 255, 255, 0.8)';
            actionBtn.style.background = 'rgba(255, 255, 255, 0.1)';
        });
        actionBtn.addEventListener('mouseleave', () => {
            actionBtn.style.borderColor = 'rgba(255, 255, 255, 0.4)';
            actionBtn.style.background = 'transparent';
        });
    });
}

function getProjectData(index) {
    const projects = [
        {
            techStack: ['HTML5', 'CSS3', 'JavaScript', 'Vite'],
            features: [
                'Retro-Terminal Design',
                'Interactive Games (Snake, Tetris)',
                '3D Parallax Effects',
                'Performance Optimized'
            ],
            stats: {
                complexity: 'Advanced',
                duration: '2 Months',
                status: 'Live'
            },
            action: 'View App Details',
            url: '/website.html'
        },
        {
            techStack: ['Swift', 'iOS', 'UI/UX', 'Mobile Design'],
            features: [
                'Minimalist Scorekeeper',
                'Intuitive Touch Interface',
                'Local Data Storage',
                'Clean Architecture'
            ],
            stats: {
                complexity: 'Intermediate',
                duration: '1 Month',
                status: 'Development'
            },
            action: 'View App Details',
            url: '/app.html'
        },
        {
            techStack: ['Swift', 'iOS', 'UI/UX', 'Mobile Design'],
            features: [
                'Minimalist Mono-Aesthetic',
                'Fokus auf Reduktion',
                'Native iOS Experience',
                'AdMob Integration'
            ],
            stats: {
                complexity: 'Intermediate',
                duration: 'Ongoing',
                status: 'Development'
            },
            action: 'View App Details',
            url: '/monodot.html'
        }
    ];

    return projects[index] || projects[0];
}
