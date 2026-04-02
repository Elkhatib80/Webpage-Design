---
name: tailwind-shadcn
description: Tailwind CSS utility patterns with shadcn/ui component usage, theming via CSS variables, and responsive design. Use when styling components, installing shadcn components, implementing dark mode, or creating consistent design systems.
---

# Tailwind CSS + shadcn/ui

## shadcn/ui Installation

```bash
# Initialize shadcn
npx shadcn@latest init

# Add individual components
npx shadcn@latest add button card form input accordion dialog dropdown-menu tabs
```

## Component Usage

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Button variants
<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>

// Card composition
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

## CSS Variables Theming

```css
/* globals.css */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --muted: 0 0% 96.1%;
    --border: 0 0% 89.8%;
    --radius: 0.5rem;
  }

  [data-theme="earth"] {
    --background: 40 20% 98%;
    --foreground: 30 10% 15%;
    --primary: 30 30% 35%;
  }
}
```

## Responsive Design

```tsx
// Mobile-first approach
<div className="
  px-4 md:px-6 lg:px-8
  text-sm md:text-base lg:text-lg
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  flex flex-col md:flex-row
  hidden md:block
  md:hidden
">
```

## Common Utility Patterns

```tsx
// Flexbox centering
<div className="flex items-center justify-center">

// Grid with gap
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

// Spacing
<div className="space-y-4">

// Typography
<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
<p className="text-muted-foreground text-sm leading-relaxed">

// Hover/Focus states
<button className="
  hover:bg-primary/90 
  focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
  transition-colors
">

// Aspect ratio
<div className="aspect-video relative overflow-hidden rounded-lg">
  <Image fill className="object-cover" />
</div>
```

## Form with shadcn/ui

```tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="email@example.com" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Submit</Button>
  </form>
</Form>
```

## cn() Utility

```tsx
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage
<div className={cn('base-classes', isActive && 'active-classes', className)}>
```

## Animation Classes

```tsx
<div className="transition-all duration-300 ease-in-out">
<div className="transition-colors duration-200">
<div className="transition-transform hover:scale-105">
<div className="animate-pulse">   // Loading skeleton
<div className="animate-spin">    // Spinner
```
