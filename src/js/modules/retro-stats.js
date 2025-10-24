// Retro Statistics Module
let startTime = Date.now();
let mouseDistance = 0;
let lastMouseX = 0;
let lastMouseY = 0;
let clickCount = 0;
let scrollDistance = 0;
let lastScrollY = 0;

export function initRetroStats() {
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        if (lastMouseX !== 0 && lastMouseY !== 0) {
            const dx = e.clientX - lastMouseX;
            const dy = e.clientY - lastMouseY;
            mouseDistance += Math.sqrt(dx * dx + dy * dy);
        }
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
    });
    
    // Track clicks
    document.addEventListener('click', () => {
        clickCount++;
    });
    
    // Track scroll
    window.addEventListener('scroll', () => {
        scrollDistance += Math.abs(window.scrollY - lastScrollY);
        lastScrollY = window.scrollY;
    });
    
    // Update stats every second
    setInterval(updateStats, 1000);
}

function updateStats() {
    const timeOnSite = Math.floor((Date.now() - startTime) / 1000);
    const chars = document.body.innerText.length;
    const mouseMeters = (mouseDistance / 100).toFixed(2); // Convert px to approximate meters
    
    // Update DOM elements
    const statsElements = {
        time: document.getElementById('stat-time'),
        chars: document.getElementById('stat-chars'),
        mouse: document.getElementById('stat-mouse'),
        clicks: document.getElementById('stat-clicks'),
        scroll: document.getElementById('stat-scroll')
    };
    
    if (statsElements.time) statsElements.time.textContent = formatTime(timeOnSite);
    if (statsElements.chars) statsElements.chars.textContent = chars.toLocaleString();
    if (statsElements.mouse) statsElements.mouse.textContent = mouseMeters + 'm';
    if (statsElements.clicks) statsElements.clicks.textContent = clickCount;
    if (statsElements.scroll) statsElements.scroll.textContent = Math.floor(scrollDistance) + 'px';
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function getStats() {
    const timeOnSite = Math.floor((Date.now() - startTime) / 1000);
    const chars = document.body.innerText.length;
    const mouseMeters = (mouseDistance / 100).toFixed(2);
    
    return {
        timeOnSite: formatTime(timeOnSite),
        characters: chars.toLocaleString(),
        mouseDistance: mouseMeters + 'm',
        clicks: clickCount,
        scrollDistance: Math.floor(scrollDistance) + 'px'
    };
}




