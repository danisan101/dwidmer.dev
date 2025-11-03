import { log, error } from '../utils/logger.js';
// Snake Game Module
import { log, error } from '../utils/logger.js';
let gameRunning = false;
let snake = [{x: 150, y: 150}];
let food = {x: 90, y: 90};
let dx = 0;
let dy = 0;
let score = 0;
let highscore = Number(localStorage.getItem('snakeHighscore') || 0);

// Global functions
function showSnakeGame() {
    log('🐍 showSnakeGame called');
    
    // Create game container dynamically
    const existingContainer = document.getElementById('snakeGame');
    if (existingContainer) {
        existingContainer.remove();
    }
    
    const gameContainer = document.createElement('div');
    gameContainer.className = 'game-terminal';
    gameContainer.id = 'snakeGame';
    gameContainer.style.display = 'none';
    
    gameContainer.innerHTML = `
        <div class="terminal-header">
            <div class="terminal-title">snake.exe</div>
            <button class="close-btn" onclick="hideSnakeGame()">✕</button>
        </div>
        <div class="terminal-body">
            <div class="game-info">
                <div class="score-info">
                    Score: <span id="snakeScore">0</span> | Highscore: <span id="snakeHighscore">0</span>
                </div>
                <div class="controls-info">
                    Use WASD or Arrow Keys
                </div>
            </div>
            <div class="game-canvas-container">
                <canvas class="game-canvas" id="snakeCanvas" width="300" height="300"></canvas>
            </div>
            <div class="game-controls">
                Use WASD or Arrow Keys | ESC to close
            </div>
        </div>
    `;
    
    document.body.appendChild(gameContainer);
    
    const canvas = document.getElementById('snakeCanvas');
    const scoreElement = document.getElementById('snakeScore');
    const highscoreElement = document.getElementById('snakeHighscore');
    
    log('Game container:', gameContainer);
    
    // Hide Tetris if it's running
    const tetrisGame = document.getElementById('tetrisGame');
    const tetrisGameOver = document.getElementById('gameOver');
    if (tetrisGame && tetrisGame.classList.contains('active')) {
        tetrisGame.classList.remove('active');
        if (tetrisGameOver) tetrisGameOver.classList.remove('active');
        if (window.hideTetris) window.hideTetris();
    }
    
    if (gameContainer) {
        // Force visibility with multiple methods
        gameContainer.style.display = 'flex';
        gameContainer.style.visibility = 'visible';
        gameContainer.style.opacity = '1';
        gameContainer.classList.add('active');
        
        // Ensure it's on top
        gameContainer.style.zIndex = '10000';
        
        log('✅ Snake game container activated');
        log('Container styles:', {
            display: gameContainer.style.display,
            visibility: gameContainer.style.visibility,
            opacity: gameContainer.style.opacity,
            zIndex: gameContainer.style.zIndex
        });
    } else {
        error('❌ Game container not found!');
    }
    
    gameRunning = true;
    snake = [{x: 150, y: 150}];
    dx = 0;
    dy = 0;
    score = 0;
    scoreElement.textContent = score;
    highscore = Number(localStorage.getItem('snakeHighscore') || 0);
    highscoreElement.textContent = String(highscore);
    generateFood();
    gameLoop();
}

