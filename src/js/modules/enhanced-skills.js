// Enhanced Skills Section Module
import { log } from '../utils/logger.js';

export function initEnhancedSkills() {
    log('🎯 Initializing Enhanced Skills Section...');
    
    const skillsSection = document.querySelector('.skills-section');
    if (!skillsSection) return;
    
    // Create terminal-style skills display
    skillsSection.innerHTML = `
        <div class="terminal-skills">
            <div class="terminal-header">
                <div class="terminal-buttons">
                    <span class="btn close"></span>
                    <span class="btn minimize"></span>
                    <span class="btn maximize"></span>
                </div>
                <div class="terminal-title">skills.exe</div>
            </div>
            <div class="terminal-body">
                <div class="terminal-line">PS C:\\Users\\Daniel\\Skills> <span class="command">Get-Skills</span></div>
                <div class="terminal-line"></div>
                <div class="terminal-line">[TECHNICAL SKILLS]</div>
                <div class="terminal-line">├─ Frontend Development: ████████████ 95%</div>
                <div class="terminal-line">├─ iOS Development:     ██████████   85%</div>
                <div class="terminal-line">├─ JavaScript/TypeScript: ████████████ 95%</div>
                <div class="terminal-line">├─ Swift:               ██████████   85%</div>
                <div class="terminal-line">├─ React/Vue:           ███████████  90%</div>
                <div class="terminal-line">├─ Node.js:             ██████████   85%</div>
                <div class="terminal-line">└─ Git/GitHub:          ████████████ 95%</div>
                <div class="terminal-line"></div>
                <div class="terminal-line">[DESIGN SKILLS]</div>
                <div class="terminal-line">├─ UI/UX Design:        ███████████  90%</div>
                <div class="terminal-line">├─ Figma:              ███████████  90%</div>
                <div class="terminal-line">├─ Adobe Creative:     ██████████   85%</div>
                <div class="terminal-line">└─ Prototyping:         ███████████  90%</div>
                <div class="terminal-line"></div>
                <div class="terminal-line">[INTERESTS]</div>
                <div class="terminal-line">├─ Retro Computing     [████████████]</div>
                <div class="terminal-line">├─ Game Development    [████████████]</div>
                <div class="terminal-line">├─ Creative Coding     [████████████]</div>
                <div class="terminal-line">├─ Digital Art         [████████████]</div>
                <div class="terminal-line">└─ Innovation          [████████████]</div>
                <div class="terminal-line"></div>
                <div class="terminal-line">PS C:\\Users\\Daniel\\Skills> <span class="cursor">_</span></div>
            </div>
        </div>
    `;
    
    // Add glitch effects to terminal
    const terminal = skillsSection.querySelector('.terminal-skills');
    terminal.addEventListener('mouseenter', () => {
        addTerminalGlitch(terminal);
    });
    
    terminal.addEventListener('mouseleave', () => {
        removeTerminalGlitch(terminal);
    });
    
    log('✅ Enhanced Skills Section initialized!');
}

function addTerminalGlitch(element) {
    element.style.filter = 'contrast(1.2)';
    element.style.animation = 'terminal-glitch 0.3s ease-in-out';
}

function removeTerminalGlitch(element) {
    element.style.filter = 'none';
    element.style.animation = 'none';
}
