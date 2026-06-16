// ─── NAVBAR SCROLL SHADOW ───
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  });
}

// ─── HAMBURGER MENU ───
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
}

// ─── ACTIVE NAV LINK ───
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-menu a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ─── SCROLL REVEAL ───
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => revealObserver.observe(el));
}

// ─── COUNTER ANIMATION ───
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 2000;
  let startTime = null;
  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString('tr-TR');
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString('tr-TR');
  };
  requestAnimationFrame(step);
}
const counters = document.querySelectorAll('.counter');
if (counters.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));
}

// ─── TESTIMONIAL SLIDER ───
const testimonials = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.slider-dot');
let activeIdx = 0;
function showTestimonial(idx) {
  testimonials.forEach((t, i) => {
    t.style.opacity = i === idx ? '1' : '0';
    t.style.transform = i === idx ? 'translateX(0)' : 'translateX(40px)';
    t.style.pointerEvents = i === idx ? 'auto' : 'none';
  });
  dots.forEach((d, i) => {
    d.classList.toggle('active', i === idx);
  });
  activeIdx = idx;
}
if (testimonials.length) {
  testimonials.forEach(t => { t.style.transition = 'opacity .6s ease, transform .6s ease'; });
  showTestimonial(0);
  dots.forEach((dot, i) => dot.addEventListener('click', () => showTestimonial(i)));
  setInterval(() => showTestimonial((activeIdx + 1) % testimonials.length), 5000);
}

// ─── PRODUCT TABS ───
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById('tab-' + target);
    if (panel) {
      panel.classList.add('active');
      panel.style.animation = 'fadeSlide .4s ease';
    }
  });
});

// ─── NEWS CATEGORY FILTER ───
const filterBtns = document.querySelectorAll('.filter-btn');
const newsCards = document.querySelectorAll('.news-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const cat = btn.dataset.cat;
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    newsCards.forEach(card => {
      const match = cat === 'Tümü' || card.dataset.cat === cat;
      card.style.display = match ? 'flex' : 'none';
    });
  });
});

// ─── NEWS SEARCH ───
const newsSearch = document.getElementById('news-search');
if (newsSearch) {
  newsSearch.addEventListener('input', () => {
    const q = newsSearch.value.toLowerCase();
    newsCards.forEach(card => {
      const txt = card.textContent.toLowerCase();
      card.style.display = txt.includes(q) ? 'flex' : 'none';
    });
  });
}

// ─── CAREER ACCORDION ───
document.querySelectorAll('.accordion-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.accordion-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ─── CONTACT FORM ───
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    contactForm.querySelectorAll('[required]').forEach(field => {
      const group = field.closest('.form-group');
      group.classList.remove('error');
      if (!field.value.trim()) {
        group.classList.add('error');
        valid = false;
      }
    });

    const emailField = contactForm.querySelector('[type="email"]');
    if (emailField && emailField.value) {
      const emailGroup = emailField.closest('.form-group');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
        emailGroup.classList.add('error');
        valid = false;
      }
    }

    if (valid) {
      contactForm.style.display = 'none';
      if (formSuccess) {
        formSuccess.classList.add('show');
        setTimeout(() => {
          formSuccess.classList.remove('show');
          contactForm.style.display = 'block';
          contactForm.reset();
        }, 6000);
      }
    }
  });
}
