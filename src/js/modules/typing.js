// Typing Animation Module
export function initTypingAnimation() {
    const nameElement = document.getElementById('heroName');
    if (!nameElement) return;

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fullText = (nameElement.getAttribute('data-text') || nameElement.textContent || '').trim();

    if (!fullText) {
        return;
    }

    if (prefersReducedMotion) {
        nameElement.textContent = fullText;
        return;
    }

    const characters = Array.from(fullText);
    let index = 0;

    nameElement.textContent = '';

    const typeNextCharacter = () => {
        if (index >= characters.length) {
            nameElement.textContent = fullText;
            return;
        }

        nameElement.textContent += characters[index];
        index += 1;

        window.setTimeout(typeNextCharacter, 120);
    };

    typeNextCharacter();
}




