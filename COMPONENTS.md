# Component Documentation

## Core Components

### Layout
**Location**: `src/components/Layout.jsx`

The main layout wrapper that includes the InkBackground and CustomCursor components.

```jsx
import { Layout } from '@/components'

function App() {
  return (
    <Layout>
      {/* Your content here */}
    </Layout>
  )
}
```

### InkBackground
**Location**: `src/components/InkBackground.jsx`

A Three.js-powered reactive background with GPU-accelerated shaders. Responds to mouse movement with fluid ink-like animations.

**Features**:
- GPU-accelerated shader rendering
- Mouse-reactive animations
- Optimized for older devices
- Automatic cleanup on unmount

### CustomCursor
**Location**: `src/components/CustomCursor.jsx`

A custom animated cursor with glow effect. Automatically scales on hover over interactive elements.

**Features**:
- GSAP-powered smooth animations
- Dual-layer (cursor + glow)
- Auto-detects interactive elements
- Hidden on mobile via CSS

### Button (ShadCN UI)
**Location**: `src/components/ui/button.jsx`

A versatile button component with multiple variants.

```jsx
import { Button } from '@/components/ui/button'

<Button variant="default" size="lg">
  Click Me
</Button>
```

**Variants**:
- `default` - Primary button style
- `destructive` - For dangerous actions
- `outline` - Outlined button
- `secondary` - Secondary style
- `ghost` - Transparent background
- `link` - Link-styled button

**Sizes**:
- `default` - Standard size
- `sm` - Small
- `lg` - Large
- `icon` - Square icon button

## Section Components

### Hero
**Location**: `src/sections/Hero.jsx`

The landing section with animated title, subtitle, and CTA button.

**Features**:
- Staggered scroll animations
- Responsive text sizing
- Centered layout

### About
**Location**: `src/sections/About.jsx`

Example about section demonstrating directional animations.

## Hooks

### useScrollAnimation
**Location**: `src/hooks/useScrollAnimation.js`

Creates scroll-triggered animations for elements.

```jsx
import { useScrollAnimation } from '@/hooks'

function MyComponent() {
  const ref = useScrollAnimation('fadeIn', {
    start: 'top 80%',
    duration: 1.5,
  })
  
  return <div ref={ref}>Animated content</div>
}
```

**Animation Types**:
- `fadeIn` - Fade in from bottom
- `fadeInLeft` - Fade in from left
- `fadeInRight` - Fade in from right
- `fadeInScale` - Fade in with scale

**Options**:
- `start` - When to start animation (default: 'top 80%')
- `end` - When to end animation
- `duration` - Animation duration
- `ease` - Easing function
- `toggleActions` - ScrollTrigger toggle actions
- `markers` - Show debug markers (development)

### useGSAP
**Location**: `src/hooks/useGSAP.js`

Provides a GSAP context for custom animations with automatic cleanup.

```jsx
import { useGSAP } from '@/hooks'

function MyComponent() {
  useGSAP((gsap) => {
    gsap.to('.element', { 
      opacity: 1, 
      duration: 1 
    })
  }, [])
  
  return <div className="element">Content</div>
}
```

### useAnimation
**Location**: `src/hooks/useAnimation.js`

Access the global animation context and configuration.

```jsx
import { useAnimation } from '@/hooks'

function MyComponent() {
  const { timeline, config } = useAnimation()
  
  // Use timeline or config...
}
```

## Context Providers

### AnimationProvider
**Location**: `src/context/AnimationContext.jsx`

Provides global GSAP timeline and animation configuration to all child components.

```jsx
import { AnimationProvider } from '@/context/AnimationContext'

function App() {
  return (
    <AnimationProvider>
      <YourApp />
    </AnimationProvider>
  )
}
```

## Utility Functions

### cn (className merge)
**Location**: `src/lib/utils.js`

Merges Tailwind CSS classes intelligently.

```jsx
import { cn } from '@/lib/utils'

<div className={cn(
  'base-class',
  condition && 'conditional-class',
  'override-class'
)} />
```

### sendEmail
**Location**: `src/lib/emailjs.js`

Sends emails via EmailJS SDK.

```jsx
import { sendEmail } from '@/lib/emailjs'

const result = await sendEmail({
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Hello!'
})

if (result.success) {
  console.log('Email sent!')
}
```

## Animation Configuration

**Location**: `src/lib/animation-config.js`

Global animation settings and presets.

```javascript
{
  duration: 1.2,
  ease: 'power3.out',
  stagger: 0.1,
  fadeIn: { opacity: 0, y: 60 },
  fadeInLeft: { opacity: 0, x: -60 },
  fadeInRight: { opacity: 0, x: 60 },
  fadeInScale: { opacity: 0, scale: 0.8 }
}
```

## Button Variants

**Location**: `src/lib/button-variants.js`

Class variance authority configuration for button styles.

## Best Practices

1. **Always use path aliases**: Import with `@/` instead of relative paths
2. **Cleanup animations**: useGSAP and useScrollAnimation handle this automatically
3. **Separate concerns**: Keep non-component exports in lib/ or separate files
4. **Use cn() for classes**: Especially when conditionally applying classes
5. **Mobile considerations**: Custom cursor is hidden on mobile automatically

## Creating New Components

### UI Component Template
```jsx
import { cn } from '@/lib/utils'

export function MyComponent({ className, children, ...props }) {
  return (
    <div 
      className={cn('base-classes', className)} 
      {...props}
    >
      {children}
    </div>
  )
}
```

### Section Component Template
```jsx
import { useScrollAnimation } from '@/hooks'

export function MySection() {
  const ref = useScrollAnimation('fadeIn')
  
  return (
    <section className="min-h-screen">
      <div ref={ref}>
        {/* Section content */}
      </div>
    </section>
  )
}
```

### Custom Hook Template
```jsx
import { useEffect, useRef } from 'react'

export function useMyHook(options = {}) {
  const ref = useRef(null)
  
  useEffect(() => {
    // Hook logic
    
    return () => {
      // Cleanup
    }
  }, [options])
  
  return ref
}
```
