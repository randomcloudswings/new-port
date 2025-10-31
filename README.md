# Portfolio Stack

A cinematic portfolio website built with modern web technologies, featuring reactive Three.js background animations and smooth GSAP scroll animations.

## 🚀 Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS with custom theme
- **UI Components**: ShadCN UI + Radix UI
- **Animations**: GSAP with ScrollTrigger
- **3D Graphics**: Three.js for GPU-accelerated ink background
- **Email**: EmailJS SDK
- **Utilities**: clsx, class-variance-authority, tailwind-merge

## 🎨 Features

- **Custom Dark Theme**: Carefully crafted color palette (#0c0c0e, #44444E, #715A5A, #D3DAD9)
- **Reactive Ink Background**: GPU-accelerated Three.js shader-based background that responds to mouse movement
- **Custom Glowing Cursor**: Smooth animated cursor with glow effect
- **Scroll Animations**: GSAP-powered scroll-triggered animations
- **Responsive Typography**: Mobile-first responsive design with fluid typography
- **Cinematic Experience**: Immersive dark UI with glow effects

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── ui/          # ShadCN UI components
│   ├── CustomCursor.jsx
│   ├── InkBackground.jsx
│   └── Layout.jsx
├── sections/        # Page sections (Hero, About, etc.)
├── hooks/           # Custom React hooks
│   ├── useScrollAnimation.js
│   └── useGSAP.js
├── lib/             # Utility functions and configurations
│   ├── utils.js
│   └── emailjs.js
├── context/         # React context providers
│   └── AnimationContext.jsx
└── styles/          # Global styles and CSS
    └── index.css
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables** (optional, for EmailJS)
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your EmailJS credentials.

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## 🎯 Usage Examples

### Using Scroll Animations

```jsx
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

function MyComponent() {
  const elementRef = useScrollAnimation('fadeIn')
  
  return <div ref={elementRef}>Animated content</div>
}
```

### Available Animation Types

- `fadeIn` - Fade in from bottom
- `fadeInLeft` - Fade in from left
- `fadeInRight` - Fade in from right
- `fadeInScale` - Fade in with scale

### Using GSAP Context

```jsx
import { useGSAP } from '@/hooks/useGSAP'

function MyComponent() {
  useGSAP((gsap) => {
    gsap.to('.element', { opacity: 1, duration: 1 })
  }, [])
  
  return <div className="element">Content</div>
}
```

### Sending Emails with EmailJS

```jsx
import { sendEmail } from '@/lib/emailjs'

async function handleSubmit(formData) {
  const result = await sendEmail(formData)
  if (result.success) {
    console.log('Email sent successfully!')
  }
}
```

## 🎨 Customization

### Colors

The color palette can be customized in `tailwind.config.js`:

```js
colors: {
  background: {
    DEFAULT: '#0c0c0e',
    secondary: '#44444E',
  },
  accent: {
    DEFAULT: '#715A5A',
    light: '#D3DAD9',
  },
}
```

### Typography

Responsive typography scales are defined in `tailwind.config.js` and can be adjusted to your needs.

### Shader Effects

The ink background shader can be customized in `src/components/InkBackground.jsx` by modifying the fragment and vertex shaders.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

The Three.js shaders are optimized for older devices with fallback support.

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues or questions, please open an issue in the repository.
