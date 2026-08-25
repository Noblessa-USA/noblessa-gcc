// Showrooms page functionality with Leaflet integration
import L from 'leaflet';

document.addEventListener('DOMContentLoaded', function() {
    // Get translations from data attributes
    const translationsEl = document.getElementById('showroom-translations');
    const t = {
        showroomSuffix: translationsEl?.dataset.showroomSuffix || 'Showroom',
        addressLabel: translationsEl?.dataset.addressLabel || 'Address',
        phoneLabel: translationsEl?.dataset.phoneLabel || 'Phone',
        viewGoogleBtn: translationsEl?.dataset.viewGoogleBtn || 'Directions',
        contactBtn: translationsEl?.dataset.contactBtn || 'Contact',
        getDirectionsBtn: translationsEl?.dataset.getDirectionsBtn || 'Get Directions',
        callNowBtn: translationsEl?.dataset.callNowBtn || 'Call Now',
        locations: {
            dubai: {
                name: translationsEl?.dataset.dubaiName || 'Dubai',
                city: translationsEl?.dataset.dubaiCity || 'Dubai',
                country: translationsEl?.dataset.dubaiCountry || 'UAE',
                address: translationsEl?.dataset.dubaiAddress || 'Indigo Central 2 - Sheikh Zayed Rd - Al Safa 2 - Al Safa - Dubai - United Arab Emirates'
            },
            riyadh: {
                name: translationsEl?.dataset.riyadhName || 'Riyadh',
                city: translationsEl?.dataset.riyadhCity || 'Riyadh',
                country: translationsEl?.dataset.riyadhCountry || 'Saudi Arabia',
                address: translationsEl?.dataset.riyadhAddress || '2945 7817 Prince Muhammad Ibn Abd Al Aziz, Al Olaya, Riyadh 12313, Saudi Arabia'
            },
            jeddah: {
                name: translationsEl?.dataset.jeddahName || 'Jeddah',
                city: translationsEl?.dataset.jeddahCity || 'Jeddah',
                country: translationsEl?.dataset.jeddahCountry || 'Saudi Arabia',
                address: translationsEl?.dataset.jeddahAddress || 'Sari Br Rd, As Salamah, Jeddah 23436, Saudi Arabia'
            },
            muscat: {
                name: translationsEl?.dataset.muscatName || 'Muscat',
                city: translationsEl?.dataset.muscatCity || 'Muscat',
                country: translationsEl?.dataset.muscatCountry || 'Oman',
                address: translationsEl?.dataset.muscatAddress || '18th November St, Muscat, Oman'
            }
        },
        features: {
            luxuryDisplays: translationsEl?.dataset.featureLuxuryDisplays || 'Luxury Kitchen Displays',
            premiumDesign: translationsEl?.dataset.featurePremiumDesign || 'Premium German Design',
            expertConsultation: translationsEl?.dataset.featureExpertConsultation || 'Expert Consultation',
            modernCollections: translationsEl?.dataset.featureModernCollections || 'Modern Design Collections',
            customSolutions: translationsEl?.dataset.featureCustomSolutions || 'Custom Kitchen Solutions',
            designServices: translationsEl?.dataset.featureDesignServices || 'Professional Design Services',
            contemporaryDesigns: translationsEl?.dataset.featureContemporaryDesigns || 'Contemporary Kitchen Designs',
            highEndMaterials: translationsEl?.dataset.featureHighEndMaterials || 'High-End Materials',
            designConsultation: translationsEl?.dataset.featureDesignConsultation || 'Design Consultation',
            premiumCollections: translationsEl?.dataset.featurePremiumCollections || 'Premium Kitchen Collections',
            germanEngineering: translationsEl?.dataset.featureGermanEngineering || 'German Engineering',
            customDesignServices: translationsEl?.dataset.featureCustomDesignServices || 'Custom Design Services',
            finestKitchens: translationsEl?.dataset.featureFinestKitchens || 'Finest German Kitchens',
            expertDesign: translationsEl?.dataset.featureExpertDesign || 'Expert Design Consultation',
            modernSolutions: translationsEl?.dataset.featureModernSolutions || 'Modern Kitchen Solutions',
            premiumMaterials: translationsEl?.dataset.featurePremiumMaterials || 'Premium Materials',
            premiumQuality: translationsEl?.dataset.featurePremiumQuality || 'Premium German Quality',
            elegantCollections: translationsEl?.dataset.featureElegantCollections || 'Elegant Design Collections',
            expertServices: translationsEl?.dataset.featureExpertServices || 'Expert Consultation Services'
        }
    };

    // Initialize the map
    var map = L.map('showroom-map', {
        attributionControl: false,
        center: [25.0, 47.0], // Center of GCC region
        zoom: 5,
        zoomControl: true,
        scrollWheelZoom: true
    });

    // Add tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors, © CartoDB',
        subdomains: 'abcd',
        maxZoom: 18
    }).addTo(map);

    // Custom marker icon
    var customIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div class="marker-pin">
                 <div class="marker-inner"></div>
               </div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30]
    });

    // Showroom data
    var showrooms = [
        {
            name: t.locations.dubai.name,
            city: t.locations.dubai.city,
            country: t.locations.dubai.country,
            address: t.locations.dubai.address,
            lat: 25.2048,
            lng: 55.2708,
            phone: '+971 04 342 8897',
            mapUrl: 'https://maps.app.goo.gl/BazgBe1w6Uy3rwZV9',
            image: '/assets/images/showrooms/dubai.jpeg',
            features: [
                t.features.luxuryDisplays,
                t.features.premiumDesign,
                t.features.expertConsultation
            ],
            location: 'dubai'
        },
        {
            name: t.locations.riyadh.name,
            city: t.locations.riyadh.city,
            country: t.locations.riyadh.country,
            address: t.locations.riyadh.address,
            lat: 24.7136,
            lng: 46.6753,
            phone: '+966 800 301 7771',
            mapUrl: 'https://maps.app.goo.gl/Lht16DJC9RdJzceR6',
            image: '/assets/images/showrooms/riyadh.jpeg',
            features: [
                t.features.modernCollections,
                t.features.customSolutions,
                t.features.designServices
            ],
            location: 'riyadh'
        },
        {
            name: t.locations.jeddah.name,
            city: t.locations.jeddah.city,
            country: t.locations.jeddah.country,
            address: t.locations.jeddah.address,
            lat: 21.5433,
            lng: 39.1728,
            phone: '+966 800 301 7771',
            mapUrl: 'https://maps.app.goo.gl/Dx1ZKDCthGMWRRKs6',
            image: '/assets/images/showrooms/jeddah.jpeg',
            features: [
                t.features.contemporaryDesigns,
                t.features.highEndMaterials,
                t.features.designConsultation
            ],
            location: 'jeddah'
        },
        {
            name: t.locations.muscat.name,
            city: t.locations.muscat.city,
            country: t.locations.muscat.country,
            address: t.locations.muscat.address,
            lat: 23.5880,
            lng: 58.3829,
            phone: '+968 24 138191',
            mapUrl: 'https://maps.app.goo.gl/zByTD8VXCAsw99r19',
            image: '/assets/images/showrooms/muscat.webp',
            features: [
                t.features.premiumQuality,
                t.features.elegantCollections,
                t.features.expertServices
            ],
            location: 'muscat'
        }
    ];

    // Generate showroom cards dynamically
    function generateShowroomCards() {
        const showroomGrid = document.getElementById('showroom-grid');
        const lang = document.documentElement.lang || 'en';

        showrooms.forEach(function(showroom) {
            const landingUrl = `/${lang}/showrooms/${showroom.location}/`;
            const cardHTML = `
                <div class="cs-showroom-card" data-location="${showroom.location}">
                    <div class="cs-card-header">
                        <h3 class="cs-card-title">${showroom.name} ${t.showroomSuffix}</h3>
                        <div class="cs-card-location">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                            </svg>
                            ${showroom.city}, ${showroom.country}
                        </div>
                    </div>
                    <div class="cs-card-image">
                        <img src="${showroom.image}" alt="${showroom.name} ${t.showroomSuffix}" loading="lazy">
                    </div>
                    <div class="cs-card-body">
                        <div class="cs-card-info">
                            ${showroom.features.map(feature => `
                                <div class="cs-info-item">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                    </svg>
                                    <span>${feature}</span>
                                </div>
                            `).join('')}
                        </div>
                        <div class="cs-card-contact">
                            <div class="cs-card-contact-item">
                                <span class="cs-contact-label">${t.addressLabel}:</span>
                                <a href="${showroom.mapUrl}" target="_blank" rel="noopener noreferrer" class="cs-contact-value">${showroom.address}</a>
                            </div>
                            <div class="cs-card-contact-item">
                                <span class="cs-contact-label">${t.phoneLabel}:</span>
                                <a href="tel:${showroom.phone}" class="cs-contact-value" dir="ltr">${showroom.phone}</a>
                            </div>
                        </div>
                        <div class="cs-card-actions">
                            <a href="${showroom.mapUrl}" target="_blank" rel="noopener noreferrer" class="cs-action-btn cs-secondary">
                                ${t.viewGoogleBtn}
                            </a>
                            <button class="cs-action-btn cs-primary contact-modal-btn" data-showroom="${showroom.name}">
                                ${t.contactBtn}
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            showroomGrid.innerHTML += cardHTML;
        });
    }

    // Generate cards when page loads
    generateShowroomCards();

    // Add markers to the map
    showrooms.forEach(function(showroom) {
        var marker = L.marker([showroom.lat, showroom.lng], {
            icon: customIcon
        }).addTo(map);

        // Create popup content
        var popupContent = `
            <div class="showroom-popup">
                <h3 class="popup-title">${showroom.name}</h3>
                <div class="popup-content">
                    <p class="popup-address"><strong>${t.addressLabel}:</strong><br>${showroom.address}</p>
                    <p class="popup-phone"><strong>📞 ${t.phoneLabel}:</strong><br><a href="tel:${showroom.phone}" dir="ltr">${showroom.phone}</a></p>
                    <div class="popup-buttons">
                        <a href="${showroom.mapUrl}" target="_blank" class="popup-btn">${t.getDirectionsBtn}</a>
                        <a href="tel:${showroom.phone}" class="popup-btn popup-btn-secondary">${t.callNowBtn}</a>
                    </div>
                </div>
            </div>
        `;

        marker.bindPopup(popupContent, {
            maxWidth: 300,
            className: 'custom-popup'
        });
    });

    // Fit map to show all markers
    var group = new L.featureGroup(showrooms.map(s => L.marker([s.lat, s.lng])));
    map.fitBounds(group.getBounds().pad(0.1));

    // Contact Modal Functionality
    const modal = document.getElementById('contact-modal');
    const modalShowroomName = document.getElementById('modal-showroom-name');
    const modalShowroomImage = document.getElementById('modal-showroom-image');
    const showroomInput = document.getElementById('showroom');
    const contactButtons = document.querySelectorAll('.contact-modal-btn');
    const closeModal = document.querySelector('.modal-close');
    const submitButton = document.getElementById('submit-contact-form');
    const contactForm = document.getElementById('contact-form');

    // Open modal when contact button is clicked
    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            const showroomName = this.getAttribute('data-showroom');
            modalShowroomName.textContent = showroomName;
            showroomInput.value = showroomName;
            
            // Find the corresponding showroom data and set the image
            const showroom = showrooms.find(s => s.name === showroomName);
            if (showroom) {
                modalShowroomImage.src = showroom.image;
                modalShowroomImage.alt = `${showroom.name} ${t.showroomSuffix}`;
            }
            
            modal.style.display = 'flex';
            document.body.classList.add('modal-open');
        });
    });

    // Close modal
    function closeContactModal() {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        contactForm.reset();
    }

    closeModal.addEventListener('click', closeContactModal);

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeContactModal();
        }
    });

    // Reset field border color on input
    document.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('input', function() {
            this.style.borderColor = '#d1d5db';
        });
    });

    // Country dropdown
    (function () {
        var language = document.documentElement.lang === 'ar' ? 'ar' : 'en';
        var select = document.getElementById('country-select-showrooms');
        var trigger = document.getElementById('country-trigger-showrooms');
        var panel = document.getElementById('country-panel-showrooms');
        var search = document.getElementById('country-search-showrooms');
        var list = document.getElementById('country-options-showrooms');
        var input = document.getElementById('country-showrooms');
        var form = document.getElementById('contact-form');

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
                option.id = 'country-options-showrooms-' + country.code.toLowerCase();
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
    }());
});
