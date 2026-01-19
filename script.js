document.addEventListener('DOMContentLoaded', () => {
    // Scroll Indicator Logic
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Showreel Modal Logic
    const modal = document.getElementById('showreelModal');
    const openBtn = document.getElementById('openShowreel');
    const closeBtn = document.getElementById('closeShowreel');
    const video = document.getElementById('showreelVideo');

    if (openBtn && modal && video) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            video.currentTime = 0;
            video.play();
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        });

        const closeModal = () => {
            modal.classList.remove('active');
            video.pause();
            document.body.style.overflow = ''; // Restore scroll
        };

        closeBtn.addEventListener('click', closeModal);

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // Footprints Project Logic
    const projectModal = document.getElementById('projectModal');
    const openProjectBtn = document.getElementById('openFootprints');
    const closeProjectBtn = document.getElementById('closeProject');

    if (openProjectBtn && projectModal) {
        openProjectBtn.addEventListener('click', (e) => {
            e.preventDefault();
            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        const closeProject = () => {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        closeProjectBtn.addEventListener('click', closeProject);

        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeProject();
            }
        });
    }


    // AI Visuals Lightbox Logic
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxTagline = document.getElementById('lightboxTagline');
    const closeLightboxBtn = document.getElementById('closeLightbox');
    const visualItems = document.querySelectorAll('.ai-visual-item');

    if (lightboxModal && visualItems.length > 0) {
        visualItems.forEach(item => {
            item.addEventListener('click', () => {
                const src = item.getAttribute('data-src');
                const title = item.getAttribute('data-title');
                const tagline = item.getAttribute('data-tagline');

                lightboxImage.src = src;
                lightboxTitle.textContent = title;
                lightboxTagline.textContent = tagline;

                lightboxModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeLightbox = () => {
            lightboxModal.classList.remove('active');
            document.body.style.overflow = '';
            // Optional: Clear src after transition to prevent flash on next open? 
            // Better to leave it for smoother experience or clear it if needed.
        };

        if (closeLightboxBtn) {
            closeLightboxBtn.addEventListener('click', closeLightbox);
        }

        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
                closeLightbox();
            }
        });
    }


    // Independent iMac Slider Logic
    const initSlider = (sliderId) => {
        const slider = document.getElementById(sliderId);
        if (!slider) return;

        let index = 0;
        const slides = slider.querySelectorAll('.imac-slide');

        if (slides.length > 0) {
            const showSlides = () => {
                slides.forEach(slide => slide.style.display = 'none');
                index++;
                if (index > slides.length) { index = 1 }
                slides[index - 1].style.display = 'block';
                setTimeout(showSlides, 3000);
            };
            showSlides();
        }
    };

    initSlider('slider1');
    initSlider('slider2');

    // Intersection Observer for Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Determine animation class based on need, 
                // for now we are relying on CSS hover/load animations 
                // but can add explicit class 'visible' if elements had it.
            }
        });
    }, { threshold: 0.1 });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinksList = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinksList.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinksList.classList.remove('active');
            });
        });
    }

    // Video Logic for AI Music Video (Film Section)
    const filmVideo = document.getElementById('filmBgVideo');
    const audioToggle = document.getElementById('filmAudioToggle');
    const continueBtn = document.getElementById('videoContinueBtn');
    let hasPausedAt10 = false;

    if (filmVideo) {
        // Autoplay muted is already set in HTML, ensuring it here too
        filmVideo.muted = true;

        filmVideo.addEventListener('timeupdate', () => {
            if (!hasPausedAt10 && filmVideo.currentTime >= 10) {
                filmVideo.pause();
                hasPausedAt10 = true;
                if (continueBtn) {
                    continueBtn.style.display = 'block';
                }
            }
        });

        if (continueBtn) {
            continueBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                filmVideo.play();
                continueBtn.style.display = 'none';

                // Optional: Unmute on continue? 
                // User said "Autoplay must be muted", but didn't say it must STAY muted.
                // However, following the requirement strictly: "No sound during autoplay".
                // I'll leave it to the user to toggle audio with the button.
            });
        }

        if (audioToggle) {
            audioToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                if (filmVideo.muted) {
                    filmVideo.muted = false;
                    audioToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
                } else {
                    filmVideo.muted = true;
                    audioToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
                }
            });
        }
    }

    // --- Custom Premium Booking Logic ---
    const monthDisplay = document.getElementById('monthDisplay');
    const calendarGrid = document.getElementById('calendarGrid');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const timeSlotsSection = document.getElementById('timeSlotsSection');
    const timeGrid = document.getElementById('timeGrid');
    const selectedDateLabel = document.getElementById('selectedDateLabel');
    const bookBtn = document.getElementById('bookBtn');

    let currentDate = new Date();
    let selectedDate = null;
    let selectedTime = null;

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const timeSlotsArr = [
        "09:00 AM", "10:00 AM", "11:00 AM",
        "01:00 PM", "02:00 PM", "03:00 PM",
        "04:00 PM", "05:00 PM", "06:00 PM"
    ];

    function renderCalendar() {
        if (!calendarGrid || !monthDisplay) return;

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        monthDisplay.textContent = `${months[month]} ${year}`;

        // Keep weekdays, remove others
        const weekdays = Array.from(calendarGrid.querySelectorAll('.weekday'));
        calendarGrid.innerHTML = '';
        weekdays.forEach(wd => calendarGrid.appendChild(wd));

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        let startingDay = firstDay === 0 ? 6 : firstDay - 1;

        for (let i = 0; i < startingDay; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.classList.add('day', 'empty');
            calendarGrid.appendChild(emptyDiv);
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day');
            dayDiv.textContent = day;

            const date = new Date(year, month, day);

            if (date < today) {
                dayDiv.classList.add('disabled');
            } else {
                if (date.getTime() === today.getTime()) {
                    dayDiv.classList.add('today');
                }

                if (selectedDate && date.getTime() === selectedDate.getTime()) {
                    dayDiv.classList.add('selected');
                }

                dayDiv.addEventListener('click', () => {
                    const prevSelected = calendarGrid.querySelector('.day.selected');
                    if (prevSelected) prevSelected.classList.remove('selected');

                    selectedDate = date;
                    dayDiv.classList.add('selected');

                    const options = { weekday: 'short', month: 'short', day: 'numeric' };
                    selectedDateLabel.textContent = `Slots for ${date.toLocaleDateString('en-US', options)}`;

                    renderTimeSlots();
                    timeSlotsSection.style.display = 'block';
                    selectedTime = null;
                    bookBtn.disabled = true;

                    // Smooth scroll to time slots
                    setTimeout(() => {
                        timeSlotsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 50);
                });
            }
            calendarGrid.appendChild(dayDiv);
        }
    }

    const userInfoSection = document.getElementById('userInfoSection');
    const userNameInput = document.getElementById('userName');
    const userEmailInput = document.getElementById('userEmail');

    function renderTimeSlots() {
        if (!timeGrid) return;
        timeGrid.innerHTML = '';
        timeSlotsArr.forEach(time => {
            const slot = document.createElement('div');
            slot.classList.add('time-slot');
            slot.textContent = time;
            if (selectedTime === time) slot.classList.add('selected');

            slot.addEventListener('click', () => {
                const prev = timeGrid.querySelector('.time-slot.selected');
                if (prev) prev.classList.remove('selected');
                selectedTime = time;
                slot.classList.add('selected');

                // Show User Info Section
                userInfoSection.style.display = 'block';
                checkFormValidity();

                // Scroll to info section
                setTimeout(() => {
                    userInfoSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 50);
            });
            timeGrid.appendChild(slot);
        });
    }

    if (prevMonthBtn) prevMonthBtn.addEventListener('click', (e) => { e.preventDefault(); currentDate.setMonth(currentDate.getMonth() - 1); renderCalendar(); });
    if (nextMonthBtn) nextMonthBtn.addEventListener('click', (e) => { e.preventDefault(); currentDate.setMonth(currentDate.getMonth() + 1); renderCalendar(); });

    function checkFormValidity() {
        const isDateSelected = !!selectedDate;
        const isTimeSelected = !!selectedTime;
        const isNameFilled = userNameInput.value.trim().length > 0;
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmailInput.value);

        bookBtn.disabled = !(isDateSelected && isTimeSelected && isNameFilled && isEmailValid);
    }

    [userNameInput, userEmailInput].forEach(input => {
        if (input) {
            input.addEventListener('input', checkFormValidity);
        }
    });

    if (bookBtn) {
        bookBtn.addEventListener('click', async () => {
            if (!bookBtn.disabled) {
                const bookingData = {
                    name: userNameInput.value,
                    email: userEmailInput.value, // This is the customer's email
                    date: selectedDate.toDateString(),
                    time: selectedTime,
                    to_email: "anooj2255@gmail.com", // Your email for tracking
                    _subject: `New Meeting Request from ${userNameInput.value}`
                };

                bookBtn.textContent = "Processing...";
                bookBtn.disabled = true;

                const FORMSPREE_URL = "https://formspree.io/f/mwvvpvwl";

                try {
                    const response = await fetch(FORMSPREE_URL, {
                        method: 'POST',
                        body: JSON.stringify(bookingData),
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    });

                    if (response.ok) {
                        showSuccessMessage(bookingData);
                    } else {
                        throw new Error("Formspree error");
                    }
                } catch (e) {
                    console.error(e);
                    alert("Something went wrong. Please try again or email me directly at anooj2255@gmail.com");
                    bookBtn.textContent = "Confirm Booking";
                    bookBtn.disabled = false;
                }
            }
        });
    }

    function showSuccessMessage(data) {
        const card = document.querySelector('.booking-card');
        card.innerHTML = `
            <div style="text-align: center; padding: 40px 0; animation: fadeIn 0.6s ease-out;">
                <div style="width: 80px; height: 80px; background: rgba(0, 163, 255, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px;">
                    <i class="fas fa-check" style="color: #00a3ff; font-size: 32px;"></i>
                </div>
                <h2 style="margin-bottom: 12px; font-weight: 600;">Booking Received!</h2>
                <p style="color: #888; margin-bottom: 32px; line-height: 1.6;">
                    Thank you, <strong>${data.name}</strong>.<br>
                    I've received your request for <strong>${data.date}</strong> at <strong>${data.time}</strong>.<br>
                    A confirmation email will be sent to <strong>${data.email}</strong> shortly.
                </p>
                <button class="btn btn-primary" onclick="location.reload()" style="border-radius: 14px; padding: 14px 28px;">Close</button>
            </div>
        `;
    }

    // Modal Control Logic
    const calendarModal = document.getElementById('calendarModal');
    const openCalendarBtns = document.querySelectorAll('.open-calendar-btn');
    const closeCalendarBtn = document.getElementById('closeCalendar');

    if (calendarModal && openCalendarBtns.length > 0) {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.open-calendar-btn')) {
                e.preventDefault();
                calendarModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                renderCalendar(); // Initial render when opened
            }
        });

        const closeCalendar = () => {
            calendarModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (closeCalendarBtn) closeCalendarBtn.addEventListener('click', (e) => { e.preventDefault(); closeCalendar(); });
        calendarModal.addEventListener('click', (e) => { if (e.target === calendarModal) closeCalendar(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && calendarModal.classList.contains('active')) closeCalendar(); });
    }
});
