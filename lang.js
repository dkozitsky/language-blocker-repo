/**
 * Language Redirect Blocker (LRB)
 * Use this script to enforce language policies on your website.
 */

(function () {
    // Default Configuration
    const defaultConfig = {
        blockedLanguage: 'ru',
        redirectUrl: './goaway.html', // Relative path by default
        storageKey: 'language',
        selectors: {
            switcher: '.lrb-element-switcher'
        }
    };

    // Current State
    let currentLang = 'ua';
    let config = { ...defaultConfig };

    /**
     * Initialize the Language Blocker
     * @param {Object} userConfig - Custom configuration
     */
    function init(userConfig = {}) {
        config = { ...config, ...userConfig };

        // 1. Determine Language
        const savedLang = localStorage.getItem(config.storageKey);
        const cookieLang = getCookie(config.storageKey);

        // a) Check Browser Language if no saved preference
        let browserLang = null;
        if (!savedLang && !cookieLang) {
            const userLang = navigator.language || navigator.userLanguage;
            if (userLang && userLang.toLowerCase().includes('ru')) {
                browserLang = 'ru';
            }
        }

        currentLang = savedLang || cookieLang || browserLang || 'ua';

        // 2. persist normalized state
        if (!savedLang && cookieLang) {
            localStorage.setItem(config.storageKey, cookieLang);
        } else if (browserLang === 'ru') {
            // If auto-detected as blocked, save it so they are blocked persistently
            // until they manually switch.
            setLanguage('ru');
            return; // setLanguage handles the rest
        }

        // 3. Render Switchers
        renderSwitchers();

        // 4. Check Redirect
        checkRedirect();

        // 5. Init Glitch Effect (if present)
        initGlitchEffect();
    }

    /**
     * Set Language and Handle Redirect/Reload
     * @param {string} langCode - 'ua' or 'ru'
     */
    function setLanguage(langCode) {
        currentLang = langCode;
        localStorage.setItem(config.storageKey, langCode);
        document.cookie = `${config.storageKey}=${langCode}; path=/; max-age=31536000`; // 1 year

        if (langCode === config.blockedLanguage) {
            window.location.href = config.redirectUrl;
        } else {
            // If we are currently on the goaway page, go back to root or simple reload
            if (window.location.href.includes(config.redirectUrl)) {
                // Try to go to root, or referrer if available and safe
                window.location.href = './index.html';
            } else {
                window.location.reload();
            }
        }
    }

    /**
     * Check if user should be redirected
     */
    function checkRedirect() {
        // If language is blocked AND we are NOT already on the blocked page
        if (currentLang === config.blockedLanguage) {
            // simple check: if current URL does not end with the redirect URL
            // This needs to be robust. Check if pathname contains the filename of redirectUrl
            const redirectFilename = config.redirectUrl.split('/').pop().split('?')[0];

            if (!window.location.pathname.includes(redirectFilename)) {
                window.location.href = config.redirectUrl;
            }
        }
    }

    /**
     * Render Language Switcher in all placeholder elements
     */
    function renderSwitchers() {
        const containers = document.querySelectorAll(config.selectors.switcher);

        containers.forEach(container => {
            container.innerHTML = ''; // Clear content

            const switcher = document.createElement('div');
            switcher.className = 'lrb-switcher';

            // UA Button
            const btnUA = document.createElement('button');
            btnUA.className = `lrb-btn ${currentLang !== config.blockedLanguage ? 'active' : ''}`;
            btnUA.textContent = 'UA';
            btnUA.dataset.lang = 'ua';
            btnUA.onclick = () => setLanguage('ua');

            // RU Button
            const btnRU = document.createElement('button');
            btnRU.className = `lrb-btn ${currentLang === config.blockedLanguage ? 'active' : ''}`;
            btnRU.textContent = 'RU';
            btnRU.dataset.lang = 'ru';
            btnRU.onclick = () => setLanguage('ru');

            switcher.appendChild(btnUA);
            switcher.appendChild(btnRU);

            container.appendChild(switcher);
        });
    }

    // Helper: Get Cookie
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    /**
     * Initialize Glitch Effect for ASCII Art
     */
    function initGlitchEffect() {
        const container = document.querySelector('.lrb-ascii-container');
        if (!container) return; // Exit if not on goaway page

        const original = container.querySelector('.lrb-ascii-art');
        if (!original) return;

        // Create Glitch Layers
        const layer1 = original.cloneNode(true);
        const layer2 = original.cloneNode(true);

        layer1.className = 'lrb-ascii-art lrb-glitch-layer lrb-glitch-1';
        layer1.setAttribute('aria-hidden', 'true');

        layer2.className = 'lrb-ascii-art lrb-glitch-layer lrb-glitch-2';
        layer2.setAttribute('aria-hidden', 'true');

        container.appendChild(layer1);
        container.appendChild(layer2);
    }

    // Expose API
    window.LanguageGoAway = {
        init,
        setLanguage
    };
})();
