import { AnimationProvider } from './context/AnimationContext'
import { ToastProvider } from './context/ToastContext'
import { Layout } from './components/Layout'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'
import { Contact } from './sections/Contact'

function App() {
  return (
    <AnimationProvider>
      <ToastProvider>
        <Layout>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </Layout>
      </ToastProvider>
    </AnimationProvider>
  )
}

export default App
