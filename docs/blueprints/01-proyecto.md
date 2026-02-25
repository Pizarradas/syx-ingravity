# 01 — Proyecto: INGRAVITY Basket Ecommerce 2026

> **Lectura previa recomendada:** `00-README.md`  
> **Siguiente:** `02-benchmark.md`

---

## 1. Contexto del proyecto

Diseñar e implementar una tienda online de artículos de baloncesto orientada a usuarios entre **16 y 40 años**, apasionados por el basket urbano y profesional.

**Catálogo:**
- Zapatillas técnicas
- Ropa deportiva (jerseys, shorts, hoodies)
- Balones y accesorios
- Ediciones limitadas
- Productos personalizables

**Objetivo:** Crear una experiencia digital inmersiva, diferencial y emocional, alineada con las tendencias de diseño web 2026.

---

## 2. Base front-end: SYX

El front-end se construye **exclusivamente** sobre el design system SYX:

- **Tema:** `syx--theme-ingravity` → `scss/themes/ingravity/setup.scss`
- **Body:** `<body class="syx syx--theme-ingravity">`
- **Clases:** respetar siempre los prefijos `atom-`, `mol-`, `org-`, `syx-`, `layout-grid`, `helper-`
- **No añadir clases personalizadas** fuera del contrato DOM SYX
- **Referencia de patrones HTML y SCSS:** ver `04-tecnologias.md`

---

## 3. Principios de diseño 2026

### Experiencia inmersiva y visual
- Hero con producto 3D interactivo o visualización 360°
- Simulación contextual: producto en cancha o entorno urbano
- Posible integración AR en fase futura

### Tipografía expresiva y cinética
- Titulares grandes, condensados, deportivos
- Movimiento sutil en scroll (GSAP ScrollTrigger)
- Micro-animaciones en hover (GSAP, `motion.fast` = 0.18s)

### Micro-interacciones con física
- Botón "Añadir al carrito" con efecto dinámico (fly-to-cart)
- Feedback inmediato visual
- Transiciones suaves entre vistas

### Minimalismo estructural + impacto visual
- Uso generoso de espacio negativo
- Layout modular con `layout-grid` + organismos SYX
- Foco absoluto en el producto
- Grids sólidos (nunca flex containers propios para layout principal)

### Color vibrante con contraste fuerte
- Base neutra oscura (`#0B0F14` Court Black)
- Acento naranja identitario (`#FF6A00` Court Orange)
- Acento azul eléctrico (`#00C2FF` Volt Blue) — uso contenido (5%)
- Ver sistema completo en `03-paleta-color.md`

### Gamificación ligera
- Sistema de badges o niveles de usuario
- Retos semanales
- Sistema de puntos por compra

### Navegación no convencional pero intuitiva
- Menú lateral dinámico (con animación GSAP)
- Filtros inteligentes (reordenación con GSAP Flip)
- Experiencia exploratoria

---

## 4. Tono de marca

| ✅ Es | ❌ No es |
|---|---|
| Potente | Corporativo frío |
| Seguro | Genérico deportivo |
| Urbano | Exagerado vacío |
| Técnico | Complejo o aburrido |
| Auténtico | Marketing de agencia |
| Inspirador | Aspiracional inalcanzable |

**Microcopy de referencia:**
- ❌ "La zapatilla más increíble jamás creada."
- ✅ "Placa reactiva en antepié para explosividad en cambios de ritmo."

**Microcopy UX de ejemplo:**
- "Añadir al carrito" · "Ver en 360°" · "Disponible en 24h" · "Quedan pocas unidades"

---

## 5. Arquitectura UX de páginas

### 5.1 Home
- Hero inmersivo con modelo 3D o imagen hero de producto estrella
- CTA claro (`atom-btn atom-btn--primary atom-btn--filled atom-btn--size-lg`)
- Categorías principales
- "Lo nuevo" — lanzamientos destacados
- Productos destacados (grid con `mol-product-card`)
- Sección comunidad / retos
- Newsletter

### 5.2 Listado de productos (PLP)
- Filtros avanzados con animación Flip (GSAP)
- Grid limpio (`org-product-grid`)
- Vista rápida (quickadd en hover)
- Reordenación animada
- Scroll fluido, mobile-first

### 5.3 Página de producto (PDP)
- Modelo 3D interactivo o visualización 360°
- Selector de tallas claro
- Storytelling técnico breve: máximo 3 bloques (Tecnología · Materiales · Rendimiento en cancha)
- Reviews visibles y creíbles
- CTA fijo o muy accesible
- Recomendaciones inteligentes

### 5.4 Checkout
- Máximo 3 pasos
- Indicador de progreso
- Feedback inmediato (micro-animaciones)
- Sensación de rapidez

---

## 6. Principios UX fundamentales

1. **Claridad sobre creatividad** — si hay duda, priorizar la usabilidad
2. **Feedback inmediato** — cada acción tiene respuesta visual
3. **Filtros accesibles en móvil** — nunca bloquear la interacción
4. **CTA visible en todo momento** — especialmente en PDP
5. **Reducción de fricción en checkout** — sin pasos innecesarios
6. **Respetar `prefers-reduced-motion`** — animaciones opcionales, nunca bloqueantes

---

## 7. Output esperado del proyecto

- Código base HTML/CSS/JS con arquitectura SYX
- Tema `syx--theme-ingravity` implementado
- Páginas: Home, PLP, PDP, Checkout
- Sistema de animación (GSAP motion-system)
- Documentación de cómo añadir nuevos componentes al sistema
