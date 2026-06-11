import { useRef, useState } from 'react'
import { profile } from '../data/portfolio.js'
import { useMagnetic } from '../hooks/useMagnetic.js'
import { gsap, useGSAP } from '../lib/gsapSetup.js'
import { Icon } from './Icon.jsx'
import { Section } from './Section.jsx'

export function Contact() {
  const rootRef = useRef(null)
  const submitRef = useMagnetic(0.3)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.contact__info', {
          x: -60,
          rotateY: 24,
          transformOrigin: 'right center',
          transformPerspective: 1100,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.contact', start: 'top 75%' },
        })
        gsap.from('.contact__form', {
          x: 60,
          rotateY: -24,
          transformOrigin: 'left center',
          transformPerspective: 1100,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.contact', start: 'top 75%' },
        })
        gsap.from('.contact__form > *', {
          y: 26,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.25,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.contact', start: 'top 75%' },
        })
      })
    },
    { scope: rootRef },
  )

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  // No backend needed: compose the message in the visitor's mail client.
  const handleSubmit = (event) => {
    event.preventDefault()
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <Section
      id="contact"
      index="05"
      eyebrow="Contact"
      title="Finish line — let's build something together"
    >
      <div ref={rootRef} className="contact">
        <div className="contact__info">
          <p>
            You made it through the whole course! Have a project in mind, a
            question, or just want to say hi? My inbox is always open — I&apos;ll
            get back to you as soon as I can.
          </p>
          <a href={`mailto:${profile.email}`} className="contact__email">
            <Icon name="mail" />
            {profile.email}
          </a>
          <ul className="contact__socials" aria-label="Social links">
            {profile.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="icon-btn"
                  aria-label={social.label}
                >
                  <Icon name={social.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form className="contact__form card" onSubmit={handleSubmit}>
          <label className="field">
            <span className="field__label">Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              autoComplete="name"
              required
            />
          </label>

          <label className="field">
            <span className="field__label">Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              autoComplete="email"
              required
            />
          </label>

          <label className="field">
            <span className="field__label">Message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about your project…"
              rows={5}
              required
            />
          </label>

          <button ref={submitRef} type="submit" className="btn btn--full">
            Send message
          </button>
        </form>
      </div>
    </Section>
  )
}
