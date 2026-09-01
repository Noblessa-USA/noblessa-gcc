// Catalog lead capture — intercepts download buttons, shows a gated form,
// and sets a 90-day cookie so returning visitors skip the form.

document.addEventListener('DOMContentLoaded', function () {
    var COOKIE_NAME = 'noblessa_catalog_lead';
    var COOKIE_DAYS = 90;

    // ── Cookie helpers ──────────────────────────────────────────────────────

    function hasCatalogLead() {
        return document.cookie.split(';').some(function (c) {
            return c.trim().startsWith(COOKIE_NAME + '=');
        });
    }

    function setCatalogLeadCookie() {
        var date = new Date();
        date.setTime(date.getTime() + COOKIE_DAYS * 24 * 60 * 60 * 1000);
        document.cookie =
            COOKIE_NAME + '=1; expires=' + date.toUTCString() +
            '; path=/; SameSite=Lax';
    }

    // ── DOM refs ────────────────────────────────────────────────────────────

    var modal     = document.getElementById('catalog-lead-modal');
    var leadForm  = document.getElementById('catalog-lead-form');
    var submitBtn = document.getElementById('catalog-lead-submit');
    var errorEl   = document.getElementById('catalog-lead-error');
    var closeBtn  = modal && modal.querySelector('.catalog-lead-close');
    var pendingPdfUrl = null;

    if (!modal || !leadForm) return; // guard: elements must exist

    // ── Modal open / close ──────────────────────────────────────────────────

    function openLeadModal(pdfUrl) {
        pendingPdfUrl = pdfUrl;
        errorEl.style.display = 'none';
        leadForm.reset();
        if (window.NoblessaUTM) window.NoblessaUTM.fill();
        modal.style.display = 'flex';
        document.body.classList.add('modal-open');
        // Focus first input for accessibility
        var firstInput = leadForm.querySelector('input:not([type="hidden"]):not([tabindex="-1"])');
        if (firstInput) setTimeout(function () { firstInput.focus(); }, 100);
    }

    function closeLeadModal() {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        pendingPdfUrl = null;
    }

    // ── Intercept catalog download button clicks ────────────────────────────

    document.querySelectorAll('.cs-catalog-btn[data-pdf]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var pdfUrl = this.getAttribute('data-pdf');
            if (hasCatalogLead()) {
                window.open(pdfUrl, '_blank', 'noopener,noreferrer');
            } else {
                openLeadModal(pdfUrl);
            }
        });
    });

    // ── Close triggers ──────────────────────────────────────────────────────

    closeBtn.addEventListener('click', closeLeadModal);

    modal.addEventListener('click', function (e) {
        if (e.target === modal) closeLeadModal();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') closeLeadModal();
    });

    // ── Form submission (AJAX → Netlify) ────────────────────────────────────

    leadForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var countryInput = document.getElementById('country-catalog');
        var countrySelect = document.getElementById('country-select-catalog');
        if (countryInput && !countryInput.value) {
            if (countrySelect) countrySelect.classList.add('cs-error');
            var countryTrigger = document.getElementById('country-trigger-catalog');
            if (countryTrigger) countryTrigger.focus();
            return;
        }
        errorEl.style.display = 'none';
        submitBtn.disabled = true;

        var formData = new FormData(leadForm);

        fetch(window.location.pathname, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        })
            .then(function (response) {
                if (!response.ok) throw new Error('Network response not ok');
                setCatalogLeadCookie();
                closeLeadModal();
                if (pendingPdfUrl) {
                    window.open(pendingPdfUrl, '_blank', 'noopener,noreferrer');
                    pendingPdfUrl = null;
                }
            })
            .catch(function () {
                errorEl.style.display = 'block';
            })
            .finally(function () {
                submitBtn.disabled = false;
            });
    });

    // ── Clear stale border styles on re-input ───────────────────────────────

    leadForm.querySelectorAll('input').forEach(function (field) {
        field.addEventListener('input', function () {
            this.style.borderColor = '';
        });
    });

    // Country dropdown
    (function () {
        var language = document.documentElement.lang === 'ar' ? 'ar' : 'en';
        var select = document.getElementById('country-select-catalog');
        var trigger = document.getElementById('country-trigger-catalog');
        var panel = document.getElementById('country-panel-catalog');
        var search = document.getElementById('country-search-catalog');
        var list = document.getElementById('country-options-catalog');
        var input = document.getElementById('country-catalog');

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
                option.id = 'country-options-catalog-' + country.code.toLowerCase();
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

        leadForm.addEventListener('reset', function () {
            window.setTimeout(function () {
                valueSpan.textContent = language === 'ar' ? 'اختر' : 'Select';
                valueSpan.classList.add('cs-placeholder');
                select.classList.remove('cs-error');
                trigger.removeAttribute('aria-invalid');
                closePanel();
            }, 0);
        });

        renderOptions('');
    }());
});
