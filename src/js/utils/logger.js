const DEV_FALLBACK = typeof import.meta !== 'undefined' && import.meta.env && Boolean(import.meta.env.DEV);

let cachedPreference;

function resolvePreference() {
    if (cachedPreference !== undefined) {
        return cachedPreference;
    }

    let preference = DEV_FALLBACK;

    if (typeof window !== 'undefined') {
        if (typeof window.__DW_DEBUG__ !== 'undefined') {
            cachedPreference = Boolean(window.__DW_DEBUG__);
            return cachedPreference;
        }

        try {
            const stored = window.localStorage.getItem('dw-debug-logs');
            if (stored === 'true') {
                preference = true;
            } else if (stored === 'false') {
                preference = false;
            }
        } catch (error) {
            // Access to localStorage might fail (e.g., disabled cookies). Default to fallback.
        }
    }

    cachedPreference = preference;
    return cachedPreference;
}

export function log(...args) {
    if (resolvePreference()) {
        console.log(...args);
    }
}

export function warn(...args) {
    if (resolvePreference()) {
        console.warn(...args);
    }
}

export function error(...args) {
    console.error(...args);
}

export function shouldLog() {
    return resolvePreference();
}
