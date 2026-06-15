# UNLOCK'D — Design System Overhaul PRD
### IEEE RAS MUJ · 36-Hour Progressive Software Development Challenge

> **Scope:** Style-only refactor. Do NOT touch component structure, routing, layout, section order, text content, or JS logic. Only update CSS, CSS variables, font imports, and visual properties. Every existing UI element must remain exactly where it is — only its appearance changes.

---

## 0. The Design Philosophy

The current site is functional but feels generic — flat cyan-on-black with no depth, no hierarchy, and no emotional pull. The target aesthetic is **"Deep Space Ops"**: the feeling of a mission control center floating in orbit. Think Vercel's precision meets SpaceX's cinematic weight meets a CTF/hacking challenge's edge. Every surface should feel like it's floating in deep space, lit by distant stars and blue nebula light.

**The three pillars:**
1. **Depth** — Nothing is flat. Every surface has translucency, blur, and a subtle inner glow.
2. **Precision** — Typography is tight, weighted, and intentional. No monospace walls of text.
3. **Energy** — The background is alive. The page breathes.

---

## 1. Cosmic 3D Background — The Starfield Engine

This is the most critical visual change. The background must be a **continuously animated 3D starfield** rendered on a `<canvas>` element fixed behind all content.

### Implementation
- Use **Three.js** (import via CDN: `https://unpkg.com/three@0.158.0/build/three.min.js`)
- Mount a `<canvas id="cosmos-bg">` as the **first child of `<body>`**, fixed position, `z-index: 0`, full viewport
- All page content sits on `z-index: 1` and above with `position: relative`

### The Effect — Layered and Alive

**Layer 1 — Deep Star Field (static)**
- 3,000 tiny point particles (`THREE.Points`) scattered across a sphere of radius 800
- Size: 0.3–0.8px, varying
- Color: white to pale-ice-blue (`#e8f4ff`)
- These barely move — they are the "infinity" backdrop

**Layer 2 — Warp Stream (primary animation)**
- 800 particles starting far ahead (z=+500) and rushing toward the camera
- When a particle passes z=camera, reset it to z=+500 at a random x/y
- Speed: `z -= 3.5` per frame (adjustable — not too fast, not a screensaver)
- As particles approach, they stretch into **line streaks** using `THREE.Line` segments:
  - Draw a line from `(x, y, z)` to `(x, y, z + velocity * 8)`
  - Opacity of streaks increases as they get closer to camera (depth fade)
- Color gradient: far = `#1a3a5c` (dark blue), close = `#00d4ff` (electric cyan)
- This creates the feeling of **moving through a star field at warp**

**Layer 3 — Nebula Orbs (ambient)**
- 3 large, soft `THREE.Sprite` objects using a radial-gradient canvas texture
- Colors: `rgba(0, 100, 200, 0.04)`, `rgba(0, 180, 255, 0.03)`, `rgba(30, 60, 120, 0.05)`
- Slowly drift: sine-wave oscillation in x/y with period 12–18 seconds
- These create the "ambient glow" of a nebula — you barely notice them but they add cosmic mood

**Layer 4 — Blue Dust Particles (subtle)**
- 200 very small particles with `opacity: 0.15–0.3`
- Color: `#0099ff`
- Float upward very slowly (`y += 0.08` per frame), reset to bottom when they exit top
- Add a floating, ethereal quality

### Camera and Render Settings
```js
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.z = 5;
renderer.setClearColor(0x00000, 1); // Pure deep black base
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap for perf
```

### Mouse Parallax (subtle)
- On `mousemove`, gently tilt the camera: `camera.rotation.x += (mouseY * 0.00008 - camera.rotation.x) * 0.05`
- Max tilt: ±0.04 radians — barely perceptible, but alive

### Performance
- `requestAnimationFrame` loop only
- Throttle particle count on mobile: 400 warp particles, 1500 static stars
- `renderer.setSize` on window resize with `updateProjectionMatrix()`

---

## 2. Color System

Replace ALL existing color variables with this new token set.

