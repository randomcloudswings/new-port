import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Button } from '@/components/ui/button'

export function Hero() {
  const titleRef = useScrollAnimation('fadeIn')
  const subtitleRef = useScrollAnimation('fadeIn', { start: 'top 75%' })
  const ctaRef = useScrollAnimation('fadeInScale', { start: 'top 70%' })

  return (
    <section className="flex min-h-screen items-center justify-center px-6">
      <div className="mx-auto max-w-4xl text-center">
        <h1
          ref={titleRef}
          className="glow mb-6 text-6xl font-bold tracking-tight text-accent-light md:text-8xl"
        >
          Welcome to Your Portfolio
        </h1>
        <p
          ref={subtitleRef}
          className="mb-8 text-xl text-accent-light/80 md:text-2xl"
        >
          A cinematic experience built with React, Three.js, and GSAP
        </p>
        <div ref={ctaRef}>
          <Button size="lg" className="text-lg">
            Explore More
          </Button>
        </div>
      </div>
    </section>
  )
}
