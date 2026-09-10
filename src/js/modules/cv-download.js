// Printing the CV uses the #cvPrintable block that print.css already reveals,
// so the printed sheet uses the site's local fonts and stays in sync with the page.
export function initCVPrint() {
    document.querySelectorAll('[data-print-cv]').forEach((btn) => {
        btn.addEventListener('click', () => window.print());
    });
}
