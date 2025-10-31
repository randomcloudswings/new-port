import { CustomCursor } from './CustomCursor'
import { InkBackground } from './InkBackground'

export function Layout({ children }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <InkBackground />
      <CustomCursor />
      <main className="relative z-10">
        {children}
      </main>
    </div>
  )
}
