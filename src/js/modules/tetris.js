// Tetris Game Module
import { log, error } from '../utils/logger.js';
let gameRunning = false;
let board = [];
let currentPiece = null;
let nextPiece = null;
let score = 0;
let lines = 0;
let level = 1;
let dropTime = 0;
let lastTime = 0;
let highscore = Number(localStorage.getItem('tetrisHighscore') || 0);

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const BLOCK_SIZE = 30;

const pieces = [
    [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]], // I
    [[1,1],[1,1]], // O
    [[0,1,0],[1,1,1],[0,0,0]], // T
    [[0,1,1],[1,1,0],[0,0,0]], // S
    [[1,1,0],[0,1,1],[0,0,0]], // Z
    [[1,0,0],[1,1,1],[0,0,0]], // J
    [[0,0,1],[1,1,1],[0,0,0]]  // L
];

const colors = ['#00f', '#ff0', '#f0f', '#0f0', '#f00', '#00f', '#fa0'];

// Global functions
function startTetris() {
    log('🧩 startTetris called');

    const existingOverlay = document.getElementById('tetrisGameOverlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }

    const overlay = document.createElement('div');
    overlay.id = 'tetrisGameOverlay';
    overlay.className = 'game-overlay active';
    overlay.setAttribute('aria-hidden', 'false');
    // Inline critical styles so overlay works even before CSS loads
    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(2px);
        z-index: 12000;
        padding: 2rem;
    `;

    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            hideTetris();
        }
    });

    const gameContainer = document.createElement('div');
    gameContainer.className = 'game-terminal active';
    gameContainer.id = 'tetrisGame';
    gameContainer.setAttribute('role', 'dialog');
    gameContainer.setAttribute('aria-modal', 'true');
    gameContainer.setAttribute('aria-labelledby', 'tetrisTitle');

    gameContainer.innerHTML = `
        <div class="terminal-header">
            <div class="terminal-title" id="tetrisTitle">tetris.exe</div>
            <button class="close-btn" type="button" aria-label="Tetris schliessen">✕</button>
        </div>
        <div class="terminal-body">
            <div class="game-info">
                <div class="score-info">
                    Score: <span id="tetrisScore">0</span> |
                    Highscore: <span id="tetrisHighscore">0</span> |
                    Lines: <span id="tetrisLines">0</span> |
                    Level: <span id="tetrisLevel">1</span>
                </div>
                <div class="controls-info">
                    Next Piece:
                </div>
            </div>
            <div class="game-canvas-container">
                <canvas class="next-piece" id="nextPieceCanvas" width="80" height="80"></canvas>
                <canvas class="game-canvas" id="tetrisCanvas" width="300" height="600" aria-label="Tetris Spielfeld" tabindex="0"></canvas>
            </div>
            <div class="game-controls">
                A/D: Move | S: Soft Drop | W: Rotate | Space: Hard Drop | ESC: Close
            </div>
        </div>
    `;

    const closeButton = gameContainer.querySelector('.close-btn');
    if (closeButton) {
        closeButton.addEventListener('click', () => hideTetris());
    }

    overlay.appendChild(gameContainer);
    document.body.appendChild(overlay);
    document.body.classList.add('game-modal-open');

    const canvas = document.getElementById('tetrisCanvas');
    const nextCanvas = document.getElementById('nextPieceCanvas');
    const scoreElement = document.getElementById('tetrisScore');
    const linesElement = document.getElementById('tetrisLines');
    const levelElement = document.getElementById('tetrisLevel');
    const highscoreElement = document.getElementById('tetrisHighscore');
    const gameOverScreen = document.getElementById('gameOver');

    // Hide Snake if it's running
    const snakeGame = document.getElementById('snakeGame');
    const snakeGameOver = document.getElementById('snakeGameOver');
    if (snakeGame && snakeGame.classList.contains('active')) {
        snakeGame.classList.remove('active');
        if (snakeGameOver) snakeGameOver.classList.remove('active');
        if (window.hideSnakeGame) window.hideSnakeGame();
    }

    log('✅ Tetris game container activated');

    gameRunning = true;
    score = 0;
    lines = 0;
    level = 1;
    createBoard();
    currentPiece = createPiece();
    nextPiece = createPiece();
    highscore = Number(localStorage.getItem('tetrisHighscore') || 0);
    updateDisplay();
    gameLoop();

    if (canvas) {
        canvas.focus();
    }
}

function hideTetris(options = {}) {
    const { preserveGameOver = false } = options;
    const overlay = document.getElementById('tetrisGameOverlay');
    const gameContainer = overlay ? overlay.querySelector('#tetrisGame') : null;

    if (gameContainer) {
        gameContainer.classList.remove('active');
    }

    if (overlay) {
        overlay.style.display = 'none';
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        overlay.remove();
    }

    document.body.classList.remove('game-modal-open');

    const gameOverScreen = document.getElementById('gameOver');
    if (!preserveGameOver && gameOverScreen) {
        gameOverScreen.classList.remove('active');
        gameOverScreen.style.display = 'none';
    }
    gameRunning = false;
    log('🧩 Tetris game hidden');
}

// Make functions available globally
window.startTetris = startTetris;
window.hideTetris = hideTetris;

// Controls
document.addEventListener('keydown', (e) => {
    if (!gameRunning) {
        const gameOverScreen = document.getElementById('gameOver');
        if (gameOverScreen && gameOverScreen.classList.contains('active')) {
            if (e.key === ' ') {
                gameOverScreen.classList.remove('active');
                startTetris();
            } else if (e.key === 'Escape') {
                hideTetris();
            }
        }
        return;
    }
    
    switch(e.key) {
        case 'a':
        case 'A':
        case 'ArrowLeft':
            e.preventDefault();
            movePiece(currentPiece, -1, 0);
            break;
        case 'd':
        case 'D':
        case 'ArrowRight':
            e.preventDefault();
            movePiece(currentPiece, 1, 0);
            break;
        case 's':
        case 'S':
        case 'ArrowDown':
            e.preventDefault();
            movePiece(currentPiece, 0, 1);
            break;
        case 'w':
        case 'W':
        case 'ArrowUp':
            e.preventDefault();
            rotatePiece(currentPiece);
            break;
        case ' ':
            e.preventDefault();
            while (movePiece(currentPiece, 0, 1)) {}
            break;
        case 'Escape':
            hideTetris();
            break;
    }
});

// Easter Egg: Ctrl+Alt+Shift+T
document.addEventListener('keydown', (e) => {
    if (e.shiftKey && e.altKey && e.ctrlKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        startTetris();
    }
});

export function initTetrisGame() {
    log('🧩 Initializing Tetris Game...');
    
    log('✅ Tetris Game initialized successfully!');
    log('🎮 Available functions:', { startTetris, hideTetris });
}

// Game logic functions
function createBoard() {
    board = Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0));
}

function createPiece() {
    const type = Math.floor(Math.random() * pieces.length);
    return {
        shape: pieces[type],
        x: Math.floor(BOARD_WIDTH / 2) - Math.floor(pieces[type][0].length / 2),
        y: 0,
        color: colors[type]
    };
}

function drawBlock(context, x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    context.strokeStyle = '#fff';
    context.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
}

function drawBoard() {
    const canvas = document.getElementById('tetrisCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < BOARD_HEIGHT; y++) {
        for (let x = 0; x < BOARD_WIDTH; x++) {
            if (board[y][x]) {
                drawBlock(ctx, x, y, board[y][x]);
            }
        }
    }
}

function drawGrid() {
    const canvas = document.getElementById('tetrisCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= BOARD_WIDTH; x++) {
        ctx.beginPath();
        ctx.moveTo(x * BLOCK_SIZE + 0.5, 0);
        ctx.lineTo(x * BLOCK_SIZE + 0.5, BOARD_HEIGHT * BLOCK_SIZE);
        ctx.stroke();
    }
    for (let y = 0; y <= BOARD_HEIGHT; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * BLOCK_SIZE + 0.5);
        ctx.lineTo(BOARD_WIDTH * BLOCK_SIZE, y * BLOCK_SIZE + 0.5);
        ctx.stroke();
    }
    ctx.restore();
}

function drawPiece(piece, context = null) {
    const canvas = document.getElementById('tetrisCanvas');
    if (!canvas) return;
    const ctx = context || canvas.getContext('2d');
    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                drawBlock(ctx, piece.x + x, piece.y + y, piece.color);
            }
        });
    });
}

function drawNextPiece() {
    const nextCanvas = document.getElementById('nextPieceCanvas');
    if (!nextCanvas) return;
    const nextCtx = nextCanvas.getContext('2d');
    nextCtx.clearRect(0, 0, nextCanvas.width, nextCanvas.height);
    if (nextPiece) {
        const offsetX = (4 - nextPiece.shape[0].length) / 2;
        const offsetY = (4 - nextPiece.shape.length) / 2;
        nextPiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    nextCtx.fillStyle = nextPiece.color;
                    nextCtx.fillRect((offsetX + x) * 20, (offsetY + y) * 20, 20, 20);
                    nextCtx.strokeStyle = '#fff';
                    nextCtx.strokeRect((offsetX + x) * 20, (offsetY + y) * 20, 20, 20);
                }
            });
        });
    }
}

function collides(piece, board) {
    for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
            if (!piece.shape[y][x]) continue;
            const newX = piece.x + x;
            const newY = piece.y + y;
            if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
                return true;
            }
            if (newY >= 0 && board[newY][newX] !== 0) {
                return true;
            }
        }
    }
    return false;
}

function merge(piece, board) {
    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                board[piece.y + y][piece.x + x] = piece.color;
            }
        });
    });
}

function clearLines() {
    let linesCleared = 0;
    for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
        if (board[y].every(block => block !== 0)) {
            board.splice(y, 1);
            board.unshift(Array(BOARD_WIDTH).fill(0));
            linesCleared++;
            y++;
        }
    }
    if (linesCleared > 0) {
        lines += linesCleared;
        score += linesCleared * 100 * level;
        level = Math.floor(lines / 10) + 1;
        updateDisplay();
    }
}

function rotatePiece(piece) {
    const rotated = piece.shape[0].map((_, i) =>
        piece.shape.map(row => row[i]).reverse()
    );
    const rotatedPiece = { ...piece, shape: rotated };
    if (!collides(rotatedPiece, board)) {
        piece.shape = rotated;
    }
}

function movePiece(piece, dx, dy) {
    piece.x += dx;
    piece.y += dy;
    if (collides(piece, board)) {
        piece.x -= dx;
        piece.y -= dy;
        return false;
    }
    return true;
}

function updateDisplay() {
    const scoreElement = document.getElementById('tetrisScore');
    const linesElement = document.getElementById('tetrisLines');
    const levelElement = document.getElementById('tetrisLevel');
    const highscoreElement = document.getElementById('tetrisHighscore');
    
    if (scoreElement) scoreElement.textContent = score;
    if (linesElement) linesElement.textContent = lines;
    if (levelElement) levelElement.textContent = level;
    if (highscoreElement) highscoreElement.textContent = String(highscore);
}

function gameLoop(time = 0) {
    if (!gameRunning) return;

    const deltaTime = time - lastTime;
    lastTime = time;
    dropTime += deltaTime;

    if (dropTime > 1000 / level) {
        if (!movePiece(currentPiece, 0, 1)) {
            merge(currentPiece, board);
            clearLines();
            currentPiece = nextPiece;
            nextPiece = createPiece();
            
            if (collides(currentPiece, board)) {
                endGame();
                return;
            }
        }
        dropTime = 0;
    }

    drawBoard();
    drawGrid();
    drawPiece(currentPiece);
    drawNextPiece();
    requestAnimationFrame(gameLoop);
}

function endGame() {
    gameRunning = false;
    if (score > highscore) {
        highscore = score;
        localStorage.setItem('tetrisHighscore', String(highscore));
    }
    const finalScoreElement = document.getElementById('finalScore');
    const finalLinesElement = document.getElementById('finalLines');
    const finalHighscoreElement = document.getElementById('finalHighscore');
    const gameOverScreen = document.getElementById('gameOver');
    
    if (finalScoreElement) finalScoreElement.textContent = score;
    if (finalLinesElement) finalLinesElement.textContent = lines;
    if (finalHighscoreElement) finalHighscoreElement.textContent = String(highscore);
    hideTetris({ preserveGameOver: true });
    if (gameOverScreen) gameOverScreen.classList.add('active');
}