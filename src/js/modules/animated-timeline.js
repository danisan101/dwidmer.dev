// Animated Career Timeline Module
export function initAnimatedTimeline() {
    console.log('📅 Initializing Animated Career Timeline...');
    
    // Find existing timeline
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;
    
    // Enhanced timeline data
    const timelineData = [
        {
            year: '2017',
            title: 'Senior Business Analyst',
            description: 'Requirement Engineering, Analysen und Coding',
            icon: '💼',
            color: '#667eea',
            details: [
                'Analyse und Dokumentation von Geschäftsprozessen',
                'Entwicklung von technischen Lösungen',
                'Zusammenarbeit mit Entwicklungsteams',
                'Projektmanagement und Koordination'
            ]
        },
        {
            year: '2024',
            title: 'App Developer',
            description: 'Private Entwicklung iOS Applikationen',
            icon: '📱',
            color: '#764ba2',
            details: [
                'Entwicklung der "Schälle Sau" iOS App',
                'UI/UX Design und Implementierung',
                'Swift-Programmierung',
                'App Store Optimierung'
            ]
        },
        {
            year: '2025',
            title: 'Creative Developer',
            description: 'Portfolio-Website und innovative Projekte',
            icon: '🎨',
            color: '#f093fb',
            details: [
                'Entwicklung dieser Portfolio-Website',
                '3D-Parallax-Effekte und Animationen',
                'Retro-Games (Snake, Tetris)',
                'AI-Assistent und interaktive Features'
            ]
        }
    ];
    
    // Create enhanced timeline HTML
    timeline.innerHTML = '';
    
    timelineData.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item-enhanced';
        timelineItem.style.cssText = `
            position: relative;
            margin-bottom: 40px;
            opacity: 0;
            transform: translateX(-50px);
            transition: all 0.6s ease;
        `;
        
        timelineItem.innerHTML = `
            <div class="timeline-marker" style="
                position: absolute;
                left: -20px;
                top: 0;
                width: 40px;
                height: 40px;
                background: ${item.color};
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                box-shadow: 0 0 20px ${item.color}40;
                z-index: 2;
            ">${item.icon}</div>
            
            <div class="timeline-content" style="
                margin-left: 30px;
                padding: 20px;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            ">
                <div class="timeline-year" style="
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: ${item.color};
                    margin-bottom: 5px;
                ">${item.year}</div>
                
                <div class="timeline-title" style="
                    font-size: 1.1rem;
                    font-weight: 600;
                    margin-bottom: 8px;
                    color: #fff;
                ">${item.title}</div>
                
                <div class="timeline-description" style="
                    color: #ccc;
                    margin-bottom: 15px;
                ">${item.description}</div>
                
                <div class="timeline-details" style="
                    display: none;
                    margin-top: 15px;
                    padding-top: 15px;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                ">
                    <h5 style="margin-bottom: 10px; color: #fff;">Details:</h5>
                    <ul style="margin: 0; padding-left: 20px; color: #ccc;">
                        ${item.details.map(detail => `<li style="margin-bottom: 5px;">${detail}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="timeline-hover-effect" style="
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, ${item.color}20, transparent);
                    transition: left 0.5s ease;
                "></div>
            </div>
        `;
        
        timeline.appendChild(timelineItem);
        
        // Add click handler for details toggle
        const content = timelineItem.querySelector('.timeline-content');
        const details = timelineItem.querySelector('.timeline-details');
        
        content.addEventListener('click', () => {
            const isExpanded = details.style.display === 'block';
            details.style.display = isExpanded ? 'none' : 'block';
            content.style.transform = isExpanded ? 'scale(1)' : 'scale(1.02)';
        });
        
        // Hover effects
        content.addEventListener('mouseenter', () => {
            content.style.borderColor = item.color;
            content.style.boxShadow = `0 0 20px ${item.color}30`;
            timelineItem.querySelector('.timeline-hover-effect').style.left = '100%';
        });
        
        content.addEventListener('mouseleave', () => {
            content.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            content.style.boxShadow = 'none';
            timelineItem.querySelector('.timeline-hover-effect').style.left = '-100%';
        });
    });
    
    // Animate timeline items on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.timeline-item-enhanced').forEach(item => {
        observer.observe(item);
    });
    
    // Add timeline connector line
    const connector = document.createElement('div');
    connector.style.cssText = `
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 2px;
        background: linear-gradient(to bottom, #667eea, #764ba2, #f093fb);
        z-index: 1;
    `;
    timeline.style.position = 'relative';
    timeline.appendChild(connector);
    
    console.log('✅ Animated Career Timeline initialized!');
}
