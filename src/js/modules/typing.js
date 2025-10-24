// Typing Animation Module
export function initTypingAnimation() {
    const nameElement = document.getElementById('typed-name');
    if (!nameElement) return;
    
    const name = 'daniel widmer';
    let i = 0;
    
    function typeWriter() {
        if (i < name.length) {
            nameElement.innerHTML = name.substring(0, i + 1) + '<span class="cursor">_</span>';
            i++;
            setTimeout(typeWriter, 150);
        } else {
            nameElement.innerHTML = name + '<span class="cursor">_</span>';
            setInterval(() => {
                const cursor = nameElement.querySelector('.cursor');
                if (cursor) {
                    cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
                }
            }, 500);
        }
    }
    
    typeWriter();
}




