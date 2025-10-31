# Architecture Overview

## System Design

This portfolio stack follows a modern React architecture with clear separation of concerns and optimized performance.

```
┌─────────────────────────────────────────────────────────┐
│                     Browser Layer                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │            React Application (App.jsx)           │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │      AnimationProvider (Context)           │  │  │
│  │  │  ┌──────────────────────────────────────┐  │  │  │
│  │  │  │         Layout Component             │  │  │  │
│  │  │  │  ┌────────────┬───────────────────┐  │  │  │  │
│  │  │  │  │InkBackground│  CustomCursor    │  │  │  │  │
│  │  │  │  │(Three.js)  │  (GSAP)          │  │  │  │  │
│  │  │  │  └────────────┴───────────────────┘  │  │  │  │
│  │  │  │         Section Components           │  │  │  │
│  │  │  │  (Hero, About, Contact, etc.)        │  │  │  │
│  │  │  └──────────────────────────────────────┘  │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Layer Breakdown

### 1. Presentation Layer
**Location**: `src/components/`, `src/sections/`

- **Components**: Reusable UI building blocks
  - `CustomCursor`: Interactive cursor with GSAP
  - `InkBackground`: Three.js canvas background
  - `Layout`: Main layout wrapper
  - `ui/button`: ShadCN UI button component

- **Sections**: Page-specific content blocks
  - `Hero`: Landing section
  - `About`: About section
  - More sections as needed

### 2. Logic Layer
**Location**: `src/hooks/`, `src/context/`

- **Hooks**: Reusable stateful logic
  - `useScrollAnimation`: Scroll-triggered animations
  - `useGSAP`: GSAP context management
  - `useAnimation`: Access animation context

- **Context**: Global state providers
  - `AnimationProvider`: GSAP timeline and config

### 3. Utility Layer
**Location**: `src/lib/`

- **Configuration**: Animation presets, button variants
- **Utilities**: Class name merging, EmailJS integration
- **Constants**: Shared configuration values

### 4. Style Layer
**Location**: `src/styles/`, `tailwind.config.js`

- Global styles and Tailwind configuration
- CSS variables for theming
- Custom utility classes

## Data Flow

```
User Interaction
      ↓
Event Handlers (Components)
      ↓
Hooks (useScrollAnimation, useGSAP)
      ↓
GSAP/Three.js Libraries
      ↓
DOM Updates / Canvas Renders
```

## Animation Architecture

### Scroll Animation Flow

```
Component Mount
      ↓
useScrollAnimation Hook
      ↓
Create GSAP Animation
      ↓
Register ScrollTrigger
      ↓
Monitor Scroll Position
      ↓
Animate on Trigger
      ↓
Cleanup on Unmount
```

### Three.js Rendering Flow

```
InkBackground Mount
      ↓
Initialize Scene, Camera, Renderer
      ↓
Create Shader Material
      ↓
Animation Loop (requestAnimationFrame)
      ↓
Update Uniforms (time, mouse)
      ↓
Render Frame
      ↓
Cleanup on Unmount
```

## Performance Optimizations

### 1. Bundle Optimization
- Vite for fast builds and HMR
- Code splitting ready (dynamic imports)
- Tree-shaking for unused code

### 2. Animation Performance
- GPU-accelerated transforms (x, y, scale)
- GSAP context cleanup prevents memory leaks
- ScrollTrigger batches updates efficiently

### 3. Three.js Optimization
- Shader-based rendering (GPU)
- Low vertex count for mobile
- Automatic pixel ratio adjustment
- Proper cleanup on unmount

### 4. React Optimizations
- Fast refresh enabled
- Minimal re-renders via proper hook dependencies
- Ref-based animations (avoid query selectors)

## State Management

### Local State
- Component-specific state via `useState`
- Ref-based imperative handles via `useRef`

### Global State
- Animation context via React Context API
- No external state management library needed

### Animation State
- Managed by GSAP timelines and ScrollTrigger
- Automatic synchronization with scroll position

## Development Workflow

```
1. Development
   npm run dev → Vite dev server with HMR

