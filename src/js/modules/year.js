// Keeps the footer copyright current without a per-page inline script.
export function initCopyrightYear() {
    const year = String(new Date().getFullYear());
    document.querySelectorAll('.copyright-year').forEach((el) => {
        el.textContent = year;
    });
}
