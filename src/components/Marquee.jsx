import { marquee } from '../data/portfolio.js'

export function Marquee() {
  const items = [...marquee, ...marquee]

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="marquee__item">
            {item} <span className="marquee__star">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
