document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mciMenuToggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Intersection Observer for Entrance Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation classes to sections or cards
    document.querySelectorAll('.service-card, .about-text, .section-title, .hero-content').forEach(el => {
        el.style.opacity = '0'; // Initial state before animation
        observer.observe(el);
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
    // Calendar Modal Logic
    const calendarModal = document.getElementById('calendarModal');
    const openCalendarBtns = document.querySelectorAll('.open-calendar-btn');
    const closeCalendarBtn = document.getElementById('closeCalendar');

    if (calendarModal && openCalendarBtns.length > 0) {
        const iframe = calendarModal.querySelector('iframe');

        if (iframe) {
            iframe.addEventListener('load', () => {
                iframe.classList.add('loaded');
                const loader = calendarModal.querySelector('.modal-loader');
                if (loader) loader.style.display = 'none';
            });
        }

        // Use Event Delegation for Open Buttons (Robust for Mobile/Dynamic elements)
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.open-calendar-btn');
            if (btn) {
                e.preventDefault();
                calendarModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });

        const closeCalendar = () => {
            calendarModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (closeCalendarBtn) {
            closeCalendarBtn.addEventListener('click', (e) => {
                e.preventDefault();
                closeCalendar();
            });
        }

        calendarModal.addEventListener('click', (e) => {
            if (e.target === calendarModal) {
                closeCalendar();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && calendarModal.classList.contains('active')) {
                closeCalendar();
            }
        });
    }
});
