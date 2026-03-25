import { log, error } from '../utils/logger.js';

const OVERLAY_ID = 'snakeGameOverlay';
const CONTAINER_ID = 'snakeGame';
const CANVAS_ID = 'snakeCanvas';
const SCORE_ID = 'snakeScore';
const HIGHSCORE_ID = 'snakeHighscore';
const STEP = 10;
const SIZE = 300;
const LOOP_DELAY = 150;

const state = {
    running: false,
    snake: [],
    food: { x: 0, y: 0 },
    dx: 0,
    dy: 0,
    score: 0,
    highscore: 0,
    loopHandle: null,
};

function ensureHighscore() {
    try {
        state.highscore = Number(localStorage.getItem('snakeHighscore') || 0);
    } catch (storageError) {
        error('🐍 Unable to access snake highscore from storage:', storageError);
        state.highscore = 0;
    }
}

function ensureOverlay() {
    let overlay = document.getElementById(OVERLAY_ID);

    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = OVERLAY_ID;
        overlay.className = 'game-overlay';
        overlay.setAttribute('aria-hidden', 'true');
        // Inline critical styles so overlay works even before CSS loads
        overlay.style.cssText = `
            position: fixed;
            inset: 0;
            display: none;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(2px);
            z-index: 12000;
            padding: 2rem;
        `;
        overlay.innerHTML = `
            <div class="game-terminal" id="${CONTAINER_ID}" role="dialog" aria-modal="true" aria-labelledby="snakeTitle">
                <div class="terminal-header">
                    <div class="terminal-title" id="snakeTitle">snake.exe</div>
                    <button type="button" class="close-btn" aria-label="Snake schliessen">✕</button>
                </div>
                <div class="terminal-body">
                    <div class="game-info">
                        <div class="score-info">
                            Score: <span id="${SCORE_ID}">0</span> | Highscore: <span id="${HIGHSCORE_ID}">0</span>
                        </div>
                        <div class="controls-info">WASD / Pfeiltasten – ESC zum Schliessen</div>
                    </div>
                    <div class="game-canvas-container">
                        <canvas class="game-canvas" id="${CANVAS_ID}" width="${SIZE}" height="${SIZE}" aria-label="Snake Spielbrett" tabindex="0"></canvas>
                    </div>
                    <div class="game-controls">
                        <span class="desktop-hint">WASD / Pfeiltasten zum Steuern</span>
                        <span class="mobile-hint">Verwende die Buttons unten</span>
                    </div>
                    <div class="touch-controls snake-touch-controls">
                        <button type="button" class="touch-btn" data-action="left" aria-label="Links">←</button>
                        <button type="button" class="touch-btn" data-action="up" aria-label="Hoch">↑</button>
                        <button type="button" class="touch-btn" data-action="down" aria-label="Runter">↓</button>
                        <button type="button" class="touch-btn" data-action="right" aria-label="Rechts">→</button>
                    </div>
                </div>
            </div>
        `;

        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
                hideSnakeGame();
            }
        });

        document.body.appendChild(overlay);

        const closeBtn = overlay.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', hideSnakeGame);
        }

        overlay.querySelectorAll('.snake-touch-controls .touch-btn').forEach(btn => {
            btn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                if (!state.running) return;
                const action = btn.dataset.action;
                switch (action) {
                    case 'up':
                        if (state.dy === 0) { state.dx = 0; state.dy = -STEP; }
                        break;
                    case 'down':
                        if (state.dy === 0) { state.dx = 0; state.dy = STEP; }
                        break;
                    case 'left':
                        if (state.dx === 0) { state.dx = -STEP; state.dy = 0; }
                        break;
                    case 'right':
                        if (state.dx === 0) { state.dx = STEP; state.dy = 0; }
                        break;
                }
            });
        });
    }

    const container = overlay.querySelector(`#${CONTAINER_ID}`);
    const canvas = overlay.querySelector(`#${CANVAS_ID}`);
    const scoreElement = overlay.querySelector(`#${SCORE_ID}`);
    const highscoreElement = overlay.querySelector(`#${HIGHSCORE_ID}`);

    if (!container || !canvas || !scoreElement || !highscoreElement) {
        throw new Error('Snake game markup is incomplete');
    }

    const context = canvas.getContext('2d');

    return { overlay, container, canvas, context, scoreElement, highscoreElement };
}

