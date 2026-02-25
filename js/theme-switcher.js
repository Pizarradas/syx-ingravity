/**
 * SYX Theme Switcher — INGRAVITY
 * Demonstrates SYX's token architecture: swap ONE CSS file → full rebrand.
 * Zero HTML changes between base and summer themes.
 */
(function () {
  'use strict';

  // ── Per-page CSS bundles ────────────────────────────────────────────
  // Detect which page and build both base and summer CSS paths.
  var PAGE_CSS = (function () {
    var path = window.location.pathname;
    if (path.indexOf('landing-ingravity')  !== -1) return { base: 'css/ingravity-landing.css',  summer: 'css/ingravity-landing-summer.css' };
    if (path.indexOf('plp-ingravity')      !== -1) return { base: 'css/ingravity-plp.css',      summer: 'css/ingravity-plp-summer.css' };
    if (path.indexOf('checkout-ingravity') !== -1) return { base: 'css/ingravity-checkout.css', summer: 'css/ingravity-checkout-summer.css' };
    // Fallback: full monolith bundles
    return { base: 'css/styles-theme-ingravity.css', summer: 'css/styles-theme-ingravity-summer.css' };
  }());

  var THEMES = {
    base: {
      label: '🏀 Court Volt',
      css: PAGE_CSS.base,
      fonts: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap',
      themeColor: '#0a0a0f'
    },
    summer: {
      label: '☀️ Cayo Court',
      css: PAGE_CSS.summer,
      fonts: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap',
      themeColor: '#FEF3E8'
    }
  };

  var current = sessionStorage.getItem('syx-theme') || 'base';

  // ── Prefetch summer bundle so toggle is instant ─────────────────────
  // (HTML already has a <link rel="prefetch"> for each page's summer CSS,
  //  but we add it via JS too as belt-and-suspenders for browsers that
  //  may not have parsed the static prefetch yet.)
  var prefetchF   = document.createElement('link');
  prefetchF.rel   = 'prefetch';
  prefetchF.href  = THEMES.summer.fonts;
  document.head.appendChild(prefetchF);

  // ── Apply a theme (inner — pure DOM mutations, no transition) ──────
  function _applyDOM(name) {
    var theme = THEMES[name];
    var other = name === 'base' ? 'summer' : 'base';

    var cssLink = document.getElementById('theme-style');
    if (cssLink) cssLink.href = theme.css;

    var fontLink = document.getElementById('theme-font');
    if (fontLink) { fontLink.rel = 'stylesheet'; fontLink.href = theme.fonts; }

    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme.themeColor;

    var btn = document.getElementById('syx-theme-btn');
    if (btn) {
      btn.textContent = 'Cambiar a ' + THEMES[other].label;
      btn.setAttribute('data-current', name);
    }

    sessionStorage.setItem('syx-theme', name);
    current = name;
  }

  // ── Apply a theme — with smooth transition ──────────────────────────
  // Strategy 1: View Transitions API (Chrome/Edge 111+, Firefox 130+).
  //   Browser snapshots current render, applies mutation, then crossfades.
  //   CSS already prefetched → near-instant paint, smooth fade-out/in.
  //
  // Strategy 2: Opacity fade fallback for older browsers.
  function applyTheme(name) {
    if ('startViewTransition' in document) {
      // The transition handles the visual swap — just mutate the DOM inside.
      document.startViewTransition(function () { _applyDOM(name); });
    } else {
      // Fallback: fade out → swap → fade in
      var root = document.documentElement;
      root.style.transition = 'opacity 180ms ease';
      root.style.opacity    = '0';
      setTimeout(function () {
        _applyDOM(name);
        root.style.opacity = '1';
        setTimeout(function () { root.style.transition = ''; }, 200);
      }, 180);
    }
  }

  // ── Create floating toggle button ──────────────────────────────────
  function createToggle() {
    if (document.getElementById('syx-theme-btn')) return;

    // Container
    var wrap            = document.createElement('div');
    wrap.style.cssText  = [
      'position:fixed',
      'bottom:1.5rem',
      'right:1.5rem',
      'z-index:9999',
      'display:flex',
      'flex-direction:column',
      'align-items:flex-end',
      'gap:0.5rem',
      'font-family:system-ui,sans-serif'
    ].join(';');

    // Badge
    var badge           = document.createElement('span');
    badge.style.cssText = [
      'font-size:0.65rem',
      'font-weight:700',
      'letter-spacing:0.08em',
      'text-transform:uppercase',
      'padding:0.2rem 0.5rem',
      'border-radius:999px',
      'background:rgba(0,0,0,0.55)',
      'color:#fff',
      'backdrop-filter:blur(6px)',
      '-webkit-backdrop-filter:blur(6px)'
    ].join(';');
    badge.textContent = 'SYX · Solo CSS';

    // Button
    var btn             = document.createElement('button');
    btn.id              = 'syx-theme-btn';
    btn.style.cssText   = [
      'cursor:pointer',
      'border:2px solid rgba(255,255,255,0.25)',
      'border-radius:999px',
      'padding:0.6rem 1.2rem',
      'font-size:0.875rem',
      'font-weight:700',
      'letter-spacing:0.02em',
      'white-space:nowrap',
      'backdrop-filter:blur(12px)',
      '-webkit-backdrop-filter:blur(12px)',
      'background:rgba(0,0,0,0.6)',
      'color:#fff',
      'box-shadow:0 4px 24px rgba(0,0,0,0.35)',
      'transition:transform 0.15s ease,box-shadow 0.15s ease'
    ].join(';');

    btn.addEventListener('mouseenter', function () {
      btn.style.transform  = 'scale(1.05)';
      btn.style.boxShadow  = '0 8px 32px rgba(0,0,0,0.45)';
    });
    btn.addEventListener('mouseleave', function () {
      btn.style.transform  = 'scale(1)';
      btn.style.boxShadow  = '0 4px 24px rgba(0,0,0,0.35)';
    });

    btn.addEventListener('click', function () {
      var next = current === 'base' ? 'summer' : 'base';
      // Ripple animation
      btn.style.transform = 'scale(0.95)';
      setTimeout(function () { btn.style.transform = 'scale(1.05)'; }, 80);
      setTimeout(function () { btn.style.transform = 'scale(1)';    }, 200);
      applyTheme(next);
    });

    wrap.appendChild(badge);
    wrap.appendChild(btn);
    document.body.appendChild(wrap);

    // Set initial button label
    var other = current === 'base' ? 'summer' : 'base';
    btn.textContent = 'Cambiar a ' + THEMES[other].label;
    btn.setAttribute('data-current', current);
  }

  // ── Init ───────────────────────────────────────────────────────────
  // Apply persisted theme immediately on load
  if (current !== 'base') {
    // Re-apply summer on page load if previously selected
    window.addEventListener('DOMContentLoaded', function () {
      applyTheme(current);
    });
  }

  // Create button when DOM is ready
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', createToggle);
  } else {
    createToggle();
  }

}());
