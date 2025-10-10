// Tetris Game Module
export function initTetrisGame() {
    const gameContainer = document.getElementById('tetrisGame');
    const canvas = document.getElementById('tetrisCanvas');
    const gameOverScreen = document.getElementById('gameOver');
    
    if (!canvas || !gameContainer || !gameOverScreen) return;
    
    // Ensure both game container and game over screen are hidden on init
    gameContainer.classList.remove('active');
    gameOverScreen.classList.remove('active');
    
    const ctx = canvas.getContext('2d');
    const nextCanvas = document.getElementById('nextPieceCanvas');
    const nextCtx = nextCanvas.getContext('2d');
    const scoreElement = document.getElementById('tetrisScore');
    const linesElement = document.getElementById('tetrisLines');
    const levelElement = document.getElementById('tetrisLevel');
    const highscoreElement = document.getElementById('tetrisHighscore');
    const finalHighscoreElement = document.getElementById('finalHighscore');

    const BOARD_WIDTH = 10;
    const BOARD_HEIGHT = 20;
    const BLOCK_SIZE = 30;

    let board = [];
    let currentPiece = null;
    let nextPiece = null;
    let gameRunning = false;
    let score = 0;
    let lines = 0;
    let level = 1;
    let dropTime = 0;
    let lastTime = 0;
    let highscore = Number(localStorage.getItem('tetrisHighscore') || 0);
    highscoreElement.textContent = String(highscore);

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

    function drawPiece(piece, context = ctx) {
        piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    drawBlock(context, piece.x + x, piece.y + y, piece.color);
                }
            });
        });
    }

    function drawNextPiece() {
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
        scoreElement.textContent = score;
        linesElement.textContent = lines;
        levelElement.textContent = level;
        highscoreElement.textContent = String(highscore);
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

    function startTetris() {
        gameContainer.classList.add('active');
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
    }

    function endGame() {
        gameRunning = false;
        if (score > highscore) {
            highscore = score;
            localStorage.setItem('tetrisHighscore', String(highscore));
        }
        document.getElementById('finalScore').textContent = score;
        document.getElementById('finalLines').textContent = lines;
        finalHighscoreElement.textContent = String(highscore);
        highscoreElement.textContent = String(highscore);
        gameOverScreen.classList.add('active');
    }

    function hideTetris() {
        gameContainer.classList.remove('active');
        gameOverScreen.classList.remove('active');
        gameRunning = false;
    }

    // Controls
    document.addEventListener('keydown', (e) => {
        if (!gameRunning) {
            if (gameOverScreen.classList.contains('active')) {
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

    // Make startTetris available globally for button clicks
    window.startTetris = startTetris;
    window.hideTetris = hideTetris;
}



