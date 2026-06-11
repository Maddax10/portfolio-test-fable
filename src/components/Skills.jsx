import { useRef } from 'react'
import { skillGroups } from '../data/portfolio.js'
import { gsap, useGSAP } from '../lib/gsapSetup.js'
import { Icon } from './Icon.jsx'
import { Section } from './Section.jsx'

export function Skills() {
  const rootRef = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.skills__group', {
          y: 80,
          opacity: 0,
          rotateX: -14,
          transformPerspective: 900,
          transformOrigin: 'center top',
          duration: 0.9,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.skills', start: 'top 78%' },
        })

        gsap.from('.skills .chip', {
          scale: 0,
          opacity: 0,
          duration: 0.45,
          stagger: { each: 0.02, from: 'random' },
          ease: 'back.out(2)',
          scrollTrigger: { trigger: '.skills', start: 'top 70%' },
        })
      })
    },
    { scope: rootRef },
  )

  return (
    <Section id="skills" index="02" eyebrow="Skills" title="Technologies I work with">
      <div ref={rootRef} className="skills">
        {skillGroups.map((group) => (
          <article key={group.title} className="skills__group card">
            <h3 className="skills__group-title">
              <span className="skills__group-icon">
                <Icon name={group.icon} />
              </span>
              {group.title}
            </h3>
            <ul className="skills__list">
              {group.skills.map((skill) => (
                <li key={skill} className="chip">
                  {skill}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}
