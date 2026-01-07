// Boot Sequence Module - Shows terminal boot on first visit only
export function initBootSequence() {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem('hasVisited');

    if (!hasVisited) {
        // First visit - show boot sequence
        const bootSequence = document.getElementById('bootSequence');
        const loadingOverlay = document.getElementById('loadingOverlay');

        if (bootSequence && loadingOverlay) {
            // Hide normal loading, show boot
            loadingOverlay.style.display = 'none';
            bootSequence.style.display = 'flex';

            // Hide boot sequence after 3 seconds and mark as visited
            setTimeout(() => {
                bootSequence.style.display = 'none';
                loadingOverlay.style.display = 'flex';
                localStorage.setItem('hasVisited', 'true');

                // Then hide loading overlay after 0.5 seconds
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                }, 500);
            }, 1500);
        }
    }
    // Otherwise, the normal loading screen will be shown (handled by inline script)
}

