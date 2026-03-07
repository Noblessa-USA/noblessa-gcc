// Kitchen Collections Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Collection images data
    const collectionImages = {
        'attitude': [
            '/assets/images/kitchen/Collections Grid/Attitude/K_30823_21_Attitude_786_M.jpg',
            '/assets/images/kitchen/Collections Grid/Attitude/K_30686_21_Attitude_786_M_B704173.jpg',
            '/assets/images/kitchen/Collections Grid/Attitude/K_30689_21_Attitude_786_M_B704183.jpg',
            '/assets/images/kitchen/Collections Grid/Attitude/K_30690_21_Attitude_786_D_B704183.jpg',
            '/assets/images/kitchen/Collections Grid/Attitude/K_786 Lacquer, Slate grey matt  (1).jpg',
            '/assets/images/kitchen/Collections Grid/Attitude/K_786 Lacquer, Slate grey matt  (2).jpg',
            '/assets/images/kitchen/Collections Grid/Attitude/788 Attitude Sand Matt  (1).jpg',
            '/assets/images/kitchen/Collections Grid/Attitude/788 Attitude Sand Matt  (16).jpg',
            '/assets/images/kitchen/Collections Grid/Attitude/788 Attitude Sand Matt  (22).jpg',
            '/assets/images/kitchen/Collections Grid/Attitude/788 Attitude Sand Matt  (31).jpg'
        ],
        'chance': [
            '/assets/images/kitchen/Collections Grid/Chance/K_9344_20_Chance402.jpg',
            '/assets/images/kitchen/Collections Grid/Chance/K_9343_20_Chance402.jpg',
            '/assets/images/kitchen/Collections Grid/Chance/K_9345_20_Chance402_D.jpg',
            '/assets/images/kitchen/Collections Grid/Chance/K_02_12_31313_22_Chance_402_M.jpg',
            '/assets/images/kitchen/Collections Grid/Chance/406 Chance Como oak (12).jpg',
            '/assets/images/kitchen/Collections Grid/Chance/406 Chance Como oak (14).jpg',
            '/assets/images/kitchen/Collections Grid/Chance/407 Milano Walnut Oak (12).jpg',
            '/assets/images/kitchen/Collections Grid/Chance/407 Milano Walnut Oak (14).jpg',
            '/assets/images/kitchen/Collections Grid/Chance/407 Milano Walnut Oak (16).jpg',
            '/assets/images/kitchen/Collections Grid/Chance/K_30948_21_Chance405_B704097.jpg'
        ],
        'crystal': [
            '/assets/images/kitchen/Collections Grid/Crystal/K_30384_21_Cristal_938_M.jpg',
            '/assets/images/kitchen/Collections Grid/Crystal/K_01_03_31185_22_Cristal_938_M.jpg',
            '/assets/images/kitchen/Collections Grid/Crystal/K_01_03_31186_22_Cristal_938_M.jpg',
            '/assets/images/kitchen/Collections Grid/Crystal/K_30387_21_Cristal_938_D.jpg',
            '/assets/images/kitchen/Collections Grid/Crystal/K_30413_21_Cristal_938_M.jpg',
            '/assets/images/kitchen/Collections Grid/Crystal/K_30414_21_Cristal_938_M.jpg',
            '/assets/images/kitchen/Collections Grid/Crystal/K_937 Glass appearance, Titanio matt (1).jpg',
            '/assets/images/kitchen/Collections Grid/Crystal/K_937 Glass appearance, Titanio matt (2).jpg',
            '/assets/images/kitchen/Collections Grid/Crystal/K_937 Glass appearance, Titanio matt (3).jpg',
            '/assets/images/kitchen/Collections Grid/Crystal/K_30692_21_Cristal_938_M_B704163.jpg'
        ],
        'divine': [
            '/assets/images/kitchen/Collections Grid/Divine/K_30656_21_Divine_966_M.jpg',
            '/assets/images/kitchen/Collections Grid/Divine/K_30654_21_Divine_966_M.jpg',
            '/assets/images/kitchen/Collections Grid/Divine/K_30658_21_Divine_966_D.jpg',
            '/assets/images/kitchen/Collections Grid/Divine/K_30661_21_Divine_966_D.jpg',
            '/assets/images/kitchen/Collections Grid/Divine/K_966 Lacquered laminate, Fjord blue ultra matt (1).jpg',
            '/assets/images/kitchen/Collections Grid/Divine/K_30544_22_Divine_961_M.jpg',
            '/assets/images/kitchen/Collections Grid/Divine/K_961 Lacquered laminate, graphite black ultra matt (2).jpg',
            '/assets/images/kitchen/Collections Grid/Divine/K_964 Lacquered laminate, Mineral green ultra matt (1).jpg',
            '/assets/images/kitchen/Collections Grid/Divine/K_964 Lacquered laminate, Mineral green ultra matt (2).jpg',
            '/assets/images/kitchen/Collections Grid/Divine/K_30739_22_Divine_968_M.jpg'
        ],
        'espirit': [
            '/assets/images/kitchen/Collections Grid/Espirit/K_30684_21_Esprit_455_M_B704169.jpg',
            '/assets/images/kitchen/Collections Grid/Espirit/K_02_16_31107_22_Esprit_455_M.jpg',
            '/assets/images/kitchen/Collections Grid/Espirit/K_30348_21_Esprit_453_M_B704165.jpg',
            '/assets/images/kitchen/Collections Grid/Espirit/K_30491_21_Esprit_450_M_R1_B703795.jpg',
            '/assets/images/kitchen/Collections Grid/Espirit/K_48276_19_Esprit_453_B703193.jpg',
            '/assets/images/kitchen/Collections Grid/Espirit/K_48280_19_Esprit_453_B703193_D.jpg',
            '/assets/images/kitchen/Collections Grid/Espirit/K_30946_21_Esprit_503_B703189.jpg'
        ],
        'grace': [
            '/assets/images/kitchen/Collections Grid/Grace/K_01_21_31153_22_Grace_881_M.jpg',
            '/assets/images/kitchen/Collections Grid/Grace/K_01_21_31154_22_Grace_881_M.jpg',
            '/assets/images/kitchen/Collections Grid/Grace/K_01_21_31155_22_Grace_881_D.jpg',
            '/assets/images/kitchen/Collections Grid/Grace/K_8729_20_Grace_881_B704151.jpg',
            '/assets/images/kitchen/Collections Grid/Grace/K_8764_20_Grace_883_R1_B704153.jpg',
            '/assets/images/kitchen/Collections Grid/Grace/K_8765_20_Grace_883_R1_B703387.jpg',
            '/assets/images/kitchen/Collections Grid/Grace/Grace_881_M_R1_D-2-1024x750.jpg',
            '/assets/images/kitchen/Collections Grid/Grace/Grace_883_B703387-3-1024x592.jpg'
        ],
        'iconic': [
            '/assets/images/kitchen/Collections Grid/Iconic/Noblessa 216 (1).jpg',
            '/assets/images/kitchen/Collections Grid/Iconic/Noblessa 216 (2).jpg',
            '/assets/images/kitchen/Collections Grid/Iconic/Noblessa 216 (3).jpg',
            '/assets/images/kitchen/Collections Grid/Iconic/Noblessa 216 (4).jpg',
            '/assets/images/kitchen/Collections Grid/Iconic/Noblessa 216 (5).jpg',
            '/assets/images/kitchen/Collections Grid/Iconic/Noble216 (1).jpg',
            '/assets/images/kitchen/Collections Grid/Iconic/Noble216 (2).jpg',
            '/assets/images/kitchen/Collections Grid/Iconic/K_49698_19_Ionic_216_B704107.jpg'
        ],
        'metro': [
            '/assets/images/kitchen/Collections Grid/Metro/K_01_16_31145_22_Metro_901_M.jpg',
            '/assets/images/kitchen/Collections Grid/Metro/K_01_16_31144_22_Metro_901_M.jpg',
            '/assets/images/kitchen/Collections Grid/Metro/K_01_16_31147_22_Metro_901_D.jpg',
            '/assets/images/kitchen/Collections Grid/Metro/K_14444_16_Metro_901_R2_B704137.jpg',
            '/assets/images/kitchen/Collections Grid/Metro/K_15012_17_Metro_901_B704139.jpg',
            '/assets/images/kitchen/Collections Grid/Metro/K_15029_17_Metro_901_B704139_D.jpg',
            '/assets/images/kitchen/Collections Grid/Metro/K_Metro901_M_15690_19.jpg'
        ],
        'passion': [
            '/assets/images/kitchen/Collections Grid/Passion/K_02_04_31027_22_Passion_814_M.jpg',
            '/assets/images/kitchen/Collections Grid/Passion/K_02_04_31026_22_Passion_814_M.jpg',
            '/assets/images/kitchen/Collections Grid/Passion/K_02_15_31077_22_Passion_819_M.jpg',
            '/assets/images/kitchen/Collections Grid/Passion/K_02_15_31079_22_Passion_819_M.jpg',
            '/assets/images/kitchen/Collections Grid/Passion/K_9193_20_Passion819_R1.jpg',
            '/assets/images/kitchen/Collections Grid/Passion/K_9194_20_Passion819_R1.jpg',
            '/assets/images/kitchen/Collections Grid/Passion/K_Passion814_M_10943_19_R2.jpg',
            '/assets/images/kitchen/Collections Grid/Passion/B_03_40_31050_22_Passion_817_M.jpg'
        ],
        'shape': [
            '/assets/images/kitchen/Collections Grid/Shape/K_01_15_31283_22_Shape_778_M.jpg',
            '/assets/images/kitchen/Collections Grid/Shape/K_01_15_31282_22_Shape_778_M.jpg',
            '/assets/images/kitchen/Collections Grid/Shape/K_01_15_31284_22_Shape_778_M.jpg',
            '/assets/images/kitchen/Collections Grid/Shape/K_01_15_31286_22_Shape_778_D.jpg',
            '/assets/images/kitchen/Collections Grid/Shape/K_01_15_31289_22_Shape_778_D.jpg',
            '/assets/images/kitchen/Collections Grid/Shape/K_778 Lacquered laminate, Fjord blue (2).jpg',
            '/assets/images/kitchen/Collections Grid/Shape/K_778 Lacquered laminate, Fjord blue (3).jpg',
            '/assets/images/kitchen/Collections Grid/Shape/K_30944_21_Shape_772_B704121.jpg',
            '/assets/images/kitchen/Collections Grid/Shape/K_Shape774_M_48267.jpg'
        ],
        'tempo': [
            '/assets/images/kitchen/Collections Grid/Tempo/K_30614_21_Tempo_851_M_B704177.jpg',
            '/assets/images/kitchen/Collections Grid/Tempo/K_14780_17_Tempo_851_R2_B704129.jpg',
            '/assets/images/kitchen/Collections Grid/Tempo/K_Tempo851_M_14939_R1.jpg',
            '/assets/images/kitchen/Collections Grid/Tempo/K_Tempo851_S_14942_R1.jpg',
            '/assets/images/kitchen/Collections Grid/Tempo/K_Tempo851_S_14947_R1.jpg',
            '/assets/images/kitchen/Collections Grid/Tempo/L_01_20_31150_22_Tempo_851_M.jpg'
        ],
        'tradition': [
            '/assets/images/kitchen/Collections Grid/Tradition/K_02_05_31033_22_Tradition_224_M.jpg',
            '/assets/images/kitchen/Collections Grid/Tradition/K_02_05_31032_22_Tradition_224_M.jpg',
            '/assets/images/kitchen/Collections Grid/Tradition/K_02_05_31034_22_Tradition_224_D.jpg',
            '/assets/images/kitchen/Collections Grid/Tradition/K_02_05_31035_22_Tradition_224_D.jpg',
            '/assets/images/kitchen/Collections Grid/Tradition/K_02_05_31036_22_Tradition_224_D.jpg',
            '/assets/images/kitchen/Collections Grid/Tradition/K_30535_22_Tradition_390_M_B703997_B703998.jpg',
            '/assets/images/kitchen/Collections Grid/Tradition/K_30536_22_Tradition_390_D_B703997_B703998.jpg',
            '/assets/images/kitchen/Collections Grid/Tradition/K_Tradition390_M_13964_19_R1.jpg'
        ]
    };

    // Initialize collection cards with intersection observer for animations
    const collectionCards = document.querySelectorAll('.cs-collection-card');
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('cs-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    collectionCards.forEach(card => {
        observer.observe(card);
    });

    // Gallery Modal Functionality
    const modal = document.getElementById('collection-gallery-modal');
    const modalOverlay = modal.querySelector('.cs-modal-overlay');
    const modalClose = modal.querySelector('.cs-modal-close');
    const mainImage = modal.querySelector('.cs-main-image');
    const prevBtn = modal.querySelector('.cs-prev');
    const nextBtn = modal.querySelector('.cs-next');
    const thumbnailsContainer = modal.querySelector('.cs-thumbnails');
    const currentNumberSpan = modal.querySelector('.cs-current-number');
    const totalNumberSpan = modal.querySelector('.cs-total-number');
    const modalCollectionName = modal.querySelector('.cs-modal-collection-name');

    let currentCollection = '';
    let currentImageIndex = 0;
    let currentImages = [];

    // Open gallery modal
    function openGallery(collectionName) {
        currentCollection = collectionName;
        currentImages = collectionImages[collectionName] || [];
        
        if (currentImages.length === 0) return;
        
        currentImageIndex = 0;
        modalCollectionName.textContent = collectionName;
        
        // Create thumbnails
        thumbnailsContainer.innerHTML = '';
        currentImages.forEach((imgSrc, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'cs-thumbnail';
            if (index === 0) thumbnail.classList.add('active');
            
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = `${collectionName} ${index + 1}`;
            
            thumbnail.appendChild(img);
            thumbnail.addEventListener('click', () => showImage(index));
            thumbnailsContainer.appendChild(thumbnail);
        });
        
        showImage(0);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Show specific image
    function showImage(index) {
        currentImageIndex = index;
        mainImage.src = currentImages[index];
        mainImage.alt = `${currentCollection} ${index + 1}`;
        
        currentNumberSpan.textContent = index + 1;
        totalNumberSpan.textContent = currentImages.length;
        
        // Update active thumbnail
        const thumbnails = thumbnailsContainer.querySelectorAll('.cs-thumbnail');
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
        
        // Scroll active thumbnail into view
        if (thumbnails[index]) {
            thumbnails[index].scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest',
                inline: 'center'
            });
        }
    }

    // Navigate to previous image
    function previousImage() {
        const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : currentImages.length - 1;
        showImage(newIndex);
    }

    // Navigate to next image
    function nextImage() {
        const newIndex = currentImageIndex < currentImages.length - 1 ? currentImageIndex + 1 : 0;
        showImage(newIndex);
    }

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        currentImages = [];
        currentImageIndex = 0;
    }

    // Event listeners for modal
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', previousImage);
    nextBtn.addEventListener('click', nextImage);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            previousImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    });

    // Update collection links to open gallery
    const collectionLinks = document.querySelectorAll('.cs-learn-more');
    collectionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const collectionCard = this.closest('.cs-collection-card');
            const collectionName = collectionCard.querySelector('.cs-collection-name').textContent.toLowerCase().trim();
            openGallery(collectionName);
        });
    });

    // Handle reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        collectionCards.forEach(card => {
            card.style.transition = 'none';
        });
    }

    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Add hover effect for performance
    collectionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.willChange = 'transform';
        });

        card.addEventListener('mouseleave', function() {
            this.style.willChange = 'auto';
        });
    });
});
