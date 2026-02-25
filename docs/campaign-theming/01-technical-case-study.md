# 01 · Caso técnico: Campaign Theming con SYX

## La hipótesis

¿Puede un equipo de marketing activar un rebrand visual completo para una campaña específica sin que ningún desarrollador toque HTML, componentes o JavaScript?

**El experimento:** Marca INGRAVITY, tema base Court Volt (oscuro) → tema campaña Cayo Court Summer Drop 2026 (cálido, editorial).

---

## Cómo lo permite SYX

SYX separa la identidad visual del markup en una cadena de 3 capas:

```
Primitivos  →  Semánticos  →  Componentes
(valores raw)   (significados)   (aplicación UI)
```

Los **primitivos** definen los valores en crudo:

```scss
// _theme.scss — Court Volt (base)
--primitive-color-primary: #00d4ff; // electric blue

// _theme-summer.scss — Cayo Court (campaña)
--primitive-color-primary: #ff6b6b; // coral
```

Los **componentes** nunca usan valores raw. Solo referencian semánticos:

```scss
.atom-btn--primary {
  background: var(--semantic-color-btn-primary-bg);
  // → resuelve al color primario del tema activo
}
```

**Resultado:** cambiar el tema = cambiar los primitivos. El árbol de tokens se recalcula automáticamente.

---

## Las 7 mejoras CSS-only del tema de campaña

### 1. Filtro cálido en fotos de producto

```scss
.mol-ingravity-product-card__image img {
  filter: saturate(112%) brightness(103%) contrast(97%);
}
```

Las fotos del catálogo adquieren una paleta de verano sin reemplazar ninguna imagen.

### 2. Clip-path diagonal entre secciones

```scss
.org-ingravity-hero {
  clip-path: polygon(0 0, 100% 0, 100% 92%, 0 100%);
}
```

Cortes diagonales entre hero, manifesto y CTA. Zero HTML extra.

### 3. Scrollbar personalizado

```scss
::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #ff6b6b, #00bfa5);
  border-radius: 9999px;
}
```

### 4. Gradient border en cards al hover

Truco `background-clip: padding-box + border-box` — el borde adopta el gradiente coral → turquesa sin elementos HTML adicionales.

### 5. Layout más aireado

```scss
--primitive-space-base: 0.3rem; // vs 0.25rem del tema base (+20%)
```

Un token. Los 32+ tokens de spacing derivados se reescalan automáticamente.

### 6. Headline animado

```scss
@keyframes summer-gradient-flow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.org-ingravity-hero h1 {
  background: linear-gradient(90deg, #ff6b6b, #ffb347, #00bfa5, #ff6b6b);
  background-size: 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: summer-gradient-flow 5s ease infinite;
}
```

### 7. Card hover con spring easing

```scss
.mol-ingravity-product-card:hover {
  transform: translateY(-8px) scale(1.015);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 20px 60px rgba(255, 107, 107, 0.25);
}
```

---

## El mecanismo de activación

```javascript
// js/theme-switcher.js — page-aware, sin dependencias
var PAGE_SUMMER_CSS = (function () {
  var path = window.location.pathname;
  if (path.indexOf("landing-ingravity") !== -1)
    return "css/ingravity-summer-landing.css";
  if (path.indexOf("plp-ingravity") !== -1)
    return "css/ingravity-summer-plp.css";
  if (path.indexOf("checkout-ingravity") !== -1)
    return "css/ingravity-summer-checkout.css";
  return "css/styles-theme-ingravity-summer.css"; // fallback
})();
```

El switcher modifica el `href` del `<link id="theme-style">`. El browser descarga el CSS nuevo y re-renderiza. Sin JavaScript de framework. Sin re-render de componentes.

---

## Bundles por página

Cada página carga solo el CSS que sus componentes necesitan:

| Página   | Bundle                              | Tamaño | vs monolito |
| -------- | ----------------------------------- | ------ | ----------- |
| Monolito | `styles-theme-ingravity-summer.css` | 276 KB | —           |
| Landing  | `ingravity-summer-landing.css`      | 245 KB | **–11%**    |
| PLP      | `ingravity-summer-plp.css`          | 232 KB | **–16%**    |
| Checkout | `ingravity-summer-checkout.css`     | 226 KB | **–18%**    |

> El potencial de reducción es mayor (~30–40%) si `org-ingravity()` se divide en sub-mixins por sección. Por ahora el patrón está demostrado y los entry points existen.

---

## El bug más revelador

Durante el experimento los iconos eran invisibles en el tema claro. El diagnóstico apuntaba a filtros CSS incorrectos — pero la causa era otra.

Los SVG data URIs de los iconos (`--primitive-icon-ui-*`) estaban definidos **dentro del mixin del tema base** `theme-ingravity()`. El tema summer usa su propio mixin `theme-ingravity-summer()` — que no incluía esas definiciones. El `background-image` resolvía a nada. El filtro era correcto; no había imagen que filtrar.

**Fix:** añadir los 19 data URIs al bloque `:root` de `_theme-summer.scss`.

**Lección:** los primitivos compartidos (iconos, sombras base, gradientes universales) deben vivir en un partial independiente importado por todos los temas, no dentro de un mixin de tema específico.

---

## Lo que SYX necesita para que esto funcione

1. **Ningún valor hardcoded en componentes** — todo debe pasar por tokens semánticos.
2. **Primitivos bien modelados** — la cadena `primitive → semantic → component` debe mantenerse sin atajos.
3. **Separación clara entre setup de base y setup de tema** — cada tema es un mixin independiente.

> Si el design system tiene esa disciplina: el coste de un tema de campaña es horas, no semanas.

---

← [Volver al índice](./README.md) · [Valor de negocio →](./02-business-value.md)
