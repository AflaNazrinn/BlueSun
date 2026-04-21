document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuIcon = mobileMenuBtn.querySelector('.material-symbols-outlined');

    let isMenuOpen = false;

    mobileMenuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            // Allow a tiny delay for display:block to apply before animating opacity
            setTimeout(() => {
                mobileMenu.classList.add('mobile-menu-enter-active');
                mobileMenuIcon.textContent = 'close';
            }, 10);
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        } else {
            mobileMenu.classList.remove('mobile-menu-enter-active');
            mobileMenu.classList.add('mobile-menu-exit-active');
            mobileMenuIcon.textContent = 'menu_open';
            
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('mobile-menu-exit-active');
                document.body.style.overflow = '';
            }, 300); // match CSS transition duration
        }
    });

    // 2. Navbar Scroll Effect (shrink and add shadow)
    const navbar = document.getElementById('main-nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-luxury', 'bg-white/60');
            navbar.classList.remove('bg-white/70');
        } else {
            navbar.classList.remove('shadow-luxury', 'bg-white/60');
            navbar.classList.add('bg-white/70');
        }
    });

    // 3. Carousel Scroll Buttons
    const carousel = document.getElementById('services-carousel');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    if (carousel && prevBtn && nextBtn) {
        // Calculate the scroll amount based on card width
        const scrollAmount = 400; // approximate width of a card

        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    // 4. Number Counter Animation
    const counters = document.querySelectorAll('.stat-counter');
    const animationDuration = 2000; // 2 seconds

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const decimals = +counter.getAttribute('data-decimals') || 0;
        const startTime = performance.now();

        const updateCount = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);
            
            // Easing function (easeOutExpo)
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            
            const currentCount = easeProgress * target;
            
            counter.innerText = currentCount.toFixed(decimals);

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target.toFixed(decimals);
            }
        };

        requestAnimationFrame(updateCount);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // 5. Hero Slider Logic
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    let slideInterval;

    const showSlide = (index) => {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    };

    const nextSlide = () => {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    };

    const startSlideTimer = () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000); // Change every 5 seconds
    };

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            showSlide(idx);
            startSlideTimer();
        });
    });

    if (slides.length > 0) {
        startSlideTimer();
    }
});
