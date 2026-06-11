import { useEffect, useState } from 'react'
import { navLinks, profile } from '../data/portfolio.js'
import { useActiveSection } from '../hooks/useActiveSection.js'
import { Icon } from './Icon.jsx'

const sectionIds = navLinks.map((link) => link.href.slice(1))

export function Navbar({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <nav className="navbar__inner container" aria-label="Main navigation">
        <a href="#top" className="navbar__logo" onClick={closeMenu}>
          <span className="navbar__logo-bracket">&lt;</span>
          {profile.name}
          <span className="navbar__logo-bracket"> /&gt;</span>
        </a>

        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={closeMenu}
                className={active === link.href.slice(1) ? 'is-active' : ''}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="navbar__cta-item">
            <a href="#contact" className="btn btn--small" onClick={closeMenu}>
              Hire me
            </a>
          </li>
        </ul>

        <div className="navbar__actions">
          <button
            type="button"
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
          </button>
          <button
            type="button"
            className="icon-btn navbar__burger"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </nav>
    </header>
  )
}
