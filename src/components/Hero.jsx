import { profile } from '../data/portfolio.js'
import { Icon } from './Icon.jsx'

export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__grid" />
      </div>

      <div className="container hero__content">
        {profile.availableForWork && (
          <p className="hero__badge">
            <span className="hero__badge-dot" />
            Available for new projects
          </p>
        )}

        <h1 className="hero__title">
          Hi, I&apos;m <span className="text-gradient">{profile.name}</span>
          <br />
          {profile.role}
        </h1>

        <p className="hero__tagline">{profile.intro}</p>

        <div className="hero__actions">
          <a href="#projects" className="btn">
            View my work
          </a>
          <a href="#contact" className="btn btn--ghost">
            Get in touch
          </a>
        </div>

        <ul className="hero__socials" aria-label="Social links">
          {profile.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="icon-btn"
              >
                <Icon name={social.icon} />
              </a>
            </li>
          ))}
        </ul>

        <div className="hero__code" aria-hidden="true">
          <pre>
            <code>
              <span className="tok-kw">const</span>{' '}
              <span className="tok-var">developer</span> = {'{'}
              {'\n'}  stack: [<span className="tok-str">'React'</span>,{' '}
              <span className="tok-str">'TypeScript'</span>,{' '}
              <span className="tok-str">'Node'</span>],
              {'\n'}  passion: <span className="tok-str">'pixel-perfect UIs'</span>,
              {'\n'}  status: <span className="tok-str">'open to work'</span>,
              {'\n'}{'}'};
            </code>
          </pre>
        </div>
      </div>

      <a href="#about" className="hero__scroll-hint" aria-label="Scroll to about section">
        <Icon name="arrowDown" />
      </a>
    </section>
  )
}
