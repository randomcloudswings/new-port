import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function About() {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const content1Ref = useRef(null)
  const content2Ref = useRef(null)
  const content3Ref = useRef(null)
  const svgContainerRef = useRef(null)
  const circleRef = useRef(null)
  const innerCircleRef = useRef(null)
  const linesRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      gsap.set(
        [
          titleRef.current,
          content1Ref.current,
          content2Ref.current,
          content3Ref.current,
          svgContainerRef.current,
        ],
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotation: 0,
        }
      )
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: -100, rotation: -5 },
        {
          opacity: 1,
          x: 0,
          rotation: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        content1Ref.current,
        { opacity: 0, y: 50, rotation: 3 },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: content1Ref.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        content2Ref.current,
        { opacity: 0, y: 50, rotation: -3 },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: content2Ref.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        content3Ref.current,
        { opacity: 0, y: 50, rotation: 2 },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: content3Ref.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        svgContainerRef.current,
        { opacity: 0, scale: 0.5, rotation: -45 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: 'elastic.out(1, 0.6)',
          scrollTrigger: {
            trigger: svgContainerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      const breathingTimeline = gsap.timeline({ repeat: -1, yoyo: true })
      breathingTimeline
        .to(circleRef.current, {
          scale: 1.15,
          opacity: 0.8,
          duration: 2.5,
          ease: 'sine.inOut',
          transformOrigin: 'center center',
        })
        .to(
          innerCircleRef.current,
          {
            scale: 0.85,
            opacity: 1,
            duration: 2.5,
            ease: 'sine.inOut',
            transformOrigin: 'center center',
          },
          '<'
        )

      gsap.to(linesRef.current.children, {
        rotation: 360,
        duration: 15,
        repeat: -1,
        ease: 'none',
        stagger: {
          each: 0.5,
          from: 'start',
        },
        transformOrigin: 'center center',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center px-6 py-20"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <h2
            id="about-heading"
            ref={titleRef}
            className="text-accent-light mb-8 text-5xl font-bold md:text-6xl lg:text-7xl"
          >
            About Our Vision
          </h2>

          <div ref={content1Ref} className="space-y-4">
            <p className="text-accent-light/80 text-lg leading-relaxed md:text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui
              mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque
              eu tellus rhoncus ut eleifend nibh porttitor.
            </p>
          </div>

          <div ref={content2Ref} className="space-y-4">
            <p className="text-accent-light/70 text-lg leading-relaxed md:text-xl">
              Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis
              nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis
              porttitor posuere praesent tristique magna sit amet purus.
            </p>
          </div>

          <div ref={content3Ref} className="space-y-4">
            <p className="text-accent-light/60 text-lg leading-relaxed md:text-xl">
              Gravida in fermentum et sollicitudin ac orci phasellus egestas. Sed pulvinar
              proin gravida hendrerit lectus a molestie lorem ipsum dolor sit amet.
            </p>
          </div>
        </div>

        <div
          ref={svgContainerRef}
          className="flex items-center justify-center"
          aria-hidden="true"
        >
          <svg
            className="h-[400px] w-[400px] md:h-[500px] md:w-[500px]"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Breathing animated motif"
            role="img"
          >
            <defs>
              <linearGradient id="aboutGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(211, 218, 217)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="rgb(113, 90, 90)" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="aboutGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(113, 90, 90)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="rgb(211, 218, 217)" stopOpacity="0.9" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g ref={linesRef}>
              <line
                x1="100"
                y1="40"
                x2="100"
                y2="60"
                stroke="rgba(211, 218, 217, 0.4)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="140"
                y1="60"
                x2="130"
                y2="75"
                stroke="rgba(211, 218, 217, 0.4)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="160"
                y1="100"
                x2="140"
                y2="100"
                stroke="rgba(211, 218, 217, 0.4)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="140"
                y1="140"
                x2="130"
                y2="125"
                stroke="rgba(211, 218, 217, 0.4)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="100"
                y1="160"
                x2="100"
                y2="140"
                stroke="rgba(211, 218, 217, 0.4)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="60"
                y1="140"
                x2="70"
                y2="125"
                stroke="rgba(211, 218, 217, 0.4)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="40"
                y1="100"
                x2="60"
                y2="100"
                stroke="rgba(211, 218, 217, 0.4)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="60"
                y1="60"
                x2="70"
                y2="75"
                stroke="rgba(211, 218, 217, 0.4)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>

            <circle
              ref={circleRef}
              cx="100"
              cy="100"
              r="40"
              fill="url(#aboutGradient1)"
              stroke="rgba(211, 218, 217, 0.6)"
              strokeWidth="2"
              filter="url(#glow)"
            />

            <circle
              ref={innerCircleRef}
              cx="100"
              cy="100"
              r="20"
              fill="url(#aboutGradient2)"
              stroke="rgba(113, 90, 90, 0.8)"
              strokeWidth="2"
              filter="url(#glow)"
            />

            <circle
              cx="100"
              cy="100"
              r="60"
              fill="none"
              stroke="rgba(211, 218, 217, 0.2)"
              strokeWidth="1"
              strokeDasharray="5,5"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
