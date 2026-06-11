import { useRef } from 'react'
import { projects } from '../data/portfolio.js'
import { gsap, useGSAP } from '../lib/gsapSetup.js'
import { Icon } from './Icon.jsx'

function ProjectCard({ project, index }) {
  return (
    <article className="project card">
      <span className="project__index" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div
        className="project__cover"
        style={{
          background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
        }}
      >
        {project.featured && (
          <span className="project__badge">
            <Icon name="star" size={12} strokeWidth={2.5} />
            Featured
          </span>
        )}
        <span className="project__icon" aria-hidden="true">
          <Icon name={project.icon} size={54} strokeWidth={1.4} />
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
 * scrolling carries you horizontally through the gallery — with a
 * coverflow effect where side cards lean away in 3D.
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
        const cards = gsap.utils.toArray('.phase .project')
        const distance = () =>
          Math.max(0, track.scrollWidth - document.documentElement.clientWidth)

        // Coverflow: the card nearest the viewport center stands flat,
        // its neighbours lean away into the depth.
        const applyDepth = () => {
          const viewportCenter = document.documentElement.clientWidth / 2
          cards.forEach((card) => {
            const rect = card.getBoundingClientRect()
            const offset = (rect.left + rect.width / 2 - viewportCenter) / viewportCenter
            const eased = gsap.utils.clamp(-1.4, 1.4, offset)
            gsap.set(card, {
              rotationY: eased * -16,
              z: -Math.abs(eased) * 150,
              scale: 1 - Math.abs(eased) * 0.05,
            })
          })
        }

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
              applyDepth()
            },
            onRefresh: applyDepth,
          },
        })

        // The whole gallery rises out of the page depth as it approaches.
        gsap.fromTo(
          '.phase__scene',
          {
            rotateX: 14,
            z: -200,
            scale: 0.9,
            autoAlpha: 0.05,
            transformOrigin: 'center 90%',
            transformPerspective: 1400,
          },
          {
            rotateX: 0,
            z: 0,
            scale: 1,
            autoAlpha: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 96%',
              end: 'top 15%',
              scrub: 0.4,
            },
          },
        )
      })
    },
    { scope: sectionRef },
  )

  return (
    <section id="projects" ref={sectionRef} className="phase">
      <span className="section__ghost section__ghost--phase" aria-hidden="true">
        03
      </span>
      <div className="phase__scene">
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
          keep scrolling — the course turns sideways here
          <Icon name="arrowDown" size={14} />
        </p>
      </div>
    </section>
  )
}
