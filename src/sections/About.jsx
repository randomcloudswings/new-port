import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export function About() {
  const titleRef = useScrollAnimation('fadeInLeft')
  const contentRef = useScrollAnimation('fadeInRight', { start: 'top 70%' })

  return (
    <section className="flex min-h-screen items-center justify-center px-6">
      <div className="mx-auto max-w-6xl">
        <h2
          ref={titleRef}
          className="mb-8 text-5xl font-bold text-accent-light md:text-6xl"
        >
          About Section
        </h2>
        <div ref={contentRef} className="text-xl text-accent-light/70">
          <p className="mb-4">
            This is an example section demonstrating the scroll animation
            system. The title animates from the left, while this content
            animates from the right.
          </p>
          <p>
            Build more sections like this to create your portfolio experience.
          </p>
        </div>
      </div>
    </section>
  )
}