function hideSnakeGame() {
    const gameContainer = document.getElementById('snakeGame');
    if (gameContainer) {
        gameContainer.classList.remove('active');
        gameContainer.style.display = 'none';
    }
    const gameOverScreen = document.getElementById('snakeGameOver');
    if (gameOverScreen) {
        gameOverScreen.classList.remove('active');
        gameOverScreen.style.display = 'none';
    }
    gameRunning = false;
    log('🐍 Snake game hidden');
}

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
export function initSnakeGame() {
    log('🐍 Initializing Snake Game...');
    
    // Create game container dynamically
    function createSnakeGameContainer() {
        const existingContainer = document.getElementById('snakeGame');
        if (existingContainer) {
            existingContainer.remove();
        }
        
        const gameContainer = document.createElement('div');
        gameContainer.className = 'game-terminal';
        gameContainer.id = 'snakeGame';
        gameContainer.style.display = 'none';
        
        gameContainer.innerHTML = `
            <div class="terminal-header">
                <div class="terminal-title">snake.exe</div>
                <button class="close-btn" onclick="hideSnakeGame()">✕</button>
            </div>
            <div class="terminal-body">
                <div class="game-info">
                    <div class="score-info">
                        Score: <span id="snakeScore">0</span> | Highscore: <span id="snakeHighscore">0</span>
                    </div>
                    <div class="game-canvas-container">
                        <canvas class="game-canvas" id="${CANVAS_ID}" width="${SIZE}" height="${SIZE}" aria-label="Snake Spielbrett" tabindex="0"></canvas>
                    </div>
                    <div class="game-controls">Füttere die Schlange, aber meide die Wände!</div>
                </div>
            </div>
        `;

        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
                hideSnakeGame();
            }
        
        document.body.appendChild(gameContainer);
        return gameContainer;
    }
    
    const gameContainer = createSnakeGameContainer();
    const canvas = document.getElementById('snakeCanvas');
    
    if (!canvas) {
        error('❌ Snake canvas not found!');
        return;
    }
    
    log('✅ Snake canvas found, initializing...');
    
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('snakeScore');
    const highscoreElement = document.getElementById('snakeHighscore');

    let snake = [{x: 150, y: 150}];
    let food = {x: 90, y: 90};
    let dx = 0;
    let dy = 0;
    let score = 0;
    let gameRunning = false;
    let highscore = Number(localStorage.getItem('snakeHighscore') || 0);
    highscoreElement.textContent = String(highscore);

    function drawSnake() {
        ctx.fillStyle = '#ffffff';
        snake.forEach(segment => {
            ctx.fillRect(segment.x, segment.y, 10, 10);
        });

        document.body.appendChild(overlay);

        const closeBtn = overlay.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', hideSnakeGame);
        }
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
    function showSnakeGame() {
        log('🐍 showSnakeGame called');
        
        // Recreate container to ensure it's fresh
        const gameContainer = createSnakeGameContainer();
        const canvas = document.getElementById('snakeCanvas');
        const scoreElement = document.getElementById('snakeScore');
        const highscoreElement = document.getElementById('snakeHighscore');
        
        log('Game container:', gameContainer);
        
        // Hide Tetris if it's running
        const tetrisGame = document.getElementById('tetrisGame');
        const tetrisGameOver = document.getElementById('gameOver');
        if (tetrisGame && tetrisGame.classList.contains('active')) {
            tetrisGame.classList.remove('active');
            if (tetrisGameOver) tetrisGameOver.classList.remove('active');
            if (window.hideTetris) window.hideTetris();
        }
        
        if (gameContainer) {
            // Force visibility with multiple methods
            gameContainer.style.display = 'flex';
            gameContainer.style.visibility = 'visible';
            gameContainer.style.opacity = '1';
            gameContainer.classList.add('active');
            
            // Ensure it's on top
            gameContainer.style.zIndex = '10000';
            
            log('✅ Snake game container activated');
            log('Container styles:', {
                display: gameContainer.style.display,
                visibility: gameContainer.style.visibility,
                opacity: gameContainer.style.opacity,
                zIndex: gameContainer.style.zIndex
            });
        } else {
            error('❌ Game container not found!');
        }
        
        gameRunning = true;
        snake = [{x: 150, y: 150}];
        dx = 0;
        dy = 0;
        score = 0;
        scoreElement.textContent = score;
        highscore = Number(localStorage.getItem('snakeHighscore') || 0);
        highscoreElement.textContent = String(highscore);
        generateFood();
        gameLoop();
    }
}

function hideSnakeGame() {
    const overlay = document.getElementById(OVERLAY_ID);
    const container = document.getElementById(CONTAINER_ID);

    window.clearTimeout(state.loopHandle);
    state.running = false;

    if (container) {
        container.classList.remove('active');
    function hideSnakeGame() {
        if (gameContainer) {
            gameContainer.classList.remove('active');
            gameContainer.style.display = 'none';
        }
        const gameOverScreen = document.getElementById('snakeGameOver');
        if (gameOverScreen) {
            gameOverScreen.classList.remove('active');
            gameOverScreen.style.display = 'none';
        }
        gameRunning = false;
        log('🐍 Snake game hidden');
    }

    if (overlay) {
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
    }

    document.body.classList.remove('game-modal-open');
    log('✅ Snake Game initialized successfully!');
    log('🎮 Available functions:', { showSnakeGame, hideSnakeGame });
}

    const gameOverScreen = document.getElementById('snakeGameOver');
    if (gameOverScreen) {
        gameOverScreen.classList.remove('active');
        gameOverScreen.style.display = 'none';
    }

    log('🐍 Snake game closed');
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

    const gameOverScreen = document.getElementById('snakeGameOver');
    if (gameOverScreen) {
        document.getElementById('snakeFinalScore').textContent = String(state.score);
        document.getElementById('snakeFinalHighscore').textContent = String(state.highscore);
        gameOverScreen.classList.add('active');
        gameOverScreen.style.display = 'block';
    }
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

export function initSnakeGame() {
    log('🐍 Initializing Snake Game...');
    ensureHighscore();

    window.showSnakeGame = showSnakeGame;
    window.hideSnakeGame = hideSnakeGame;

    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('keydown', handleShortcuts);
    document.addEventListener('keydown', handleGameOverControls);

    log('🐍 Snake Game ready');
}
