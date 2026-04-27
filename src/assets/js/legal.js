// Legal page tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.cs-tab-button');
    const tabContents = document.querySelectorAll('.cs-tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            // Scroll to top of content
            window.scrollTo({
                top: document.getElementById('cs-legal-tabs').offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });

    // Handle hash navigation (e.g., /legal/#privacy)
    function handleHashChange() {
        const hash = window.location.hash.slice(1);
        if (hash) {
            const button = document.querySelector(`[data-tab="${hash}"]`);
            if (button) {
                button.click();
            }
        }
    }

    // Check hash on load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
});