```css
:root {
  /* === Core Backgrounds === */
  --bg-void:        #00000;         /* Pure black — canvas base */
  --bg-deep:        #020a14;        /* Near-black deep navy */
  --bg-surface:     #040d1a;        /* Primary page background */
  --bg-elevated:    #071525;        /* Navbar, elevated sections */
  --bg-card:        rgba(6, 20, 40, 0.55);   /* Glassmorphism card base */
  --bg-card-hover:  rgba(8, 28, 58, 0.75);   /* Card hover state */

  /* === The Blue Spectrum — Core Palette === */
  --blue-void:      #001428;        /* Deepest blue — shadows */
  --blue-deep:      #002952;        /* Deep accent */
  --blue-mid:       #0057a8;        /* Mid-tone blue */
  --blue-bright:    #0085ff;        /* Primary interactive blue */
  --blue-electric:  #00aaff;        /* Hover / active states */
  --blue-neon:      #00d4ff;        /* Neon accent — sparingly */
  --blue-ice:       #7dd3fc;        /* Light text accents */
  --blue-white:     #e0f2fe;        /* Near-white with blue tint */

  /* === Accent — Used for the 'D' in UNLOCK'D and key CTAs === */
  --accent-primary:   #0099ff;
  --accent-glow:      #00aaff;
  --accent-hot:       #00ccff;

  /* === Text Hierarchy === */
  --text-primary:   #f0f8ff;        /* Alice blue — softer than pure white */
  --text-secondary: #94c8e8;        /* Muted blue-white */
  --text-muted:     #4a7fa5;        /* Placeholder / disabled */
  --text-accent:    #00aaff;        /* Links, active nav items */

  /* === Borders === */
  --border-subtle:   rgba(0, 150, 255, 0.08);
  --border-default:  rgba(0, 170, 255, 0.15);
  --border-bright:   rgba(0, 200, 255, 0.35);
  --border-glow:     rgba(0, 212, 255, 0.6);

  /* === Glow Effects === */
  --glow-sm:   0 0 8px rgba(0, 170, 255, 0.25);
  --glow-md:   0 0 20px rgba(0, 150, 255, 0.3), 0 0 40px rgba(0, 100, 200, 0.15);
  --glow-lg:   0 0 30px rgba(0, 170, 255, 0.4), 0 0 60px rgba(0, 120, 220, 0.2), 0 0 100px rgba(0, 80, 180, 0.1);
  --glow-text: 0 0 10px rgba(0, 200, 255, 0.6), 0 0 30px rgba(0, 150, 255, 0.3);

  /* === Glass Surfaces === */
  --glass-bg:      rgba(4, 16, 36, 0.6);
  --glass-border:  rgba(0, 160, 255, 0.18);
  --glass-blur:    blur(16px) saturate(160%);
  --glass-shadow:  0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(0, 180, 255, 0.1);

  /* === Gradients === */
  --gradient-hero:    linear-gradient(135deg, #020a14 0%, #010812 40%, #021020 100%);
  --gradient-card:    linear-gradient(135deg, rgba(0, 80, 160, 0.12) 0%, rgba(0, 40, 100, 0.08) 100%);
  --gradient-accent:  linear-gradient(90deg, #0057a8, #00aaff, #00d4ff);
  --gradient-text:    linear-gradient(135deg, #7dd3fc, #00aaff, #0085ff);
  --gradient-shine:   linear-gradient(105deg, transparent 40%, rgba(0, 180, 255, 0.08) 50%, transparent 60%);

  /* === Radii === */
  --radius-sm:   6px;
  --radius-md:   12px;
  --radius-lg:   16px;
  --radius-xl:   24px;

  /* === Transitions === */
  --ease-smooth:  cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1);
  --t-fast:   150ms;
  --t-mid:    300ms;
  --t-slow:   600ms;
}
```

---

## 3. Typography System

### Font Stack

Replace ALL fonts. Import via Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

| Role | Font | Weight | Use |
|------|------|--------|-----|
| **Display** | Space Grotesk | 700 | Hero title "UNLOCK'D", section headings like "RESOURCES", "BUILD" |
| **UI / Body** | Inter | 400, 500 | All body copy, nav items, card descriptions, labels |
| **Mono / Code** | JetBrains Mono | 400, 500 | "SCROLL TO UNLOCK", badges like "DOCUMENTATION", small caps labels, the "36 HOURS" stat, any code-flavored text |

```css
:root {
  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-body:    'Inter', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', 'Fira Code', monospace;
}

body {
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-primary);
  background: var(--bg-surface);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
```

### Type Scale

