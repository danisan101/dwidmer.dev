// Loading Screen Module
export function initLoadingScreen() {
    return new Promise((resolve) => {
        // Hide loading screen after 800ms or when page is fully loaded
        const hideLoading = () => {
            const overlay = document.getElementById('loadingOverlay');
            if (overlay) {
                overlay.classList.add('hidden');
            }
            resolve();
        };
        
        setTimeout(hideLoading, 800);
        
        // Also hide when page is fully loaded (fallback)
        if (document.readyState === 'complete') {
            hideLoading();
        } else {
            window.addEventListener('load', hideLoading);
        }
    });
}



