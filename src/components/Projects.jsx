import { useRef } from 'react'
import { projects } from '../data/portfolio.js'
import { gsap, useGSAP } from '../lib/gsapSetup.js'
import { Icon } from './Icon.jsx'

function ProjectCard({ project, index }) {
  return (
    <article className={`project card ${project.featured ? 'project--featured' : ''}`}>
      <span className="project__index" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div
        className="project__cover"
        style={{
          background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
        }}
      >
        <span className="project__emoji" aria-hidden="true">
          {project.emoji}
        </span>
        <div className="project__links">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} — live demo`}
            className="icon-btn project__link"
          >
            <Icon name="external" />
          </a>
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} — source code`}
            className="icon-btn project__link"
          >
            <Icon name="github" />
          </a>
        </div>
      </div>

      <div className="project__body">
        <h3 className="project__title">{project.title}</h3>
        <p className="project__description">{project.description}</p>
        <ul className="project__tags">
          {project.tags.map((tag) => (
            <li key={tag} className="chip chip--small">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

/**
 * The big "parkour" moment: the section pins to the screen and vertical
 * scrolling carries you horizontally through the project gallery.
 */
export function Projects() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const counterRef = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const track = trackRef.current
        const distance = () =>
          Math.max(0, track.scrollWidth - document.documentElement.clientWidth)

        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: 1 / (projects.length - 1),
              duration: { min: 0.2, max: 0.6 },
              ease: 'power1.inOut',
            },
            onUpdate: (self) => {
              const current = Math.round(self.progress * (projects.length - 1)) + 1
              counterRef.current.textContent = String(current).padStart(2, '0')
            },
          },
        })

        gsap.from('.phase__header', {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        })
      })
    },
    { scope: sectionRef },
  )

  return (
    <section id="projects" ref={sectionRef} className="phase">
      <span className="section__ghost section__ghost--phase" aria-hidden="true">
        03
      </span>
      <div className="container phase__header">
        <div>
          <p className="section__eyebrow">Projects</p>
          <h2 className="section__title">Things I&apos;ve built</h2>
        </div>
        <p className="phase__counter">
          <span ref={counterRef}>01</span>
          <span className="phase__counter-total"> / {String(projects.length).padStart(2, '0')}</span>
        </p>
      </div>

      <div className="phase__viewport">
        <div ref={trackRef} className="phase__track">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>

      <p className="phase__hint" aria-hidden="true">
        keep scrolling — the course turns sideways here ↓
      </p>
    </section>
  )
}
