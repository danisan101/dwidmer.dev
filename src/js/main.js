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
import { initAnimatedTimeline } from './modules/animated-timeline.js';
import { initProjectHoverEffects } from './modules/project-hover.js';
import { initGlitchEffects } from './modules/glitch-effects.js';
import { initPWAFeatures } from './modules/pwa-features.js';
import { initEnhancedSkills } from './modules/enhanced-skills.js';
import { log, error } from './utils/logger.js';

// Make confetti available globally for contact form
window.confetti = confetti;

// Console Easter Egg
log(`
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
        initAnimatedTimeline();
        initProjectHoverEffects();
        initGlitchEffects();
        initPWAFeatures();
        initEnhancedSkills();
        
        // Initialize interactive features
        initSnakeGame();
        initTetrisGame();
        initContactForm();
        initCVDownload();
        
        // Make game functions globally available
        window.initSnakeGame = initSnakeGame;
        window.initTetrisGame = initTetrisGame;
        
        // Initialize Easter Egg Buttons AFTER games are ready (with delay)
        setTimeout(() => {
            initEasterEggButtons();
        }, 200);
        
        // Initialize SEO, Analytics, Performance and Retro Stats
        initSEO();
        initAnalytics();
        initRetroStats();
        initPerformanceMonitoring();
        
        // Global ESC handler for games
        document.addEventListener('keydown', (e) => {
            if (e.key !== 'Escape') return;

            const snakeOverlay = document.getElementById('snakeGameOverlay');
            const snakeGameOver = document.getElementById('snakeGameOver');
            const tetrisOverlay = document.getElementById('tetrisGameOverlay');
            const tetrisGameOver = document.getElementById('gameOver');

            if (snakeOverlay && snakeOverlay.classList.contains('active')) {
                if (window.hideSnakeGame) window.hideSnakeGame();
                log('🐍 Snake game closed via ESC');
                return;
            }

            if (snakeGameOver && snakeGameOver.classList.contains('active')) {
                snakeGameOver.classList.remove('active');
                snakeGameOver.style.display = 'none';
                log('🐍 Snake game over screen closed via ESC');
                return;
            }

            if (tetrisOverlay && tetrisOverlay.classList.contains('active')) {
                if (window.hideTetris) window.hideTetris();
                log('🧩 Tetris game closed via ESC');
                return;
            }

            if (tetrisGameOver && tetrisGameOver.classList.contains('active')) {
                tetrisGameOver.classList.remove('active');
                tetrisGameOver.style.display = 'none';
                log('🧩 Tetris game over screen closed via ESC');
                return;
            }
        });
        
        log('✓ Portfolio initialized successfully!');
    } catch (error) {
        error('Error initializing portfolio:', error);
    }
});

// Easter Egg Buttons in Header
function initEasterEggButtons() {
    log('🎮 Initializing Easter Egg Buttons...');
    const buttons = document.querySelectorAll('.easter-egg-btn');
    log('Found buttons:', buttons.length);

    // Debug: Check if game functions are available
    log('🐍 showSnakeGame available:', typeof window.showSnakeGame);
    log('🧩 startTetris available:', typeof window.startTetris);

    // Force re-check after a short delay
    setTimeout(() => {
        log('🔄 Re-checking game functions...');
        log('🐍 showSnakeGame available:', typeof window.showSnakeGame);
        log('🧩 startTetris available:', typeof window.startTetris);
    }, 500);

    buttons.forEach((btn, index) => {
        const game = btn.getAttribute('data-game');
        log(`Button ${index}:`, game);

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            log('🎯 Button clicked:', game);

            if (game === 'snake') {
                log('🐍 Starting Snake Game...');
                if (window.showSnakeGame) {
                    window.showSnakeGame();
                    log('✅ Snake Game started!');
                } else {
                    error('❌ showSnakeGame not available!');
                    log('Available window functions:', Object.keys(window).filter(k => k.includes('snake') || k.includes('Snake')));
                    // Try to re-initialize Snake
                    log('🔄 Attempting to re-initialize Snake...');
                    if (window.initSnakeGame) {
                        window.initSnakeGame();
                    }
                }
            } else if (game === 'tetris') {
                log('🧩 Starting Tetris Game...');
                if (window.startTetris) {
                    window.startTetris();
                    log('✅ Tetris Game started!');
                } else {
                    error('❌ startTetris not available!');
                    log('Available window functions:', Object.keys(window).filter(k => k.includes('tetris') || k.includes('Tetris')));
                    // Try to re-initialize Tetris
                    log('🔄 Attempting to re-initialize Tetris...');
                    if (window.initTetrisGame) {
                        window.initTetrisGame();
                    }
                }
            }
        });
    });

    log('✅ Easter Egg Buttons initialized!');
}

