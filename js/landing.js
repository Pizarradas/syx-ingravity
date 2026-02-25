/**
 * landing.js — INGRAVITY Landing Page Interactions
 * ==========================================================
 * Covers:
 *   1. GSAP scroll-reveal animations (respects prefers-reduced-motion)
 *   2. Wishlist toggle (aria-pressed + class state)
 *   3. Size-picker selection (aria-pressed + is-active state)
 * ==========================================================
 * Loaded via: <script src="js/landing.js" defer></script>
 */

(function () {
  'use strict';

  // ── 1. GSAP Animations ─────────────────────────────────────────────────────
  // Respect prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced && typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Header reveal
    gsap.from('[data-gsap="header-reveal"]', {
      yPercent: -100,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out'
    });

    // Hero sequence
    const heroTl = gsap.timeline({ delay: 0.2 });
    heroTl
      .from('.org-ingravity-hero__pill', { y: 24, opacity: 0, duration: 0.5 })
      .from('.org-ingravity-hero__headline', { y: 48, opacity: 0, duration: 0.7, stagger: 0 }, '-=0.2')
      .from('.org-ingravity-hero__lead', { y: 24, opacity: 0, duration: 0.5 }, '-=0.4')
      .from('.org-ingravity-hero__ctas', { y: 20, opacity: 0, duration: 0.45 }, '-=0.3')
      .from('.org-ingravity-hero__social-proof', { y: 16, opacity: 0, duration: 0.4 }, '-=0.25')
      .from('[data-gsap="hero-visual"]', { x: 60, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.8')
      .from('.org-ingravity-hero__float-badge', { scale: 0.6, opacity: 0, duration: 0.45, ease: 'back.out(1.6)' }, '-=0.2');

    // Stat counters
    gsap.utils.toArray('[data-count]').forEach(function (el) {
      const target = +el.dataset.count;
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: function () {
          gsap.fromTo({ val: 0 },
            { val: target },
            {
              val: target,
              duration: 2,
              ease: 'power2.out',
              onUpdate: function () {
                el.textContent = Math.round(this.targets()[0].val).toLocaleString('es-ES') + '+';
              }
            }
          );
        }
      });
    });

    // Category grid stagger
    gsap.from('[data-gsap="cat-card"]', {
      y: 60, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out',
      scrollTrigger: { trigger: '[data-gsap="cat-grid"]', start: 'top 80%' }
    });

    // Product cards stagger
    gsap.from('[data-gsap="product-card"]', {
      y: 50, opacity: 0, duration: 0.55, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: '[data-gsap="product-grid"]', start: 'top 80%' }
    });

    // Manifesto
    gsap.from('.org-ingravity-manifesto__quote', {
      y: 80, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.org-ingravity-manifesto', start: 'top 70%' }
    });

    // CTA drop
    gsap.from('.org-ingravity-cta-drop__title', {
      scale: 0.85, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.org-ingravity-cta-drop', start: 'top 75%' }
    });

    // General scroll reveals (stats)
    gsap.utils.toArray('.mol-ingravity-stat').forEach(function (el) {
      gsap.from(el, {
        y: 30, opacity: 0, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });
  }

  // ── 2. Wishlist toggle ─────────────────────────────────────────────────────
  document.querySelectorAll('.atom-ingravity-wishlist').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var active = this.getAttribute('aria-pressed') === 'true';
      this.setAttribute('aria-pressed', (!active).toString());
      this.classList.toggle('is-active', !active);
      this.textContent = active ? '♡' : '♥';
      this.setAttribute('aria-label',
        (active ? 'Añadir' : 'Quitar') + ' de favoritos'
      );
    });
  });

  // ── 3. Size-picker selection ───────────────────────────────────────────────
  document.querySelectorAll('.atom-ingravity-sizepicker').forEach(function (picker) {
    picker.addEventListener('click', function (e) {
      var btn = e.target.closest('.atom-ingravity-sizepicker__btn');
      if (!btn || btn.disabled) return;
      picker.querySelectorAll('.atom-ingravity-sizepicker__btn').forEach(function (b) {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');
    });
  });

}());
