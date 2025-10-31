import { AnimationProvider } from './context/AnimationContext'
import { Layout } from './components/Layout'
import { Hero } from './sections/Hero'
import { About } from './sections/About'

function App() {
  return (
    <AnimationProvider>
      <Layout>
        <Hero />
        <About />
      </Layout>
    </AnimationProvider>
  )
}

export default App
