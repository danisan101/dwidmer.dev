// Main JavaScript Entry Point
import '../css/main.css';
import confetti from 'canvas-confetti';

// Import all modules
import { initLoadingScreen } from './modules/loading.js';
import { initBootSequence } from './modules/boot-sequence.js';
import { initTypingAnimation } from './modules/typing.js';
import { initThemeToggle } from './modules/theme.js';
import { initCRTToggle } from './modules/crt-toggle.js';
import { initMobileMenu, initSmoothScrolling, initActiveNavigation } from './modules/navigation.js';
import { initParallax } from './modules/parallax.js';
import { initScrollAnimations, initASCIIAnimations, initAnimatedStats, initSkillProgress } from './modules/animations.js';
import { initLazyLoading } from './modules/lazy-loading.js';
import { initContactForm } from './modules/contact.js';
import { initCVDownload } from './modules/cv-download.js';
import { initSnakeGame } from './modules/snake.js';
import { initTetrisGame } from './modules/tetris.js';
import { initSEO } from './modules/seo.js';
import { initAnalytics } from './modules/analytics.js';
import { initRetroStats } from './modules/retro-stats.js';

// Make confetti available globally for contact form
window.confetti = confetti;

// Console Easter Egg
console.log(`
██████╗ ███████╗████████╗██████╗  ██████╗ 
██╔══██╗██╔════╝╚══██╔══╝██╔══██╗██╔═══██╗
██████╔╝█████╗     ██║   ██████╔╝██║   ██║
██╔══██╗██╔══╝     ██║   ██╔══██╗██║   ██║
██║  ██║███████╗   ██║   ██║  ██║╚██████╔╝
╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ 

🎮 Easter Eggs:
- Snake Game: Ctrl+Alt+Shift+S
- Tetris: Ctrl+Alt+Shift+T
- CRT Toggle: Button in Navigation

🚀 Portfolio v2.0 - Fully Refactored with Vite
`);

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Check for first visit and show boot sequence
        initBootSequence();
        
        // Show loading screen and initialize typing
        await initLoadingScreen();
        initTypingAnimation();
        
        // Initialize core features
        initMobileMenu();
        initThemeToggle();
        initCRTToggle();
        initSmoothScrolling();
        initActiveNavigation();
        initEasterEggButtons();
        
        // Initialize visual effects
        initParallax();
        initScrollAnimations();
        initASCIIAnimations();
        initAnimatedStats();
        initSkillProgress();
        initLazyLoading();
        
        // Initialize interactive features
        initSnakeGame();
        initTetrisGame();
        initContactForm();
        initCVDownload();
        
        // Initialize SEO, Analytics and Retro Stats
        initSEO();
        initAnalytics();
        initRetroStats();
        
        // Global ESC handler for games
        document.addEventListener('keydown', (e) => {
            if (e.key !== 'Escape') return;
            const snake = document.getElementById('snakeGame');
            const tetris = document.getElementById('tetrisGame');
            const gameOver = document.getElementById('gameOver');
            const snakeGameOver = document.getElementById('snakeGameOver');
            if (snake && snake.classList.contains('active')) {
                snake.classList.remove('active');
            }
            if (snakeGameOver && snakeGameOver.classList.contains('active')) {
                snakeGameOver.classList.remove('active');
            }
            if (tetris && (tetris.classList.contains('active') || gameOver.classList.contains('active'))) {
                tetris.classList.remove('active');
                gameOver.classList.remove('active');
            }
        });
        
        console.log('✓ Portfolio initialized successfully!');
    } catch (error) {
        console.error('Error initializing portfolio:', error);
    }
});

// Easter Egg Buttons in Header
function initEasterEggButtons() {
    const buttons = document.querySelectorAll('.easter-egg-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const game = btn.getAttribute('data-game');
            if (game === 'snake') {
                // Trigger snake game
                const event = new KeyboardEvent('keydown', {
                    key: 's',
                    shiftKey: true,
                    altKey: true,
                    ctrlKey: true
                });
                document.dispatchEvent(event);
            } else if (game === 'tetris') {
                // Trigger tetris game
                const event = new KeyboardEvent('keydown', {
                    key: 't',
                    shiftKey: true,
                    altKey: true,
                    ctrlKey: true
                });
                document.dispatchEvent(event);
            }
        });
    });
}

// Service Worker for PWA (optional)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // Silent fail if SW not available
        });
    });
}

