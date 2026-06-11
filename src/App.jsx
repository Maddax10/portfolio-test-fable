import { About } from './components/About.jsx'
import { Contact } from './components/Contact.jsx'
import { Experience } from './components/Experience.jsx'
import { Footer } from './components/Footer.jsx'
import { Hero } from './components/Hero.jsx'
import { Navbar } from './components/Navbar.jsx'
import { Projects } from './components/Projects.jsx'
import { Skills } from './components/Skills.jsx'
import { useTheme } from './hooks/useTheme.js'

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
