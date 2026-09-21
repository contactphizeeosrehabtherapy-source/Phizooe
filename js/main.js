/**
 * PhiZeeo - Master JavaScript Controller
 * Interactive Navigation, Testimonials Carousel, Scroll Animations, & WhatsApp Booking Form
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initTestimonialsCarousel();
  initScrollAnimations();
  initContactForm();
  initDoctorModal();
});

/* --------------------------------------------------------------------------
   5. Doctor Details Modal Controller
   -------------------------------------------------------------------------- */
function initDoctorModal() {
  const doctorsData = {
    zee: {
      name: "Dr. Zeenith VR (PT)",
      role: "Rehabilitation Specialist",
      img: "https://www.phizeeo.com/zeedr.png",
      bio: "Dr. Zeenith VR has practiced home-visit physiotherapy in Chennai since 2017. He specializes in comprehensive physical evaluation, orthopedic rehabilitation, neurological recovery (including post-stroke and paralysis therapy), and acute & chronic pain management.",
      whatsappMsg: "Hi Dr. Zeenith VR, I'd like to book a home physio consultation."
    },
    ramya: {
      name: "Dr. Ramya Josephine (PT)",
      role: "Women's Health Physio",
      img: "https://www.phizeeo.com/jdr.jpg",
      bio: "Dr. Ramya Josephine specializes in post-surgery physical rehabilitation, geriatric care, stroke recovery therapy, and dedicated women's health physiotherapy. She delivers gentle, expert home visits designed for long-term mobility and wellness.",
      whatsappMsg: "Hi Dr. Ramya Josephine, I'd like to book a home physio consultation."
    }
  };

  const modalOverlay = document.getElementById('doctorModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const detailBtns = document.querySelectorAll('.specialist-btn[data-doctor]');

  if (!modalOverlay) return;

  detailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const docKey = btn.getAttribute('data-doctor');
      const doc = doctorsData[docKey];
      if (doc) {
        document.getElementById('modalAvatar').src = doc.img;
        document.getElementById('modalDoctorName').textContent = doc.name;
        document.getElementById('modalDoctorRole').textContent = doc.role;
        document.getElementById('modalDoctorBio').textContent = doc.bio;
        
        const modalBookingLink = document.getElementById('modalBookingLink');
        if (modalBookingLink) {
          modalBookingLink.href = `https://wa.me/919360447385?text=${encodeURIComponent(doc.whatsappMsg)}`;
        }

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   1. Navigation & Mobile Drawer Controller
   -------------------------------------------------------------------------- */
function initNavigation() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  function openMobileMenu() {
    mobileNav.classList.add('open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    hamburgerBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>`;
  }

  function closeMobileMenu() {
    mobileNav.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    hamburgerBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>`;
  }

  // Highlight Active Page in Navbars & Bottom Tabbar
  const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-links a, .tab-item');
  allNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* --------------------------------------------------------------------------
   2. Testimonials Carousel
   -------------------------------------------------------------------------- */
function initTestimonialsCarousel() {
  const track = document.getElementById('carouselTrack');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsContainer = document.getElementById('carouselDots');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const slideCount = slides.length;

  // Create dot indicators dynamically if container exists
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });
  }

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update dots
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function goToSlide(index) {
    currentIndex = (index + slideCount) % slideCount;
    updateCarousel();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
  }

  // Touch Swipe Support for mobile
  let startX = 0;
  let endX = 0;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToSlide(currentIndex + 1); // Swipe left
      } else {
        goToSlide(currentIndex - 1); // Swipe right
      }
    }
  }
}

/* --------------------------------------------------------------------------
   3. Scroll Reveal Animations (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const fadeUpElements = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeUpElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver
    fadeUpElements.forEach(el => el.classList.add('visible'));
  }
}

/* --------------------------------------------------------------------------
   4. Contact Form Validation & WhatsApp Integration
   -------------------------------------------------------------------------- */
function initContactForm() {
  const bookingForm = document.getElementById('bookingForm');
  const formStatus = document.getElementById('formStatus');
  const serviceSelect = document.getElementById('serviceSelect');

  if (!bookingForm) return;

  // Auto-select service if passed via URL parameter (e.g. contact.html?service=Orthopedic%20Rehab)
  const urlParams = new URLSearchParams(window.location.search);
  const preselectedService = urlParams.get('service');
  if (preselectedService && serviceSelect) {
    const targetDecoded = decodeURIComponent(preselectedService).toLowerCase();
    for (let opt of serviceSelect.options) {
      if (opt.value.toLowerCase() === targetDecoded || opt.text.toLowerCase().includes(targetDecoded)) {
        opt.selected = true;
        break;
      }
    }
  }

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phoneNumber').value.trim();
    const service = serviceSelect.value;
    const date = document.getElementById('preferredDate').value;
    const message = document.getElementById('userMessage').value.trim();

    if (!name || !phone || !service || !date) {
      showStatus('Please fill in all required fields (*).', 'error');
      return;
    }

    // Format WhatsApp prefilled message
    const formattedMessage = 
      `Hi PhiZeeo, I'd like to book a home physio visit.\n\n` +
      `*Full Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Service Required:* ${service}\n` +
      `*Preferred Date:* ${date}` +
      (message ? `\n*Notes/Message:* ${message}` : '');

    const encodedText = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/919360447385?text=${encodedText}`;

    showStatus('Opening WhatsApp with your appointment request...', 'success');

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 800);
  });

  function showStatus(msg, type) {
    if (!formStatus) return;
    formStatus.textContent = msg;
    formStatus.className = `form-status ${type}`;
  }
}
