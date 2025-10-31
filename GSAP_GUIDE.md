# GSAP Animation Guide

This project includes GSAP (GreenSock Animation Platform) with ScrollTrigger plugin for creating smooth, professional animations.

## Installed GSAP Features

- **GSAP Core** - Base animation engine
- **ScrollTrigger** - Scroll-based animations

## Basic Usage

### Simple Animation

```jsx
import { useGSAP } from '@/hooks'

function MyComponent() {
  useGSAP((gsap) => {
    gsap.to('.box', {
      x: 100,
      duration: 1,
      ease: 'power3.out'
    })
  }, [])
  
  return <div className="box">Animated Box</div>
}
```

### Scroll-Triggered Animation

The easiest way is to use the `useScrollAnimation` hook:

```jsx
import { useScrollAnimation } from '@/hooks'

function MyComponent() {
  const ref = useScrollAnimation('fadeIn', {
    start: 'top 80%',
    duration: 1.5
  })
  
  return <div ref={ref}>Scrolls into view</div>
}
```

### Custom ScrollTrigger

For more control, use GSAP directly:

```jsx
import { useGSAP } from '@/hooks'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function MyComponent() {
  useGSAP((gsap) => {
    gsap.from('.element', {
      opacity: 0,
      y: 100,
      scrollTrigger: {
        trigger: '.element',
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
        markers: true // Remove in production
      }
    })
  }, [])
  
  return <div className="element">Custom scroll animation</div>
}
```

## Animation Presets

Available in `src/lib/animation-config.js`:

### fadeIn
Fades in from bottom with Y translation
```javascript
{ opacity: 0, y: 60 }
```

### fadeInLeft
Fades in from left
```javascript
{ opacity: 0, x: -60 }
```

### fadeInRight
Fades in from right
```javascript
{ opacity: 0, x: 60 }
```

### fadeInScale
Fades in with scale effect
```javascript
{ opacity: 0, scale: 0.8 }
```

## Common Animation Properties

### Transform
- `x`: Horizontal movement (pixels)
- `y`: Vertical movement (pixels)
- `scale`: Scale transform
- `rotation`: Rotation in degrees
- `rotationX`, `rotationY`: 3D rotations

### Appearance
- `opacity`: Opacity (0-1)
- `autoAlpha`: Opacity + visibility

### Timing
- `duration`: Animation duration in seconds
- `delay`: Delay before animation starts
- `stagger`: Delay between multiple elements

### Easing
Common easing functions:
- `power1.out`, `power2.out`, `power3.out`, `power4.out`
- `back.out`, `elastic.out`, `bounce.out`
- `sine.inOut`, `expo.inOut`

## Timeline Animations

For complex, sequenced animations:

```jsx
import { useGSAP } from '@/hooks'

function MyComponent() {
  useGSAP((gsap) => {
    const tl = gsap.timeline()
    
    tl.from('.title', { opacity: 0, y: 50, duration: 1 })
      .from('.subtitle', { opacity: 0, y: 30, duration: 0.8 }, '-=0.5')
      .from('.cta', { scale: 0, duration: 0.5 })
  }, [])
  
  return (
    <div>
      <h1 className="title">Title</h1>
      <p className="subtitle">Subtitle</p>
      <button className="cta">CTA</button>
    </div>
  )
}
```

## ScrollTrigger Options

### Common Options

```javascript
scrollTrigger: {
  trigger: '.element',        // Element that triggers animation
  start: 'top 80%',          // Start when trigger's top hits 80% of viewport
  end: 'bottom 20%',         // End when trigger's bottom hits 20% of viewport
  scrub: true,               // Link animation to scroll position
  pin: true,                 // Pin element during animation
  markers: true,             // Show debug markers (dev only)
  toggleActions: 'play none none reverse',  // onEnter, onLeave, onEnterBack, onLeaveBack
}
```

### Start/End Values

Format: `[trigger position] [viewport position]`

Examples:
- `'top top'` - When trigger's top hits viewport top
- `'top center'` - When trigger's top hits viewport center
- `'top 80%'` - When trigger's top hits 80% down viewport
- `'bottom top'` - When trigger's bottom hits viewport top

### Toggle Actions

Four actions: `onEnter onLeave onEnterBack onLeaveBack`

Options: `play`, `pause`, `resume`, `reset`, `restart`, `complete`, `reverse`, `none`

Example:
```javascript
toggleActions: 'play reverse play reverse'
```

## Performance Tips

1. **Use transforms over position**: `x`/`y` instead of `left`/`top`
2. **Use `will-change`**: For better performance on animated elements
3. **Batch updates**: Use timeline for multiple animations
4. **Clean up**: useGSAP handles this automatically
5. **Optimize selectors**: Use refs instead of class queries when possible

## Stagger Animations

Animate multiple elements with delay:

```jsx
import { useGSAP } from '@/hooks'

function MyComponent() {
  useGSAP((gsap) => {
    gsap.from('.item', {
      opacity: 0,
      y: 50,
      stagger: 0.1, // 0.1s delay between each
      duration: 0.8
    })
  }, [])
  
  return (
    <div>
      <div className="item">Item 1</div>
      <div className="item">Item 2</div>
      <div className="item">Item 3</div>
    </div>
  )
}
```

## Advanced: Using Refs

For better performance and control:

```jsx
import { useRef } from 'react'
import { useGSAP } from '@/hooks'

function MyComponent() {
  const boxRef = useRef(null)
  
  useGSAP((gsap) => {
    gsap.to(boxRef.current, {
      x: 100,
      duration: 1
    })
  }, [])
  
  return <div ref={boxRef}>Animated Box</div>
}
```

## Resources

- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Documentation](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [GSAP Easing Visualizer](https://greensock.com/ease-visualizer)
- [GSAP Forums](https://greensock.com/forums/)

## Additional Plugins

GSAP offers premium plugins (requires license):
- **MorphSVG** - Morph SVG shapes
- **DrawSVG** - Animate SVG stroke drawing
- **SplitText** - Text animation effects
- **ScrollSmoother** - Smooth scrolling

To use premium plugins:
1. Get a GSAP membership
2. Install the plugin
3. Import and register it

```jsx
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
gsap.registerPlugin(MorphSVGPlugin)
```

## Examples

### Parallax Effect

```jsx
useGSAP((gsap) => {
  gsap.to('.parallax', {
    y: -100,
    scrollTrigger: {
      trigger: '.parallax',
      scrub: 1
    }
  })
}, [])
```

### Reveal on Scroll

```jsx
useGSAP((gsap) => {
  gsap.from('.reveal', {
    opacity: 0,
    y: 100,
    scrollTrigger: {
      trigger: '.reveal',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  })
}, [])
```

### Pin Section

```jsx
useGSAP((gsap) => {
  gsap.to('.pinned', {
    scrollTrigger: {
      trigger: '.pinned',
      start: 'top top',
      end: '+=500',
      pin: true,
      scrub: 1
    }
  })
}, [])
```
