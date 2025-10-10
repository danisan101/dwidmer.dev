// Loading Screen Module
export function initLoadingScreen() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const overlay = document.getElementById('loadingOverlay');
            if (overlay) {
                overlay.classList.add('hidden');
            }
            resolve();
        }, 2000);
    });
}



