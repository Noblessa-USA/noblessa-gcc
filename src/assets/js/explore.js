// ─────────────────────────────────────────────────────────────────────────────
// EXPLORE PAGE JAVASCRIPT
// Handles smooth scrolling, form validation, and analytics tracking
// ─────────────────────────────────────────────────────────────────────────────

(function() {
    'use strict';

    // Smooth scroll to consultation form
    function initSmoothScroll() {
        const ctaButtons = document.querySelectorAll('a[href="#consultation-form"]');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector('#consultation-form');
                
                if (target) {
                    const headerOffset = 100; // Account for fixed header
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Track CTA click
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'cta_click', {
                            'event_category': 'engagement',
                            'event_label': 'Schedule Consultation CTA',
                            'value': 1
                        });
                    }
                }
            });
        });
    }

    // Form validation and submission tracking
    function initFormTracking() {
        const form = document.querySelector('#consultation-form-element');
        
        if (form) {
            form.addEventListener('submit', function(e) {
                // Track form submission
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'generate_lead', {
                        'event_category': 'conversion',
                        'event_label': 'Consultation Form Submission',
                        'value': 1
                    });
                }
            });

            // Track form field focus
            const formFields = form.querySelectorAll('input, textarea');
            formFields.forEach(field => {
                field.addEventListener('focus', function() {
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'form_start', {
                            'event_category': 'engagement',
                            'event_label': 'Consultation Form Started',
                            'value': 1
                        });
                    }
                }, { once: true }); // Only track first interaction
            });
        }
    }

    // Track time on page
    function trackTimeOnPage() {
        let startTime = Date.now();
        
        window.addEventListener('beforeunload', function() {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'time_on_page', {
                    'event_category': 'engagement',
                    'event_label': 'Explore Page',
                    'value': timeSpent
                });
            }
        });
    }

    // Track scroll depth
    function trackScrollDepth() {
        let maxScroll = 0;
        const milestones = [25, 50, 75, 90];
        const tracked = new Set();

        window.addEventListener('scroll', function() {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollPercent = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);

            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;

                milestones.forEach(milestone => {
                    if (scrollPercent >= milestone && !tracked.has(milestone)) {
                        tracked.add(milestone);
                        
                        if (typeof gtag !== 'undefined') {
                            gtag('event', 'scroll', {
                                'event_category': 'engagement',
                                'event_label': `Scroll Depth ${milestone}%`,
                                'value': milestone
                            });
                        }
                    }
                });
            }
        }, { passive: true });
    }

    // Observe gallery images for lazy load tracking
    function trackImageViews() {
        const images = document.querySelectorAll('#explore-gallery .cs-picture img');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (typeof gtag !== 'undefined') {
                            gtag('event', 'view_item', {
                                'event_category': 'engagement',
                                'event_label': 'Gallery Image Viewed'
                            });
                        }
                        imageObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.5
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    // Add phone number validation (minimum 10 digits)
    function initPhoneValidation() {
        const phoneInput = document.querySelector('#phone');
        
        if (phoneInput) {
            phoneInput.setAttribute('pattern', '\\d{10,}');
            phoneInput.setAttribute('title', 'Please enter at least 10 digits');
            phoneInput.setAttribute('inputmode', 'tel');
        }
    }

    // Add zip code validation
    function initZipValidation() {
        const zipInput = document.querySelector('#zip');
        
        if (zipInput) {
            zipInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length > 5) {
                    value = value.substring(0, 5);
                }
                
                e.target.value = value;
            });
        }
    }

    // Track video engagement
    function trackVideoEngagement() {
        const video = document.querySelector('#video-showcase video');
        
        if (video) {
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (typeof gtag !== 'undefined') {
                            gtag('event', 'video_view', {
                                'event_category': 'engagement',
                                'event_label': 'Showcase Video Viewed'
                            });
                        }
                        videoObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.5
            });

            videoObserver.observe(video);
        }
    }

    // Initialize all functions when DOM is ready
    function initCountryDropdown() {
        var language = document.documentElement.lang === 'ar' ? 'ar' : 'en';
        var select = document.getElementById('country-select-explore');
        var trigger = document.getElementById('country-trigger-explore');
        var panel = document.getElementById('country-panel-explore');
        var search = document.getElementById('country-search-explore');
        var list = document.getElementById('country-options-explore');
        var input = document.getElementById('country-explore');
        var form = document.getElementById('cs-form-265');

        if (!select || !trigger || !panel || !search || !list || !input) return;

        var valueSpan = trigger.querySelector('.cs-country-value');
        if (!valueSpan) return;

        var isoCodes = ['AE', 'BH', 'KW', 'OM', 'QA', 'SA'];
        var regionNames = typeof Intl.DisplayNames === 'function'
            ? new Intl.DisplayNames([language], { type: 'region' })
            : null;
        var countries = isoCodes
            .map(function (code) {
                return { code: code, name: regionNames ? regionNames.of(code) : code };
            })
            .sort(function (a, b) { return a.name.localeCompare(b.name, language); });
        countries.push({ code: 'other', name: language === 'ar' ? 'أخرى' : 'Other' });

        var visibleCountries = countries;
        var activeIndex = -1;

        search.placeholder = language === 'ar' ? 'ابحث عن دولة' : 'Search countries';
        search.setAttribute('aria-label', search.placeholder);

        function renderOptions(query) {
            var q = (query || '').trim().toLocaleLowerCase(language);
            visibleCountries = countries.filter(function (c) {
                return c.name.toLocaleLowerCase(language).includes(q);
            });
            activeIndex = -1;
            list.innerHTML = '';
            visibleCountries.forEach(function (country, index) {
                var option = document.createElement('li');
                option.className = 'cs-country-option';
                option.id = 'country-options-explore-' + country.code.toLowerCase();
                option.setAttribute('role', 'option');
                option.setAttribute('aria-selected', input.value === country.name ? 'true' : 'false');
                option.dataset.index = String(index);
                option.textContent = country.name;
                option.addEventListener('click', function () { chooseCountry(country); });
                list.appendChild(option);
            });
        }

        function setActiveOption(index) {
            var opts = list.querySelectorAll('.cs-country-option');
            opts.forEach(function (o) { o.classList.remove('cs-selected'); });
            if (!opts.length) { activeIndex = -1; trigger.removeAttribute('aria-activedescendant'); return; }
            activeIndex = (index + opts.length) % opts.length;
            var active = opts[activeIndex];
            active.classList.add('cs-selected');
            active.scrollIntoView({ block: 'nearest' });
            trigger.setAttribute('aria-activedescendant', active.id);
        }

        function openPanel() {
            panel.classList.add('cs-open');
            trigger.setAttribute('aria-expanded', 'true');
            renderOptions(search.value);
            search.focus();
        }

        function closePanel(opts) {
            panel.classList.remove('cs-open');
            trigger.setAttribute('aria-expanded', 'false');
            trigger.removeAttribute('aria-activedescendant');
            search.value = '';
            activeIndex = -1;
            if (opts && opts.focusTrigger) trigger.focus();
        }

        function chooseCountry(country) {
            input.value = country.name;
            valueSpan.textContent = country.name;
            valueSpan.classList.remove('cs-placeholder');
            select.classList.remove('cs-error');
            trigger.setAttribute('aria-invalid', 'false');
            input.dispatchEvent(new Event('change', { bubbles: true }));
            closePanel({ focusTrigger: true });
        }

        trigger.addEventListener('click', function () {
            trigger.getAttribute('aria-expanded') === 'true' ? closePanel() : openPanel();
        });
        trigger.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') { e.preventDefault(); openPanel(); }
            else if (e.key === 'Escape') { closePanel(); }
        });
        search.addEventListener('input', function () { renderOptions(search.value); });
        search.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowDown') { e.preventDefault(); setActiveOption(activeIndex + 1); }
            else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveOption(activeIndex - 1); }
            else if (e.key === 'Enter' && activeIndex >= 0) { e.preventDefault(); chooseCountry(visibleCountries[activeIndex]); }
            else if (e.key === 'Escape') { e.preventDefault(); closePanel({ focusTrigger: true }); }
        });
        document.addEventListener('click', function (e) {
            if (!select.contains(e.target)) closePanel();
        });

        if (form) {
            form.addEventListener('submit', function (e) {
                if (!input.value) {
                    e.preventDefault();
                    select.classList.add('cs-error');
                    trigger.setAttribute('aria-invalid', 'true');
                    trigger.focus();
                }
            });
            form.addEventListener('reset', function () {
                window.setTimeout(function () {
                    valueSpan.textContent = language === 'ar' ? 'اختر' : 'Select';
                    valueSpan.classList.add('cs-placeholder');
                    select.classList.remove('cs-error');
                    trigger.removeAttribute('aria-invalid');
                    closePanel();
                }, 0);
            });
        }

        renderOptions('');
    }

    function init() {
        initSmoothScroll();
        initFormTracking();
        trackTimeOnPage();
        trackScrollDepth();
        trackImageViews();
        initPhoneValidation();
        initZipValidation();
        trackVideoEngagement();
        initCountryDropdown();
    }

    // Run initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
