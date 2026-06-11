import { useRef } from 'react'
import { experience } from '../data/portfolio.js'
import { gsap, useGSAP } from '../lib/gsapSetup.js'
import { Icon } from './Icon.jsx'
import { Section } from './Section.jsx'

export function Experience() {
  const rootRef = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // The center line draws itself as you descend.
        gsap.from('.timeline__line', {
          scaleY: 0,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline',
            start: 'top 75%',
            end: 'bottom 55%',
            scrub: 0.5,
          },
        })

        gsap.utils.toArray('.timeline__item').forEach((item, i) => {
          gsap.from(item.querySelector('.timeline__card'), {
            x: i % 2 === 0 ? -80 : 80,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 80%' },
          })
          gsap.from(item.querySelector('.timeline__marker'), {
            scale: 0,
            duration: 0.6,
            ease: 'back.out(2.5)',
            scrollTrigger: { trigger: item, start: 'top 80%' },
          })
        })
      })
    },
    { scope: rootRef },
  )

  return (
    <Section
      id="experience"
      index="04"
      eyebrow="Experience"
      title="Where I've worked"
      className="section--alt"
    >
      <ol ref={rootRef} className="timeline">
        <span className="timeline__line" aria-hidden="true" />
        {experience.map((job, i) => (
          <li
            key={`${job.company}-${job.period}`}
            className={`timeline__item ${i % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right'}`}
          >
            <span className="timeline__marker" aria-hidden="true">
              <Icon name="briefcase" size={16} />
            </span>
            <div className="timeline__card card">
              <p className="timeline__period">{job.period}</p>
              <h3 className="timeline__role">
                {job.role} <span className="timeline__company">· {job.company}</span>
              </h3>
              <p className="timeline__description">{job.description}</p>
              <ul className="project__tags">
                {job.stack.map((tech) => (
                  <li key={tech} className="chip chip--small">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
