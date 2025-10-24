// CV Download Module with Glitch Effects
export function initCVDownload() {
    const downloadTerminal = document.querySelector('.cv-download-terminal');
    if (!downloadTerminal) return;

    downloadTerminal.addEventListener('click', async function(e) {
        e.preventDefault();
        
        // Add glitch effect
        addGlitchEffect(downloadTerminal);
        
        // Wait for glitch effect to complete
        setTimeout(() => {
            printCV();
        }, 1000);
    });
}

// Glitch effect for CV download button
function addGlitchEffect(element) {
    element.classList.add('glitch-active');
    
    // Add random glitch text variations
    const originalText = element.querySelector('.download-command').textContent;
    const glitchTexts = [
        'PS C:\\Users\\Daniel\\CV> Get-CV --corrupted',
        'PS C:\\Users\\Daniel\\CV> Get-CV --error',
        'PS C:\\Users\\Daniel\\CV> Get-CV --glitch',
        'PS C:\\Users\\Daniel\\CV> Get-CV --download',
        'PS C:\\Users\\Daniel\\CV> Get-CV --success'
    ];
    
    let glitchCount = 0;
    const glitchInterval = setInterval(() => {
        if (glitchCount < 5) {
            element.querySelector('.download-command').textContent = glitchTexts[glitchCount];
            glitchCount++;
        } else {
            clearInterval(glitchInterval);
            element.querySelector('.download-command').textContent = originalText;
            element.classList.remove('glitch-active');
        }
    }, 150);
}

// Simple print function - no hanging
function simplePrint() {
    const cvElement = document.getElementById('cvPrintable');
    if (!cvElement) return;
    
    const originalDisplay = cvElement.style.display;
    cvElement.style.display = 'block';
    
    // Brief timeout to ensure rendering
    setTimeout(() => {
        window.print();
        cvElement.style.display = originalDisplay;
    }, 100);
}

function printCV() {
    const cvElement = document.getElementById('cvPrintable');
    if (!cvElement) return;
    
    const win = window.open('', '_blank', 'width=900,height=700');
    if (!win) return;
    
    win.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Lebenslauf_Daniel_Widmer</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
            <style>
                @page { size: A4; margin: 10mm; }
                body { 
                    font-family: 'Space Mono', monospace; 
                    color:#000; 
                    line-height: 1.6;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }
                h1, h2 { font-weight: 700; }
                hr { border:0; border-top:1px solid #000; margin:16px 0; }
            </style>
        </head>
        <body>${cvElement.innerHTML}</body>
        </html>
    `);
    win.document.close();
    win.focus();
    setTimeout(() => {
        win.print();
        win.close();
    }, 250);
}

