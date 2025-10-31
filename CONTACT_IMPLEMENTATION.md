# Contact Section Implementation

## Overview
The Contact section features a fully accessible, animated contact form powered by EmailJS with comprehensive validation and user feedback.

## Features Implemented

### 1. EmailJS Integration
- **Service**: EmailJS for sending emails without a backend
- **Configuration**: Environment variables for service ID, template ID, and public key
- **Error Handling**: Graceful fallback with user-friendly error messages
- **Location**: `/src/lib/emailjs.js`

### 2. Form Components (ShadCN-style)
Created the following UI components:
- **Input** (`/src/components/ui/input.jsx`) - Text input with validation states
- **Textarea** (`/src/components/ui/textarea.jsx`) - Multi-line text input
- **Label** (`/src/components/ui/label.jsx`) - Accessible form labels
- **Toast** (`/src/components/ui/toast.jsx`) - Notification component
- **Toaster** (`/src/components/ui/toaster.jsx`) - Toast container with ARIA support

### 3. Toast Notification System
- **Context**: ToastProvider wraps the entire app
- **Hook**: `useToast()` hook for showing notifications
- **Features**:
  - Auto-dismiss after 5 seconds (configurable)
  - Manual dismiss button
  - Success/error/default variants
  - Stacked notifications
  - ARIA live region for screen readers
  - Animated entrance/exit

### 4. Client-Side Validation
Comprehensive validation for all form fields:
- **Name**: Required, minimum 2 characters
- **Email**: Required, valid email format (regex)
- **Message**: Required, minimum 10 characters
- **Real-time validation**: Validates on blur after first touch
- **Submit validation**: All fields validated before submission

### 5. ARIA-Friendly Error Handling
- Error messages with `role="alert"` and `aria-live="polite"`
- Input fields marked with `aria-invalid` when errors present
- Error IDs linked via `aria-describedby`
- Required fields marked with visual and screen-reader indicators
- Form labeled with `aria-label="Contact form"`

### 6. GSAP Animations

#### Entrance Animations
- **Title**: Fade in from top with rotation (-3deg to 0deg)
- **Form Elements**: Staggered entrance (0.15s delay between elements)
  - Fade in from below (y: 30px to 0)
  - Scale animation (0.95 to 1)
  - Triggered on scroll (75% viewport)

#### Focus Animations
- **Scale effect**: Elements scale to 1.02 on focus
- **Smooth transitions**: 0.2s duration with power2.out easing
- **Focus out**: Returns to scale 1

#### Reduced Motion Fallback
- Checks `prefers-reduced-motion: reduce` media query
- Disables all animations if user prefers reduced motion
- Elements appear instantly without animation

### 7. Accessibility Features

#### Keyboard Navigation
- Full keyboard support (Tab, Shift+Tab, Enter)
- Visible focus states on all interactive elements
- Skip link for main content
- Logical tab order

#### Screen Reader Support
- Semantic HTML: `<section>`, `<form>`, `<label>`, etc.
- ARIA landmarks: `aria-labelledby`, `aria-describedby`
- Form field requirements announced
- Error messages announced via `aria-live`
- Toast notifications accessible via ARIA live region

#### Color Contrast
- Error messages use high-contrast red (#EF4444)
- Form labels use accent-light color
- Focus rings use primary color theme
- All text meets WCAG AA standards

### 8. Responsiveness
- Mobile-first design
- Full-width form on mobile
- Proper spacing at all breakpoints
- Touch-friendly input sizes (h-12 minimum)
- Responsive text sizing

### 9. Loading States
- Submit button disabled during submission
- Loading text: "Sending..." replaces "Send Message"
- Form inputs disabled during submission
- Button marked with `aria-busy` attribute

### 10. User Experience
- Smooth animations enhance experience
- Clear error messages guide users
- Success confirmation via toast
- Form clears after successful submission
- Immediate feedback on all interactions

## Build Optimizations

### Vite Configuration
Updated `/vite.config.js` with:
- **Manual Chunks**: Vendor libraries split into separate bundles
  - `vendor-react`: React and React-DOM
  - `vendor-gsap`: GSAP library
  - `vendor-three`: Three.js library
  - `vendor-emailjs`: EmailJS library
- **Terser Minification**: Removes console.log and debugger statements
- **Chunk Size**: Warning limit set to 1000 KB
- **Optimization**: Dependencies pre-bundled for faster dev server

### Bundle Analysis
Production build results:
- **vendor-three**: 487 KB (122 KB gzipped)
- **index (app code)**: 289 KB (92 KB gzipped)
- **vendor-gsap**: 69 KB (27 KB gzipped)
- **vendor-react**: 11 KB (3.9 KB gzipped)
- **vendor-emailjs**: 3.5 KB (1.45 KB gzipped)
- **CSS**: 29 KB (5.92 KB gzipped)

Total: ~888 KB (~252 KB gzipped)

## Performance Considerations

### 60fps Animations
- GPU-accelerated transforms (translate, scale, rotate)
- `force3D: true` for GSAP animations
- `willChange` CSS property for optimized rendering
- Batch DOM updates with GSAP context
- ScrollTrigger batches scroll events

### Form Performance
- Validation only on touched fields
- Debounced validation (on blur, not every keystroke)
- Minimal re-renders via proper state management
- Efficient error message rendering

## Environment Variables
Required in `.env` file (see `.env.example`):
```
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## Files Created/Modified

### New Files
- `/src/sections/Contact.jsx` - Main contact section component
- `/src/components/ui/input.jsx` - Input component
- `/src/components/ui/textarea.jsx` - Textarea component
- `/src/components/ui/label.jsx` - Label component
- `/src/components/ui/toast.jsx` - Toast component
- `/src/components/ui/toaster.jsx` - Toaster container
- `/src/context/ToastContext.jsx` - Toast provider
- `/src/context/toast-context.js` - Toast context definition
- `/src/hooks/useToast.js` - Toast state management
- `/src/hooks/useToastContext.js` - Toast context hook

### Modified Files
- `/src/App.jsx` - Added Contact section and ToastProvider
- `/src/components/Layout.jsx` - Added skip link for accessibility
- `/src/styles/index.css` - Added toast animations and skip link styles
- `/vite.config.js` - Added build optimizations
- `/index.html` - Added meta description and improved title
- `/package.json` - Added terser dev dependency

## Testing Checklist

### Functionality
- [x] Form submits successfully
- [x] Email sent via EmailJS
- [x] Success toast appears
- [x] Error toast appears on failure
- [x] Form clears after success
- [x] Validation works correctly

### Accessibility
- [x] Keyboard navigation works
- [x] Screen reader announces errors
- [x] ARIA attributes present
- [x] Focus states visible
- [x] Color contrast meets WCAG AA
- [x] Skip link functional

### Animations
- [x] Entrance animations smooth
- [x] Focus animations work
- [x] Reduced motion respected
- [x] 60fps maintained
- [x] No layout shifts

### Responsiveness
- [x] Works on mobile
- [x] Works on tablet
- [x] Works on desktop
- [x] Touch-friendly on mobile

### Build
- [x] Production build succeeds
- [x] No build warnings
- [x] Bundle size optimized
- [x] Code splitting works
- [x] Linting passes
