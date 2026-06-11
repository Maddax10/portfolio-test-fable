import { useRef } from 'react'
import { about, profile } from '../data/portfolio.js'
import { gsap, useGSAP } from '../lib/gsapSetup.js'
import { Icon } from './Icon.jsx'
import { Section } from './Section.jsx'

/** Splits values like "25+" or "100%" into a number and its suffix. */
function parseStat(value) {
  const match = value.match(/^(\d+)(.*)$/)
  return match ? { target: Number(match[1]), suffix: match[2] } : { target: 0, suffix: value }
}

export function About() {
  const rootRef = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.about__text > *', {
          y: 36,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about', start: 'top 75%' },
        })

        gsap.from('.about__stat', {
          y: 50,
          opacity: 0,
          scale: 0.9,
          duration: 0.7,
          stagger: 0.1,
          ease: 'back.out(1.6)',
          scrollTrigger: { trigger: '.about__stats', start: 'top 82%' },
        })

        // Count the numbers up from zero when the cards arrive.
        gsap.utils.toArray('.about__stat-value').forEach((el) => {
          const { target, suffix } = parseStat(el.dataset.value)
          const counter = { value: 0 }
          gsap.to(counter, {
            value: target,
            duration: 1.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
            onUpdate: () => {
              el.textContent = `${Math.round(counter.value)}${suffix}`
            },
          })
        })
      })
    },
    { scope: rootRef },
  )

  return (
    <Section
      id="about"
      index="01"
      eyebrow="About me"
      title="A developer who loves the craft"
      className="section--alt"
    >
      <div ref={rootRef}>
        <div className="about">
          <div className="about__text">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
            <p className="about__location">
              <Icon name="pin" size={18} />
              {profile.location}
            </p>
          </div>

          <ul className="about__stats">
            {about.highlights.map((stat) => (
              <li key={stat.label} className="about__stat card">
                <span
                  className="about__stat-value text-gradient"
                  data-value={stat.value}
                >
                  {stat.value}
                </span>
                <span className="about__stat-label">{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
