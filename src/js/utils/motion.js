// Shared motion preference helper
export function prefersReducedMotion() {
    return Boolean(
        window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
}
