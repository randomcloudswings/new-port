import { useContext, createContext } from 'react'

export const AnimationContext = createContext(null)

export function useAnimation() {
  const context = useContext(AnimationContext)
  if (!context) {
    throw new Error('useAnimation must be used within AnimationProvider')
  }
  return context
}
