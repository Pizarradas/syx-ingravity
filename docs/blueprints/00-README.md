# INGRAVITY — Basket Ecommerce 2026
## Índice de Blueprints

> **Para agentes IA:** Lee estos documentos en el orden indicado antes de generar cualquier código o propuesta de diseño. El sistema de diseño base es **SYX** — no inventes clases, tokens ni patrones que no estén definidos en él.

---

## Orden de lectura obligatorio

| # | Archivo | Contenido | Cuándo leerlo |
|---|---|---|---|
| 1 | [`01-proyecto.md`](./01-proyecto.md) | Visión, objetivos UX, estructura de páginas, tono de marca | Siempre. Es el punto de partida. |
| 2 | [`02-benchmark.md`](./02-benchmark.md) | Análisis competitivo, insights estratégicos, decisiones de diseño | Antes de proponer componentes o jerarquía visual. |
| 3 | [`03-paleta-color.md`](./03-paleta-color.md) | Sistema de color con integración en tokens SYX | Antes de crear o modificar cualquier tema o token de color. |
| 4 | [`04-tecnologias.md`](./04-tecnologias.md) | Stack técnico, arquitectura SYX, clases canónicas, patrones HTML | Antes de escribir cualquier HTML, SCSS o JS. |

---

## Contexto del proyecto

**INGRAVITY** es una tienda online de artículos de baloncesto (zapatillas, ropa, accesorios, ediciones limitadas y personalizables) orientada a usuarios de 16–40 años.

**Posicionamiento:** Experiencial + Técnica + Cultural. Entre el aspiracional de Nike, el funcional de Foot Locker y el técnico de StockX — pero con identidad propia de cultura basket urbana.

---

## Base front-end: SYX (obligatorio)

Todo el front-end se construye sobre el design system **SYX**:

- **Tema del proyecto:** `syx--theme-ingravity` (definido en `scss/themes/ingravity/`)
- **Sistema de clases:** `atom-` / `mol-` / `org-` / `syx-` / `layout-grid` / `helper-`
- **No usar clases propias** fuera del sistema SYX (sin `.hero-wrapper`, `.product-card`, etc.)
- **Referencia canónica de patrones HTML:** [`04-tecnologias.md`](./04-tecnologias.md)
- **Referencia canónica de SCSS:** archivos en `scss/` del repositorio

---

## Archivos de referencia en el repositorio

| Archivo | Propósito |
|---|---|
| `scss/AI_GUIDELINES.md` | Reglas estrictas de escritura SCSS con SYX |
| `scss/HTML-PATTERNS.md` | Patrones HTML canónicos y convenciones de naming |
| `landing-velox.html` / `landing-terra.html` | Implementaciones de referencia del sistema |
| `ds-system.html` | Inventario visual del design system |
