// Loading Screen Module with Terminal Animation
import { prefersReducedMotion } from '../utils/motion.js';

export function initLoadingScreen() {
    return new Promise((resolve) => {
        const overlay = document.getElementById('loadingOverlay');
        if (!overlay) {
            resolve();
            return;
        }

        function finish() {
            overlay.classList.add('hidden');
            overlay.style.display = 'none';
            overlay.setAttribute('aria-hidden', 'true');
            resolve();
        }

        if (prefersReducedMotion()) {
            finish();
            return;
        }

        try {
            if (sessionStorage.getItem('dw-loading-shown')) {
                finish();
                return;
            }
            sessionStorage.setItem('dw-loading-shown', 'true');
        } catch (e) {
            // sessionStorage not available
        }

        overlay.classList.remove('hidden');
        overlay.style.display = 'flex';
        overlay.setAttribute('aria-hidden', 'false');

        const terminalBody = overlay.querySelector('.terminal-body');
        if (!terminalBody) {
            finish();
            return;
        }

        function hideOverlay() {
            overlay.classList.add('hidden');
            overlay.setAttribute('aria-hidden', 'true');

            const handleTransitionEnd = () => {
                overlay.style.display = 'none';
                overlay.removeEventListener('transitionend', handleTransitionEnd);
            };

            overlay.addEventListener('transitionend', handleTransitionEnd);
            window.setTimeout(handleTransitionEnd, 600);
        }

        terminalBody.innerHTML = '';

        const lines = [
            'PS C:\\Users\\Daniel> npm run dev',
            'Starting development server...',
            '✓ Vite ready',
            '✓ Loading portfolio assets...',
            '✓ Portfolio ready!',
            'PS C:\\Users\\Daniel> '
        ];

        let currentLine = 0;
        let currentChar = 0;

        function typeNextLine() {
            if (currentLine >= lines.length) {
                setTimeout(() => {
                    hideOverlay();
                    resolve();
                }, 300);
                return;
            }

            const lineDiv = document.createElement('div');
            lineDiv.className = 'terminal-line';
            terminalBody.appendChild(lineDiv);

            const line = lines[currentLine];
            const isCommand = line.includes('PS C:\\Users\\Daniel>');

            function typeChar() {
                if (currentChar < line.length) {
                    const span = document.createElement('span');
                    if (isCommand && currentChar >= line.indexOf('npm')) {
                        span.className = 'command';
                    }
                    span.textContent = line[currentChar];
                    lineDiv.appendChild(span);
                    currentChar++;
                    setTimeout(typeChar, isCommand ? 10 : 5);
                } else {
                    currentLine++;
                    currentChar = 0;
                    setTimeout(typeNextLine, 50);
                }
            }

            typeChar();
        }

        setTimeout(typeNextLine, 400);
    });
}
