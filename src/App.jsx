import { AnimationProvider } from './context/AnimationContext'
import { Layout } from './components/Layout'
import { Hero } from './sections/Hero'

function App() {
  return (
    <AnimationProvider>
      <Layout>
        <Hero />
      </Layout>
    </AnimationProvider>
  )
}

export default App