2. Code Quality
   npm run lint → ESLint checks
   npm run format → Prettier formatting

3. Build
   npm run build → Production build

4. Preview
   npm run preview → Preview production build
```

## Build Process

```
Source Files (src/)
      ↓
Vite Processing
      ↓
Babel/SWC Transpilation
      ↓
Tailwind CSS Processing (@tailwindcss/postcss)
      ↓
Asset Optimization
      ↓
Bundle Output (dist/)
```

## Module System

### Path Aliases
```javascript
// @ maps to ./src/
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
```

### Module Types
- ES Modules (type: "module" in package.json)
- Tree-shakable exports
- Named exports preferred over default exports

## Styling Architecture

### Tailwind CSS v4
```
styles/index.css
      ↓
@import "tailwindcss"
      ↓
@tailwindcss/postcss plugin
      ↓
Generated CSS
```

### CSS Variables
```css
:root {
  --background: 12 12 14;
  --foreground: 211 218 217;
  /* etc */
}
```

### Class Composition
```javascript
cn('base-classes', 
   condition && 'conditional',
   'override')
```

## Security Considerations

1. **Environment Variables**: Use `import.meta.env` for secrets
2. **XSS Protection**: React's automatic escaping
3. **Dependencies**: Regular updates via npm audit
4. **CSP Ready**: No inline scripts (except Vite in dev)

## Scalability Patterns

### Adding New Sections
1. Create component in `src/sections/`
2. Import in `App.jsx`
3. Add to Layout

### Adding New UI Components
1. Create in `src/components/ui/`
2. Export from `src/components/index.js`
3. Document in COMPONENTS.md

### Adding New Animations
1. Add preset to `src/lib/animation-config.js`
2. Use via `useScrollAnimation(presetName)`

### Adding New Pages (Future)
When ready for routing:
1. Install React Router
2. Create `src/pages/`
3. Update App.jsx with routes

## Testing Strategy (Future Enhancement)

Recommended setup:
- **Unit Tests**: Vitest + React Testing Library
- **E2E Tests**: Playwright or Cypress
- **Visual Tests**: Percy or Chromatic

## Deployment

### Build Artifacts
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
└── [other assets]
```

### Deployment Targets
- **Vercel**: Zero-config (recommended)
- **Netlify**: Works out of the box
- **GitHub Pages**: Add base path in vite.config
- **Custom Server**: Serve dist/ as static files

### Environment Setup
```bash
# Production
cp .env.example .env
# Add your EmailJS credentials
# Build
npm run build
```

## Browser Compatibility

- **Modern Browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **Three.js**: WebGL 1.0+ required
- **GSAP**: Supports all modern browsers
- **Tailwind**: CSS Grid and Flexbox required

## File Size Breakdown

Approximate production bundle sizes:
- **React + React DOM**: ~130 KB
- **Three.js**: ~580 KB
- **GSAP**: ~50 KB
- **Application Code**: ~50 KB
- **CSS**: ~10 KB

**Total**: ~820 KB (before gzip)
**Gzipped**: ~245 KB

## Future Enhancements

Potential additions:
1. React Router for multi-page navigation
2. Framer Motion for additional animation options
3. React Query for data fetching
4. Form validation with Zod + React Hook Form
5. i18n support with react-i18next
6. Analytics integration (GA4, Plausible)
7. SEO optimization with React Helmet
8. Progressive Web App (PWA) features
9. Dark/Light mode toggle
10. Blog integration with MDX

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Review ESLint/Prettier rules
- Audit bundle size
- Monitor performance metrics
- Update documentation

### Version Strategy
- Follow semantic versioning
- Test in staging before production
- Keep changelog updated
- Tag releases in git
