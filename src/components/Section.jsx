import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsapSetup.js'

export function Section({ id, index, eyebrow, title, children, className = '' }) {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // The whole scene stands up from the depth of the page as it
        // approaches — the site reveals itself one panel at a time.
        gsap.fromTo(
          '.section__scene',
          {
            rotateX: 16,
            z: -180,
            scale: 0.92,
            autoAlpha: 0.05,
            transformOrigin: 'center 85%',
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
              end: 'top 42%',
              scrub: 0.4,
            },
          },
        )

        gsap.from('.section__eyebrow', {
          x: -36,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        })
        gsap.from('.section__title', {
          y: 56,
          opacity: 0,
          duration: 0.9,
          delay: 0.08,
          ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        })
        // Giant ghost number drifting slower than the page (parallax).
        gsap.fromTo(
          '.section__ghost',
          { yPercent: -36 },
          {
            yPercent: 36,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })
    },
    { scope: sectionRef },
  )

  return (
    <section id={id} ref={sectionRef} className={`section ${className}`}>
      <span className="section__ghost" aria-hidden="true">
        {index}
      </span>
      <div className="section__scene">
        <div className="container">
          <header className="section__header">
            <p className="section__eyebrow">{eyebrow}</p>
            <h2 className="section__title">{title}</h2>
          </header>
          {children}
        </div>
      </div>
    </section>
  )
}
