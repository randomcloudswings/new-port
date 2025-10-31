# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open your browser to [http://localhost:5173](http://localhost:5173)

### 3. Build for Production
```bash
npm run build
```

## 📝 Project Overview

This portfolio stack includes:

- ✅ **React 19** with Vite for fast development
- ✅ **Tailwind CSS** with custom dark theme
- ✅ **Three.js** reactive ink background with GPU shaders
- ✅ **GSAP** scroll animations with ScrollTrigger
- ✅ **ShadCN UI** component library
- ✅ **Custom glowing cursor** with smooth animations
- ✅ **EmailJS** integration ready
- ✅ **ESLint** and **Prettier** configured

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change the color palette.

### Animations
Modify `src/lib/animation-config.js` for animation presets.

### Three.js Background
Customize shaders in `src/components/InkBackground.jsx`.

## 📂 File Structure

```
src/
├── components/       # Reusable components
├── sections/         # Page sections
├── hooks/           # Custom React hooks
├── lib/             # Utilities and configs
├── context/         # React contexts
└── styles/          # Global styles
```

## 🔧 Available Scripts

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 💡 Tips

1. Use the `useScrollAnimation` hook for scroll-triggered animations
2. Use the `useGSAP` hook for custom GSAP animations
3. Import components from `@/components` using the alias
4. The custom cursor only appears on non-mobile devices

## 🐛 Troubleshooting

**Dev server not starting?**
- Make sure port 5173 is available
- Try `npm install` again

**Build failing?**
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`

**Styles not loading?**
- Check that Tailwind CSS is properly configured in `postcss.config.js`

## 📚 Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Three.js Documentation](https://threejs.org/docs/)
- [GSAP Documentation](https://greensock.com/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
