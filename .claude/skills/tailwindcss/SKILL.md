---
name: tailwindcss
displayName: Tailwind CSS
description: Tailwind CSS v4 utility-first styling patterns including responsive design, dark mode, and custom configuration. Use when styling with Tailwind, adding utility classes, configuring Tailwind, setting up dark mode, or customizing the theme.
version: 1.0.0
---

# Tailwind CSS v4 Development Guidelines

Best practices for using Tailwind CSS v4 utility classes effectively.

**Note**: Tailwind CSS v4 (released January 2025) uses a CSS-first configuration approach. If you need v3 compatibility, tailwind.config.js is still supported.

## Core Principles

1. **Utility-First**: Use utility classes instead of custom CSS
2. **Mobile-First**: Design for mobile, then scale up with responsive modifiers
3. **Component Extraction**: Extract repeated patterns into components
4. **Consistent Spacing**: Use Tailwind's spacing scale
5. **Custom Configuration**: Extend the default theme for brand consistency

## Basic Utilities

### Layout

```tsx
// Flexbox
<div className="flex items-center justify-between gap-4">
  <div className="flex-1">Content</div>
  <div className="flex-shrink-0">Sidebar</div>
</div>

// Grid
<div className="grid grid-cols-3 gap-4">
  <div>1</div><div>2</div><div>3</div>
</div>

// Positioning
<div className="relative">
  <div className="absolute top-0 right-0">Badge</div>
</div>
```

### Spacing

```tsx
<div className="p-4 m-2">         {/* padding: 1rem, margin: 0.5rem */}
<div className="px-6 py-4">       {/* padding-x: 1.5rem, padding-y: 1rem */}
<div className="mt-8 mb-4">       {/* margin-top: 2rem, margin-bottom: 1rem */}
<div className="space-y-4">       {/* margin-bottom on all but last child */}
```

### Typography

```tsx
<h1 className="text-4xl font-bold text-gray-900">Heading</h1>
<p className="text-base font-normal text-gray-600 leading-relaxed">Body</p>
<span className="text-sm font-medium text-blue-600">Label</span>
```

### Colors

```tsx
<p className="text-gray-900 dark:text-gray-100">Text</p>
<div className="bg-blue-500 hover:bg-blue-600">Button</div>
<div className="border border-gray-300">Box</div>
```

## Responsive Design

### Breakpoints (mobile-first)

```tsx
<div className="w-full md:w-1/2 lg:w-1/3">...</div>
<h1 className="text-2xl md:text-4xl lg:text-6xl">...</h1>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">...</div>
```

### Container

```tsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">...</div>
```

## Component Patterns

### Button

```tsx
<button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
  Click me
</button>
```

### Card

```tsx
<div className="bg-white rounded-lg shadow-md overflow-hidden">
  <img src="/image.jpg" alt="" className="w-full h-48 object-cover" />
  <div className="p-6">
    <h2 className="text-xl font-semibold mb-2">Card Title</h2>
    <p className="text-gray-600">Card content.</p>
  </div>
</div>
```

### Form Input

```tsx
<div className="space-y-2">
  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
  <input
    type="email" id="email"
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    placeholder="you@example.com"
  />
</div>
```

## State Variants

```tsx
<button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-2 focus:ring-blue-500">
  Interactive Button
</button>

// Group hover
<div className="group">
  <img src="/image.jpg" className="group-hover:opacity-75 transition-opacity" />
  <p className="group-hover:text-blue-600">Hover the container</p>
</div>
```

## Dark Mode

```css
/* globals.css — Tailwind v4 */
@import "tailwindcss";

@media (prefers-color-scheme: dark) { /* or use .dark class */ }
```

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <h1 className="text-gray-900 dark:text-white">Title</h1>
  <p className="text-gray-600 dark:text-gray-400">Description</p>
</div>
```

## Configuration

### Tailwind v4: CSS-First (no tailwind.config.js required)

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-brand-50: #eff6ff;
  --color-brand-900: #1e3a8a;
  --spacing-128: 32rem;
  --font-family-sans: 'Inter', sans-serif;
  --breakpoint-3xl: 1920px;
}
```

### Arbitrary Values

```tsx
<div className="top-[117px] bg-[#1da1f2] grid-cols-[200px_1fr]">
```

### @apply Directive

```css
.btn-primary {
  @apply px-4 py-2 bg-blue-600 text-white font-medium rounded-md;
  @apply hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}
```

## Common Layout Patterns

```tsx
// Centered full-screen
<div className="flex items-center justify-center min-h-screen">...</div>

// Sticky header
<header className="sticky top-0 z-50 bg-white shadow">...</header>

// Truncate / clamp text
<p className="truncate">Long text...</p>
<p className="line-clamp-2">Multi-line clamp...</p>
```

## Best Practices

1. Prefer utility combinations over custom CSS
2. Extract component classes using `@apply` for repeated patterns
3. Use responsive modifiers for mobile-first design
4. Leverage `@theme` for brand-consistent color/spacing tokens
5. Use semantic HTML with Tailwind classes
6. Always test dark mode variants
7. Keep utility combinations logically ordered (layout → spacing → typography → color → state)
