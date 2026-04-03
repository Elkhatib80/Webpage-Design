---
name: video-background-hero
description: Muted autoplay video hero sections with poster fallback, mobile image fallback, and performance-safe implementation. Use when building full-bleed video backgrounds like product launch heroes or homepage hero sections.
allowed-tools: Read, Write, Edit, Glob
---

# Video Background Hero

## Full Pattern

```tsx
'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface VideoHeroProps {
  videoSrc: string        // /videos/hero.mp4
  posterSrc: string       // /images/hero-poster.jpg (shown while video loads)
  mobileFallback: string  // /images/hero-mobile.jpg (shown on mobile)
  alt: string
  children?: React.ReactNode
}

export function VideoHero({ videoSrc, posterSrc, mobileFallback, alt, children }: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect mobile / reduced motion preference
    const mq = window.matchMedia('(max-width: 768px), (prefers-reduced-motion: reduce)')
    setIsMobile(mq.matches)
  }, [])

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Mobile: static image */}
      {isMobile ? (
        <Image
          src={mobileFallback}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        /* Desktop: autoplay video */
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline          // required for iOS autoplay
          poster={posterSrc}   // shown until first frame loads
          preload="metadata"   // load metadata only, not full video
        >
          <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        {children}
      </div>
    </section>
  )
}
```

## Usage

```tsx
<VideoHero
  videoSrc="/videos/smrtq-hero.mp4"
  posterSrc="/images/hero-poster.jpg"
  mobileFallback="/images/hero-mobile.jpg"
  alt="smrtQ power station in use"
>
  <h1 className="text-5xl font-bold text-center">Power Everything</h1>
  <p className="mt-4 text-xl text-center max-w-xl">
    4000W output. 72-hour runtime. Built for professionals.
  </p>
  <Button size="lg" className="mt-8">Shop Now</Button>
</VideoHero>
```

## Video File Requirements

| File | Spec | Notes |
|------|------|-------|
| hero.mp4 | H.264, AAC silent | Max 8MB for fast load |
| hero.webm | VP9/AV1 | 30–40% smaller than MP4 |
| hero-poster.jpg | Same frame as video start | Prevents flash of empty |
| hero-mobile.jpg | Portrait crop 768×1100 | Avoids landscape video on portrait |

## Encoding Command (FFmpeg)

```bash
# MP4 (H.264, no audio, web-optimized)
ffmpeg -i original.mov \
  -c:v libx264 -crf 23 -preset slow \
  -an -movflags +faststart \
  -vf "scale=1920:-2" \
  public/videos/hero.mp4

# WebM (VP9, better compression)
ffmpeg -i original.mov \
  -c:v libvpx-vp9 -crf 30 -b:v 0 \
  -an -vf "scale=1920:-2" \
  public/videos/hero.webm
```

## Performance Rules

- `preload="metadata"` — never `preload="auto"` (downloads full video on page load)
- Keep video under 8MB for fast initial paint
- Always provide `poster` — eliminates blank flash before first frame
- Always provide WebM source before MP4 — Chrome/Firefox prefer it (30-40% smaller)
- Mobile fallback is not optional — video autoplay is blocked on many mobile browsers

## Reduced Motion

The `prefers-reduced-motion` media query check in the component automatically falls back to the static image for users who have enabled reduced motion in system preferences. This is an accessibility requirement.
