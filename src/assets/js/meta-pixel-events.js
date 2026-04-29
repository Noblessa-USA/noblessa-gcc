// Meta Pixel — form submission events
// Fires fbq('track', 'Lead') when a user submits a form on
// the contact, showrooms, or explore pages.

(function () {
    'use strict';

    function trackLead(formName) {
        if (typeof fbq !== 'function') return;
        fbq('track', 'Lead', { content_name: formName });
    }

    function attachToForm(selector, formName) {
        var form = document.querySelector(selector);
        if (!form) return;

        form.addEventListener('submit', function () {
            trackLead(formName);
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        // Contact page  — id="cs-form-265" name="Main Contact Form"
        attachToForm('#cs-form-265[name="Main Contact Form"]', 'Main Contact Form');

        // Showrooms page — id="contact-form" name="Showrooms Form"
        attachToForm('#contact-form[name="Showrooms Form"]', 'Showrooms Form');

        // Explore page   — id="cs-form-265" name="Explore Form"
        attachToForm('#cs-form-265[name="Explore Form"]', 'Explore Form');
    });
}());
