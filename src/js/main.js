// Main JavaScript Entry Point
import '../css/fonts.css';
import '../css/print.css';
import '../css/critical.css';

import { initLoadingScreen } from './modules/loading.js';
import { initTypingAnimation } from './modules/typing.js';
import { initThemeToggle } from './modules/theme.js';
import { initMobileMenu, initSmoothScrolling, initActiveNavigation } from './modules/navigation.js';
import { initParallax } from './modules/parallax.js';
import { initScrollAnimations, initASCIIAnimations } from './modules/animations.js';
import { initLazyLoading } from './modules/lazy-loading.js';
import { initContactForm } from './modules/contact.js';
import { initCVDownload } from './modules/cv-download.js';
import { initSEO } from './modules/seo.js';
import { initAnalytics } from './modules/analytics.js';
import { initPerformanceMonitoring } from './modules/performance.js';
import { initAnimatedTimeline } from './modules/animated-timeline.js';
import { initProjectHoverEffects } from './modules/project-hover.js';
import { initGlitchEffects } from './modules/glitch-effects.js';
import { initPWAFeatures } from './modules/pwa-features.js';
import { initEnhancedSkills } from './modules/enhanced-skills.js';
import { prefersReducedMotion } from './utils/motion.js';
import { log, error } from './utils/logger.js';

let gamesLoadPromise = null;

async function ensureGamesLoaded() {
    if (!gamesLoadPromise) {
        gamesLoadPromise = Promise.all([
            import('./modules/snake.js'),
            import('./modules/tetris.js')
        ]).then(([snake, tetris]) => {
            snake.initSnakeGame();
            tetris.initTetrisGame();
            window.initSnakeGame = snake.initSnakeGame;
            window.initTetrisGame = tetris.initTetrisGame;
        });
    }
    return gamesLoadPromise;
}

function initGameKeyboardShortcuts() {
    document.addEventListener('keydown', async (e) => {
        if (!(e.shiftKey && e.altKey && e.ctrlKey)) return;

        const key = e.key.toLowerCase();
        if (key !== 's' && key !== 't') return;

        e.preventDefault();
        await ensureGamesLoaded();

        if (key === 's') {
            if (window.showSnakeGame) window.showSnakeGame();
        } else if (window.startTetris) {
            window.startTetris();
        }
    });
}

function initGameEscapeHandler() {
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;

        const snakeOverlay = document.getElementById('snakeGameOverlay');
        const snakeGameOver = document.getElementById('snakeGameOver');
        const tetrisOverlay = document.getElementById('tetrisGameOverlay');
        const tetrisGameOver = document.getElementById('gameOver');

        if (snakeOverlay && snakeOverlay.classList.contains('active')) {
            if (window.hideSnakeGame) window.hideSnakeGame();
            return;
        }

        if (snakeGameOver && snakeGameOver.classList.contains('active')) {
            snakeGameOver.classList.remove('active');
            snakeGameOver.style.display = 'none';
            return;
        }

        if (tetrisOverlay && tetrisOverlay.classList.contains('active')) {
            if (window.hideTetris) window.hideTetris();
            return;
        }

        if (tetrisGameOver && tetrisGameOver.classList.contains('active')) {
            tetrisGameOver.classList.remove('active');
            tetrisGameOver.style.display = 'none';
        }
    });
}

log(`
██████╗ ███████╗████████╗██████╗  ██████╗
██╔══██╗██╔════╝╚══██╔══╝██╔══██╗██╔═══██╗
██████╔╝█████╗     ██║   ██████╔╝██║   ██║
██╔══██╗██╔══╝     ██║   ██╔══██╗██║   ██║
██║  ██║███████╗   ██║   ██║  ██║╚██████╔╝
╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝

Easter Eggs: Snake Ctrl+Alt+Shift+S | Tetris Ctrl+Alt+Shift+T
`);

document.addEventListener('DOMContentLoaded', async function () {
    try {
        await initLoadingScreen();
        initTypingAnimation();

        initMobileMenu();
        initThemeToggle();
        initSmoothScrolling();
        initActiveNavigation();

        if (!prefersReducedMotion()) {
            initParallax();
            initASCIIAnimations();
            initGlitchEffects();
        }

        initScrollAnimations();
        initLazyLoading();
        initAnimatedTimeline();
        initProjectHoverEffects();
        initPWAFeatures();
        initEnhancedSkills();
        initContactForm();
        initCVDownload();

        initGameKeyboardShortcuts();
        initGameEscapeHandler();

        initSEO();
        initAnalytics();
        initPerformanceMonitoring();

        log('✓ Portfolio initialized successfully!');
    } catch (err) {
        error('Error initializing portfolio:', err);
    }
});
