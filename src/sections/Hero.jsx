import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const containerRef = useRef(null)
  const heading1Ref = useRef(null)
  const heading2Ref = useRef(null)
  const heading3Ref = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const svgRef = useRef(null)
  const path1Ref = useRef(null)
  const path2Ref = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      gsap.set(
        [
          heading1Ref.current,
          heading2Ref.current,
          heading3Ref.current,
          subtitleRef.current,
          ctaRef.current,
        ],
        {
          opacity: 1,
          y: 0,
        }
      )
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'center center',
          toggleActions: 'play none none reverse',
        },
      })

      tl.fromTo(
        heading1Ref.current,
        { opacity: 0, y: 100, rotationX: -90 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          ease: 'power4.out',
          force3D: true,
          willChange: 'transform, opacity',
        }
      )
        .fromTo(
          heading2Ref.current,
          { opacity: 0, y: 100, rotationX: -90 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1.2,
            ease: 'power4.out',
            force3D: true,
            willChange: 'transform, opacity',
          },
          '-=0.8'
        )
        .fromTo(
          heading3Ref.current,
          { opacity: 0, y: 100, rotationX: -90 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1.2,
            ease: 'power4.out',
            force3D: true,
            willChange: 'transform, opacity',
          },
          '-=0.8'
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            willChange: 'transform, opacity',
          },
          '-=0.4'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.4)',
            willChange: 'transform, opacity',
          },
          '-=0.2'
        )

      gsap.fromTo(
        path1Ref.current,
        {
          scale: 0,
          rotation: -180,
          transformOrigin: 'center center',
        },
        {
          scale: 1,
          rotation: 0,
          duration: 2,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.to(path1Ref.current, {
        scale: 1.1,
        rotation: 5,
        transformOrigin: 'center center',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to(path2Ref.current, {
        scale: 0.95,
        rotation: -5,
        transformOrigin: 'center center',
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to(svgRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20"
      aria-labelledby="hero-heading"
    >
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <div className="mb-12 space-y-2">
          <h1 id="hero-heading" className="sr-only">
            Welcome to Our Creative Portfolio
          </h1>
          <div
            ref={heading1Ref}
            className="text-accent-light text-5xl font-black tracking-tight md:text-7xl lg:text-8xl"
            style={{ perspective: '1000px' }}
            aria-hidden="true"
          >
            <span className="glow inline-block">Creative Excellence</span>
          </div>
          <div
            ref={heading2Ref}
            className="text-accent-light/90 text-4xl font-black tracking-tight md:text-6xl lg:text-7xl"
            style={{ perspective: '1000px' }}
            aria-hidden="true"
          >
            <span className="inline-block">Through Innovation</span>
          </div>
          <div
            ref={heading3Ref}
            className="text-accent-light/80 text-3xl font-black tracking-tight md:text-5xl lg:text-6xl"
            style={{ perspective: '1000px' }}
            aria-hidden="true"
          >
            <span className="inline-block">And Dedication</span>
          </div>
        </div>

        <p
          ref={subtitleRef}
          className="text-accent-light/70 mx-auto mb-10 max-w-2xl text-lg md:text-xl lg:text-2xl"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
        </p>

        <div ref={ctaRef}>
          <Button size="lg" className="shadow-accent/20 text-lg shadow-lg">
            Discover Our Work
          </Button>
        </div>
      </div>

      <svg
        ref={svgRef}
        className="pointer-events-none absolute top-1/2 left-1/2 -z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-20"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Decorative animated accent"
        role="img"
      >
        <defs>
          <linearGradient id="heroGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(211, 218, 217)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="rgb(113, 90, 90)" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="heroGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(113, 90, 90)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="rgb(211, 218, 217)" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path
          ref={path1Ref}
          d="M45.3,-59.4C57.7,-50.3,66.3,-35.6,70.4,-19.2C74.5,-2.8,74.1,15.3,67.5,30.3C60.9,45.3,48.1,57.2,33.3,63.8C18.5,70.4,1.7,71.7,-15.3,70.1C-32.3,68.5,-49.6,63.9,-60.5,53.6C-71.4,43.3,-75.9,27.3,-76.5,11.1C-77.1,-5.1,-73.8,-21.5,-65.5,-34.4C-57.2,-47.3,-44,-56.7,-29.8,-65C-15.6,-73.3,-0.4,-80.5,13.6,-77.9C27.6,-75.3,32.9,-68.5,45.3,-59.4Z"
          fill="url(#heroGradient1)"
          strokeWidth="2"
          stroke="rgba(211, 218, 217, 0.3)"
          transform="translate(100, 100)"
        />
        <path
          ref={path2Ref}
          d="M38.4,-54.8C48.3,-45.3,54.1,-31.5,58.5,-17.2C62.9,-2.9,66,11.9,62.3,24.8C58.6,37.7,48.1,48.7,35.8,56.3C23.5,63.9,9.4,68.1,-5.5,66.8C-20.4,65.5,-36.1,58.7,-47.5,48.6C-58.9,38.5,-66,25.1,-68.4,10.8C-70.8,-3.5,-68.5,-18.7,-61.3,-31.4C-54.1,-44.1,-42,-54.3,-29.2,-62.2C-16.4,-70.1,-2.8,-75.7,9.6,-73.3C22,-70.9,28.5,-64.3,38.4,-54.8Z"
          fill="url(#heroGradient2)"
          strokeWidth="2"
          stroke="rgba(113, 90, 90, 0.3)"
          transform="translate(100, 100)"
        />
      </svg>
    </section>
  )
}
