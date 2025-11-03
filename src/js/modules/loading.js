// Loading Screen Module with Terminal Animation
export function initLoadingScreen() {
    return new Promise((resolve) => {
        const overlay = document.getElementById('loadingOverlay');
        if (!overlay) {
            resolve();
            return;
        }

        overlay.classList.remove('hidden');
        overlay.style.display = 'flex';
        overlay.setAttribute('aria-hidden', 'false');

        const terminalBody = overlay.querySelector('.terminal-body');
        if (!terminalBody) {
            resolve();
            return;
        }

        function hideOverlay() {
            overlay.classList.add('hidden');
            overlay.setAttribute('aria-hidden', 'true');

            const handleTransitionEnd = () => {
                overlay.style.display = 'none';
                overlay.removeEventListener('transitionend', handleTransitionEnd);
            };

            overlay.addEventListener('transitionend', handleTransitionEnd, { once: true });
        }

        // Clear existing content
        terminalBody.innerHTML = '';

        const lines = [
            'PS C:\\Users\\Daniel> npm run dev',
            'Starting development server...',
            '✓ Vite v5.4.20 ready in 150ms',
            '✓ Local: http://localhost:3000/',
            '✓ Loading portfolio assets...',
            '✓ Compiling CSS modules...',
            '✓ Building JavaScript bundles...',
            '✓ Initializing Snake Game...',
            '✓ Initializing Tetris Game...',
            '✓ Loading animations...',
            '✓ Setting up navigation...',
            '✓ Portfolio ready!',
            'PS C:\\Users\\Daniel> '
        ];

        let currentLine = 0;
        let currentChar = 0;
        let isTyping = false;

        function typeNextLine() {
            if (currentLine >= lines.length) {
                // Add blinking cursor to last line
                const lastLine = terminalBody.lastElementChild;
                if (lastLine) {
                    const cursor = document.createElement('span');
                    cursor.className = 'cursor';
                    cursor.textContent = '_';
                    lastLine.appendChild(cursor);
                }
                
                // Hide loading screen after a short delay
                setTimeout(() => {
                    hideOverlay();
                    resolve();
                }, 1000);
                return;
            }

            const lineDiv = document.createElement('div');
            lineDiv.className = 'terminal-line';
            terminalBody.appendChild(lineDiv);

            const line = lines[currentLine];
            const isCommand = line.includes('PS C:\\Users\\Daniel>');
            
            function typeChar() {
                if (currentChar < line.length) {
                    const char = line[currentChar];
                    const span = document.createElement('span');
                    
                    if (isCommand && currentChar >= line.indexOf('npm run dev')) {
                        span.className = 'command';
                    }
                    
                    span.textContent = char;
                    lineDiv.appendChild(span);
                    currentChar++;
                    
                    setTimeout(typeChar, isCommand ? 50 : 30);
                } else {
                    currentLine++;
                    currentChar = 0;
                    setTimeout(typeNextLine, 200);
                }
            }
            
            typeChar();
        }

        // Start typing animation
        setTimeout(typeNextLine, 500);
    });
}



