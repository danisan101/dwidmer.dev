// Main JavaScript Entry Point
import '../css/fonts.css';
import '../css/print.css';
import '../css/critical.css';

// Import all modules
import { initTypingAnimation } from './modules/typing.js';
import { initThemeToggle } from './modules/theme.js';
import { initMobileMenu, initSmoothScrolling, initActiveNavigation } from './modules/navigation.js';
import { initParallax } from './modules/parallax.js';
import { initScrollAnimations } from './modules/animations.js';
import { initContactForm } from './modules/contact.js';
import { initCVPrint } from './modules/cv-download.js';
import { initSnakeGame } from './modules/snake.js';
import { initTetrisGame } from './modules/tetris.js';
import { initSEO } from './modules/seo.js';
import { initAnalytics } from './modules/analytics.js';
import { initPerformanceMonitoring } from './modules/performance.js';
import { initPWAFeatures } from './modules/pwa-features.js';
import { log, error } from './utils/logger.js';

// Console Easter Egg
log(`Easter Eggs: Snake Ctrl+Alt+Shift+S | Tetris Ctrl+Alt+Shift+T`);

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    try {
        initTypingAnimation();

        // Core features
        initMobileMenu();
        initThemeToggle();
        initSmoothScrolling();
        initActiveNavigation();

        // Visual
        initParallax();
        initScrollAnimations();
        initPWAFeatures();

        // Interactive features
        initSnakeGame();
        initTetrisGame();
        initContactForm();
        initCVPrint();

        // Make game functions globally available
        window.initSnakeGame = initSnakeGame;
        window.initTetrisGame = initTetrisGame;

        // Easter Egg Buttons in the header, once the games are ready
        setTimeout(initEasterEggButtons, 200);

        initSEO();
        initAnalytics();
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

        log('Portfolio initialized');
    } catch (err) {
        error('Error initializing portfolio:', err);
    }
});

// Easter Egg Buttons in Header
function initEasterEggButtons() {
    document.querySelectorAll('.easter-egg-btn').forEach((btn) => {
        const game = btn.getAttribute('data-game');

        btn.addEventListener('click', (e) => {
            e.preventDefault();

            if (game === 'snake') {
                if (window.showSnakeGame) window.showSnakeGame();
                else if (window.initSnakeGame) window.initSnakeGame();
            } else if (game === 'tetris') {
                if (window.startTetris) window.startTetris();
                else if (window.initTetrisGame) window.initTetrisGame();
            }
        });
    });
}
