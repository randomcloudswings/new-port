import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'Project Alpha',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    content:
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  },
  {
    title: 'Project Beta',
    description: 'Duis aute irure dolor in reprehenderit in voluptate.',
    content:
      'Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
  },
  {
    title: 'Project Gamma',
    description: 'Mollit anim id est laborum sed ut perspiciatis unde.',
    content:
      'Omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.',
  },
  {
    title: 'Project Delta',
    description: 'Et quasi architecto beatae vitae dicta sunt explicabo.',
    content:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione.',
  },
]

export function Projects() {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const projectRefs = useRef([])
  const svgRef = useRef(null)
  const pathRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      gsap.set([titleRef.current, ...projectRefs.current], {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
      })
      if (pathRef.current) {
        gsap.set(pathRef.current, { opacity: 0.3 })
      }
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      projectRefs.current.forEach((project, index) => {
        if (!project) return

        const direction = index % 2 === 0 ? -100 : 100
        gsap.fromTo(
          project,
          {
            opacity: 0,
            x: direction,
            rotationY: direction > 0 ? 15 : -15,
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: project,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.15,
          }
        )

        const glowElements = project.querySelectorAll('.project-glow')
        gsap.to(glowElements, {
          opacity: 0.6,
          scale: 1.1,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: 0.3,
        })
      })

      if (pathRef.current) {
        const pathMorphTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
          },
        })

        pathMorphTimeline
          .fromTo(
            pathRef.current,
            {
              attr: {
                d: 'M50,50 Q100,50 150,50 T250,50 T350,50 T450,50',
              },
              opacity: 0,
            },
            {
              attr: {
                d: 'M50,100 Q100,50 150,100 T250,100 T350,100 T450,100',
              },
              opacity: 0.3,
            }
          )
          .to(pathRef.current, {
            attr: {
              d: 'M50,150 Q100,100 150,150 T250,150 T350,150 T450,150',
            },
            opacity: 0.4,
          })
          .to(pathRef.current, {
            attr: {
              d: 'M50,200 Q100,150 150,200 T250,200 T350,200 T450,200',
            },
            opacity: 0.3,
          })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen px-6 py-20"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id="projects-heading"
          ref={titleRef}
          className="text-accent-light mb-20 text-center text-5xl font-bold md:text-6xl lg:text-7xl"
        >
          <span className="glow">Featured Projects</span>
        </h2>

        <div className="relative space-y-12">
          <svg
            ref={svgRef}
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 500 800"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            style={{ zIndex: 0 }}
          >
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(211, 218, 217)" stopOpacity="0.6" />
                <stop offset="50%" stopColor="rgb(113, 90, 90)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="rgb(211, 218, 217)" stopOpacity="0.6" />
              </linearGradient>
              <filter id="projectGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              ref={pathRef}
              d="M50,50 Q100,50 150,50 T250,50 T350,50 T450,50"
              fill="none"
              stroke="url(#pathGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#projectGlow)"
              opacity="0"
            />
          </svg>

          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => (projectRefs.current[index] = el)}
              className="relative z-10"
              style={{ perspective: '1000px' }}
            >
              <Card className="group hover:shadow-accent/20 relative overflow-hidden shadow-xl transition-shadow duration-300 hover:shadow-2xl">
                <div className="project-glow bg-accent/30 pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full opacity-0 blur-3xl" />
                <div className="project-glow bg-accent-light/20 pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full opacity-0 blur-3xl" />

                <div className="from-accent/5 to-accent-light/5 absolute inset-0 bg-gradient-to-br via-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <CardHeader className="relative z-10">
                  <CardTitle className="text-3xl">{project.title}</CardTitle>
                  <CardDescription className="text-base">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-accent-light/70 mb-6">{project.content}</p>
                  <Button
                    variant="outline"
                    className="border-accent/40 hover:border-accent/60 hover:bg-accent/10"
                  >
                    View Details
                  </Button>
                </CardContent>

                <div className="absolute top-4 right-4 flex space-x-2">
                  <div className="bg-accent-light/60 h-2 w-2 animate-pulse rounded-full" />
                  <div className="bg-accent/60 h-2 w-2 animate-pulse rounded-full delay-75" />
                  <div className="bg-accent-light/40 h-2 w-2 animate-pulse rounded-full delay-150" />
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <svg
        className="pointer-events-none absolute bottom-10 left-10 h-32 w-32 opacity-10"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <polygon
          points="50,15 90,85 10,85"
          fill="none"
          stroke="rgb(211, 218, 217)"
          strokeWidth="2"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="15s"
            repeatCount="indefinite"
          />
        </polygon>
      </svg>
    </section>
  )
}
