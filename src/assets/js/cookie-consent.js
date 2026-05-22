// Cookie Consent Management System
class CookieConsent {
    constructor() {
        this.consentKey = 'noblessa-cookie-consent';
        this.consentVersion = '2'; // Bump this number to force all users to re-consent
        this.consentData = this.getStoredConsent();
        this.hasGPC = this.detectGPC();
        this.lang = this.detectLanguage();
        this.translations = this.getTranslations();
        
        this.init();
    }

    detectLanguage() {
        const path = window.location.pathname;
        if (path.startsWith('/ar/') || path === '/ar') {
            return 'ar';
        }
        return 'en';
    }

    getTranslations() {
        const translations = {
            en: {
                cookie_title: 'Cookie Settings',
                cookie_text: 'We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
                cookie_text_gpc: 'We use cookies to enhance your browsing experience and analyze our traffic. We detected your Global Privacy Control signal and will respect your privacy preferences.',
                cookie_btn_manage: 'Manage',
                cookie_btn_accept: 'Accept'
            },
            ar: {
                cookie_title: 'إعدادات ملفات تعريف الارتباط',
                cookie_text: 'نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح وتحليل حركة المرور. بالنقر على "قبول الكل"، فإنك توافق على استخدامنا لملفات تعريف الارتباط.',
                cookie_text_gpc: 'نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح وتحليل حركة المرور. لقد اكتشفنا إشارة التحكم في الخصوصية العالمية الخاصة بك وسنحترم تفضيلات الخصوصية الخاصة بك.',
                cookie_btn_manage: 'إدارة',
                cookie_btn_accept: 'قبول'
            }
        };
        return translations[this.lang] || translations.en;
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        // Make the instance globally available before applyConsent() runs,
        // so cookie-utils.js can call window.cookieConsent.isAllowed()
        window.cookieConsent = this;

        this.createBanner();
        this.createPreferencesToggle();
        this.bindEvents();
        
        // Check if we need to show the banner
        if (!this.hasValidConsent()) {
            this.showBanner();
        } else {
            // Apply stored consent preferences and show toggle
            this.applyConsent();
            this.showPreferencesToggle();
        }
    }

    detectGPC() {
        // Check for Global Privacy Control signal
        return navigator.globalPrivacyControl === true;
    }

    getStoredConsent() {
        try {
            const stored = localStorage.getItem(this.consentKey);
            return stored ? JSON.parse(stored) : null;
        } catch (e) {
            console.warn('Error reading cookie consent from localStorage:', e);
            return null;
        }
    }

    hasValidConsent() {
        if (!this.consentData) return false;

        // Invalidate consent if the version has changed
        if (this.consentData.version !== this.consentVersion) return false;

        // Check if consent is expired (30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const consentDate = new Date(this.consentData.timestamp);
        return consentDate > thirtyDaysAgo;
    }

    createBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.className = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-banner-content">
                <div class="cookie-banner-text">
                    <h3>${this.translations.cookie_title}</h3>
                    <p>${this.hasGPC ? this.translations.cookie_text_gpc : this.translations.cookie_text}</p>
                </div>
                <div class="cookie-banner-actions">
                    <button type="button" class="cookie-btn cookie-btn-manage" id="manage-cookies">
                        ${this.translations.cookie_btn_manage}
                    </button>
                    <button type="button" class="cookie-btn cookie-btn-accept" id="accept-cookies">
                        ${this.translations.cookie_btn_accept}
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(banner);
        this.banner = banner;
    }

    createPreferencesToggle() {
        const toggle = document.createElement('div');
        toggle.id = 'cookie-preferences-toggle';
        toggle.className = 'cookie-preferences-toggle';
        toggle.style.display = 'none';
        toggle.innerHTML = `
            <button type="button" class="cookie-toggle-btn" id="cookie-toggle-btn" title="Cookie Preferences">
                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="m4.929 4.93.001-.002.002.001.527-.528a.575.575 0 0 1 .786-.025l1.21 1.061c.332.305.774.492 1.26.492.514 0 .98-.21 1.316-.548.318-.32.52-.754.539-1.235h.004l.105-1.607a.575.575 0 0 1 .574-.537h.746V2v.002h.747c.303 0 .554.235.574.537l.105 1.607h.005c.019.484.223.92.544 1.24.336.335.8.543 1.312.543.492 0 .94-.192 1.272-.504l1.196-1.05a.575.575 0 0 1 .786.026l.528.528.002-.002v.002l-.001.002.528.527a.575.575 0 0 1 .026.786l-1.06 1.212a1.85 1.85 0 0 0-.492 1.258c0 .515.21.98.548 1.317.32.318.753.52 1.235.539v.004l1.606.105c.303.02.538.271.538.574V12H22v.002h-.002v.746a.575.575 0 0 1-.537.574l-1.607.107v.001c-.484.02-.92.223-1.24.544-.335.336-.543.8-.543 1.312 0 .486.187.928.493 1.26h-.002l1.062 1.211c.2.228.188.572-.026.786l-.528.528v.002h-.001l-.528.527a.575.575 0 0 1-.785.026l-1.168-1.021a1.851 1.851 0 0 0-1.302-.534c-.515 0-.98.21-1.317.548-.318.32-.52.755-.54 1.238h-.004l-.105 1.607a.575.575 0 0 1-.54.536H11.22a.575.575 0 0 1-.54-.536l-.105-1.607h-.004a1.851 1.851 0 0 0-.545-1.244 1.851 1.851 0 0 0-1.31-.542c-.504 0-.96.2-1.295.526l-1.177 1.03a.575.575 0 0 1-.785-.027l-.528-.528-.001-.001-.528-.528a.575.575 0 0 1-.026-.786l1.062-1.21-.001-.001a1.85 1.85 0 0 0 .493-1.26c0-.515-.21-.98-.548-1.317a1.85 1.85 0 0 0-1.236-.539v-.001l-1.607-.107a.575.575 0 0 1-.537-.574v-.746H2V12h.001v-.747c0-.303.235-.554.538-.574l1.606-.105v-.004a1.851 1.851 0 0 0 1.242-.545c.335-.336.542-.8.542-1.31 0-.49-.19-.935-.499-1.267L4.376 6.244a.575.575 0 0 1 .026-.786l.528-.527-.001-.002zM16.286 12a4.286 4.286 0 1 1-8.572 0 4.286 4.286 0 0 1 8.572 0z" fill="#ffffff"/>
                </svg>
            </button>
        `;
        
        document.body.appendChild(toggle);
        this.toggle = toggle;
    }

    createManageModal() {
        const modal = document.createElement('div');
        modal.id = 'cookie-modal';
        modal.className = 'cookie-modal';
        modal.innerHTML = `
            <div class="cookie-modal-overlay"></div>
            <div class="cookie-modal-content">
                <div class="cookie-modal-header">
                    <h2>Manage Cookie Preferences</h2>
                    <button type="button" class="cookie-modal-close" id="close-modal">&times;</button>
                </div>
                <div class="cookie-modal-body">
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h3>Essential Cookies</h3>
                            <label class="cookie-toggle">
                                <input type="checkbox" checked disabled>
                                <span class="cookie-slider"></span>
                            </label>
                        </div>
                        <p>These cookies are necessary for the website to function and cannot be switched off.</p>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h3>Analytics Cookies</h3>
                            <label class="cookie-toggle">
                                <input type="checkbox" id="analytics-cookies" ${this.hasGPC ? '' : 'checked'}>
                                <span class="cookie-slider"></span>
                            </label>
                        </div>
                        <p>These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</p>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h3>Marketing Cookies</h3>
                            <label class="cookie-toggle">
                                <input type="checkbox" id="marketing-cookies" ${this.hasGPC ? '' : 'checked'}>
                                <span class="cookie-slider"></span>
                            </label>
                        </div>
                        <p>These cookies may be set through our site by our advertising partners to build a profile of your interests.</p>
                    </div>
                </div>
                <div class="cookie-modal-footer">
                    <button type="button" class="cookie-btn cookie-btn-secondary" id="reject-all">
                        Reject All
                    </button>
                    <button type="button" class="cookie-btn cookie-btn-accept" id="save-preferences">
                        Save Preferences
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.modal = modal;
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.id === 'accept-cookies') {
                this.acceptAllCookies();
            } else if (e.target.id === 'manage-cookies') {
                this.showManageModal();
            } else if (e.target.id === 'close-modal' || e.target.classList.contains('cookie-modal-overlay')) {
                this.hideManageModal();
            } else if (e.target.id === 'save-preferences') {
                this.savePreferences();
            } else if (e.target.id === 'reject-all') {
                this.rejectAllCookies();
            } else if (e.target.id === 'cookie-toggle-btn' || e.target.closest('#cookie-toggle-btn')) {
                this.showManageModal();
            }
        });

        // Handle escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal && this.modal.style.display === 'block') {
                this.hideManageModal();
            }
        });
    }

    showBanner() {
        if (this.banner) {
            this.banner.style.display = 'block';
            // Add animation class after a brief delay
            setTimeout(() => {
                this.banner.classList.add('cookie-banner-visible');
            }, 100);
        }
    }

    hideBanner() {
        if (this.banner) {
            this.banner.classList.remove('cookie-banner-visible');
            setTimeout(() => {
                this.banner.style.display = 'none';
            }, 300);
        }
    }

    showManageModal() {
        if (!this.modal) {
            this.createManageModal();
        }
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    hideManageModal() {
        if (this.modal) {
            this.modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    showPreferencesToggle() {
        if (this.toggle) {
            this.toggle.style.display = 'block';
            // Add animation class after a brief delay
            setTimeout(() => {
                this.toggle.classList.add('cookie-toggle-visible');
            }, 100);
        }
    }

    hidePreferencesToggle() {
        if (this.toggle) {
            this.toggle.classList.remove('cookie-toggle-visible');
            setTimeout(() => {
                this.toggle.style.display = 'none';
            }, 300);
        }
    }

    acceptAllCookies() {
        const consent = {
            essential: true,
            analytics: true,
            marketing: true,
            timestamp: new Date().toISOString(),
            version: this.consentVersion,
            gpc: this.hasGPC
        };
        
        this.saveConsent(consent);
        this.applyConsent();
        this.hideBanner();
        this.showPreferencesToggle();
    }

    rejectAllCookies() {
        const consent = {
            essential: true,
            analytics: false,
            marketing: false,
            timestamp: new Date().toISOString(),
            version: this.consentVersion,
            gpc: this.hasGPC
        };
        
        this.saveConsent(consent);
        this.applyConsent();
        this.hideManageModal();
        this.hideBanner();
        this.showPreferencesToggle();
    }

    savePreferences() {
        const analyticsCheckbox = document.getElementById('analytics-cookies');
        const marketingCheckbox = document.getElementById('marketing-cookies');
        
        const consent = {
            essential: true,
            analytics: analyticsCheckbox ? analyticsCheckbox.checked : false,
            marketing: marketingCheckbox ? marketingCheckbox.checked : false,
            timestamp: new Date().toISOString(),
            version: this.consentVersion,
            gpc: this.hasGPC
        };
        
        this.saveConsent(consent);
        this.applyConsent();
        this.hideManageModal();
        this.hideBanner();
        this.showPreferencesToggle();
    }

    saveConsent(consent) {
        try {
            localStorage.setItem(this.consentKey, JSON.stringify(consent));
            this.consentData = consent;
        } catch (e) {
            console.warn('Error saving cookie consent to localStorage:', e);
        }
    }

    applyConsent() {
        if (!this.consentData) return;

        // Block/unblock analytics cookies
        if (this.consentData.analytics) {
            this.enableAnalytics();
        } else {
            this.disableAnalytics();
        }

        // Block/unblock marketing cookies
        if (this.consentData.marketing) {
            this.enableMarketing();
        } else {
            this.disableMarketing();
        }

        // Dispatch custom event for other scripts to listen to
        const event = new CustomEvent('cookieConsentUpdated', {
            detail: this.consentData
        });
        document.dispatchEvent(event);
    }

    enableAnalytics() {
        if (typeof loadGoogleAnalytics === 'function') {
            loadGoogleAnalytics('G-4Q0JLG99TV');
        }
    }

    disableAnalytics() {
        // Disable analytics tracking
        console.log('Analytics cookies disabled');
        // Clear any analytics cookies
        this.clearAnalyticsCookies();
    }

    enableMarketing() {
        if (typeof loadFacebookPixel === 'function') {
            loadFacebookPixel('1892624064482203');
        }
    }

    disableMarketing() {
        // Disable marketing tracking
        console.log('Marketing cookies disabled');
        // Clear any marketing cookies
        this.clearMarketingCookies();
    }

    clearAnalyticsCookies() {
        // Clear common analytics cookies
        const analyticsCookies = ['_ga', '_gid', '_gat', '_gtag_GA'];
        analyticsCookies.forEach(name => {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
        });
    }

    clearMarketingCookies() {
        // Clear common marketing cookies
        const marketingCookies = ['_fbp', '_fbc', '__utma', '__utmb', '__utmc', '__utmz'];
        marketingCookies.forEach(name => {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
        });
    }

    // Public method to check if specific cookie type is allowed
    isAllowed(type) {
        if (!this.consentData) return false;
        return this.consentData[type] === true;
    }

    // Public method to show banner again (for settings page)
    showSettings() {
        this.showManageModal();
    }
}

// Initialize cookie consent system
const cookieConsent = new CookieConsent();

// Make it globally available
window.cookieConsent = cookieConsent;
