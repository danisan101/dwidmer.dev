// Language Toggle Module (German default, English optional)
//
// Text lives in the markup in both languages: <span data-lang="de"> and
// <span data-lang="en"> siblings, hidden by base.css according to <html lang>.
// Attributes are translated through data-en-<attr> (e.g. data-en-aria-label);
// the German original is kept in data-de-<attr> the first time it is swapped.
// The inline script in each page's <head> sets <html lang> before paint.
const LANG_STORAGE_KEY = 'dw-lang';
const TRANSLATED_ATTRS = ['aria-label', 'title', 'alt', 'content', 'value', 'placeholder', 'src', 'href'];

export function getLanguage() {
    return document.documentElement.lang === 'en' ? 'en' : 'de';
}

// Pick a string for text that is written once and not re-rendered on toggle.
export function t(de, en) {
    return getLanguage() === 'en' ? en : de;
}

// Markup carrying both languages, for content that stays on screen while toggling.
export function bilingual(de, en) {
    return `<span data-lang="de">${de}</span><span data-lang="en">${en}</span>`;
}

export function initLanguageToggle() {
    const toggle = document.getElementById('langToggle');

    applyLanguage(getLanguage(), toggle);
    revealHashTarget(toggle);
    window.addEventListener('hashchange', () => revealHashTarget(toggle));

    if (!toggle) return;

    toggle.addEventListener('click', () => {
        const nextLang = getLanguage() === 'en' ? 'de' : 'en';
        applyLanguage(nextLang, toggle);
        storeLanguage(nextLang);
    });
}

// Translate attributes inside markup that was added after page load (game overlays).
export function translateAttributes(root = document) {
    const lang = getLanguage();
    const selector = TRANSLATED_ATTRS.map((attr) => `[data-en-${attr}]`).join(',');
    const elements = root.querySelectorAll(selector);

    elements.forEach((el) => {
        TRANSLATED_ATTRS.forEach((attr) => {
            const en = el.getAttribute(`data-en-${attr}`);
            if (en === null) return;

            if (!el.hasAttribute(`data-de-${attr}`)) {
                el.setAttribute(`data-de-${attr}`, el.getAttribute(attr) || '');
            }
            el.setAttribute(attr, lang === 'en' ? en : el.getAttribute(`data-de-${attr}`));
        });
    });
}

// An anchor into the other language's text (e.g. katoro-privacy.html#en-google)
// switches the page to that language for this visit.
function revealHashTarget(toggle) {
    let target = null;
    try {
        target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    } catch (error) {
        return;
    }
    const block = target && target.closest('[data-lang-block], [data-lang]');
    if (!block) return;

    const lang = block.getAttribute('data-lang-block') || block.getAttribute('data-lang');
    if ((lang === 'de' || lang === 'en') && lang !== getLanguage()) {
        applyLanguage(lang, toggle);
        target.scrollIntoView();
    }
}

function applyLanguage(lang, toggle) {
    document.documentElement.lang = lang;

    translateAttributes(document);

    const title = document.querySelector('title[data-en-text]');
    if (title) {
        if (!title.hasAttribute('data-de-text')) {
            title.setAttribute('data-de-text', title.textContent);
        }
        document.title = lang === 'en' ? title.getAttribute('data-en-text') : title.getAttribute('data-de-text');
    }

    if (toggle) {
        // Like the theme toggle, the label names the state a click switches to.
        toggle.textContent = lang === 'en' ? 'DE' : 'EN';
        toggle.setAttribute('aria-label', lang === 'en' ? 'Auf Deutsch wechseln' : 'Switch to English');
        toggle.setAttribute('title', lang === 'en' ? 'Auf Deutsch wechseln' : 'Switch to English');
        toggle.setAttribute('lang', lang === 'en' ? 'de' : 'en');
    }

    document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
}

function storeLanguage(lang) {
    try {
        localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (error) {
        // Ignore storage errors (e.g., private mode)
    }
}
