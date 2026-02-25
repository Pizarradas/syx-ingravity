/**
 * plp.js — INGRAVITY Product Listing Page Interactions
 * ==========================================================
 * Covers:
 *   1. GSAP scroll-reveal animations (respects prefers-reduced-motion)
 *   2. Wishlist toggle (aria-pressed + icon swap)
 *   3. Size-picker selection
 *   4. Mobile filter drawer (open / close / overlay)
 *   5. Grid ↔ list view toggle
 *   6. Active filter pill removal
 * ==========================================================
 * Loaded via: <script src="js/plp.js" defer></script>
 */

(function () {
  'use strict';

  var pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── 1. GSAP Animations ─────────────────────────────────────────────────────
  if (!pref && typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.page-ingravity-plp__page-title', { y: 32, opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.1 });
    gsap.from('[data-gsap="product-card"]', {
      y: 50, opacity: 0, duration: 0.55, stagger: 0.07, ease: 'power2.out',
      scrollTrigger: { trigger: '[data-gsap="product-grid"]', start: 'top 85%' }
    });
  }

  // ── 2. Wishlist toggle ─────────────────────────────────────────────────────
  document.querySelectorAll('.atom-ingravity-wishlist').forEach(function (b) {
    b.addEventListener('click', function () {
      var a = this.getAttribute('aria-pressed') === 'true';
      this.setAttribute('aria-pressed', (!a).toString());
      this.setAttribute('aria-label', a ? 'Añadir a favoritos' : 'Quitar de favoritos');
      this.classList.toggle('is-active', !a);
      var icon = this.querySelector('.atom-icon');
      if (icon) {
        icon.classList.toggle('atom-icon--ui-heart', a);
        icon.classList.toggle('atom-icon--ui-heart-filled', !a);
      }
    });
  });

  // ── 3. Size-picker selection ───────────────────────────────────────────────
  document.querySelectorAll('.atom-ingravity-sizepicker').forEach(function (p) {
    p.addEventListener('click', function (e) {
      var b = e.target.closest('.atom-ingravity-sizepicker__btn');
      if (!b || b.disabled) return;
      p.querySelectorAll('.atom-ingravity-sizepicker__btn').forEach(function (x) {
        x.classList.remove('is-active');
        x.removeAttribute('aria-pressed');
      });
      b.classList.add('is-active');
      b.setAttribute('aria-pressed', 'true');
    });
  });

  // ── 4. Mobile filter drawer ────────────────────────────────────────────────
  var drawer = document.getElementById('filter-drawer');
  var overlay = document.getElementById('drawer-overlay');

  function openDrawer() { if (drawer) drawer.classList.add('is-open'); }
  function closeDrawer() { if (drawer) drawer.classList.remove('is-open'); }

  document.getElementById('btn-filters-mobile')?.addEventListener('click', openDrawer);
  document.getElementById('btn-close-drawer')?.addEventListener('click', closeDrawer);
  document.getElementById('btn-apply-filters')?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);

  // ── 5. Grid ↔ list view toggle ─────────────────────────────────────────────
  var grid = document.getElementById('product-grid');
  var viewBtns = document.querySelectorAll('.org-ingravity-plp-toolbar__view-toggle button');

  viewBtns.forEach(function (btn, i) {
    btn.addEventListener('click', function () {
      viewBtns.forEach(function (b) {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');
      if (grid) {
        grid.classList.toggle('org-ingravity-product-grid--list', i !== 0);
      }
    });
  });

  // ── 6. Active filter pill removal ─────────────────────────────────────────
  document.querySelectorAll('.org-ingravity-plp-toolbar__pill-remove').forEach(function (btn) {
    btn.addEventListener('click', function () {
      this.closest('.atom-pill')?.remove();
    });
  });

}());
