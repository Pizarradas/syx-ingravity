# 04 — Tecnologías y Arquitectura SYX

> **Lectura previa:** `03-paleta-color.md`  
> Este es el documento técnico de referencia. Leerlo **siempre** antes de escribir HTML, SCSS o JS.

---

## 1. Stack tecnológico

- **HTML5** semántico (sin frameworks JS)
- **SCSS** compilado a CSS (estructura en `/scss/`)
- **JavaScript vanilla** (sin frameworks)
- **Animación:** GSAP 3.13.0 + plugins oficiales (CDNJS → `/assets/js/` en producción)

---

## 2. Estructura de carpetas

```
/assets/js/
  gsap.min.js
  ScrollTrigger.min.js
  Flip.min.js
  MotionPathPlugin.min.js
  Draggable.min.js
  ScrollToPlugin.min.js
  motion-system.js
  animations-hero.js
  animations-grid.js
  animations-product.js
  animations-cart.js
  init.js

/scss/
  /abstracts/         ← tokens (primitives, semantic, components) + mixins
  /atoms/             ← componentes atómicos (.atom-*)
  /molecules/         ← moléculas (.mol-*)
  /organisms/         ← organismos (.org-*)
  /layout/            ← grid (.layout-grid)
  /utilities/         ← helpers (.syx-*)
  /base/helpers/      ← helpers de tema (.helper-*)
  /themes/            ← setup por marca (velox, terra, basket)
  /pages/             ← overrides de página (.page-*)

/css/
  styles-theme-velox.css
  styles-theme-terra.css
  styles-theme-ingravity.css   ← tema de este proyecto
```

---

## 3. Naming de clases (CONTRATO DOM REAL)

SYX usa prefijos estrictos por capa atómica. **Nunca mezclar prefijos en el nivel incorrecto.**

| Prefijo | Capa | Archivo SCSS | Ejemplo |
|---|---|---|---|
| `atom-` | Átomo | `scss/atoms/` | `atom-btn`, `atom-icon` |
| `mol-` | Molécula | `scss/molecules/` | `mol-landing-feature-card`, `mol-landing-plan` |
| `org-` | Organismo | `scss/organisms/` | `org-landing-hero`, `org-landing-navbar` |
| `syx-` | Utility | `scss/utilities/` | `syx-d-flex`, `syx-mt-4` |
| `layout-grid` | Grid | `scss/layout/` | `layout-grid`, `layout-grid__col-xs-12` |
| `helper-` | Tema | `scss/base/helpers/` | `helper-bg-color-primary` |
| `page-` | Página | `scss/pages/` | `page-home` |

### BEM dentro de un componente

```
.{prefix}-{bloque}               ← Block
.{prefix}-{bloque}__elemento     ← Element (doble guión bajo)
.{prefix}-{bloque}--modificador  ← Modifier (doble guión)
```

> No se anidan modificadores: ~~`atom-btn--primary--filled`~~

### Layering en un mismo elemento

El orden mental es: **[organism/molecule/atom] [layout] [utilities]**

```html
<div class="org-landing-navbar__cta layout-grid__col-xs-3 layout-grid__col-sm-3
            syx-d-flex syx-justify-end syx-items-center syx-gap-2">
```

---

## 4. Body y tema

```html
<!-- Proyectos SYX existentes -->
<body class="syx syx--theme-velox">
<body class="syx syx--theme-terra">

<!-- Este proyecto -->
<body class="syx syx--theme-ingravity">
```

- `syx` → activa la capa base
- `syx--theme-{nombre}` → aplica los custom properties del tema
- El tema basket se define en `scss/themes/ingravity/setup.scss`

---

## 5. Grid system

```html
<!-- Contenedor principal -->
<div class="layout-grid">
  <!-- Full mobile, 8 cols centrado en desktop -->
  <div class="layout-grid__col-xs-12 layout-grid__col-md-8">...</div>
</div>

<!-- Con centrado horizontal -->
<div class="layout-grid layout-grid--justify-center">...</div>
```

**Breakpoints:** `xs` (móvil 0+) · `sm` (~600px) · `md` (~1024px) · `lg` (~1280px)  
**Columnas:** 1–12 (por breakpoint)

> Nunca crear flex containers propios para layouts principales. Usar siempre `layout-grid` + `layout-grid__col-*`. Usar `syx-d-flex` solo para composición inline dentro de columnas.

---

