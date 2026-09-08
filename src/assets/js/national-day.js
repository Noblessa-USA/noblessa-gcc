document.addEventListener('DOMContentLoaded', function () {
    // ── Country Dropdown ────────────────────────────────────────────────────
    (function () {
        const trigger = document.getElementById('country-trigger-ndform');
        const value = trigger && trigger.querySelector('.cs-country-value');
        const panel = document.getElementById('country-panel-ndform');
        const search = document.getElementById('country-search-ndform');
        const options = document.getElementById('country-options-ndform');
        const input = document.getElementById('country-ndform');

        if (!trigger || !value || !panel || !search || !options || !input) {
            return;
        }

        const language = document.documentElement.lang === 'ar' ? 'ar' : 'en';
        const isoCodes = ['SA', 'AE', 'BH', 'KW', 'OM', 'QA'];

        const regionNames = typeof Intl.DisplayNames === 'function'
            ? new Intl.DisplayNames([language], { type: 'region' })
            : null;
        const countries = isoCodes
            .map(function (code) {
                return { code: code, name: regionNames ? regionNames.of(code) : code };
            })
            .sort(function (a, b) {
                return a.name.localeCompare(b.name, language);
            });
        countries.push({ code: 'other', name: language === 'ar' ? 'أخرى' : 'Other' });

        let visibleCountries = countries;
        let activeIndex = -1;

        search.placeholder = language === 'ar' ? 'ابحث عن دولة' : 'Search countries';
        search.setAttribute('aria-label', search.placeholder);

        function renderOptions(query) {
            const normalizedQuery = (query || '').trim().toLocaleLowerCase(language);
            visibleCountries = countries.filter(function (country) {
                return country.name.toLocaleLowerCase(language).includes(normalizedQuery);
            });
            activeIndex = -1;
            options.innerHTML = '';
            visibleCountries.forEach(function (country, index) {
                const li = document.createElement('li');
                li.className = 'cs-country-option';
                li.setAttribute('role', 'option');
                li.setAttribute('data-code', country.code);
                li.textContent = country.name;
                li.addEventListener('click', function () {
                    chooseCountry(country);
                });
                options.appendChild(li);
            });
        }

        function chooseCountry(country) {
            value.textContent = country.name;
            value.classList.remove('cs-placeholder');
            input.value = country.name;
            closePanel();
        }

        function openPanel() {
            panel.classList.add('cs-open');
            trigger.setAttribute('aria-expanded', 'true');
            renderOptions('');
            search.value = '';
            search.focus();
        }

        function closePanel() {
            panel.classList.remove('cs-open');
            trigger.setAttribute('aria-expanded', 'false');
        }

        trigger.addEventListener('click', function () {
            if (panel.classList.contains('cs-open')) {
                closePanel();
            } else {
                openPanel();
            }
        });

        trigger.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openPanel();
            }
        });

        search.addEventListener('input', function () {
            renderOptions(search.value);
        });

        search.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                activeIndex = Math.min(activeIndex + 1, visibleCountries.length - 1);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                activeIndex = Math.max(activeIndex - 1, 0);
            } else if (e.key === 'Enter' && activeIndex >= 0) {
                e.preventDefault();
                chooseCountry(visibleCountries[activeIndex]);
            } else if (e.key === 'Escape') {
                closePanel();
            }
        });

        document.addEventListener('click', function (e) {
            if (!panel.contains(e.target) && !trigger.contains(e.target)) {
                closePanel();
            }
        });
    })();

    // ── Gallery Arrows ──────────────────────────────────────────────────────
    (function () {
        const track = document.getElementById('nd-gallery-track');
        const prev = document.querySelector('.nd-gallery-prev');
        const next = document.querySelector('.nd-gallery-next');

        if (!track || !prev || !next) {
            return;
        }

        function scrollAmount() {
            const item = track.querySelector('.nd-gallery-item');
            return item ? item.getBoundingClientRect().width + 20 : 300;
        }

        prev.addEventListener('click', function () {
            track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
        });

        next.addEventListener('click', function () {
            track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
        });
    })();

    // ── Offer Countdown ─────────────────────────────────────────────────────
    (function () {
        const el = document.getElementById('nd-countdown');
        if (!el) {
            return;
        }

        const deadline = new Date(el.getAttribute('data-deadline'));
        const label = el.getAttribute('data-label') || '';
        const expiredLabel = el.getAttribute('data-expired-label') || '';

        if (isNaN(deadline.getTime())) {
            return;
        }

        const language = document.documentElement.lang === 'ar' ? 'ar' : 'en';

        function render() {
            const now = new Date();
            const diffMs = deadline.getTime() - now.getTime();

            if (diffMs <= 0) {
                el.textContent = expiredLabel;
                return;
            }

            const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
            const daysText = days.toLocaleString(language);
            const suffix = language === 'ar'
                ? (days === 1 ? 'يوم واحد متبقٍ' : days + ' يومًا متبقيًا')
                : (days === 1 ? '1 day left' : daysText + ' days left');

            el.textContent = label + ' — ' + suffix;
        }

        render();
    })();
});
