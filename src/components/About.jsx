import { about, profile } from '../data/portfolio.js'
import { Icon } from './Icon.jsx'
import { Section } from './Section.jsx'

export function About() {
  return (
    <Section id="about" eyebrow="About me" title="A developer who loves the craft">
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
              <span className="about__stat-value text-gradient">{stat.value}</span>
              <span className="about__stat-label">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