## 6. Clases de sección compartidas (globales, no renombrar)

```html
<div class="org-landing-section-head">
  <div class="org-landing-section-tag">Category</div>
  <h2 class="org-landing-section-title" id="section-title">Heading</h2>
  <p class="org-landing-section-lead">Descripción de apoyo.</p>
</div>
```

---

## 7. Patrones de organismos canónicos

### 7.1 Navbar

```html
<nav class="org-landing-navbar" aria-label="Main navigation">
  <div class="org-landing-navbar__bar layout-grid">

    <a href="..." class="org-landing-navbar__logo layout-grid__col-xs-3 layout-grid__col-sm-2" aria-label="BRAND home">
      BRAND
    </a>

    <ul class="org-landing-navbar__links layout-grid__col-xs-6 layout-grid__col-sm-7" role="list">
      <li><a href="#features">Link</a></li>
    </ul>

    <div class="org-landing-navbar__cta layout-grid__col-xs-3 layout-grid__col-sm-3 syx-d-flex syx-justify-end syx-items-center syx-gap-2">
      <a href="#cta" class="atom-btn atom-btn--primary atom-btn--filled atom-btn--size-sm">CTA</a>
      <button class="org-landing-navbar__toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
        <span></span><span></span><span></span>
      </button>
    </div>

  </div>

  <!-- Mobile drawer -->
  <div class="org-landing-navbar__mobile-menu" id="mobile-menu" role="navigation" aria-label="Mobile navigation">
    <nav class="org-landing-navbar__mobile-nav">
      <a href="#features" class="org-landing-navbar__mobile-link">Link</a>
      <a href="#cta" class="org-landing-navbar__mobile-link org-landing-navbar__mobile-link--cta">CTA →</a>
    </nav>
  </div>
</nav>
```

Estado JS: `menu.classList.toggle('is-open')` + `aria-expanded`.

---

### 7.2 Hero

```html
<section class="org-landing-hero" aria-labelledby="hero-title">
  <div class="org-landing-hero__inner layout-grid layout-grid--justify-center">
    <div class="layout-grid__col-xs-12 layout-grid__col-md-8 syx-text-center">

      <!-- Pill -->
      <div class="org-landing-hero__pill syx-d-inline-flex syx-items-center syx-gap-1" role="note">
        <span>🏀</span>
        <span class="syx-type-caption syx-font-medium">Announcement text</span>
      </div>

      <!-- Título -->
      <h1 class="org-landing-hero__title syx-type-display-1 syx-mt-3" id="hero-title">
        Primary headline.<br>
        <span class="org-landing-hero__accent">Accent phrase.</span>
      </h1>

      <!-- Lead -->
      <p class="org-landing-hero__lead syx-type-body-large syx-mt-3 syx-max-w-65ch syx-mx-auto">
        Supporting description.
      </p>

      <!-- CTAs -->
      <div class="org-landing-hero__actions syx-d-flex syx-justify-center syx-items-center syx-gap-3 syx-mt-4 syx-flex-wrap">
        <a href="#cta" class="atom-btn atom-btn--primary atom-btn--filled atom-btn--size-lg">Primary CTA</a>
        <a href="#features" class="atom-btn atom-btn--size-lg org-landing-hero__btn-ghost">Secondary CTA</a>
      </div>

      <!-- Social proof -->
      <div class="org-landing-hero__social syx-d-flex syx-justify-center syx-items-center syx-gap-2 syx-mt-4 syx-flex-wrap">
        <div class="org-landing-hero__avatars" aria-label="Customer avatars">
          <span aria-hidden="true">A</span>
          <span aria-hidden="true">B</span>
          <span aria-hidden="true">+</span>
        </div>
        <span class="org-landing-hero__stars" aria-label="5 star rating">★★★★★</span>
        <span class="syx-type-body-small syx-text-gray">Trusted by <strong class="syx-font-bold">N+</strong> users</span>
      </div>

    </div>
  </div>
</section>
```

---

### 7.3 Stats bar

```html
<section class="org-landing-stats" aria-label="Key metrics">
  <dl class="org-landing-stats__grid">
    <div class="org-landing-stats__item syx-text-center">
      <dt class="org-landing-stats__label syx-type-caption syx-text-muted">Label</dt>
      <dd class="org-landing-stats__number syx-type-h2 syx-font-bold syx-m-0">99%</dd>
    </div>
  </dl>
</section>
```

---

### 7.4 Features (sección + tarjetas)