function resetGame() {
    state.snake = [{ x: SIZE / 2, y: SIZE / 2 }];
    state.dx = 0;
    state.dy = 0;
    state.score = 0;
    state.food = randomFood();
}

function randomFood() {
    const max = SIZE / STEP;
    return {
        x: Math.floor(Math.random() * max) * STEP,
        y: Math.floor(Math.random() * max) * STEP,
    };
}

function draw(context) {
    context.clearRect(0, 0, SIZE, SIZE);

    context.fillStyle = '#ffffff';
    state.snake.forEach((segment) => {
        context.fillRect(segment.x, segment.y, STEP, STEP);
    });

    context.fillRect(state.food.x, state.food.y, STEP, STEP);
}

function advanceSnake() {
    const head = {
        x: state.snake[0].x + state.dx,
        y: state.snake[0].y + state.dy,
    };

    state.snake.unshift(head);

    if (head.x === state.food.x && head.y === state.food.y) {
        state.score += 10;
        state.food = randomFood();
    } else {
        state.snake.pop();
    }
}

function hasCollision() {
    const head = state.snake[0];

    if (head.x < 0 || head.x >= SIZE || head.y < 0 || head.y >= SIZE) {
        return true;
    }

    return state.snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y);
}

function updateScoreboard(scoreElement, highscoreElement) {
    scoreElement.textContent = String(state.score);
    highscoreElement.textContent = String(state.highscore);
}

function runLoop(context, scoreElement, highscoreElement) {
    if (!state.running) {
        return;
    }

    if (state.dx !== 0 || state.dy !== 0) {
        advanceSnake();

        if (hasCollision()) {
            handleGameOver(scoreElement, highscoreElement);
            return;
        }
    }

    draw(context);
    updateScoreboard(scoreElement, highscoreElement);

    state.loopHandle = window.setTimeout(() => {
        runLoop(context, scoreElement, highscoreElement);
    }, LOOP_DELAY);
}

function showSnakeGame() {
    try {
        const { overlay, container, context, scoreElement, highscoreElement } = ensureOverlay();

        ensureHighscore();
        resetGame();
        updateScoreboard(scoreElement, highscoreElement);

        overlay.style.display = 'flex';
        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');
        container.classList.add('active');
        document.body.classList.add('game-modal-open');

        state.running = true;
        draw(context);

        window.clearTimeout(state.loopHandle);
        runLoop(context, scoreElement, highscoreElement);

        context.canvas.focus();
        log('🐍 Snake game opened');
    } catch (initializationError) {
        error('🐍 Unable to start snake game:', initializationError);
    }
}

function hideSnakeGame() {
    const overlay = document.getElementById(OVERLAY_ID);
    const container = document.getElementById(CONTAINER_ID);

    window.clearTimeout(state.loopHandle);
    state.running = false;

    if (container) {
        container.classList.remove('active');
    }

    if (overlay) {
        overlay.style.display = 'none';
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
    }

    document.body.classList.remove('game-modal-open');

    const gameOverScreen = document.getElementById('snakeGameOver');
    if (gameOverScreen) {
        gameOverScreen.classList.remove('active');
        gameOverScreen.style.display = 'none';
    }

    log('🐍 Snake game closed');
}

function ensureGameOverScreen() {
    let screen = document.getElementById('snakeGameOver');
    if (!screen) {
        screen = document.createElement('div');
        screen.id = 'snakeGameOver';
        screen.className = 'snake-game-over';
        screen.style.display = 'none';
        screen.innerHTML = `
            <h2>SNAKE - GAME OVER</h2>
            <p>Final Score: <span id="snakeFinalScore">0</span></p>
            <p>Highscore: <span id="snakeFinalHighscore">0</span></p>
            <p>Press SPACE to restart or ESC to close</p>
            <div class="game-over-touch-controls">
                <button type="button" class="game-over-btn" data-action="restart">RESTART</button>
                <button type="button" class="game-over-btn" data-action="close">CLOSE</button>
            </div>
        `;
        screen.querySelector('[data-action="restart"]').addEventListener('click', () => {
            screen.classList.remove('active');
            screen.style.display = 'none';
            showSnakeGame();
        });
        screen.querySelector('[data-action="close"]').addEventListener('click', () => {
            screen.classList.remove('active');
            screen.style.display = 'none';
            hideSnakeGame();
        });
        document.body.appendChild(screen);
    }
    return screen;
}

