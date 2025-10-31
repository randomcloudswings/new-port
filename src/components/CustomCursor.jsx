import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function CustomCursor() {
  const cursorRef = useRef(null)
  const cursorGlowRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorGlow = cursorGlowRef.current

    if (!cursor || !cursorGlow) return

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      })

      gsap.to(cursorGlow, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseEnter = () => {
      gsap.to([cursor, cursorGlow], {
        scale: 1.5,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to([cursor, cursorGlow], {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    window.addEventListener('mousemove', moveCursor)

    const interactiveElements = document.querySelectorAll('a, button, [role="button"]')
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="bg-accent-light pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-difference"
      />
      <div
        ref={cursorGlowRef}
        className="bg-accent/30 pointer-events-none fixed top-0 left-0 z-[9998] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full blur-lg"
      />
    </>
  )
}