```html
<section class="org-landing-features" id="features" aria-labelledby="features-title">
  <div class="org-landing-features__inner">

    <div class="org-landing-section-head">
      <div class="org-landing-section-tag">Category</div>
      <h2 class="org-landing-section-title" id="features-title">Section heading</h2>
      <p class="org-landing-section-lead">Supporting description.</p>
    </div>

    <div class="org-landing-features__grid">
      <article class="mol-landing-feature-card">
        <div class="mol-landing-feature-card__icon" aria-hidden="true">⚡</div>
        <h3 class="mol-landing-feature-card__title">Feature Name</h3>
        <p class="mol-landing-feature-card__desc">Feature description.</p>
      </article>
    </div>

  </div>
</section>
```

> La grid pertenece al organismo (`.org-landing-features__grid`). La tarjeta es una molécula independiente (`.mol-landing-feature-card`) que no conoce la grid.

---

### 7.5 Pricing plans

```html
<section class="org-landing-pricing" id="pricing" aria-labelledby="pricing-title">
  <div class="org-landing-pricing__inner">

    <div class="org-landing-section-head">
      <div class="org-landing-section-tag">Pricing</div>
      <h2 class="org-landing-section-title" id="pricing-title">Heading</h2>
      <p class="org-landing-section-lead">Copy.</p>
    </div>

    <div class="org-landing-pricing__grid">

      <!-- Plan estándar -->
      <article class="mol-landing-plan">
        <p class="mol-landing-plan__name">Plan name</p>
        <p class="mol-landing-plan__price">$XX <span>/ month</span></p>
        <p class="mol-landing-plan__desc">Short description.</p>
        <ul class="mol-landing-plan__features"><li>Feature one</li></ul>
        <a href="#cta" class="atom-btn atom-btn--primary atom-btn--size-md syx-w-full">Get Started</a>
      </article>

      <!-- Plan destacado: modificador --featured en el bloque -->
      <article class="mol-landing-plan mol-landing-plan--featured">
        <div class="mol-landing-plan__badge">Most Popular</div>
        <p class="mol-landing-plan__name">Pro</p>
        <p class="mol-landing-plan__price">$79 <span>/ month</span></p>
        <p class="mol-landing-plan__desc">Description.</p>
        <ul class="mol-landing-plan__features"><li>Feature</li></ul>
        <a href="#cta" class="atom-btn atom-btn--primary atom-btn--filled atom-btn--size-md syx-w-full">Start Trial</a>
      </article>

    </div>
  </div>
</section>
```

---

### 7.6 Testimonials

```html
<section class="org-landing-testimonials" id="testimonials" aria-labelledby="testimonials-title">
  <div class="org-landing-testimonials__inner">

    <div class="org-landing-section-head">
      <div class="org-landing-section-tag">Customers</div>
      <h2 class="org-landing-section-title" id="testimonials-title">Heading</h2>
    </div>

    <div class="org-landing-testimonials__grid">
      <blockquote class="mol-landing-testimonial">
        <div class="mol-landing-testimonial__stars" aria-label="5 stars">★★★★★</div>
        <p class="mol-landing-testimonial__body">&ldquo;Quote text.&rdquo;</p>
        <div class="mol-landing-testimonial__author">
          <div class="mol-landing-testimonial__avatar" aria-hidden="true">AB</div>
          <div>
            <div class="mol-landing-testimonial__name">Name S.</div>
            <div class="mol-landing-testimonial__role">Role, Company</div>
          </div>
        </div>
      </blockquote>
    </div>

  </div>
</section>
```

---

### 7.7 CTA band

```html
<section class="org-landing-cta helper-bg-color-primary" id="cta" aria-labelledby="cta-title">
  <div class="org-landing-cta__inner layout-grid layout-grid--justify-center">
    <div class="layout-grid__col-xs-12 syx-text-center">
      <h2 class="org-landing-cta__title syx-type-h2" id="cta-title">CTA Headline</h2>
      <p class="org-landing-cta__lead syx-type-body-large syx-mt-3">Supporting copy.</p>
      <div class="org-landing-cta__actions syx-d-flex syx-justify-center syx-items-center syx-gap-3 syx-mt-4 syx-flex-wrap">
        <!-- En fondo de color de marca: botones con --secondary para contrastar -->
        <a href="#" class="atom-btn atom-btn--secondary atom-btn--filled atom-btn--size-md">Primary action</a>
        <a href="#" class="atom-btn atom-btn--secondary atom-btn--size-md">Secondary action</a>
      </div>
      <p class="org-landing-cta__sub syx-type-body-small syx-mt-3">Legal/trust copy.</p>
    </div>
  </div>
</section>
```

