import { About } from './components/About.jsx'
import { Contact } from './components/Contact.jsx'
import { CursorGlow } from './components/CursorGlow.jsx'
import { Experience } from './components/Experience.jsx'
import { Footer } from './components/Footer.jsx'
import { Hero } from './components/Hero.jsx'
import { JourneyPath } from './components/JourneyPath.jsx'
import { Marquee } from './components/Marquee.jsx'
import { Navbar } from './components/Navbar.jsx'
import { Projects } from './components/Projects.jsx'
import { ScrollProgress } from './components/ScrollProgress.jsx'
import { Skills } from './components/Skills.jsx'
import { useSmoothScroll } from './hooks/useSmoothScroll.js'
import { useTheme } from './hooks/useTheme.js'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  useSmoothScroll()

  return (
    <div className="site">
      <CursorGlow />
      <ScrollProgress />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <JourneyPath />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
