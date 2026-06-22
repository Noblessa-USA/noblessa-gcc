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
});
