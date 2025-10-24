// Snake Game Module
export function initSnakeGame() {
    console.log('🐍 Initializing Snake Game...');
    
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
        return gameContainer;
    }
    
    const gameContainer = createSnakeGameContainer();
    const canvas = document.getElementById('snakeCanvas');
    
    if (!canvas) {
        console.error('❌ Snake canvas not found!');
        return;
    }
    
    console.log('✅ Snake canvas found, initializing...');
    
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
    }

    function drawFood() {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(food.x, food.y, 10, 10);
    }

    function moveSnake() {
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score += 10;
            scoreElement.textContent = score;
            generateFood();
        } else {
            snake.pop();
        }
    }

    function generateFood() {
        food = {
            x: Math.floor(Math.random() * 30) * 10,
            y: Math.floor(Math.random() * 30) * 10
        };
    }

    function checkCollision() {
        const head = snake[0];
        if (head.x < 0 || head.x >= 300 || head.y < 0 || head.y >= 300) {
            return true;
        }
        return false;
    }

    function gameLoop() {
        if (!gameRunning) return;

        ctx.clearRect(0, 0, 300, 300);
        moveSnake();
        
        if (checkCollision()) {
            gameRunning = false;
            if (score > highscore) {
                highscore = score;
                localStorage.setItem('snakeHighscore', String(highscore));
            }
            highscoreElement.textContent = String(highscore);
            // Show game over screen like Tetris
            showGameOver();
            return;
        }

        drawSnake();
        drawFood();
        setTimeout(gameLoop, 150);
    }

    function showSnakeGame() {
        console.log('🐍 showSnakeGame called');
        
        // Recreate container to ensure it's fresh
        const gameContainer = createSnakeGameContainer();
        const canvas = document.getElementById('snakeCanvas');
        const scoreElement = document.getElementById('snakeScore');
        const highscoreElement = document.getElementById('snakeHighscore');
        
        console.log('Game container:', gameContainer);
        
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
            
            console.log('✅ Snake game container activated');
            console.log('Container styles:', {
                display: gameContainer.style.display,
                visibility: gameContainer.style.visibility,
                opacity: gameContainer.style.opacity,
                zIndex: gameContainer.style.zIndex
            });
        } else {
            console.error('❌ Game container not found!');
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
        console.log('🐍 Snake game hidden');
    }
    
    function showGameOver() {
        const gameOverScreen = document.getElementById('snakeGameOver');
        if (gameOverScreen) {
            document.getElementById('snakeFinalScore').textContent = score;
            document.getElementById('snakeFinalHighscore').textContent = highscore;
            gameOverScreen.classList.add('active');
        }
    }

    // Controls
    document.addEventListener('keydown', (e) => {
        if (!gameRunning) return;
        
        switch(e.key) {
            case 'ArrowUp':
            case 'w':
                e.preventDefault();
                if (dy === 0) { dx = 0; dy = -10; }
                break;
            case 'ArrowDown':
            case 's':
                e.preventDefault();
                if (dy === 0) { dx = 0; dy = 10; }
                break;
            case 'ArrowLeft':
            case 'a':
                e.preventDefault();
                if (dx === 0) { dx = -10; dy = 0; }
                break;
            case 'ArrowRight':
            case 'd':
                e.preventDefault();
                if (dx === 0) { dx = 10; dy = 0; }
                break;
            case 'Escape':
                hideSnakeGame();
                break;
        }
    });

    // Easter Egg: Ctrl+Alt+Shift+S
    document.addEventListener('keydown', (e) => {
        if (e.shiftKey && e.altKey && e.ctrlKey && e.key.toLowerCase() === 's') {
            e.preventDefault();
            showSnakeGame();
        }
    });
    
    // Handle game over screen restart
    document.addEventListener('keydown', (e) => {
        const gameOverScreen = document.getElementById('snakeGameOver');
        if (gameOverScreen && gameOverScreen.classList.contains('active')) {
            if (e.key === ' ') {
                e.preventDefault();
                gameOverScreen.classList.remove('active');
                showSnakeGame();
            } else if (e.key === 'Escape') {
                hideSnakeGame();
            }
        }
    });
    
    // Mobile touch controls for Snake
    const snakeContainer = document.getElementById('snakeGame');
    if (snakeContainer) {
        let touchStartX = 0;
        let touchStartY = 0;
        
        snakeContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });
        
        snakeContainer.addEventListener('touchend', (e) => {
            if (!gameRunning) return;
            
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // Horizontal swipe
                if (deltaX > 30) {
                    // Right swipe
                    if (dy === 0) { dx = 10; dy = 0; }
                } else if (deltaX < -30) {
                    // Left swipe
                    if (dy === 0) { dx = -10; dy = 0; }
                }
            } else {
                // Vertical swipe
                if (deltaY > 30) {
                    // Down swipe
                    if (dx === 0) { dx = 0; dy = 10; }
                } else if (deltaY < -30) {
                    // Up swipe
                    if (dx === 0) { dx = 0; dy = -10; }
                }
            }
        });
    }
    
    // Make functions available globally for button clicks
    window.showSnakeGame = showSnakeGame;
    window.hideSnakeGame = hideSnakeGame;
    
    console.log('✅ Snake Game initialized successfully!');
    console.log('🎮 Available functions:', { showSnakeGame, hideSnakeGame });
}

