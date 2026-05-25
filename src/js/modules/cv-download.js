// CV Download — opens PDF after optional glitch feedback
import { prefersReducedMotion } from '../utils/motion.js';

const DEFAULT_CV_URL = '/assets/CV_Daniel_Widmer.pdf';

export function initCVDownload() {
    const downloadTerminal = document.querySelector('.cv-download-terminal');
    if (!downloadTerminal) return;

    const cvUrl = downloadTerminal.getAttribute('data-cv-url') || DEFAULT_CV_URL;

    downloadTerminal.addEventListener('click', (e) => {
        e.preventDefault();

        const openPdf = () => window.open(cvUrl, '_blank', 'noopener');

        if (prefersReducedMotion()) {
            openPdf();
            return;
        }

        addGlitchEffect(downloadTerminal);
        setTimeout(openPdf, 600);
    });
}

function addGlitchEffect(element) {
    const commandEl = element.querySelector('.download-command');
    if (!commandEl) return;

    const originalText = commandEl.textContent;
    const glitchTexts = [
        'PS C:\\Users\\Daniel\\CV> Get-CV --loading',
        'PS C:\\Users\\Daniel\\CV> Get-CV --download',
        'PS C:\\Users\\Daniel\\CV> Get-CV --success'
    ];

    let glitchCount = 0;
    const glitchInterval = setInterval(() => {
        if (glitchCount < glitchTexts.length) {
            commandEl.textContent = glitchTexts[glitchCount];
            glitchCount++;
        } else {
            clearInterval(glitchInterval);
            commandEl.textContent = originalText;
            element.classList.remove('glitch-active');
        }
    }, 120);

    element.classList.add('glitch-active');
}