```css
/* Hero title — UNLOCK'D */
.hero-title {
  font-family: var(--font-display);
  font-size: clamp(72px, 10vw, 140px);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 0.95;
}

/* Section headings — RESOURCES, BUILD, 36 HOURS, CAREER-READY */
.section-heading {
  font-family: var(--font-mono);
  font-size: clamp(11px, 1.2vw, 13px);
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--text-accent);
}

/* Card titles — Official Git Documentation, etc. */
.card-title {
  font-family: var(--font-display);
  font-size: clamp(18px, 2vw, 22px);
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.2;
  color: var(--text-primary);
}

/* Card stat labels — BUILD, 36 HOURS, CAREER-READY */
.card-stat-label {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent-glow);
}

/* Body text */
.body-text {
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 400;
  line-height: 1.7;
  color: var(--text-secondary);
}

/* Micro labels — badges, tags */
.label-mono {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

/* Nav items */
nav a {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.01em;
}
```

---

## 4. Hero Section

### "UNLOCK'D" Title Treatment

The hero title is the centrepiece. Give it a **split treatment**:
- "UNLOCK'" — rendered in `var(--text-primary)` (#f0f8ff) with a barely-there text-shadow
- "D" — rendered in `var(--accent-hot)` with a full neon text glow

```css
.hero-title .accent-letter {
  color: var(--accent-hot);
  text-shadow: var(--glow-text);
  position: relative;
}

/* Subtle shimmer animation on the D */
.hero-title .accent-letter::after {
  content: 'D';
  position: absolute;
  left: 0; top: 0;
  color: transparent;
  background: var(--gradient-text);
  -webkit-background-clip: text;
  background-clip: text;
  animation: shimmer-pulse 3s ease-in-out infinite;
}

@keyframes shimmer-pulse {
  0%, 100% { opacity: 0; }
  50% { opacity: 0.6; }
}
```

### Subtitle — "36-Hour Progressive Software Development Challenge"

```css
.hero-subtitle {
  font-family: var(--font-display);
  font-size: clamp(20px, 2.5vw, 30px);
  font-weight: 500;
  color: var(--blue-ice);
  letter-spacing: -0.01em;
  line-height: 1.3;
  /* Remove the monospace font — use display instead */
}
```

### Description Copy

```css
.hero-description {
  font-family: var(--font-body);
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.75;
  max-width: 480px;
  /* Remove monospace entirely */
}
```

### "SCROLL TO UNLOCK" Label

Keep it mono but refine it:

```css
.scroll-label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.3em;
  color: var(--text-muted);
  text-transform: uppercase;
  /* Add a subtle animated underline that grows from left */
}
.scroll-label::after {
  content: '';
  display: block;
  width: 0%;
  height: 1px;
  background: var(--accent-primary);
  margin-top: 6px;
  animation: line-grow 2s var(--ease-smooth) 1s forwards;
}
@keyframes line-grow {
  to { width: 100%; }
}
```

---

## 5. Navbar

```css
nav, header {
  background: rgba(2, 8, 20, 0.7);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-bottom: 1px solid var(--border-subtle);
  /* Remove any solid background colors */
}

/* Inactive nav links */
nav a {
  color: rgba(148, 200, 232, 0.7);
  transition: color var(--t-fast) var(--ease-smooth);
  position: relative;
}

/* Hover underline effect */
nav a::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0;
  width: 0; height: 1px;
  background: var(--accent-glow);
  transition: width var(--t-mid) var(--ease-smooth);
}
nav a:hover::after { width: 100%; }
nav a:hover { color: var(--text-accent); }

/* Active nav link */
nav a.active {
  color: var(--accent-glow);
  text-shadow: 0 0 12px rgba(0, 170, 255, 0.5);
}
```

---

## 6. Feature Cards (BUILD / 36 HOURS / CAREER-READY)

The current cards are plain dark rectangles. Transform them into **dark glassmorphism cards** with a directional inner glow and a hover shimmer.

```css
.feature-card {
  background: var(--bg-card);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  position: relative;
  overflow: hidden;
  transition: transform var(--t-mid) var(--ease-spring),
              border-color var(--t-mid) var(--ease-smooth),
              box-shadow var(--t-mid) var(--ease-smooth);

  /* Subtle inner glow at top edge — like light from above */
  box-shadow: var(--glass-shadow),
              inset 0 1px 0 rgba(0, 180, 255, 0.12);
}

/* Animated gradient shimmer on hover */
.feature-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gradient-shine);
  background-size: 200% 100%;
  opacity: 0;
  transition: opacity var(--t-mid) var(--ease-smooth);
}

/* Top border glow line */
.feature-card::after {
  content: '';
  position: absolute;
  top: 0; left: 10%; right: 10%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
  opacity: 0.5;
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: var(--border-bright);
  box-shadow: var(--glow-md), var(--glass-shadow);
}
.feature-card:hover::before { opacity: 1; }
```

### Icon Container (the teal square icon buttons)

```css
.feature-icon-wrap {
  background: linear-gradient(135deg, rgba(0, 80, 160, 0.5), rgba(0, 40, 100, 0.3));
  border: 1px solid var(--border-bright);
  border-radius: var(--radius-md);
  box-shadow: var(--glow-sm), inset 0 0 20px rgba(0, 120, 220, 0.15);
  /* Do not change size — only colors */
}

/* Icon color */
.feature-icon-wrap svg,
.feature-icon-wrap i {
  color: var(--accent-glow);
  filter: drop-shadow(0 0 6px rgba(0, 200, 255, 0.6));
}
```

---

## 7. Resource Cards

Same glassmorphism base as feature cards, with these additions:

### Category Badge (DOCUMENTATION / TOOLING / LEARNING)

```css
.resource-badge {
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent-glow);
  background: rgba(0, 100, 200, 0.15);
  border: 1px solid rgba(0, 170, 255, 0.25);
  border-radius: 4px;
  padding: 3px 8px;
  /* Remove any old pill styling */
}
```

### "Visit Resource" Link

```css
.resource-link {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  color: var(--accent-glow);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: gap var(--t-fast), color var(--t-fast);
}
.resource-link:hover {
  color: var(--accent-hot);
  gap: 10px;
  text-shadow: 0 0 8px rgba(0, 200, 255, 0.4);
}
```

---

## 8. Bottom Filter Bar (ALL / DOCUMENTATION / TOOLING / LEARNING)

Transform the current plain tab bar into a **floating pill bar**:

```css
.filter-bar {
  background: rgba(2, 12, 28, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--border-default);
  border-radius: 100px; /* Full pill */
  padding: 6px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6),
              0 0 0 1px rgba(0, 140, 255, 0.08),
              inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.filter-tab {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-muted);
  border-radius: 100px;
  padding: 8px 16px;
  transition: all var(--t-mid) var(--ease-smooth);
}

.filter-tab.active {
  background: linear-gradient(135deg, rgba(0, 100, 200, 0.6), rgba(0, 60, 150, 0.4));
  color: var(--text-primary);
  box-shadow: var(--glow-sm), inset 0 1px 0 rgba(0, 200, 255, 0.2);
  border: 1px solid var(--border-bright);
}
```

---

## 9. Section Titles & Decorators

All current section titles (e.g. "AIM", "RESOURCES") currently look flat. Update the heading area:

```css
/* The small overline label above section titles */
.section-overline {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--text-accent);
  opacity: 0.8;
}

/* Underline accent bar below section titles */
.section-divider {
  width: 48px;
  height: 2px;
  background: var(--gradient-accent);
  border-radius: 2px;
  box-shadow: 0 0 8px rgba(0, 170, 255, 0.5);
  margin: 16px auto 0; /* or margin: 16px 0 for left-aligned */
}

/* Section title text */
.section-title {
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--text-primary) 40%, var(--blue-ice) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## 10. The Lock Icon / "UNLOCKED" Floating Badge

The floating padlock in the bottom-right is a cool detail — make it shine:

```css
.floating-lock {
  background: rgba(0, 40, 100, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-bright);
  border-radius: var(--radius-md);
  box-shadow: var(--glow-md);
  padding: 12px 16px;
}

.floating-lock svg {
  color: var(--accent-glow);
  filter: drop-shadow(0 0 6px rgba(0, 200, 255, 0.7));
}

.floating-lock .lock-label {
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent-glow);
}
```

---

## 11. Info Stat Boxes (Date / Location icons at bottom of hero)

```css
.stat-box {
  background: rgba(4, 16, 40, 0.5);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  border-top: 1px solid var(--border-default);
  transition: border-color var(--t-mid), box-shadow var(--t-mid);
}
.stat-box:hover {
  border-color: var(--border-bright);
  box-shadow: var(--glow-sm);
}
.stat-box svg {
  color: var(--accent-glow);
  filter: drop-shadow(0 0 4px rgba(0, 180, 255, 0.5));
}
```

---

## 12. Body / Page Background

```css
html, body {
  background-color: var(--bg-surface); /* fallback if canvas fails */
  min-height: 100vh;
  position: relative;
}

