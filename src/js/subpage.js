// Entry point for every page except the homepage.
// Sharing theme.js and navigation.js is what keeps the subpages from
// drifting away from index.html the way the copied inline scripts did.
import { initThemeToggle } from './modules/theme.js';
import { initMobileMenu } from './modules/navigation.js';
import { initCopyrightYear } from './modules/year.js';

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initThemeToggle();
    initCopyrightYear();
});
