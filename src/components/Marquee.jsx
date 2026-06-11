import { marquee } from '../data/portfolio.js'
import { Icon } from './Icon.jsx'

export function Marquee() {
  const items = [...marquee, ...marquee]

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="marquee__item">
            {item}
            <span className="marquee__star">
              <Icon name="sparkle" size={13} strokeWidth={2.2} />
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
