// Cart functionality
let cartCount = 0;
let compareCount = 0;

// Add to cart
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    const cartCountElement = document.querySelector('.cart-count');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            cartCount++;
            if (cartCountElement) {
                cartCountElement.textContent = cartCount;
                cartCountElement.style.display = 'flex';
            }
            
            // Visual feedback
            button.textContent = 'Added!';
            button.style.background = '#27ae60';
            setTimeout(() => {
                button.textContent = 'Add to Cart';
                button.style.background = '';
            }, 1000);
        });
    });

    // Compare functionality
    const compareButtons = document.querySelectorAll('.btn-compare');
    const compareCountElement = document.querySelector('.compare-count');
    
    compareButtons.forEach(button => {
        button.addEventListener('click', function() {
            compareCount++;
            if (compareCountElement) {
                compareCountElement.textContent = compareCount;
                compareCountElement.style.display = 'flex';
            }
            
            // Toggle active state
            button.classList.toggle('active');
            if (button.classList.contains('active')) {
                button.style.background = '#3498db';
                button.style.color = '#fff';
            } else {
                button.style.background = '';
                button.style.color = '';
            }
        });
    });

    // Wishlist functionality
    const wishlistButtons = document.querySelectorAll('.btn-wishlist');
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = button.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                button.style.color = '#e74c3c';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                button.style.color = '';
            }
        });
    });

    // Quick view functionality
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            alert('Quick view feature - Product details would open here');
        });
    });

    // Buy now functionality
    const buyNowButtons = document.querySelectorAll('.btn-buy-now');
    
    buyNowButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Redirecting to checkout...');
        });
    });

    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Here you would filter products based on the selected tab
            console.log('Filtering products by:', this.textContent);
        });
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                alert('Thank you for subscribing!');
                this.querySelector('input[type="email"]').value = '';
            }
        });
    }

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('mobile-open');
        });
    }

    // Cart icon click
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            alert('Cart: ' + cartCount + ' item(s)');
        });
    }

    // Compare icon click
    const compareIcon = document.querySelector('.compare-icon');
    if (compareIcon) {
        compareIcon.addEventListener('click', function() {
            alert('Compare: ' + compareCount + ' item(s)');
        });
    }

    // Carousel functionality
    initCarousels();
    
    // Hero carousel auto-slide
    initHeroCarousel();
    
    // Header menu dropdown toggle
    const headerMenuToggle = document.querySelector('.header-menu-toggle');
    const headerMenuDropdown = document.querySelector('.header-menu-dropdown');
    if (headerMenuToggle && headerMenuDropdown) {
        headerMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            headerMenuDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!headerMenuToggle.contains(e.target) && !headerMenuDropdown.contains(e.target)) {
                headerMenuDropdown.classList.remove('active');
            }
        });
    }
    
    // Sync mobile cart count with main cart
    const mobileCartCount = document.querySelector('.mobile-cart-count');
    if (mobileCartCount && cartCountElement) {
        // Update mobile cart count when main cart updates
        const updateMobileCart = () => {
            mobileCartCount.textContent = cartCount;
            mobileCartCount.style.display = cartCount > 0 ? 'flex' : 'none';
        };
        updateMobileCart();
        
        // Watch for cart changes (you might need to update this when cart changes)
        setInterval(updateMobileCart, 100);
    }
    
    // Mobile cart icon click
    const mobileCartIcon = document.querySelector('.mobile-cart-icon');
    if (mobileCartIcon) {
        mobileCartIcon.addEventListener('click', function() {
            alert('Cart: ' + cartCount + ' item(s)');
        });
    }
});

