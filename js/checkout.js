/**
 * checkout.js — INGRAVITY Checkout Page Interactions
 * ==========================================================
 * Covers:
 *   1. GSAP entrance animations (respects prefers-reduced-motion)
 *   2. Multi-step checkout navigation (goToStep)
 *   3. Coupon code validation (COURT20)
 *   4. Payment method tab switching
 *   5. Delivery option selection
 *   6. Cart item quantity buttons (±1, clamped 1–10)
 * ==========================================================
 * Loaded via: <script src="js/checkout.js" defer></script>
 */

(function () {
  'use strict';

  var pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── 1. GSAP entrance animations ────────────────────────────────────────────
  if (!pref && typeof gsap !== 'undefined') {
    gsap.from('.org-ingravity-checkout-panel', {
      y: 30, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.15
    });
    gsap.from('.org-ingravity-order-summary', {
      x: 30, opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.2
    });
  }

  // ── 2. Multi-step checkout ─────────────────────────────────────────────────
  var currentStep = 2;

  function goToStep(step) {
    currentStep = step;
    var pct = { 2: '33%', 3: '66%', 4: '100%' }[step] || '33%';
    var progressFill = document.getElementById('progress-fill');
    if (progressFill) progressFill.style.width = pct;

    [2, 3, 4].forEach(function (s) {
      var si = document.getElementById('step-indicator-' + s);
      if (!si) return;
      si.classList.remove('is-active', 'is-done');
      if (s < step) si.classList.add('is-done');
      else if (s === step) si.classList.add('is-active');
      var num = si.querySelector('.mol-ingravity-step__num');
      if (num) num.textContent = (s < step) ? '✓' : s;
    });

    [['divider-2-3', 3], ['divider-3-4', 4]].forEach(function (pair) {
      var el = document.getElementById(pair[0]);
      if (!el) return;
      if (step >= pair[1]) el.classList.add('is-done');
      else el.classList.remove('is-done');
    });

    var panels = {
      2: document.getElementById('panel-datos'),
      3: document.getElementById('panel-pago'),
      4: document.getElementById('confirmation-screen')
    };

    Object.entries(panels).forEach(function (arr) {
      var s = parseInt(arr[0]), panel = arr[1];
      if (!panel) return;
      panel.classList.remove('is-active');
      panel.hidden = (s !== step);
    });

    if (panels[step]) {
      panels[step].hidden = false;
      panels[step].classList.add('is-active');
    }

    var orderSummary = document.getElementById('order-summary');
    if (orderSummary) orderSummary.hidden = (step === 4);
  }

  document.getElementById('btn-next-payment')?.addEventListener('click', function (e) {
    e.preventDefault();
    if (!pref && typeof gsap !== 'undefined') {
      gsap.to('#panel-datos', {
        opacity: 0, y: -20, duration: 0.25,
        onComplete: function () {
          goToStep(3);
          gsap.from('#panel-pago', { opacity: 0, y: 20, duration: 0.3 });
        }
      });
    } else {
      goToStep(3);
    }
  });

  document.getElementById('btn-edit-datos')?.addEventListener('click', function () { goToStep(2); });

  document.getElementById('btn-confirm-order')?.addEventListener('click', function () {
    if (!pref && typeof gsap !== 'undefined') {
      gsap.to('#checkout-layout', {
        opacity: 0, y: -16, duration: 0.3,
        onComplete: function () {
          goToStep(4);
          gsap.from('.org-ingravity-confirm', { scale: 0.85, opacity: 0, duration: 0.55, ease: 'back.out(1.4)' });
        }
      });
    } else {
      goToStep(4);
    }
  });

  // ── 3. Coupon code validation ──────────────────────────────────────────────
  document.getElementById('btn-apply-coupon')?.addEventListener('click', function () {
    var code = document.getElementById('coupon-code')?.value.trim().toUpperCase();
    var fb = document.getElementById('coupon-feedback');
    var discRow = document.getElementById('discount-row');
    var totalEl = document.getElementById('total-price');

    if (code === 'COURT20') {
      if (fb) { fb.textContent = '✓ Cupón aplicado: −20%'; fb.style.color = 'var(--primitive-color-success-500)'; }
      if (discRow) discRow.hidden = false;
      if (totalEl) totalEl.textContent = '373,98 €';
    } else if (code) {
      if (fb) { fb.textContent = '✗ Código no válido o expirado'; fb.style.color = 'var(--primitive-color-error-500)'; }
    }
  });

  // ── 4. Payment method tabs ─────────────────────────────────────────────────
  document.querySelectorAll('.mol-ingravity-payment-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.mol-ingravity-payment-tab').forEach(function (t) {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      this.classList.add('is-active');
      this.setAttribute('aria-selected', 'true');

      ['panel-card', 'panel-paypal', 'panel-bizum'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.hidden = true;
      });
      var target = this.getAttribute('aria-controls');
      var tp = document.getElementById(target);
      if (tp) tp.hidden = false;
    });
  });

  // ── 5. Delivery option selection ───────────────────────────────────────────
  document.querySelectorAll('.mol-ingravity-delivery-opt').forEach(function (opt) {
    opt.addEventListener('click', function () {
      document.querySelectorAll('.mol-ingravity-delivery-opt').forEach(function (o) {
        o.classList.remove('is-selected');
      });
      this.classList.add('is-selected');
    });
  });

  // ── 6. Cart item quantity buttons ──────────────────────────────────────────
  document.querySelectorAll('.mol-ingravity-cart-item').forEach(function (item) {
    var numEl = item.querySelector('.mol-ingravity-cart-item__qty-num');
    if (!numEl) return;
    var count = parseInt(numEl.textContent) || 1;
    item.querySelectorAll('.mol-ingravity-cart-item__qty-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (this.getAttribute('aria-label')?.includes('Aumentar')) count = Math.min(count + 1, 10);
        else count = Math.max(count - 1, 1);
        numEl.textContent = count;
      });
    });
  });

}());
