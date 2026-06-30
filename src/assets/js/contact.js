(function () {
    'use strict';

    var COUNTRIES = [
        { en: 'Bahrain',               ar: 'البحرين',                 code: '+973' },
        { en: 'Cyprus',                ar: 'قبرص',                    code: '+357' },
        { en: 'Egypt',                 ar: 'مصر',                     code: '+20'  },
        { en: 'Iran',                  ar: 'إيران',                   code: '+98'  },
        { en: 'Iraq',                  ar: 'العراق',                  code: '+964' },
        { en: 'Israel',                ar: 'إسرائيل',                 code: '+972' },
        { en: 'Jordan',                ar: 'الأردن',                  code: '+962' },
        { en: 'Kuwait',                ar: 'الكويت',                  code: '+965' },
        { en: 'Lebanon',               ar: 'لبنان',                   code: '+961' },
        { en: 'Oman',                  ar: 'عُمان',                   code: '+968' },
        { en: 'Palestine',             ar: 'فلسطين',                  code: '+970' },
        { en: 'Qatar',                 ar: 'قطر',                     code: '+974' },
        { en: 'Saudi Arabia',          ar: 'المملكة العربية السعودية', code: '+966' },
        { en: 'Syria',                 ar: 'سوريا',                   code: '+963' },
        { en: 'Turkey',                ar: 'تركيا',                   code: '+90'  },
        { en: 'United Arab Emirates',  ar: 'الإمارات العربية المتحدة', code: '+971' },
        { en: 'Yemen',                 ar: 'اليمن',                   code: '+967' },
        { en: 'Other',                 ar: 'أخرى',                    code: null   },
    ];

    document.addEventListener('DOMContentLoaded', function () {
        var form = document.getElementById('cs-form-265');
        if (!form) return;

        var isAr       = document.documentElement.lang === 'ar';
        var phoneInput = document.getElementById('phone-265');
        var hidden     = document.getElementById('country-265');
        var trigger    = document.getElementById('country-trigger-265');
        var panel      = document.getElementById('country-panel-265');
        var search     = document.getElementById('country-search-265');
        var list       = document.getElementById('country-options-265');
        var valueSpan  = trigger ? trigger.querySelector('.cs-country-value') : null;
        var wrapper    = document.getElementById('country-select-265');

        if (!phoneInput || !hidden || !trigger || !panel || !search || !list || !valueSpan || !wrapper) return;

        search.placeholder = isAr ? 'بحث...' : 'Search...';

        // Prefix LTR mark on RTL pages so the bidi algorithm never reverses the number
        var ltrPrefix = isAr ? '\u200E' : '';
        phoneInput.placeholder = ltrPrefix + '123 456 7890';

        var isOpen = false;
        var selected = null;

        function getName(country) {
            return isAr ? country.ar : country.en;
        }

        function renderOptions(filter) {
            var q = (filter || '').toLowerCase();
            list.innerHTML = '';
            COUNTRIES
                .filter(function (c) {
                    return c.en.toLowerCase().indexOf(q) !== -1 || c.ar.indexOf(q) !== -1;
                })
                .forEach(function (country) {
                    var li = document.createElement('li');
                    li.className = 'cs-country-option';
                    li.setAttribute('role', 'option');
                    li.textContent = getName(country);
                    if (selected && selected.en === country.en) {
                        li.classList.add('cs-selected');
                        li.setAttribute('aria-selected', 'true');
                    } else {
                        li.setAttribute('aria-selected', 'false');
                    }
                    li.addEventListener('mousedown', function (e) {
                        // Use mousedown so it fires before the trigger's blur
                        e.preventDefault();
                        selectCountry(country);
                    });
                    list.appendChild(li);
                });
        }

        function selectCountry(country) {
            selected = country;
            valueSpan.textContent = getName(country);
            valueSpan.classList.remove('cs-placeholder');
            hidden.value = country.en;
            wrapper.classList.remove('cs-error');
            phoneInput.placeholder = country.code ? ltrPrefix + country.code + ' 123 456 7890' : ltrPrefix + '123 456 7890';
            closeDropdown();
        }

        function openDropdown() {
            isOpen = true;
            panel.classList.add('cs-open');
            trigger.setAttribute('aria-expanded', 'true');
            search.value = '';
            renderOptions('');
            search.focus();
        }

        function closeDropdown() {
            isOpen = false;
            panel.classList.remove('cs-open');
            trigger.setAttribute('aria-expanded', 'false');
        }

        trigger.addEventListener('click', function () {
            isOpen ? closeDropdown() : openDropdown();
        });

        trigger.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                isOpen ? closeDropdown() : openDropdown();
            } else if (e.key === 'Escape') {
                closeDropdown();
            } else if (e.key === 'ArrowDown' && !isOpen) {
                openDropdown();
            }
        });

        search.addEventListener('input', function () {
            renderOptions(search.value);
        });

        search.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeDropdown();
        });

        document.addEventListener('click', function (e) {
            if (!wrapper.contains(e.target)) {
                closeDropdown();
            }
        });

        form.addEventListener('submit', function (e) {
            if (!hidden.value) {
                e.preventDefault();
                wrapper.classList.add('cs-error');
                trigger.focus();
            }
        });

        renderOptions('');
    });
}());
