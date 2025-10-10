// CRT Effects Toggle Module
export function initCRTToggle() {
    const crtToggle = document.getElementById('crtToggle');
    const body = document.body;
    
    if (!crtToggle) return;
    
    // Load CRT preference from localStorage
    const crtEnabled = localStorage.getItem('crtEnabled') !== 'false';
    
    if (crtEnabled) {
        body.classList.add('crt-enabled');
        crtToggle.textContent = 'TV';
    } else {
        body.classList.remove('crt-enabled');
        crtToggle.textContent = 'TV';
    }

    crtToggle.addEventListener('click', () => {
        const isEnabled = body.classList.toggle('crt-enabled');
        crtToggle.textContent = 'TV';
        localStorage.setItem('crtEnabled', isEnabled);
    });
}



