document.addEventListener('DOMContentLoaded', function () {
    // ── Smooth Scroll to Lead Form ──────────────────────────────────────────
    (function () {
        const target = document.getElementById('nd-lead-form');
        const links = document.querySelectorAll('a[href="#nd-lead-form"]');
        if (!target || !links.length) {
            return;
        }

        const header = document.getElementById('cs-navigation');

        links.forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const headerHeight = header ? header.getBoundingClientRect().height : 0;
                const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({ top: top, behavior: 'smooth' });
            });
        });
    })();

    // ── Hero Slideshow ──────────────────────────────────────────────────────
    (function () {
        const slides = document.querySelectorAll('#nd-hero .nd-slide');
        if (!slides.length) {
            return;
        }

        let current = 0;
        const slideInterval = 5000;

        function showSlide(index) {
            slides.forEach(function (slide) { slide.classList.remove('active'); });
            requestAnimationFrame(function () { slides[index].classList.add('active'); });
        }

        function nextSlide() {
            current = (current + 1) % slides.length;
            showSlide(current);
        }

        setInterval(nextSlide, slideInterval);
        setTimeout(function () { showSlide(current); }, 100);
    })();

    // ── Country Dropdown ────────────────────────────────────────────────────
    (function () {
        const form = document.getElementById('nd-form');
        const trigger = document.getElementById('country-trigger-ndform');
        const value = trigger && trigger.querySelector('.cs-country-value');
        const panel = document.getElementById('country-panel-ndform');
        const search = document.getElementById('country-search-ndform');
        const options = document.getElementById('country-options-ndform');
        const input = document.getElementById('country-ndform');
        const select = document.getElementById('country-select-ndform');

        if (!form || !select || !trigger || !value || !panel || !search || !options || !input) {
            return;
        }

        const placeholderText = value.textContent;

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
                value.textContent = placeholderText;
                value.classList.add('cs-placeholder');
                select.classList.remove('cs-error');
                trigger.removeAttribute('aria-invalid');
                closePanel();
            }, 0);
        });
    })();

    // ── Offer Terms Modal ───────────────────────────────────────────────────
    (function () {
        const modal = document.getElementById('nd-offer-terms-modal');
        const openBtn = document.getElementById('nd-offer-terms-btn');
        const closeBtn = document.getElementById('nd-offer-terms-close');

        if (!modal || !openBtn || !closeBtn) {
            return;
        }

        function openModal() {
            modal.classList.add('nd-modal-open');
            document.body.classList.add('modal-open');
        }

        function closeModal() {
            modal.classList.remove('nd-modal-open');
            document.body.classList.remove('modal-open');
        }

        openBtn.addEventListener('click', openModal);
        closeBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.classList.contains('nd-modal-open')) {
                closeModal();
            }
        });
    })();
});
