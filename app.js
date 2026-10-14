/**
 * RAFI — SOFTWARE ENGINEER PORTFOLIO
 * Powered by Lenis smooth inertial scrolling & Newton Yuan interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  const lenis = initSmoothScroll();
  initSiteNav(lenis);
  initNavContrastObserver();
  initExperienceTimeline();
  initProjectsStepper();
  initProjectsPanelCursor();
  initCustomScrollbar(lenis);
  initContactForm();
});

/* ===================================================================
   1. LENIS INERTIAL SMOOTH SCROLLING
   =================================================================== */
function initSmoothScroll() {
  if (typeof Lenis === 'undefined') {
    console.warn('Lenis not available, fallback to native smooth scroll.');
    return null;
  }

  const lenis = new Lenis({
    autoRaf: true,
    smoothWheel: true,
    syncTouch: false,
    lerp: 0.085,
    wheelMultiplier: 0.8,
  });

  window.lenis = lenis;

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl, {
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    });
  });

  return lenis;
}

/* ===================================================================
   2. SITE NAVIGATION & RIGHT DRAWER
   =================================================================== */
function initSiteNav(lenis) {
  const toggleBtn = document.getElementById('site-nav-toggle');
  const drawer = document.getElementById('site-nav-drawer');
  const overlay = document.getElementById('site-nav-overlay');
  const navLinks = document.querySelectorAll('.site-nav-link');
  const activeDot = document.getElementById('site-nav-active-dot');

  if (!toggleBtn || !drawer || !overlay) return;

  function openNav() {
    toggleBtn.classList.add('is-open');
    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    if (lenis) lenis.stop();
    updateActiveDot();
  }

  function closeNav() {
    toggleBtn.classList.remove('is-open');
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    if (lenis) lenis.start();
  }

  function toggleNav() {
    if (drawer.classList.contains('is-open')) {
      closeNav();
    } else {
      openNav();
    }
  }

  toggleBtn.addEventListener('click', toggleNav);
  overlay.addEventListener('click', closeNav);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('is-active', 'is-indicator-target'));
      link.classList.add('is-active', 'is-indicator-target');
      updateActiveDot();
      closeNav();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeNav();
    }
  });

  function updateActiveDot() {
    const activeLink = document.querySelector('.site-nav-link.is-active') || navLinks[0];
    if (activeLink && activeDot) {
      const topOffset = activeLink.offsetTop;
      const height = activeLink.offsetHeight;
      activeDot.style.transform = `translateY(${topOffset + (height / 2) - 9}px)`;
    }
  }

  // Update active section on scroll
  const sections = Array.from(document.querySelectorAll('section[id]'));
  function trackScrollSection() {
    const scrollPos = window.scrollY + window.innerHeight * 0.35;
    let currentId = 'center';

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.id;
      }
    });

    navLinks.forEach(link => {
      const secTarget = link.getAttribute('data-section');
      if (secTarget === currentId) {
        link.classList.add('is-active', 'is-indicator-target');
      } else {
        link.classList.remove('is-active', 'is-indicator-target');
      }
    });

    if (drawer.classList.contains('is-open')) {
      updateActiveDot();
    }
  }

  window.addEventListener('scroll', trackScrollSection, { passive: true });
  setTimeout(updateActiveDot, 200);
}

/* ===================================================================
   3. TOGGLE BUTTON CONTRAST OBSERVER
   =================================================================== */
function initNavContrastObserver() {
  const toggleBtn = document.getElementById('site-nav-toggle');
  if (!toggleBtn) return;

  const spans = Array.from(toggleBtn.querySelectorAll('span'));
  const lightSections = Array.from(document.querySelectorAll('#statement, #experience, #contact'));

  function updateContrast() {
    const triggerY = 70;
    let isOverLight = false;

    lightSections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= triggerY && rect.bottom >= triggerY) {
        isOverLight = true;
      }
    });

    spans.forEach(span => {
      if (isOverLight) {
        span.classList.remove('is-on-dark');
        span.classList.add('is-on-light');
      } else {
        span.classList.remove('is-on-light');
        span.classList.add('is-on-dark');
      }
    });
  }

  window.addEventListener('scroll', updateContrast, { passive: true });
  window.addEventListener('resize', updateContrast, { passive: true });
  updateContrast();
}

/* ===================================================================
   4. EXPERIENCE TIMELINE PROGRESS MARKER
   =================================================================== */
function initExperienceTimeline() {
  const section = document.getElementById('experience');
  const marker = document.getElementById('experience-progress-marker');
  const items = Array.from(document.querySelectorAll('.experience-item'));
  const years = Array.from(document.querySelectorAll('.experience-year'));

  if (!section || !marker || !items.length) return;

  function updateTimeline() {
    const rect = section.getBoundingClientRect();
    const viewportMiddle = window.innerHeight * 0.5;

    if (rect.top <= viewportMiddle && rect.bottom >= viewportMiddle) {
      let activeIdx = 0;
      items.forEach((item, idx) => {
        const itemRect = item.getBoundingClientRect();
        if (itemRect.top <= viewportMiddle) {
          activeIdx = idx;
        }
      });

      years.forEach((y, idx) => {
        if (idx === activeIdx) {
          y.classList.add('is-active');
        } else {
          y.classList.remove('is-active');
        }
      });

      const activeItem = items[activeIdx];
      const yearEl = activeItem.querySelector('.experience-year');
      if (yearEl) {
        const timelineEl = section.querySelector('.experience-timeline');
        const timelineRect = timelineEl.getBoundingClientRect();
        const yearRect = yearEl.getBoundingClientRect();
        const relativeTop = yearRect.top - timelineRect.top + (yearRect.height / 2);
        marker.style.top = `${relativeTop}px`;
        marker.classList.remove('is-obscured');
      }
    } else {
      marker.classList.add('is-obscured');
    }
  }

  window.addEventListener('scroll', updateTimeline, { passive: true });
  window.addEventListener('resize', updateTimeline, { passive: true });
  updateTimeline();
}

