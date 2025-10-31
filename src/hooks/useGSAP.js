import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'

export function useGSAP(animationCallback, dependencies = []) {
  const contextRef = useRef(null)
  const callbackRef = useRef(animationCallback)

  useEffect(() => {
    callbackRef.current = animationCallback
  }, [animationCallback])

  const wrappedCallback = useCallback(() => {
    contextRef.current = gsap.context(() => {
      callbackRef.current(gsap)
    })

    return () => {
      if (contextRef.current) {
        contextRef.current.revert()
      }
    }
  }, [])

  useEffect(() => {
    const cleanup = wrappedCallback()
    return cleanup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return contextRef
}
