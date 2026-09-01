// UTM attribution — captures utm_campaign, utm_medium, utm_source, and utm_id
// from the landing URL, persists them in cookies so they survive navigation to
// pages where the params are no longer present, and fills the hidden form
// fields on the contact, explore, showrooms, and catalog download forms.

(function () {
    'use strict';

    var UTM_PARAMS = ['utm_campaign', 'utm_medium', 'utm_source', 'utm_id'];
    var COOKIE_PREFIX = 'noblessa_';
    var COOKIE_DAYS = 90;

    function setCookie(name, value) {
        var date = new Date();
        date.setTime(date.getTime() + COOKIE_DAYS * 24 * 60 * 60 * 1000);
        document.cookie = name + '=' + encodeURIComponent(value) +
            '; expires=' + date.toUTCString() + '; path=/; SameSite=Lax';
    }

    function getCookie(name) {
        var prefix = name + '=';
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.indexOf(prefix) === 0) {
                return decodeURIComponent(cookie.substring(prefix.length));
            }
        }
        return null;
    }

    // Capture any UTM params present in the current URL, overwriting only the
    // params that are actually present so earlier attribution isn't lost.
    function captureUtmParams() {
        var params = new URLSearchParams(window.location.search);
        UTM_PARAMS.forEach(function (key) {
            var value = params.get(key);
            if (value) {
                setCookie(COOKIE_PREFIX + key, value);
            }
        });
    }

    // Populate the hidden UTM inputs on any Netlify form with stored values.
    function fillUtmFields() {
        var forms = document.querySelectorAll('form[data-netlify="true"]');
        forms.forEach(function (form) {
            UTM_PARAMS.forEach(function (key) {
                var field = form.querySelector('input[name="' + key + '"]');
                if (!field) return;
                var stored = getCookie(COOKIE_PREFIX + key);
                if (stored) field.value = stored;
            });
        });
    }

    captureUtmParams();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fillUtmFields);
    } else {
        fillUtmFields();
    }

    // form.reset() clears the hidden UTM inputs (no default value attribute),
    // so refill them after any reset (e.g. modal close/reopen on catalog and
    // showrooms forms).
    document.addEventListener('reset', function (event) {
        if (event.target && event.target.matches && event.target.matches('form[data-netlify="true"]')) {
            window.setTimeout(fillUtmFields, 0);
        }
    });
}());
