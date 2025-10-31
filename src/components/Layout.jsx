import { CustomCursor } from './CustomCursor'
import { InkBackground } from './InkBackground'

export function Layout({ children }) {
  return (
    <div className="bg-background text-foreground relative min-h-screen overflow-x-hidden">
      <InkBackground />
      <CustomCursor />
      <main className="relative z-10">{children}</main>
    </div>
  )
}
