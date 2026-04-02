---
name: theme-system
description: CSS custom properties theme architecture with data-theme attribute switching and theme-aware components. Use when implementing theme switching, defining color schemes, or creating theme-responsive UI elements.
---

# Theme System

## Theme Definitions

```css
/* app/globals.css */
@layer base {
  :root {
    /* Default theme */
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --border: 0 0% 89.8%;
    --radius: 0.5rem;
  }

  [data-theme="earth"] {
    --background: 40 33% 98%;
    --foreground: 30 10% 15%;
    --primary: 30 30% 35%;
    --primary-foreground: 40 30% 98%;
    --secondary: 35 25% 92%;
    --muted: 35 20% 93%;
    --muted-foreground: 30 10% 40%;
    --accent: 35 30% 88%;
    --border: 35 20% 85%;
  }

  [data-theme="athlete"] {
    --background: 0 0% 99%;
    --foreground: 270 5% 10%;
    --primary: 270 60% 50%;
    --primary-foreground: 0 0% 100%;
    --secondary: 270 20% 95%;
    --muted: 270 10% 94%;
    --accent: 270 40% 92%;
    --border: 270 10% 88%;
    --ring: 270 60% 50%;
  }
}
```

## Theme Configuration

```tsx
// lib/theme.ts
export const themes = ['default', 'earth', 'athlete'] as const;
export type Theme = (typeof themes)[number];
export const defaultTheme: Theme = 'default';

export function isValidTheme(theme: string): theme is Theme {
  return themes.includes(theme as Theme);
}
```

## Theme Provider

```tsx
// components/ThemeProvider.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { type Theme, defaultTheme, isValidTheme } from '@/lib/theme';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlTheme = params.get('theme');
    
    if (urlTheme && isValidTheme(urlTheme)) {
      setTheme(urlTheme);
      document.documentElement.setAttribute('data-theme', urlTheme);
      return;
    }

    const stored = localStorage.getItem('theme');
    if (stored && isValidTheme(stored)) {
      setTheme(stored);
      document.documentElement.setAttribute('data-theme', stored);
    }
  }, []);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

## Layout Integration

```tsx
// app/layout.tsx
import { ThemeProvider } from '@/components/ThemeProvider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## Preview via URL

Access themes via query parameter:
- `?theme=default` — Clean minimal
- `?theme=earth` — Soft organic
- `?theme=athlete` — Bold purple
