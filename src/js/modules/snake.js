// Snake Game Module
export function initSnakeGame() {
    const gameContainer = document.getElementById('snakeGame');
    const canvas = document.getElementById('snakeCanvas');
    if (!canvas) return;
    
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
        gameContainer.classList.add('active');
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
        gameContainer.classList.remove('active');
        const gameOverScreen = document.getElementById('snakeGameOver');
        if (gameOverScreen) gameOverScreen.classList.remove('active');
        gameRunning = false;
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
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // Horizontal swipe
                if (deltaX > 30) {
                    // Right swipe
                    if (direction !== 'left') direction = 'right';
                } else if (deltaX < -30) {
                    // Left swipe
                    if (direction !== 'right') direction = 'left';
                }
            } else {
                // Vertical swipe
                if (deltaY > 30) {
                    // Down swipe
                    if (direction !== 'up') direction = 'down';
                } else if (deltaY < -30) {
                    // Up swipe
                    if (direction !== 'down') direction = 'up';
                }
            }
        });
    }
}

