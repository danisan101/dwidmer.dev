// CRT Effects Toggle Module
export function initCRTToggle() {
    const crtToggle = document.getElementById('crtToggle');
    const body = document.body;
    
    if (!crtToggle) return;
    
    // Load CRT preference from localStorage
    const crtEnabled = localStorage.getItem('crtEnabled') !== 'false';
    
    if (crtEnabled) {
        body.classList.add('crt-enabled');
        crtToggle.textContent = '📺 ON';
    } else {
        body.classList.remove('crt-enabled');
        crtToggle.textContent = '📺 OFF';
    }

    crtToggle.addEventListener('click', () => {
        const isEnabled = body.classList.toggle('crt-enabled');
        crtToggle.textContent = isEnabled ? '📺 ON' : '📺 OFF';
        localStorage.setItem('crtEnabled', isEnabled);
    });
}