/* ===================================================================
   5. PINNED PROJECTS STEPPER & ROLLING COUNTER
   =================================================================== */
function initProjectsStepper() {
  const section = document.getElementById('projects');
  const steps = Array.from(document.querySelectorAll('.projects-scroll-step'));
  const tabs = Array.from(document.querySelectorAll('.project-tab'));
  const digitTrack = document.getElementById('project-digit-track');
  const digitPrev = document.getElementById('project-digit-prev');
  const digitCurr = document.getElementById('project-digit-curr');

  if (!section || !steps.length || !tabs.length) return;

  let currentIndex = 0;

  function updateStepper() {
    const triggerLine = window.innerHeight * 0.5;
    let targetIndex = 0;

    steps.forEach((step, idx) => {
      const rect = step.getBoundingClientRect();
      if (rect.top <= triggerLine) {
        targetIndex = idx;
      }
    });

    targetIndex = Math.max(0, Math.min(tabs.length - 1, targetIndex));

    if (targetIndex !== currentIndex) {
      const isForward = targetIndex > currentIndex;
      const oldIndex = currentIndex;
      currentIndex = targetIndex;

      tabs.forEach((tab, idx) => {
        if (idx === currentIndex) {
          tab.style.display = 'grid';
          tab.classList.remove('project-tab-transition-forward', 'project-tab-transition-backward');
          void tab.offsetWidth;
          tab.classList.add('is-active', isForward ? 'project-tab-transition-forward' : 'project-tab-transition-backward');
        } else {
          tab.style.display = 'none';
          tab.classList.remove('is-active', 'project-tab-transition-forward', 'project-tab-transition-backward');
        }
      });

      if (digitTrack && digitPrev && digitCurr) {
        digitTrack.classList.remove('is-forward', 'is-backward');
        void digitTrack.offsetWidth;
        if (isForward) {
          digitPrev.textContent = oldIndex + 1;
          digitCurr.textContent = currentIndex + 1;
          digitTrack.classList.add('is-forward');
        } else {
          digitPrev.textContent = currentIndex + 1;
          digitCurr.textContent = oldIndex + 1;
          digitTrack.classList.add('is-backward');
        }
      }
    }
  }

  window.addEventListener('scroll', updateStepper, { passive: true });
  window.addEventListener('resize', updateStepper, { passive: true });
  updateStepper();
}

/* ===================================================================
   6. PROJECTS PANEL HOVER CURSOR
   =================================================================== */
function initProjectsPanelCursor() {
  const panels = document.querySelectorAll('.projects-panel');
  panels.forEach(panel => {
    const cursor = panel.querySelector('.projects-panel-cursor');
    if (!cursor) return;

    panel.addEventListener('mousemove', (e) => {
      const rect = panel.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      panel.style.setProperty('--projects-cursor-x', `${x}px`);
      panel.style.setProperty('--projects-cursor-y', `${y}px`);
      cursor.classList.add('is-visible');
    });

    panel.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-visible');
    });
  });
}

/* ===================================================================
   7. CUSTOM RIGHT SCROLLBAR
   =================================================================== */
function initCustomScrollbar(lenis) {
  const scrollbar = document.getElementById('custom-scrollbar');
  const track = document.getElementById('custom-scrollbar-track');
  const thumb = document.getElementById('custom-scrollbar-thumb');

  if (!scrollbar || !track || !thumb) return;

  function updateThumb() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;

    const progress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
    const trackHeight = track.clientHeight;
    const thumbHeight = Math.max(36, (window.innerHeight / document.documentElement.scrollHeight) * trackHeight);
    thumb.style.height = `${thumbHeight}px`;

    const availableTrack = trackHeight - thumbHeight;
    const thumbTop = progress * availableTrack;
    thumb.style.top = `${thumbTop}px`;
  }

  window.addEventListener('scroll', updateThumb, { passive: true });
  window.addEventListener('resize', updateThumb, { passive: true });
  updateThumb();

  track.addEventListener('click', (e) => {
    if (e.target === thumb) return;
    const trackRect = track.getBoundingClientRect();
    const clickY = e.clientY - trackRect.top;
    const ratio = clickY / trackRect.height;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = ratio * maxScroll;

    if (lenis) {
      lenis.scrollTo(targetScroll, { duration: 0.8 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  });
}

/* ===================================================================
   8. CONTACT FORM INTERACTION
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');
  const statusEl = document.getElementById('contact-status');

  if (!form || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btnSpan = submitBtn.querySelector('span');
    if (btnSpan) btnSpan.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      if (btnSpan) btnSpan.textContent = 'Sent!';
      form.reset();
      if (statusEl) {
        statusEl.textContent = 'Message sent successfully.';
        statusEl.style.display = 'block';
      }
      setTimeout(() => {
        if (btnSpan) btnSpan.textContent = 'Send';
        submitBtn.disabled = false;
        if (statusEl) statusEl.style.display = 'none';
      }, 4000);
    }, 900);
  });
}