/* The cosmos canvas */
#cosmos-bg {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 0;
  pointer-events: none;
}

/* Every section/page wrapper */
.page-wrapper,
main,
section {
  position: relative;
  z-index: 1;
}
```

### Ambient Background Gradient (fallback + complement to canvas)

Behind all sections, add a very subtle ambient gradient mesh. These are fixed, blurred color orbs positioned with CSS:

```css
body::before {
  content: '';
  position: fixed;
  width: 600px; height: 600px;
  top: -100px; left: -150px;
  background: radial-gradient(circle, rgba(0, 80, 200, 0.08) 0%, transparent 65%);
  pointer-events: none;
  z-index: 0;
}

body::after {
  content: '';
  position: fixed;
  width: 500px; height: 500px;
  bottom: -100px; right: -100px;
  background: radial-gradient(circle, rgba(0, 120, 255, 0.06) 0%, transparent 60%);
  pointer-events: none;
  z-index: 0;
}
```

---

## 13. Scrollbar

```css
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: var(--bg-deep);
}
::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, var(--blue-mid), var(--accent-primary));
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--accent-glow);
}
```

---

## 14. Micro-interactions & Animations

Add these global keyframes:

```css
@keyframes float-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: var(--glow-sm); }
  50%       { box-shadow: var(--glow-md); }
}

