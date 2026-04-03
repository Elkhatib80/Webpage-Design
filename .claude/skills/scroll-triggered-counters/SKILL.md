---
name: scroll-triggered-counters
description: Animate spec numbers (4000+, 2048Wh, 2400W) from zero when they enter the viewport using Framer Motion and Intersection Observer. Use for product spec sections, stat callouts, and feature highlights.
allowed-tools: Read, Write, Edit, Glob
---

# Scroll-Triggered Counters

## AnimatedCounter Component

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, useSpring, animate } from 'framer-motion'

interface AnimatedCounterProps {
  target: number
  suffix?: string   // '+', 'Wh', 'W', '%', 'h'
  prefix?: string   // '$', '~'
  duration?: number // seconds, default 2
  className?: string
}

export function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  duration = 2,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const controls = animate(0, target, {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuart — fast start, slow end
      onUpdate(value) {
        setDisplayValue(Math.round(value))
      },
    })

    return () => controls.stop()
  }, [isInView, target, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  )
}
```

## Spec Section Usage

```tsx
// Product spec callout — mimics Bluetti/EcoFlow pattern
const specs = [
  { target: 4000, suffix: 'W', label: 'Output Power' },
  { target: 2048, suffix: 'Wh', label: 'Capacity' },
  { target: 2400, suffix: 'W', label: 'Solar Input' },
  { target: 72, suffix: 'h', label: 'Runtime' },
]

export function SpecCounter() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 px-4 bg-gray-950 text-white">
      {specs.map((spec) => (
        <div key={spec.label} className="text-center">
          <div className="text-5xl font-bold text-yellow-400">
            <AnimatedCounter
              target={spec.target}
              suffix={spec.suffix}
              duration={2}
            />
          </div>
          <div className="mt-2 text-sm text-gray-400 uppercase tracking-wider">
            {spec.label}
          </div>
        </div>
      ))}
    </section>
  )
}
```

## With + Prefix (e.g. "4000+")

```tsx
<AnimatedCounter target={4000} suffix="+" duration={1.8} />
// Renders: 4,000+
```

## Staggered Entry (multiple counters)

```tsx
'use client'

import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function StaggeredSpecs() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10%' }}
      className="grid grid-cols-4 gap-8"
    >
      {specs.map((spec) => (
        <motion.div key={spec.label} variants={item} className="text-center">
          <AnimatedCounter target={spec.target} suffix={spec.suffix} />
          <p className="text-sm text-gray-400">{spec.label}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}
```

## Rules

- `once: true` in `useInView` — counter only runs once, not on every scroll
- `margin: '-10% 0px'` — triggers slightly before element is fully visible (feels more natural)
- Use `toLocaleString()` for numbers ≥ 1000 (adds comma: `4,000`)
- Keep `duration` between 1.5–2.5s — shorter feels cheap, longer feels slow
- `easeOutQuart` curve makes animation feel physical (fast initial surge, smooth settle)
- Respect `prefers-reduced-motion`: skip animation if reduced motion is set

## Reduced Motion Guard

```tsx
useEffect(() => {
  if (!isInView) return
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) {
    setDisplayValue(target)  // jump straight to final value
    return
  }
  // ... animate
}, [isInView])
```
