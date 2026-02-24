// Language Switcher
class LanguageSwitcher {
    constructor() {
        this.currentLang = this.detectCurrentLanguage();
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.createSwitcher();
        this.bindEvents();
    }

    detectCurrentLanguage() {
        // Detect from URL path
        const path = window.location.pathname;
        if (path.startsWith('/ar/') || path === '/ar') {
            return 'ar';
        }
        return 'en';
    }

    createSwitcher() {
        const switcher = document.createElement('div');
        switcher.id = 'language-switcher';
        switcher.className = 'language-switcher';
        
        const otherLang = this.currentLang === 'en' ? 'ar' : 'en';
        const flagSvg = this.currentLang === 'en' ? '/assets/svgs/saudiflag.svg' : '/assets/svgs/ukflag.svg';
        const flagAlt = this.currentLang === 'en' ? 'Saudi Arabia flag' : 'United Kingdom flag';
        const ariaLabel = this.currentLang === 'en' ? 'Switch to Arabic' : 'Switch to English';
        
        switcher.innerHTML = `
            <button type="button" class="language-toggle-btn" id="language-toggle-btn" 
                    title="${ariaLabel}" aria-label="${ariaLabel}">
                <img src="${flagSvg}" alt="${flagAlt}" class="flag-icon" width="28" height="20">
            </button>
        `;
        
        document.body.appendChild(switcher);
        this.switcher = switcher;
        
        // Show after brief delay
        setTimeout(() => {
            switcher.classList.add('language-switcher-visible');
        }, 100);
    }

    bindEvents() {
        const btn = document.getElementById('language-toggle-btn');
        if (btn) {
            btn.addEventListener('click', () => this.switchLanguage());
        }
    }

    switchLanguage() {
        const currentPath = window.location.pathname;
        let newPath;

        if (this.currentLang === 'en') {
            // Switch to Arabic
            if (currentPath === '/' || currentPath === '/en' || currentPath === '/en/') {
                newPath = '/ar/';
            } else if (currentPath.startsWith('/en/')) {
                newPath = currentPath.replace('/en/', '/ar/');
            } else {
                newPath = '/ar' + currentPath;
            }
        } else {
            // Switch to English
            if (currentPath === '/ar' || currentPath === '/ar/') {
                newPath = '/en/';
            } else if (currentPath.startsWith('/ar/')) {
                newPath = currentPath.replace('/ar/', '/en/');
            } else {
                newPath = '/en' + currentPath;
            }
        }

        // Navigate to new language URL
        window.location.href = newPath;
    }
}

// Initialize language switcher
const languageSwitcher = new LanguageSwitcher();
window.languageSwitcher = languageSwitcher;