> **Regla de botones:** Fondo blanco/oscuro → `atom-btn--primary --filled`. Fondo de color de marca → `atom-btn--secondary --filled`.

---

### 7.8 Footer

```html
<footer class="org-landing-footer" role="contentinfo">
  <div class="org-landing-footer__inner">

    <div class="org-landing-footer__brand layout-grid__col-xs-12 layout-grid__col-sm-6 layout-grid__col-md-3">
      <div class="org-landing-footer__brand-name syx-type-h4 syx-font-bold syx-text-primary">BRAND</div>
      <p class="org-landing-footer__tagline syx-type-body-small syx-text-muted syx-mt-2">Tagline.</p>
    </div>

    <div class="layout-grid__col-xs-12 layout-grid__col-sm-6 layout-grid__col-md-3">
      <h3 class="org-landing-footer__col-title syx-type-overline syx-mb-2">Column</h3>
      <ul class="org-landing-footer__links syx-type-body-small" role="list">
        <li><a href="#">Link</a></li>
      </ul>
    </div>

  </div>
  <p class="org-landing-footer__copy syx-type-caption syx-text-muted">© 2026 Brand — legal copy.
    &nbsp;|&nbsp; <a href="other.html" class="atom-link">Switch →</a>
  </p>
</footer>
```

---

## 8. Accesibilidad (patrones HTML obligatorios)

| Necesidad | Patrón |
|---|---|
| Skip link | `<a href="#main-content" class="syx-skip-link">Skip to main content</a>` (primer hijo de `<body>`) |
| Main landmark | `<main id="main-content">` |
| Etiqueta sección | `aria-labelledby="{section}-title"` en `<section>`, `id` coincidente en `<h2>` |
| Ícono decorativo | `aria-hidden="true"` en el elemento icono |
| Nav | `aria-label="Main navigation"` en `<nav>`, `role="list"` en `<ul>` de nav |
| Mobile toggle | `aria-expanded="false"` (toggle por JS), `aria-controls="mobile-menu"` |

---

## 9. Motion System (motion-system.js)

```js
gsap.registerPlugin(ScrollTrigger, Flip, MotionPathPlugin, Draggable, ScrollToPlugin);

const motion = {
  fast:      0.18,
  base:      0.32,
  slow:      0.60,
  easeOut:   "power3.out",
  easeInOut: "power2.inOut",
};

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Helpers:
// setVisible(elements)
// fadeInUp(el, opts)
// staggerIn(list, opts)
// safeKillScrollTriggers()
```

---

## 10. Orden de carga JS (HTML)

```html
<script src="/assets/js/gsap.min.js"></script>
<script src="/assets/js/ScrollTrigger.min.js"></script>
<script src="/assets/js/Flip.min.js"></script>
<script src="/assets/js/MotionPathPlugin.min.js"></script>
<script src="/assets/js/Draggable.min.js"></script>
<script src="/assets/js/ScrollToPlugin.min.js"></script>
<script src="/assets/js/motion-system.js"></script>
<script src="/assets/js/animations-hero.js"></script>
<script src="/assets/js/animations-grid.js"></script>
<script src="/assets/js/animations-product.js"></script>
<script src="/assets/js/animations-cart.js"></script>
<script src="/assets/js/init.js"></script>
```

CDN durante prototipado: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/{plugin}.min.js`

---

## 11. Reglas estrictas (resumen)

| ❌ Evitar | ✅ Hacer |
|---|---|
| `<div class="card">` | `<article class="mol-card">` |
| `<div class="features-section">` | `<section class="org-landing-features">` |
| `<div style="padding: 24px">` | `class="syx-p-3"` o token en SCSS |
| `<div class="flex-row">` (custom) | `class="syx-d-flex syx-gap-2"` |
| Colores inline (`style="color: #fff"`) | `helper-bg-color-*` o token semántico en SCSS |
| `!important` | No necesario — usar orden `@layer` |
| Valores raw en SCSS (`padding: 1rem`) | `@include padding(var(--semantic-space-inset-md))` |
| Primitivos en componentes (`--primitive-*`) | Siempre: Primitive → Semantic → Component |
