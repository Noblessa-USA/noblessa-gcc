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
});
