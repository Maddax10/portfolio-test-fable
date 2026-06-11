import { useRef } from 'react'
import { profile } from '../data/portfolio.js'
import { useMagnetic } from '../hooks/useMagnetic.js'
import { gsap, useGSAP } from '../lib/gsapSetup.js'
import { Icon } from './Icon.jsx'
import { LOADER_MS } from './Loader.jsx'

function MaskedWords({ text, className = '' }) {
  return (
    <span className={`mask-line ${className}`}>
      {text.split(' ').map((word, i) => (
        <span key={`${word}-${i}`} className="mask-line__mask">
          <span className="mask-line__word">{word}&nbsp;</span>
        </span>
      ))}
    </span>
  )
}

export function Hero() {
  const heroRef = useRef(null)
  const codeCardRef = useRef(null)
  const primaryCta = useMagnetic()
  const secondaryCta = useMagnetic(0.25)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Entrance: waits for the loader curtain, then words rise out of
        // their masks and the layers assemble in depth.
        const intro = gsap.timeline({
          delay: (LOADER_MS - 500) / 1000,
          defaults: { ease: 'power4.out' },
        })
        intro
          .from('.hero__badge', { y: 24, autoAlpha: 0, duration: 0.7 })
          .from(
            '.mask-line__word',
            { yPercent: 120, rotateX: -50, transformPerspective: 800, duration: 1.1, stagger: 0.07 },
            0.15,
          )
          .from('.hero__tagline', { y: 30, autoAlpha: 0, duration: 0.8 }, 0.75)
          .from('.hero__actions > *', { y: 24, autoAlpha: 0, stagger: 0.1, duration: 0.6 }, 0.9)
          .from('.hero__socials li', { y: 18, autoAlpha: 0, stagger: 0.08, duration: 0.5 }, 1.05)
          .from(
            '.hero__code',
            {
              y: 60,
              z: -200,
              autoAlpha: 0,
              rotateX: -32,
              duration: 1.1,
              transformPerspective: 900,
            },
            1.1,
          )
          .from('.hero__scroll-hint', { autoAlpha: 0, duration: 0.6 }, 1.4)

        // Depth on the way out: layers leave at different speeds.
        const scrub = { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true }
        gsap.to('.hero__content', { yPercent: -14, opacity: 0.15, ease: 'none', scrollTrigger: scrub })
        gsap.to('.hero__orb--1', { yPercent: 42, ease: 'none', scrollTrigger: scrub })
        gsap.to('.hero__orb--2', { yPercent: -34, ease: 'none', scrollTrigger: scrub })
        gsap.to('.hero__grid', { yPercent: 18, opacity: 0, ease: 'none', scrollTrigger: scrub })

        // Interactive 3D: the code card tilts toward the cursor.
        if (window.matchMedia('(pointer: fine)').matches) {
          const card = codeCardRef.current
          const rotX = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3' })
          const rotY = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3' })
          gsap.set(card, { transformPerspective: 900 })

          const onMove = (event) => {
            const rect = card.getBoundingClientRect()
            const relX = (event.clientX - rect.left) / rect.width - 0.5
            const relY = (event.clientY - rect.top) / rect.height - 0.5
            rotY(relX * 16)
            rotX(relY * -16)
          }
          const onLeave = () => {
            rotX(0)
            rotY(0)
          }
          card.addEventListener('mousemove', onMove)
          card.addEventListener('mouseleave', onLeave)
          return () => {
            card.removeEventListener('mousemove', onMove)
            card.removeEventListener('mouseleave', onLeave)
          }
        }
      })
    },
    { scope: heroRef },
  )

  return (
    <section id="top" ref={heroRef} className="hero">
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
          <MaskedWords text={`Hi, I'm ${profile.name}`} className="mask-line--accent" />
          <MaskedWords text={profile.role} />
        </h1>

        <p className="hero__tagline">{profile.intro}</p>

        <div className="hero__actions">
          <a ref={primaryCta} href="#projects" className="btn">
            <Icon name="flag" size={17} />
            Start the course
          </a>
          <a ref={secondaryCta} href="#contact" className="btn btn--ghost">
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

        <div ref={codeCardRef} className="hero__code" aria-hidden="true">
          <pre>
            <code>
              <span className="tok-kw">const</span>{' '}
              <span className="tok-var">developer</span> = {'{'}
              {'\n'}  stack: [<span className="tok-str">'React'</span>,{' '}
              <span className="tok-str">'TypeScript'</span>,{' '}
              <span className="tok-str">'GSAP'</span>],
              {'\n'}  passion: <span className="tok-str">'pixel-perfect UIs'</span>,
              {'\n'}  status: <span className="tok-str">'open to work'</span>,
              {'\n'}{'}'};
            </code>
          </pre>
        </div>
      </div>

      <a href="#about" className="hero__scroll-hint" aria-label="Scroll to about section">
        <span className="hero__scroll-text">scroll to run</span>
        <Icon name="arrowDown" size={18} />
      </a>
    </section>
  )
}
