document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('cs-form-265');
    const select = document.getElementById('country-select-265');
    const trigger = document.getElementById('country-trigger-265');
    const value = trigger?.querySelector('.cs-country-value');
    const panel = document.getElementById('country-panel-265');
    const search = document.getElementById('country-search-265');
    const options = document.getElementById('country-options-265');
    const input = document.getElementById('country-265');

    if (!form || !select || !trigger || !value || !panel || !search || !options || !input) {
        return;
    }

    const language = document.documentElement.lang === 'ar' ? 'ar' : 'en';
    const isoCodes = ['AE', 'BH', 'KW', 'OM', 'QA', 'SA'];

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
            const option = document.createElement('li');
            option.className = 'cs-country-option';
            option.id = 'country-option-' + country.code.toLowerCase();
            option.setAttribute('role', 'option');
            option.setAttribute('aria-selected', input.value === country.name ? 'true' : 'false');
            option.dataset.index = String(index);
            option.textContent = country.name;
            option.addEventListener('click', function () {
                chooseCountry(country);
            });
            options.appendChild(option);
        });
    }

    function setActiveOption(index) {
        const optionElements = options.querySelectorAll('.cs-country-option');
        optionElements.forEach(function (option) {
            option.classList.remove('cs-selected');
        });

        if (!optionElements.length) {
            activeIndex = -1;
            trigger.removeAttribute('aria-activedescendant');
            return;
        }

        activeIndex = (index + optionElements.length) % optionElements.length;
        const activeOption = optionElements[activeIndex];
        activeOption.classList.add('cs-selected');
        activeOption.scrollIntoView({ block: 'nearest' });
        trigger.setAttribute('aria-activedescendant', activeOption.id);
    }

    function openPanel() {
        panel.classList.add('cs-open');
        trigger.setAttribute('aria-expanded', 'true');
        renderOptions(search.value);
        search.focus();
    }

    function closePanel(options) {
        const shouldFocusTrigger = options?.focusTrigger === true;
        panel.classList.remove('cs-open');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.removeAttribute('aria-activedescendant');
        search.value = '';
        activeIndex = -1;
        if (shouldFocusTrigger) {
            trigger.focus();
        }
    }

    function chooseCountry(country) {
        input.value = country.name;
        value.textContent = country.name;
        value.classList.remove('cs-placeholder');
        select.classList.remove('cs-error');
        trigger.setAttribute('aria-invalid', 'false');
        input.dispatchEvent(new Event('change', { bubbles: true }));
        closePanel({ focusTrigger: true });
    }

    trigger.addEventListener('click', function () {
        if (trigger.getAttribute('aria-expanded') === 'true') {
            closePanel();
        } else {
            openPanel();
        }
    });

    trigger.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
            event.preventDefault();
            openPanel();
        } else if (event.key === 'Escape') {
            closePanel();
        }
    });

    search.addEventListener('input', function () {
        renderOptions(search.value);
    });

    search.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setActiveOption(activeIndex + 1);
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setActiveOption(activeIndex - 1);
        } else if (event.key === 'Enter' && activeIndex >= 0) {
            event.preventDefault();
            chooseCountry(visibleCountries[activeIndex]);
        } else if (event.key === 'Escape') {
            event.preventDefault();
            closePanel({ focusTrigger: true });
        }
    });

    document.addEventListener('click', function (event) {
        if (!select.contains(event.target)) {
            closePanel();
        }
    });

    form.addEventListener('submit', function (event) {
        if (!input.value) {
            event.preventDefault();
            select.classList.add('cs-error');
            trigger.setAttribute('aria-invalid', 'true');
            trigger.focus();
        }
    });

    form.addEventListener('reset', function () {
        window.setTimeout(function () {
            value.textContent = language === 'ar' ? 'اختر' : 'Select';
            value.classList.add('cs-placeholder');
            select.classList.remove('cs-error');
            trigger.removeAttribute('aria-invalid');
            closePanel();
        }, 0);
    });

    renderOptions('');
});
