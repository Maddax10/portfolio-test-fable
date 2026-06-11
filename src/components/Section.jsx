import { useReveal } from '../hooks/useReveal.js'

export function Section({ id, eyebrow, title, children, className = '' }) {
  const ref = useReveal()

  return (
    <section id={id} className={`section ${className}`}>
      <div ref={ref} className="container reveal">
        <header className="section__header">
          <p className="section__eyebrow">{eyebrow}</p>
          <h2 className="section__title">{title}</h2>
        </header>
        {children}
      </div>
    </section>
  )
}
