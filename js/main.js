/* ============================================
   FliReel — Main JavaScript
   Handles: scroll animations, mobile menu,
   header state, and interactive elements
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Scroll Fade-In Animations ---------- */
  const fadeEls = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeEls.forEach((el) => observer.observe(el));

  /* ---------- Sticky Header Background ---------- */
  const header = document.getElementById('header');

  const onScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Set initial state

  /* ---------- Mobile Hamburger Menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  // Create overlay element for mobile menu
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  const toggleMenu = () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  /* ---------- Active Nav Link Highlighting ---------- */
  const sections = document.querySelectorAll('section[id]');

  const highlightNav = () => {
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (!link) return;

      if (scrollPos >= top && scrollPos < top + height) {
        link.style.color = 'var(--color-accent)';
      } else {
        link.style.color = '';
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  /* ---------- Waitlist Form ---------- */
  const waitlistForm = document.querySelector('.waitlist-form');

  if (waitlistForm) {
    waitlistForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = waitlistForm.querySelector('input');
      const btn = waitlistForm.querySelector('button');

      if (input.value.trim()) {
        btn.textContent = 'Joined!';
        btn.style.background = 'var(--color-accent)';
        input.value = '';
        input.disabled = true;
        btn.disabled = true;

        setTimeout(() => {
          btn.textContent = 'Join';
          input.disabled = false;
          btn.disabled = false;
        }, 3000);
      }
    });
  }

  /* ---------- Staggered Fade-In for Grid Items ---------- */
  // Add staggered delays to cards within grids
  const staggerContainers = [
    '.steps-grid',
    '.sports-grid',
    '.pricing-grid'
  ];

  staggerContainers.forEach((selector) => {
    const container = document.querySelector(selector);
    if (!container) return;

    const cards = container.querySelectorAll('.fade-in');
    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 0.1}s`;
    });
  });
});
