import { skillGroups } from '../data/portfolio.js'
import { Icon } from './Icon.jsx'
import { Section } from './Section.jsx'

export function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Technologies I work with">
      <div className="skills">
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
