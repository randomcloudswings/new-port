import { AnimationProvider } from './context/AnimationContext'
import { Layout } from './components/Layout'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'

function App() {
  return (
    <AnimationProvider>
      <Layout>
        <Hero />
        <About />
        <Skills />
        <Projects />
      </Layout>
    </AnimationProvider>
  )
}

export default App
