import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Badge } from '@/components/ui/badge'

gsap.registerPlugin(ScrollTrigger)

const skills = [
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'GSAP', category: 'Animation' },
  { name: 'Three.js', category: '3D Graphics' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Next.js', category: 'Framework' },
  { name: 'GraphQL', category: 'API' },
  { name: 'WebGL', category: '3D Graphics' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Git', category: 'Version Control' },
]

export function Skills() {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const gridRef = useRef(null)
  const skillRefs = useRef([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      gsap.set([titleRef.current, ...skillRefs.current], {
        opacity: 1,
        y: 0,
        scale: 1,
      })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      const batchSize = 3
      const batches = []
      for (let i = 0; i < skillRefs.current.length; i += batchSize) {
        batches.push(skillRefs.current.slice(i, i + batchSize))
      }

      batches.forEach((batch, batchIndex) => {
        gsap.fromTo(
          batch,
          {
            opacity: 0,
            y: 60,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.4)',
            stagger: {
              amount: 0.15,
              from: 'start',
            },
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
            delay: batchIndex * 0.1,
          }
        )
      })

      skillRefs.current.forEach((skill) => {
        if (!skill) return

        const hoverTimeline = gsap.timeline({ paused: true })
        hoverTimeline.to(skill, {
          scale: 1.1,
          y: -8,
          boxShadow: '0 10px 40px rgba(113, 90, 90, 0.4)',
          duration: 0.3,
          ease: 'power2.out',
        })

        skill.addEventListener('mouseenter', () => {
          hoverTimeline.play()
        })

        skill.addEventListener('mouseleave', () => {
          hoverTimeline.reverse()
        })

        skill.addEventListener('touchstart', () => {
          hoverTimeline.play()
        })

        skill.addEventListener('touchend', () => {
          setTimeout(() => hoverTimeline.reverse(), 200)
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen px-6 py-20"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="skills-heading"
          ref={titleRef}
          className="text-accent-light mb-16 text-center text-5xl font-bold md:text-6xl lg:text-7xl"
        >
          <span className="glow">Skills & Expertise</span>
        </h2>

        <div
          ref={gridRef}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4"
          role="list"
          aria-label="Technical skills"
        >
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              ref={(el) => (skillRefs.current[index] = el)}
              className="group border-accent/20 bg-background-secondary/40 relative overflow-hidden rounded-xl border p-6 backdrop-blur-sm transition-colors will-change-transform"
              role="listitem"
            >
              <div className="from-accent/10 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative z-10 flex flex-col items-center justify-center space-y-3 text-center">
                <div className="text-accent-light text-2xl font-bold">{skill.name}</div>
                <Badge variant="outline" className="text-xs">
                  {skill.category}
                </Badge>
              </div>

              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="bg-accent/20 absolute top-0 right-0 h-20 w-20 translate-x-10 -translate-y-10 rounded-full blur-xl" />
                <div className="bg-accent-light/10 absolute bottom-0 left-0 h-20 w-20 -translate-x-10 translate-y-10 rounded-full blur-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <svg
        className="pointer-events-none absolute top-10 right-10 h-40 w-40 opacity-10"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="skillsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(211, 218, 217)" />
            <stop offset="100%" stopColor="rgb(113, 90, 90)" />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="url(#skillsGradient)"
          strokeWidth="2"
          strokeDasharray="5,5"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="20s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </section>
  )
}
