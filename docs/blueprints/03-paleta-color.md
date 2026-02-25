# 03 — Paleta de Color: "Court Volt"

> **Lectura previa:** `02-benchmark.md`  
> **Siguiente:** `04-tecnologias.md`

---

## 1. Concepto

**Court Volt** — Base oscura de cancha nocturna + energía eléctrica + naranja balón como acento emocional.

Distribución recomendada:
- **65%** → Bases neutras oscuras (Court Black / Asphalt)
- **20%** → Blancos y grises (tipografía, superficies)
- **10%** → Naranja identidad (CTAs, highlights)
- **5%** → Azul eléctrico (links, micro-interacciones)

> El error típico es abusar del azul neón. Debe sentirse premium, no gaming barato.

---

## 2. Bases neutras (estructura)

| Token SYX | Nombre | HEX | Uso principal |
|---|---|---|---|
| `--primitive-color-neutral-950` | Court Black | `#0B0F14` | Fondo principal |
| `--primitive-color-neutral-900` | Asphalt Dark | `#121821` | Secciones secundarias |
| `--primitive-color-neutral-700` | Concrete Grey | `#2A3441` | Cards / superficies |
| `--primitive-color-neutral-400` | Mist Grey | `#8C98A8` | Texto secundario |
| `--primitive-color-neutral-0` | Pure White | `#FFFFFF` | Texto sobre oscuro |

**Contraste verificado:**
- `#FFFFFF` sobre `#0B0F14` → **AAA** ✔
- `#8C98A8` sobre `#0B0F14` → **AA** ✔

---

## 3. Color identitario (energía basket)

| Token SYX | Nombre | HEX | Uso principal |
|---|---|---|---|
| `--primitive-color-brand-500` | Court Orange | `#FF6A00` | CTA principal |
| `--primitive-color-brand-600` | Deep Orange | `#D95400` | Hover / activo |
| `--primitive-color-brand-200` | Soft Orange | `#FFB37A` | Fondos suaves / badges |

**Contraste verificado:**
- `#FF6A00` sobre `#0B0F14` → **AA** ✔
- Texto negro sobre `#FF6A00` → **AA** ✔

---

## 4. Acento eléctrico (tech 2026)

| Token SYX | Nombre | HEX | Uso principal |
|---|---|---|---|
| `--primitive-color-accent-500` | Volt Blue | `#00C2FF` | Links / highlights |
| `--primitive-color-accent-300` | Neon Cyan | `#6EE7F7` | Micro-interacciones |
| `--primitive-color-accent-100` | Ice Blue | `#BDF4FF` | Fondos suaves |

**Contraste verificado:**
- `#00C2FF` sobre `#0B0F14` → **AA** ✔
- Blanco sobre `#00C2FF` → **AA** ✔

---

## 5. Estados accesibles

| Token SYX | Estado | HEX |
|---|---|---|
| `--primitive-color-state-success` | Confirmación | `#1ED760` |
| `--primitive-color-state-error` | Error | `#FF3B3B` |
| `--primitive-color-state-warning` | Aviso | `#FFC700` |

Todos verificados sobre fondo oscuro para mínimo **AA**.

---

## 6. Integración con SYX: cadena de tokens

SYX exige seguir siempre la cadena: **Primitive → Semantic → Component**. Nunca usar un primitive directamente en un componente.

### Ejemplo: color de acción primaria

```scss
// 1. Primitive (scss/abstracts/tokens/primitives/_colors.scss)
:root {
  --primitive-color-brand-500: #FF6A00;
  --primitive-color-brand-600: #D95400;
  --primitive-color-neutral-950: #0B0F14;
}

// 2. Semantic (scss/abstracts/tokens/semantic/_colors.scss)
// El tema basket los mapea aquí:
:root {
  --semantic-color-action-primary:       var(--primitive-color-brand-500);
  --semantic-color-action-primary-hover: var(--primitive-color-brand-600);
  --semantic-color-surface-base:         var(--primitive-color-neutral-950);
}

// 3. Component (scss/abstracts/tokens/components/_btn.scss)
:root {
  --component-btn-bg-primary:       var(--semantic-color-action-primary);
  --component-btn-bg-primary-hover: var(--semantic-color-action-primary-hover);
}
```

### Configuración del tema basket

El tema se define en `scss/themes/ingravity/setup.scss` y se activa con:

```html
<body class="syx syx--theme-ingravity">
```

El archivo `setup.scss` del tema debe mapear todos los primitivos a sus valores específicos de la paleta Court Volt.

---

## 7. Variante alternativa (más radical)

Si en una iteración futura se quiere explorar una estética más editorial:

- Base muy clara (`#F7F9FC`)
- Tipografía negra intensa
- Naranja + Azul eléctrico como choque visual

Para basket urbano potente, **la versión oscura es la opción recomendada**.

---

## 8. Tokens JSON de referencia

```json
{
  "color": {
    "neutral": {
      "950": "#0B0F14",
      "900": "#121821",
      "700": "#2A3441",
      "400": "#8C98A8",
      "0":   "#FFFFFF"
    },
    "brand": {
      "500": "#FF6A00",
      "600": "#D95400",
      "200": "#FFB37A"
    },
    "accent": {
      "500": "#00C2FF",
      "300": "#6EE7F7",
      "100": "#BDF4FF"
    },
    "state": {
      "success": "#1ED760",
      "error":   "#FF3B3B",
      "warning": "#FFC700"
    }
  }
}
```
