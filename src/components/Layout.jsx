import { CustomCursor } from './CustomCursor'
import { InkBackground } from './InkBackground'

export function Layout({ children }) {
  return (
    <div className="bg-background text-foreground relative min-h-screen overflow-x-hidden">
      <a
        href="#main-content"
        className="focus:bg-primary focus:text-primary-foreground sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-md focus:px-4 focus:py-2"
      >
        Skip to main content
      </a>
      <InkBackground />
      <CustomCursor />
      <main id="main-content" className="relative z-10">
        {children}
      </main>
    </div>
  )
}
