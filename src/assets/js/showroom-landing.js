// Single-marker Leaflet map for individual showroom landing pages
import L from 'leaflet';

document.addEventListener('DOMContentLoaded', function () {
    const mapEl = document.getElementById('showroom-single-map');
    if (!mapEl) return;

    const lat = parseFloat(mapEl.dataset.lat);
    const lng = parseFloat(mapEl.dataset.lng);

    if (Number.isNaN(lat) || Number.isNaN(lng)) return;

    const map = L.map('showroom-single-map', {
        attributionControl: false,
        center: [lat, lng],
        zoom: 15,
        zoomControl: true,
        scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors, © CartoDB',
        subdomains: 'abcd',
        maxZoom: 18
    }).addTo(map);

    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div class="marker-pin"><div class="marker-inner"></div></div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 30]
    });

    L.marker([lat, lng], { icon: customIcon }).addTo(map);
});

// Contact modal
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('contact-modal');
    if (!modal) return;

    const closeBtn = modal.querySelector('.modal-close');
    const contactForm = modal.querySelector('#contact-form');

    function openModal() {
        modal.style.display = 'flex';
        document.body.classList.add('modal-open');
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        if (contactForm) contactForm.reset();
        if (window.NoblessaUTM) window.NoblessaUTM.fill();
    }

    document.querySelectorAll('.contact-modal-btn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            openModal();
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
    });

    if (contactForm) {
        contactForm.querySelectorAll('input, textarea').forEach(function (field) {
            field.addEventListener('input', function () {
                this.style.borderColor = '#d1d5db';
            });
        });
    }

    // Country dropdown
    (function () {
        var language = document.documentElement.lang === 'ar' ? 'ar' : 'en';
        var select = document.getElementById('country-select-landing');
        var trigger = document.getElementById('country-trigger-landing');
        var panel = document.getElementById('country-panel-landing');
        var search = document.getElementById('country-search-landing');
        var list = document.getElementById('country-options-landing');
        var input = document.getElementById('country-landing');

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
                option.id = 'country-options-landing-' + country.code.toLowerCase();
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

        if (contactForm) {
            contactForm.addEventListener('submit', function (e) {
                if (!input.value) {
                    e.preventDefault();
                    select.classList.add('cs-error');
                    trigger.setAttribute('aria-invalid', 'true');
                    trigger.focus();
                }
            });
            contactForm.addEventListener('reset', function () {
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
    }());
});