@keyframes border-glow {
  0%, 100% { border-color: var(--border-default); }
  50%       { border-color: var(--border-bright); }
}

/* Apply on section entry — use IntersectionObserver or Framer Motion / AOS */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s var(--ease-smooth), transform 0.6s var(--ease-smooth);
}
.animate-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 15. Selection Color

```css
::selection {
  background: rgba(0, 170, 255, 0.3);
  color: var(--text-primary);
}
```

---

## 16. What NOT to Change

This is critical. The AI must read this section carefully.

| ❌ DO NOT touch | ✅ Only change |
|---|---|
| Component structure (divs, sections, flexbox layout) | CSS `color`, `background`, `border`, `box-shadow`, `font-*` |
| Nav link text or href values | `backdrop-filter` additions |
| Card titles, descriptions, body copy | `transition` and `animation` properties |
| Image positions or src values | `::before` / `::after` pseudo-elements for visual decoration |
| Icon types or positions | `text-shadow` and `filter: drop-shadow` |
| Section order or page routing | Font import `<link>` tags in `<head>` |
| JS functionality | `--css-variable` definitions in `:root` |
| Next.js files outside styling | Tailwind class values for colors (map to new palette) |
| External library versions | `@keyframes` additions |

---

## 17. Tailwind Class Mapping (if project uses Tailwind)

If the project uses Tailwind CSS, extend the config rather than writing raw CSS:

```js
// tailwind.config.js — extend, don't replace
theme: {
  extend: {
    colors: {
      'bg-void':     '#000000',
      'bg-deep':     '#020a14',
      'bg-surface':  '#040d1a',
      'bg-card':     'rgba(6, 20, 40, 0.55)',
      'blue-electric': '#00aaff',
      'blue-neon':   '#00d4ff',
      'blue-ice':    '#7dd3fc',
      'accent':      '#0099ff',
    },
    fontFamily: {
      'display': ['Space Grotesk', 'system-ui', 'sans-serif'],
      'body':    ['Inter', 'system-ui', 'sans-serif'],
      'mono':    ['JetBrains Mono', 'Fira Code', 'monospace'],
    },
    backdropBlur: {
      'glass': '16px',
    },
    boxShadow: {
      'glow-sm':  '0 0 8px rgba(0, 170, 255, 0.25)',
      'glow-md':  '0 0 20px rgba(0, 150, 255, 0.3), 0 0 40px rgba(0, 100, 200, 0.15)',
      'glow-lg':  '0 0 30px rgba(0, 170, 255, 0.4), 0 0 60px rgba(0, 120, 220, 0.2)',
      'glass':    '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(0, 180, 255, 0.1)',
    },
  }
}
```

---

## 18. Final Aesthetic Check

Before shipping, validate against this checklist:

- [ ] Background shows moving stars — no static black void
- [ ] "UNLOCK'D" hero title: 'D' glows distinctly in electric cyan
- [ ] Cards have visible translucency — you can sense depth behind them
- [ ] Nav is glass, not solid
- [ ] All monospace text (labels, badges, stats) uses JetBrains Mono
- [ ] All headings use Space Grotesk
- [ ] All body text uses Inter
- [ ] Hover on cards lifts them + border brightens
- [ ] No pure `#00bcd4` / old-style flat cyan anywhere
- [ ] Scrollbar is themed
- [ ] No white or off-white pure backgrounds visible
- [ ] Page feels like you're reading mission data inwait