// Hero Carousel Auto-Slide
function initHeroCarousel() {
    const track = document.querySelector('.hero-carousel-track');
    const slides = document.querySelectorAll('.hero-slide');
    
    if (!track || slides.length < 2) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    function updateCarousel() {
        // Move track horizontally
        const translateX = -(currentSlide * 33.333);
        track.style.transform = `translateX(${translateX}%)`;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    // Auto-slide every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Initial setup
    updateCarousel();
}

// Carousel initialization
function initCarousels() {
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const wrapper = carousel.closest('.carousel-wrapper');
        const section = wrapper.closest('section');
        let prevBtn, nextBtn;
        
        // Find buttons outside the wrapper
        if (carousel.classList.contains('promo-carousel')) {
            prevBtn = section.querySelector('.promo-prev');
            nextBtn = section.querySelector('.promo-next');
        } else if (carousel.classList.contains('quick-links-carousel')) {
            prevBtn = section.querySelector('.quick-prev');
            nextBtn = section.querySelector('.quick-next');
        } else {
            prevBtn = wrapper.querySelector('.carousel-prev');
            nextBtn = wrapper.querySelector('.carousel-next');
        }
        
        const items = track.querySelectorAll('.promo-block, .quick-link-item');
        
        if (!items.length) return;
        
        let currentIndex = 0;
        const itemsPerView = getItemsPerView(carousel);
        const maxIndex = Math.max(0, items.length - itemsPerView);
        
        function updateCarousel() {
            // Only apply transform if we need to scroll
            if (items.length <= itemsPerView) {
                track.style.transform = 'translateX(0px)';
                // Hide buttons if all items are visible
                if (prevBtn) prevBtn.style.display = 'none';
                if (nextBtn) nextBtn.style.display = 'none';
            } else {
                const itemWidth = items[0].offsetWidth;
                const gap = parseInt(window.getComputedStyle(track).gap) || 20;
                const translateX = -(currentIndex * (itemWidth + gap));
                track.style.transform = `translateX(${translateX}px)`;
                // Show buttons if scrolling is needed
                if (prevBtn) prevBtn.style.display = 'flex';
                if (nextBtn) nextBtn.style.display = 'flex';
            }
            
            // Update button states
            if (prevBtn && prevBtn.style.display !== 'none') {
                prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            }
            if (nextBtn && nextBtn.style.display !== 'none') {
                nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
            }
        }
        
        function getItemsPerView(carousel) {
            const width = window.innerWidth;
            if (carousel.classList.contains('promo-carousel')) {
                if (width <= 480) return 1;
                if (width <= 768) return 2;
                return 4; // Default: 4 cards on desktop
            } else {
                if (width <= 480) return 2;
                if (width <= 768) return 3;
                return 5;
            }
        }
        
        function nextSlide() {
            const itemsPerView = getItemsPerView(carousel);
            const maxIndex = Math.max(0, items.length - itemsPerView);
            if (currentIndex < maxIndex) {
                currentIndex = Math.min(currentIndex + 1, maxIndex);
                updateCarousel();
            }
        }
        
        function prevSlide() {
            if (currentIndex > 0) {
                currentIndex = Math.max(currentIndex - 1, 0);
                updateCarousel();
            }
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        
        // Touch/swipe support
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });
        
        track.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            
            const diffX = startX - currentX;
            const threshold = 50;
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        });
        
        // Mouse drag support
        track.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            isDragging = true;
            track.style.cursor = 'grabbing';
        });
        
        track.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            currentX = e.clientX;
        });
        
        track.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            track.style.cursor = 'grab';
            
            const diffX = startX - currentX;
            const threshold = 50;
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        });
        
        track.addEventListener('mouseleave', () => {
            isDragging = false;
            track.style.cursor = 'grab';
        });
        
        // Update on window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const itemsPerView = getItemsPerView(carousel);
                const maxIndex = Math.max(0, items.length - itemsPerView);
                if (currentIndex > maxIndex) {
                    currentIndex = maxIndex;
                }
                updateCarousel();
            }, 250);
        });
        
        // Initial update
        updateCarousel();
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Cookie Disclaimer Popup
function initCookiePopup() {
    const cookieOverlay = document.getElementById('cookieOverlay');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieReject = document.getElementById('cookieReject');
    const cookieManage = document.getElementById('cookieManage');
    
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent) {
        // Show popup after a short delay (longer on mobile for better UX)
        const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const delay = isMobile ? 2000 : 1000;
        
        setTimeout(() => {
            if (cookieOverlay) {
                cookieOverlay.classList.add('active');
                // Prevent body scroll when popup is open
                document.body.classList.add('cookie-popup-active');
                // Prevent touch scrolling on mobile
                if (isMobile) {
                    document.body.style.position = 'fixed';
                    document.body.style.width = '100%';
                    document.body.style.top = `-${window.scrollY}px`;
                }
            }
        }, delay);
    }
    
    // Accept all cookies
    if (cookieAccept) {
        cookieAccept.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            localStorage.setItem('cookieConsentDate', new Date().toISOString());
            hideCookiePopup();
        });
    }
    
    // Reject (only essential cookies)
    if (cookieReject) {
        cookieReject.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'rejected');
            localStorage.setItem('cookieConsentDate', new Date().toISOString());
            hideCookiePopup();
        });
    }
    
    // Manage consent (for now, just show the popup again or redirect to cookie policy)
    if (cookieManage) {
        cookieManage.addEventListener('click', function() {
            // You can implement a detailed cookie management interface here
            // For now, we'll just accept all (you can change this behavior)
            alert('Sīkdatņu pārvaldības panelis tiks pievienots drīzumā. Lūdzu, izmantojiet citas opcijas.');
        });
    }
    
    function hideCookiePopup() {
        if (cookieOverlay) {
            cookieOverlay.classList.remove('active');
            // Restore body scroll and remove blur
            document.body.classList.remove('cookie-popup-active');
            // Restore mobile body positioning
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }
    }
    
    // Close popup when clicking outside (optional)
    if (cookieOverlay) {
        cookieOverlay.addEventListener('click', function(e) {
            if (e.target === cookieOverlay) {
                // Don't close on outside click - user must make a choice
                // hideCookiePopup();
            }
        });
    }
}

// Initialize cookie popup when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookiePopup);
} else {
    initCookiePopup();
}