function handleGameOver(scoreElement, highscoreElement) {
    state.running = false;
    window.clearTimeout(state.loopHandle);

    if (state.score > state.highscore) {
        state.highscore = state.score;
        try {
            localStorage.setItem('snakeHighscore', String(state.highscore));
        } catch (storageError) {
            error('🐍 Unable to store snake highscore:', storageError);
        }
    }

    updateScoreboard(scoreElement, highscoreElement);

    hideSnakeGame();

    const gameOverScreen = ensureGameOverScreen();
    document.getElementById('snakeFinalScore').textContent = String(state.score);
    document.getElementById('snakeFinalHighscore').textContent = String(state.highscore);
    gameOverScreen.classList.add('active');
    gameOverScreen.style.display = 'block';
}

function handleKeydown(event) {
    if (!state.running) {
        return;
    }

    const key = event.key.toLowerCase();

    switch (key) {
        case 'arrowup':
        case 'w':
            if (state.dy === 0) {
                state.dx = 0;
                state.dy = -STEP;
            }
            event.preventDefault();
            break;
        case 'arrowdown':
        case 's':
            if (state.dy === 0) {
                state.dx = 0;
                state.dy = STEP;
            }
            event.preventDefault();
            break;
        case 'arrowleft':
        case 'a':
            if (state.dx === 0) {
                state.dx = -STEP;
                state.dy = 0;
            }
            event.preventDefault();
            break;
        case 'arrowright':
        case 'd':
            if (state.dx === 0) {
                state.dx = STEP;
                state.dy = 0;
            }
            event.preventDefault();
            break;
        default:
            break;
    }
}

function handleShortcuts(event) {
    if (event.shiftKey && event.altKey && event.ctrlKey && event.key.toLowerCase() === 's') {
        event.preventDefault();
        showSnakeGame();
    }
}

function handleGameOverControls(event) {
    const gameOverScreen = document.getElementById('snakeGameOver');
    if (!gameOverScreen || !gameOverScreen.classList.contains('active')) {
        return;
    }

    if (event.key === ' ') {
        event.preventDefault();
        gameOverScreen.classList.remove('active');
        gameOverScreen.style.display = 'none';
        showSnakeGame();
    } else if (event.key === 'Escape') {
        gameOverScreen.classList.remove('active');
        gameOverScreen.style.display = 'none';
        hideSnakeGame();
    }
}

// Touch controls for mobile
const touch = { startX: 0, startY: 0 };

function handleTouchStart(event) {
    if (!state.running) return;
    const t = event.touches[0];
    touch.startX = t.clientX;
    touch.startY = t.clientY;
}

function handleTouchEnd(event) {
    if (!state.running) return;
    const t = event.changedTouches[0];
    const dx = t.clientX - touch.startX;
    const dy = t.clientY - touch.startY;
    const minSwipe = 30;

    if (Math.abs(dx) < minSwipe && Math.abs(dy) < minSwipe) return;

    if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal swipe
        if (dx > 0 && state.dx === 0) { state.dx = STEP; state.dy = 0; }
        else if (dx < 0 && state.dx === 0) { state.dx = -STEP; state.dy = 0; }
    } else {
        // Vertical swipe
        if (dy > 0 && state.dy === 0) { state.dx = 0; state.dy = STEP; }
        else if (dy < 0 && state.dy === 0) { state.dx = 0; state.dy = -STEP; }
    }
}

export function initSnakeGame() {
    log('🐍 Initializing Snake Game...');
    ensureHighscore();

    window.showSnakeGame = showSnakeGame;
    window.hideSnakeGame = hideSnakeGame;

    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('keydown', handleShortcuts);
    document.addEventListener('keydown', handleGameOverControls);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    log('🐍 Snake Game ready');
}
