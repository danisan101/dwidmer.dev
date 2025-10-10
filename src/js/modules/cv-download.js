// CV Download Module - Fixed with proper PDF generation
export function initCVDownload() {
    const downloadLink = document.querySelector('.cv-download');
    if (!downloadLink) return;

    downloadLink.addEventListener('click', async function(e) {
        e.preventDefault();
        
        // Simplified: Just use print dialog
        printCV();
    });
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

