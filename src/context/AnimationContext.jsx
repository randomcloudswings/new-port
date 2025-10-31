import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { animationConfig } from '@/lib/animation-config'
import { AnimationContext } from '@/hooks/useAnimation'

gsap.registerPlugin(ScrollTrigger)

export function AnimationProvider({ children }) {
  const timelineRef = useRef(gsap.timeline({ paused: true }))

  useEffect(() => {
    ScrollTrigger.refresh()

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const value = {
    timeline: timelineRef.current,
    config: animationConfig,
  }

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  )
}
