# SYX · Campaign Theming

> **¿Puede Marketing activar un rebrand visual completo para una campaña sin que ingeniería toque el front-end?**  
> Este directorio documenta el experimento que responde esa pregunta.

---

## Contenido

| Documento                                         | Descripción                                                                                               |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| [01 · Caso técnico](./01-technical-case-study.md) | Arquitectura, implementación y resultados del tema de campaña Cayo Court Summer Drop 2026 sobre INGRAVITY |
| [02 · Valor de negocio](./02-business-value.md)   | Qué obtiene la empresa con la adopción de SYX para campaign theming                                       |

---

## El experimento en una frase

Pasar de **Court Volt** (oscuro, urbano, deportivo) a **Cayo Court** (cálido, editorial, resort) en las 3 páginas del site de INGRAVITY — sin modificar ningún fichero `.html`, ningún componente, ningún JavaScript.

```
Antes → css/styles-theme-ingravity.css       (tema base, oscuro)
Después → css/ingravity-summer-landing.css   (campaña, luminoso)
```

Un swap de `href`. Eso es todo.

---

## Resultados rápidos

- **7 mejoras visuales** implementadas solo con CSS
- **0 líneas de HTML** modificadas
- **0 componentes** retocados
- **–18% tamaño de bundle** en checkout vs monolito
- **Activación:** 1 fichero CSS (o feature flag)

---

## Archivos generados por el experimento

```
scss/themes/ingravity/
  _theme-summer.scss          ← overrides del tema campaña
  styles-summer-landing.scss  ← entry point optimizado: landing
  styles-summer-plp.scss      ← entry point optimizado: PLP
  styles-summer-checkout.scss ← entry point optimizado: checkout

scss/
  styles-summer-landing.scss  ← wrapper raíz (requerido por el compilador)
  styles-summer-plp.scss
  styles-summer-checkout.scss

css/
  ingravity-summer-landing.css   ← bundle final: landing
  ingravity-summer-plp.css       ← bundle final: PLP
  ingravity-summer-checkout.css  ← bundle final: checkout

js/
  theme-switcher.js              ← page-aware, sin dependencias
```

---

_Experimento realizado: febrero 2026_  
_Marca: INGRAVITY · Design system: SYX_
