// Main JavaScript Entry Point
import '../css/critical.css';
import confetti from 'canvas-confetti';

// Import all modules
import { initLoadingScreen } from './modules/loading.js';
import { initBootSequence } from './modules/boot-sequence.js';
import { initTypingAnimation } from './modules/typing.js';
import { initThemeToggle } from './modules/theme.js';
import { initCRTToggle } from './modules/crt-toggle.js';
import { initMobileMenu, initSmoothScrolling, initActiveNavigation } from './modules/navigation.js';
import { initParallax } from './modules/parallax.js';
import { initAdvancedParallax } from './modules/advanced-parallax.js';
import { initScrollAnimations, initASCIIAnimations, initAnimatedStats, initSkillProgress } from './modules/animations.js';
import { initLazyLoading } from './modules/lazy-loading.js';
import { initLazyCSS } from './modules/lazy-css.js';
import { initContactForm } from './modules/contact.js';
import { initCVDownload } from './modules/cv-download.js';
import { initSnakeGame } from './modules/snake.js';
import { initTetrisGame } from './modules/tetris.js';
import { initSEO } from './modules/seo.js';
import { initAnalytics } from './modules/analytics.js';
import { initRetroStats } from './modules/retro-stats.js';
import { initPerformanceMonitoring } from './modules/performance.js';
import { initAIAssistant } from './modules/ai-assistant.js';
import { initAnimatedTimeline } from './modules/animated-timeline.js';
import { initProjectHoverEffects } from './modules/project-hover.js';
import { initGlitchEffects } from './modules/glitch-effects.js';
import { initPWAFeatures } from './modules/pwa-features.js';

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
        
        // Initialize lazy loading
        initLazyCSS();
        
        // Initialize visual effects
        initParallax();
        initAdvancedParallax();
        initScrollAnimations();
        initASCIIAnimations();
        initAnimatedStats();
        initSkillProgress();
        initLazyLoading();
        
        // Initialize cool features
        initAIAssistant();
        initAnimatedTimeline();
        initProjectHoverEffects();
        initGlitchEffects();
        initPWAFeatures();
        
        // Initialize interactive features
        initSnakeGame();
        initTetrisGame();
        initContactForm();
        initCVDownload();
        
        // Initialize Easter Egg Buttons AFTER games are ready (with delay)
        setTimeout(() => {
            initEasterEggButtons();
        }, 100);
        
        // Initialize SEO, Analytics, Performance and Retro Stats
        initSEO();
        initAnalytics();
        initRetroStats();
        initPerformanceMonitoring();
        
        // Global ESC handler for games
        document.addEventListener('keydown', (e) => {
            if (e.key !== 'Escape') return;
            
            const snake = document.getElementById('snakeGame');
            const snakeGameOver = document.getElementById('snakeGameOver');
            const tetris = document.getElementById('tetrisGame');
            const tetrisGameOver = document.getElementById('gameOver');
            
            // Close Snake game
            if (snake && snake.classList.contains('active')) {
                snake.classList.remove('active');
                snake.style.display = 'none';
                if (window.hideSnakeGame) window.hideSnakeGame();
                console.log('🐍 Snake game closed via ESC');
                return;
            }
            
            // Close Snake game over screen
            if (snakeGameOver && snakeGameOver.classList.contains('active')) {
                snakeGameOver.classList.remove('active');
                snakeGameOver.style.display = 'none';
                console.log('🐍 Snake game over screen closed via ESC');
                return;
            }
            
            // Close Tetris game
            if (tetris && tetris.classList.contains('active')) {
                tetris.classList.remove('active');
                tetris.style.display = 'none';
                if (window.hideTetris) window.hideTetris();
                console.log('🧩 Tetris game closed via ESC');
                return;
            }
            
            // Close Tetris game over screen
            if (tetrisGameOver && tetrisGameOver.classList.contains('active')) {
                tetrisGameOver.classList.remove('active');
                tetrisGameOver.style.display = 'none';
                console.log('🧩 Tetris game over screen closed via ESC');
                return;
            }
        });
        
        console.log('✓ Portfolio initialized successfully!');
    } catch (error) {
        console.error('Error initializing portfolio:', error);
    }
});

// Easter Egg Buttons in Header
function initEasterEggButtons() {
    console.log('🎮 Initializing Easter Egg Buttons...');
    const buttons = document.querySelectorAll('.easter-egg-btn');
    console.log('Found buttons:', buttons.length);
    
    // Debug: Check if game functions are available
    console.log('🐍 showSnakeGame available:', typeof window.showSnakeGame);
    console.log('🧩 startTetris available:', typeof window.startTetris);
    
    buttons.forEach((btn, index) => {
        const game = btn.getAttribute('data-game');
        console.log(`Button ${index}:`, game);
        
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('🎯 Button clicked:', game);
            
            if (game === 'snake') {
                console.log('🐍 Starting Snake Game...');
                if (window.showSnakeGame) {
                    window.showSnakeGame();
                    console.log('✅ Snake Game started!');
                } else {
                    console.error('❌ showSnakeGame not available!');
                    console.log('Available window functions:', Object.keys(window).filter(k => k.includes('snake') || k.includes('Snake')));
                }
            } else if (game === 'tetris') {
                console.log('🧩 Starting Tetris Game...');
                if (window.startTetris) {
                    window.startTetris();
                    console.log('✅ Tetris Game started!');
                } else {
                    console.error('❌ startTetris not available!');
                    console.log('Available window functions:', Object.keys(window).filter(k => k.includes('tetris') || k.includes('Tetris')));
                }
            }
        });
    });
    
    console.log('✅ Easter Egg Buttons initialized!');
}

// Service Worker for PWA (optional)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // Silent fail if SW not available
        });
    });
}

