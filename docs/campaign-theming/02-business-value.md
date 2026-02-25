# 02 · Valor de negocio: ¿Qué obtiene INGRAVITY con SYX?

## La pregunta de negocio

Una vez demostrado que el campaign theming es técnicamente posible, la pregunta relevante es otra: **¿qué problema de negocio resuelve, y a quién le importa?**

---

## Para Marketing

### Autonomía de campaña real

Los equipos de marketing pueden definir y activar un tema visual para cualquier campaña — verano, Black Friday, una collab de marca — sin abrir un ticket de desarrollo, sin esperar un sprint, sin depender del roadmap de producto.

El proceso pasa de ser:

```
Marketing idea campaña → ticket a front-end → priorización → sprint → QA → deploy
(semanas)
```

A ser:

```
Marketing idea campaña → diseño del tema en tokens → compilación CSS → activación
(días, potencialmente horas)
```

### Sin ventanas de congelación de código

Las campañas no compiten con los deploys de funcionalidades. El CSS de tema es un fichero independiente que no toca ningún componente. No hay riesgo de bloqueo de despliegue por campaña.

### Identidad de campaña con consistencia de marca garantizada

Los temas de campaña heredan la estructura de componentes del sistema base. No hay riesgo de que el hero de verano use una tipografía diferente al del resto del site — el sistema de tokens garantiza coherencia interna.

---

## Para Ingeniería

### Cero riesgo de regresión en rebrand

No se modifica HTML. No se tocan componentes. El CSS de campaña es aditivo y completamente aislado. Si algo falla, el rollback es cambiar un `href`:

```javascript
// Rollback instantáneo — 0ms, sin deploy
document.getElementById("theme-style").href = "css/styles-theme-ingravity.css";
```

### Sin acumulación de variantes en los componentes

Sin SYX, cada campaña tiende a generar variantes de componente:

```html
<!-- deuda técnica acumulada sin system de tokens -->
<button class="btn btn--summer btn--blackfriday btn--collab-nike"></button>
```

Con SYX, los componentes no saben nada de la campaña. La variación está en los tokens. Los componentes permanecen limpios.

### Deuda técnica controlada por diseño

El tema de campaña vive en `_theme-summer.scss`. Cuando la campaña termina, ese fichero deja de cargarse. No hay código muerto repartido por componentes que limpiar.

---

## Para el Negocio

### El coste del rebrand no escala con el tamaño del site

Si INGRAVITY pasa de 3 páginas a 30, el esfuerzo de un nuevo tema de campaña sigue siendo el mismo: redefinir los primitivos y escribir los overrides necesarios. El árbol de tokens hace el resto.

| Acción de campaña           | Sin design system                 | Con SYX                            |
| --------------------------- | --------------------------------- | ---------------------------------- |
| Cambio de paleta completa   | Auditoría de componentes + sprint | 5–10 tokens primitivos             |
| Nueva tipografía de campaña | Buscar y reemplazar + QA          | 2 tokens semánticos                |
| Espaciado general diferente | Auditoría manual                  | 1 token primitivo                  |
| Efectos visuales CSS        | Añadir clases al HTML             | Override en `_theme-campaign.scss` |
| Activación del tema         | Deploy de front-end               | Swap de 1 `href` (o feature flag)  |
| Rollback                    | Nuevo deploy                      | Cambiar el `href` de vuelta        |

### La identidad de marca es un activo versionable

`_theme-summer.scss` vive en el repositorio. Se versiona, se documenta, se puede reutilizar el año siguiente o clonar como base para el tema de otoño. El trabajo de diseño de la campaña no se pierde — se preserva en código.

### Independencia de stack tecnológico

El sistema no depende de ningún framework, CMS, ni plataforma. Es CSS estándar compilado desde SCSS. Funciona en cualquier stack donde puedas servir un fichero `.css`. Si INGRAVITY migra de proveedor de e-commerce, el design system viaja con ellos.

---

## Los números del experimento

| Métrica                        | Valor    |
| ------------------------------ | -------- |
| Mejoras visuales implementadas | 7        |
| Líneas de HTML modificadas     | 0        |
| Componentes retocados          | 0        |
| JavaScript añadido al site     | 0 líneas |
| Reducción de bundle (checkout) | –18%     |
| Tiempo de rollback             | ~0ms     |

---

## Conclusión

SYX no es solo una herramienta de desarrollo. Es la infraestructura que permite que los equipos de marketing y diseño operen con velocidad de campaña sin bloquear a ingeniería, y sin acumular deuda técnica en el proceso.

El coste no está en la campaña. El coste está en construir bien la base.
Y esa base, una vez construida, es el activo más duradero del producto.

---

← [Caso técnico](./01-technical-case-study.md) · [Volver al índice](./README.md)
