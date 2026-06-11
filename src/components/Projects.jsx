import { projects } from '../data/portfolio.js'
import { Icon } from './Icon.jsx'
import { Section } from './Section.jsx'

function ProjectCard({ project }) {
  return (
    <article className={`project card ${project.featured ? 'project--featured' : ''}`}>
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

export function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="Things I've built">
      <div className="projects">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </Section>
  )
}
