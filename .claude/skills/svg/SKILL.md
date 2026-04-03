---
name: svg
description: SVG creation, optimization, and transformation specialist. Use when creating vector graphics, optimizing SVG files with SVGO, implementing icon systems, building data visualizations, or adding SVG animations.
license: Apache-2.0
compatibility: Designed for Claude Code
allowed-tools: Read Grep Glob Bash
user-invocable: false
metadata:
  version: "1.0.0"
  category: "tool"
  status: "active"
  tags: "svg, vector, graphics, svgo, optimization, animation, icons"
---

# SVG Creation and Optimization

## Basic SVG Template

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <title>Accessible Title</title>
  <desc>Description for screen readers</desc>
  <!-- Content here -->
</svg>
```

## Common Shapes

```
Rectangle:  <rect x="10" y="10" width="80" height="60" rx="5" />
Circle:     <circle cx="50" cy="50" r="40" />
Line:       <line x1="10" y1="10" x2="90" y2="90" stroke="black" />
Polygon:    <polygon points="50,10 90,90 10,90" />
```

## Path Commands

```
M x y    Move to absolute     m dx dy  Move relative
L x y    Line to absolute     l dx dy  Line relative
H x      Horizontal absolute  V y      Vertical absolute
C x1 y1 x2 y2 x y  Cubic bezier
Q x1 y1 x y        Quadratic bezier
Z                  Close path
```

## SVGO CLI

```bash
npm install -g svgo
svgo input.svg -o output.svg
svgo -f ./src/icons -o ./dist/icons
```

## SVGO Configuration

```javascript
export default {
  multipass: true,
  plugins: [
    'preset-default',
    'prefixIds',
    { name: 'sortAttrs', params: { xmlnsOrder: 'alphabetical' } },
    { name: 'removeAttrs', params: { attrs: ['data-name', 'class'] } }
  ]
};
```

## Reusable Symbols

```xml
<svg xmlns="http://www.w3.org/2000/svg">
  <defs>
    <symbol id="icon-star" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </symbol>
  </defs>
  <use href="#icon-star" x="0" y="0" width="24" height="24" />
  <use href="#icon-star" x="30" y="0" width="24" height="24" fill="gold" />
</svg>
```

## React SVG Component

```tsx
const Icon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2L2 7l10 5 10-5-10-5z" stroke={color} strokeWidth="2" />
  </svg>
);
```

## CSS Animation

```css
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
}
.animated-circle { animation: pulse 2s ease-in-out infinite; }

/* Stroke drawing */
.draw-path { stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: draw 2s ease forwards; }
@keyframes draw { to { stroke-dashoffset: 0; } }
```

## Accessibility

```xml
<!-- Meaningful -->
<svg role="img" aria-labelledby="title desc">
  <title id="title">Company Logo</title>
  <desc id="desc">A blue mountain with snow-capped peak</desc>
</svg>

<!-- Decorative -->
<svg aria-hidden="true" focusable="false">
```

## Gradient

```xml
<defs>
  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#3498db" />
    <stop offset="100%" stop-color="#e74c3c" />
  </linearGradient>
</defs>
<rect fill="url(#grad)" width="200" height="100" />
```
