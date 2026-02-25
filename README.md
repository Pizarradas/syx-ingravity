# SYX Design System

![License: MIT](https://img.shields.io/badge/License-MIT-7c3aed.svg)
![Version](https://img.shields.io/badge/version-3.0.2-7c3aed)
![CSS](<https://img.shields.io/badge/CSS-@layer%20%7C%20color--mix()-informational>)
![Sass](https://img.shields.io/badge/Sass-Dart%20Sass-CC6699?logo=sass)

> A modern, token-driven SCSS design system built on Atomic Design principles.  
> Zero external CSS dependencies. Dart Sass native.  
> Built by **José Luis Pizarro Feo**

---

## What is SYX?

SYX is a **component-first design system** that provides:

- A **3-layer token architecture** (Primitive → Semantic → Component)
- A **native SCSS mixin library** (15 files, Bourbon-philosophy, null-safe)
- An **Atomic Design component hierarchy** (Atoms → Molecules → Organisms)
- A **multi-context bundle system** (docs / app / marketing / blog per theme)
- **CSS `@layer`** for specificity management without `!important`
- **Fluid typography** with `clamp()` on every scale step

---

## Quick Start

### Option A — Zero install (use the compiled CSS)

Download or clone the repo, then link the CSS directly in your HTML:

```html
<!-- Pick the theme that fits your project -->
<link rel="stylesheet" href="css/styles-theme-example-01.css" />

<!-- REQUIRED: two classes on <body> -->
<body class="syx syx--theme-example-01">
  <!-- Use SYX components -->
  <button class="atom-btn atom-btn--primary atom-btn--filled atom-btn--size-md">
    Click me
  </button>
  <span class="atom-pill atom-pill--primary">New</span>
</body>
```

Open `landing-ingravity.html`, `plp-ingravity.html`, or `checkout-ingravity.html` in your browser to explore the three demo pages with all SYX components applied to the INGRAVITY brand.

---

### Option B — Build from SCSS with npm

```bash
npm install
npm run build        # compiles the monolith styles-theme-ingravity.css
```

> **Note:** Page-specific bundles (`ingravity-landing.css`, `ingravity-plp.css`, `ingravity-checkout.css` and their summer variants) are managed via Prepros. See `prepros.config` for compilation targets.

### Option C — Dart Sass CLI directly

```bash
sass scss/styles-theme-ingravity.scss css/styles-theme-ingravity.css --style=expanded --no-source-map
```

---

## Project Structure

```
syx-ingravity/
│
├── scss/                        # All source SCSS
│   ├── abstracts/               # Tokens, mixins, functions, maps
│   │   ├── tokens/
│   │   │   ├── primitives/      # Raw values (colors, spacing, fonts)
│   │   │   ├── semantic/        # Contextual aliases (color-primary, etc.)
│   │   │   └── components/      # Per-component tokens (btn, form, header…)
│   │   ├── mixins/              # 15 SYX native mixins
│   │   ├── functions/
│   │   └── maps/
│   │
│   ├── base/                    # Reset, elements, helpers
│   ├── atoms/                   # Atomic components
│   ├── molecules/               # Composite components
│   ├── organisms/               # Complex components
│   ├── layout/                  # Grid system
│   ├── utilities/               # Display, spacing, text utilities
│   ├── pages/                   # Page-specific styles
│   │
│   └── themes/                  # Theme definitions
│       ├── _shared/             # Shared core bundle definition
│       ├── _template/           # Template for new themes
│       └── ingravity/           # Ingravity brand theme
│
├── css/                         # Compiled output (6 page bundles + monolith)
├── fonts/                       # Self-hosted webfonts
├── assets/                      # Images and icons
├── js/                          # JavaScript (theme-switcher.js)
├── docs/                        # All documentation & case studies
│   ├── README.md                # Master documentation index
│   ├── blueprints/              # Project briefs: brand, palette, tech stack
│   ├── campaign-theming/        # Case study: CSS-only campaign rebrand
│   └── analysis/                # System analysis, theming rules, AI guidelines
│
├── landing-ingravity.html       # Landing page demo
├── plp-ingravity.html           # Product listing page demo
└── checkout-ingravity.html      # Checkout page demo
```

---

## Documentation

| Document                                                                | Description                                                        |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [**docs/**](docs/README.md)                                             | 📚 Master documentation index (blueprints, analysis, case studies) |
| [Campaign Theming Case Study](docs/campaign-theming/README.md)          | CSS-only campaign rebrand — proof of concept with INGRAVITY        |
| [ARCHITECTURE.md](scss/ARCHITECTURE.md)                                 | Technical architecture deep-dive                                   |
| [GETTING-STARTED.md](scss/GETTING-STARTED.md)                           | Step-by-step guide for new developers                              |
| [abstracts/tokens/TOKEN-GUIDE.md](scss/abstracts/tokens/TOKEN-GUIDE.md) | Token system guide                                                 |
| [abstracts/mixins/README.md](scss/abstracts/mixins/README.md)           | Complete mixin reference                                           |
| [CONTRIBUTING.md](scss/CONTRIBUTING.md)                                 | Contribution guidelines                                            |
| [themes/\_template/README.md](scss/themes/_template/README.md)          | How to create a new theme                                          |

---

## Key Concepts

### Token Layers

```
Primitive  →  Semantic  →  Component
#3B82F6       color-primary  btn-primary-bg
```

Never use primitive tokens directly in components. Always go through semantic → component.

### Mixin Usage

```scss
// Always use SYX mixins instead of raw CSS
@include transition(color 0.2s ease); // not: transition: color 0.2s ease;
@include absolute(
  $top: 0,
  $right: 0
); // not: position: absolute; top: 0; right: 0;
@include padding(1rem null); // not: padding-top: 1rem; padding-bottom: 1rem;
```

### CSS @layer Stack

```
syx.reset → syx.base → syx.tokens → syx.atoms → syx.molecules → syx.organisms → syx.utilities
```

Utilities always win over components. No `!important` needed.

---

## Themes

| Theme       | Status           | CSS Bundle                          |
| ----------- | ---------------- | ----------------------------------- |
| `ingravity` | Production       | `css/styles-theme-ingravity.css`    |
| `_template` | Neutral baseline | Available for new brand derivatives |

---

## Score (Feb 2026)

**93/100** — Architecture, tokens, theming, atomic design, mixin library, dark-mode, accessibility utilities, and `@layer` specificity management all production-ready.  
Roadmap to 100: Organisms expansion + Public documentation site.
