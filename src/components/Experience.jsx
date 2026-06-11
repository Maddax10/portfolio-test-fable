import { experience } from '../data/portfolio.js'
import { Icon } from './Icon.jsx'
import { Section } from './Section.jsx'

export function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked">
      <ol className="timeline">
        {experience.map((job) => (
          <li key={`${job.company}-${job.period}`} className="timeline__item">
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
