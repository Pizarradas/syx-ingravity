# 02 — Benchmark & Estrategia Competitiva

> **Lectura previa:** `01-proyecto.md`  
> **Siguiente:** `03-paleta-color.md`

---

## 1. Contexto

Análisis competitivo del mercado de ecommerce de basket 2026, con decisiones estratégicas y de componentes SYX derivadas de los insights.

---

## 2. Benchmark competitivo

### 2.1 Nike
| | |
|---|---|
| **Fortalezas** | Storytelling de producto impecable · Jerarquía visual clara · Fotografía aspiracional · Tecnología explicada en narrativa visual |
| **Debilidades** | Enfoque corporativo · Poca exploración interactiva real · Animación limitada a lo editorial |

### 2.2 Foot Locker
| | |
|---|---|
| **Fortalezas** | UX funcional · Filtros claros · Producto protagonista |
| **Debilidades** | Experiencia visual plana · Falta de emoción · Escasa diferenciación digital |

### 2.3 StockX
| | |
|---|---|
| **Fortalezas** | Transparencia en precios · Confianza · Datos visibles (gráficos, histórico) |
| **Debilidades** | Frialdad estética · Escasa identidad emocional · Interacción mínima |

### 2.4 KicksCrew
| | |
|---|---|
| **Fortalezas** | Visual fuerte · Catálogo amplio |
| **Debilidades** | Sobrecarga visual · Exceso de información simultánea · Jerarquía irregular |

---

## 3. Tabla comparativa de criterios

Escala: 1 = Muy bajo · 2 = Bajo · 3 = Correcto · 4 = Bueno · 5 = Excelente

| Criterio | Nike | Foot Locker | StockX | KicksCrew | **Oportunidad** |
|---|:---:|:---:|:---:|:---:|:---:|
| Claridad UX | 5 | 4 | 4 | 3 | **5** |
| Storytelling producto | 5 | 2 | 2 | 3 | **4** |
| Micro-interacciones | 3 | 2 | 1 | 2 | **5** |
| Animación útil | 3 | 1 | 1 | 2 | **5** |
| Diseño emocional | 5 | 2 | 1 | 3 | **4** |
| Cultura basket auténtica | 4 | 3 | 1 | 3 | **5** |
| Rendimiento percibido | 4 | 4 | 5 | 3 | **5** |
| Accesibilidad visible | 4 | 3 | 4 | 2 | **5** |
| Checkout simplificado | 4 | 3 | 4 | 3 | **5** |
| Diferenciación digital | 4 | 2 | 2 | 2 | **5** |
| 3D / Experiencia inmersiva | 3 | 1 | 1 | 2 | **4** |
| Gamificación | 1 | 1 | 1 | 1 | **4** |

---

## 4. Insights estratégicos

1. **Nike domina lo emocional y narrativo** — pero no innova en interacción avanzada.
2. **Foot Locker es funcional pero plano** — buena base UX, cero diferenciación.
3. **StockX domina confianza y datos** — frío, nada experiencial.
4. **KicksCrew tiene intención visual** — sin sistema sólido detrás.

**Oportunidades claras del mercado:**
- Escasez de micro-interacciones memorables
- Falta de gamificación ligera
- Storytelling técnico simplificado (no largo)
- Experiencia verdaderamente inmersiva pero rápida

---

## 5. Posicionamiento estratégico

```
Nike       → Aspiracional
Foot Locker → Funcional
StockX     → Transaccional
KicksCrew  → Visual

INGRAVITY  → Experiencial + Técnica + Cultural
```

---

## 6. Problemas a evitar (lecciones del mercado)

| Problema frecuente | Solución en este proyecto |
|---|---|
| Sobrecarga visual | Minimalismo estructural + `layout-grid` SYX |
| Filtros complejos en móvil | `org-product-filters` mobile-first, animados con GSAP Flip |
| Storytelling demasiado largo | Máximo 3 bloques narrativos por PDP |
| Animaciones innecesarias | Solo GSAP con `motion.base` ≤ 0.32s, reducemotion respetado |
| Checkout lento o con fricción | Máximo 3 pasos, feedback inmediato |

---

## 7. Decisiones estratégicas

### 7.1 Producto primero
El producto domina el layout. Nada compite con él visualmente.

### 7.2 Storytelling modular
Máximo 3 bloques narrativos por PDP:
- Tecnología
- Materiales
- Rendimiento en cancha

### 7.3 Micro-interacciones premium
- Hover cards con elevación sutil: `mol-product-card` con `y: -6px` vía GSAP
- Add-to-cart con feedback físico: fly-to-cart animado con `MotionPathPlugin`
- Filtros animados con GSAP `Flip`

### 7.4 Velocidad > espectáculo
- Duraciones: `motion.fast` (0.18s) a `motion.slow` (0.6s)
- Nunca bloquear la interacción del usuario
- CLS cero: reservar espacio con `width`/`height` en imágenes

---

## 8. Implicaciones para componentes SYX

| Insight | Decisión de componente |
|---|---|
| Filtros animados | GSAP Flip sobre `org-product-filters__grid` |
| Add-to-cart memorable | `MotionPathPlugin` desde `mol-product-card__media` hasta `org-navbar__cart-icon` |
| Storytelling técnico | `org-pdp-story__section` con ScrollTrigger reveal |
| Grid con quickadd | `mol-product-card__quick-add` — aparece en hover (opacity + y) |
| Drawer de carrito | `org-cart-drawer` + modificador `org-cart-drawer--open` (estado JS) |

---

## 9. KPIs objetivo

| Métrica | Objetivo |
|---|---|
| Conversión | 2.5% – 4% |
| Bounce rate | < 40% |
| Tiempo medio en PDP | > 1:20 min |
| Interacción con producto | > 60% |
| Abandono de carrito | < 65% |
