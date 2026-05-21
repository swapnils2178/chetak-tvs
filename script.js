/* =========================================================
   Chetak Automobiles LLP — Interactive Script
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Year ---------- */
  document.getElementById('yr').textContent = new Date().getFullYear();

  /* ---------- AOS init ---------- */
  if (window.AOS) AOS.init({ duration: 900, easing: 'ease-out-cubic', once: true, offset: 60 });

  /* ---------- Navbar scroll ---------- */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  const toTop = document.getElementById('toTop');

  const onScroll = () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 40);
    toTop.classList.toggle('show', y > 500);

    let current = '';
    sections.forEach(s => {
      if (y >= s.offsetTop - 200) current = s.id;
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Hamburger ---------- */
  const burger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
  }));

  /* ---------- Hero particles ---------- */
  const particleBox = document.getElementById('particles');
  const PARTICLES = window.innerWidth < 768 ? 14 : 28;
  for (let i = 0; i < PARTICLES; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (8 + Math.random() * 10) + 's';
    p.style.animationDelay = -Math.random() * 12 + 's';
    p.style.opacity = (0.2 + Math.random() * 0.6).toFixed(2);
    p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
    particleBox.appendChild(p);
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('.counter');
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.target;
      let n = 0;
      const step = Math.max(1, Math.floor(target / 80));
      const tick = () => {
        n += step;
        if (n >= target) { el.textContent = target.toLocaleString() + '+'; return; }
        el.textContent = n.toLocaleString();
        requestAnimationFrame(tick);
      };
      tick();
      counterObs.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(c => counterObs.observe(c));

  /* ---------- Vehicles data ---------- */
  const VEHICLES = [
    { name:'Apache RTR 310', tag:'Performance', desc:'Track-bred power. Street-ready refinement.',
      img:'images/products/apache.jpeg',
      mileage:'35 kmpl', engine:'312.12cc, Liquid-cooled', power:'35.6 PS @ 9700 rpm' },
    { name:'TVS Raider 125', tag:'Sporty', desc:'Bold styling with smart digital console.',
      img:'images/products/raider.jpeg',
      mileage:'57 kmpl', engine:'124.8cc, Air/Oil-cooled', power:'11.2 PS @ 7500 rpm' },
    { name:'TVS Jupiter 125', tag:'Family', desc:'India\'s most loved family scooter, reimagined.',
      img:'images/products/jupiter.jpeg',
      mileage:'57 kmpl', engine:'124.8cc, Air-cooled', power:'8.56 PS @ 6500 rpm' },
    { name:'TVS Ntorq 125', tag:'Smart', desc:'Race-inspired styling. Connected riding.',
      img:'images/products/ntor.jpeg',
      mileage:'50 kmpl', engine:'124.8cc, CVTi engine', power:'9.5 PS @ 7000 rpm' },
    { name:'TVS iQube Electric', tag:'Electric', desc:'Smart. Silent. Sustainable.',
      img:'images/products/iqube.jpeg',
      mileage:'145 km', engine:'Electric Motor', power:'4.4 kW peak power' },
    { name:'TVS Ronin', tag:'Cruiser', desc:'A modern roadster with timeless soul.',
      img:'images/products/roni.jpeg',
      mileage:'40 kmpl', engine:'225.9cc, Oil-cooled', power:'20.4 PS @ 7750 rpm' },
    { name:'TVS Sport', tag:'Commuter', desc:'Maximum mileage for daily commute.',
      img:'images/products/tvs_sport.jpeg',
      mileage:'73 kmpl', engine:'109.7cc, Air-cooled', power:'8.29 PS @ 7350 rpm' },
  ];

  const grid = document.getElementById('vehicleGrid');
  grid.innerHTML = VEHICLES.map(v => `
    <div class="swiper-slide">
      <article class="vehicle-card">
        <div class="vc-img">
          <span class="vc-tag">${v.tag}</span>
          <img loading="lazy" src="${v.img}" alt="${v.name}"/>
        </div>
        <div class="vc-body">
          <h3>${v.name}</h3>
          <p class="desc">${v.desc}</p>
          <div class="vc-specs">
            <div><strong>${v.mileage}</strong><span>Mileage</span></div>
            <div><strong>${v.engine}</strong><span>Engine</span></div>
            <div><strong>${v.power}</strong><span>Power</span></div>
          </div>
          <div class="vc-cta">
            <a href="#contact">Book Test Ride →</a>
          </div>
        </div>
      </article>
    </div>`).join('');

  if (window.Swiper) {
    new Swiper('.vehicleSwiper', {
      slidesPerView: 1.1, spaceBetween: 20, grabCursor: true,
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 22 },
        1024:{ slidesPerView: 3, spaceBetween: 26 },
      }
    });
  }

  /* ---------- Lightbox ---------- */
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  document.querySelectorAll('.m-item').forEach(item => {
    item.addEventListener('click', () => {
      lbImg.src = item.querySelector('img').src;
      lb.classList.add('active');
    });
  });
  lb.addEventListener('click', e => {
    if (e.target === lb || e.target.classList.contains('lb-close')) lb.classList.remove('active');
  });

  /* ---------- Tabs ---------- */
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t === tab));
      document.querySelectorAll('.pro-form').forEach(f => f.classList.toggle('active', f.dataset.form === target));
    });
  });

  /* ---------- Ripple ---------- */
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', e => {
      const r = document.createElement('span');
      r.className = 'r';
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      r.style.width = r.style.height = size + 'px';
      r.style.left = (e.clientX - rect.left - size/2) + 'px';
      r.style.top = (e.clientY - rect.top - size/2) + 'px';
      btn.appendChild(r);
      setTimeout(() => r.remove(), 600);
    });
  });

  /* =========================================================
     EMAILJS FORM HANDLING
     ---------------------------------------------------------
     SETUP:
     1) Create a free account at https://www.emailjs.com/
     2) Add an Email Service (Gmail) connected to Chetaktvs@gmail.com
     3) Create TWO email templates:
          - template_inquiry    (variables: name, phone, email, vehicle, message)
          - template_complaint  (variables: name, phone, vehicle_number, complaint_type, message)
     4) Copy your Public Key, Service ID and Template IDs and paste below.
     5) That's it — forms will start sending emails to Chetaktvs@gmail.com
  ========================================================= */
  const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY',
    SERVICE_ID: 'YOUR_SERVICE_ID',
    TEMPLATE_INQUIRY:  'template_inquiry',
    TEMPLATE_COMPLAINT:'template_complaint',
  };

  if (window.emailjs && EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init({ publicKey: EMAILJS_CONFIG.PUBLIC_KEY });
  }

  const handleForm = (form, templateId) => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      status.className = 'form-status';
      status.textContent = '';

      // simple validation
      let valid = true;
      form.querySelectorAll('[required]').forEach(input => {
        const ok = input.checkValidity() && input.value.trim() !== '';
        input.parentElement.classList.toggle('invalid', !ok);
        if (!ok) valid = false;
      });
      if (!valid) {
        status.textContent = 'Please fill all fields correctly.';
        status.classList.add('err');
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      try {
        if (window.emailjs && EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
          await emailjs.sendForm(EMAILJS_CONFIG.SERVICE_ID, templateId, form);
        } else {
          // Fallback: simulate success so UI is testable before EmailJS keys are added
          await new Promise(r => setTimeout(r, 900));
          console.info('[Demo Mode] Configure EmailJS keys in script.js to send real emails.');
        }
        status.textContent = '✓ Thank you! We will get back to you shortly.';
        status.classList.add('ok');
        form.reset();
      } catch (err) {
        console.error(err);
        status.textContent = 'Something went wrong. Please try again or call us directly.';
        status.classList.add('err');
      } finally {
        btn.textContent = original;
        btn.disabled = false;
      }
    });
  };

  handleForm(document.getElementById('inquiryForm'),   EMAILJS_CONFIG.TEMPLATE_INQUIRY);
  handleForm(document.getElementById('complaintForm'), EMAILJS_CONFIG.TEMPLATE_COMPLAINT);

});
