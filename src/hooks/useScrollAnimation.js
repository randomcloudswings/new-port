import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { animationConfig } from '@/lib/animation-config'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation(animationType = 'fadeIn', options = {}) {
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const defaultAnimation = animationConfig[animationType] || animationConfig.fadeIn

    const animation = gsap.fromTo(
      element,
      defaultAnimation,
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration: options.duration || animationConfig.duration,
        ease: options.ease || animationConfig.ease,
        scrollTrigger: {
          trigger: element,
          start: options.start || 'top 80%',
          end: options.end || 'bottom 20%',
          toggleActions: options.toggleActions || 'play none none reverse',
          markers: options.markers || false,
          ...options.scrollTrigger,
        },
      }
    )

    return () => {
      animation.kill()
    }
  }, [animationType, options])

  return elementRef
}
