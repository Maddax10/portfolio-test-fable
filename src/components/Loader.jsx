import { useRef, useState } from 'react'
import { profile } from '../data/portfolio.js'
import { gsap, useGSAP } from '../lib/gsapSetup.js'

/** Total time before the page is fully revealed — Hero waits for this. */
export const LOADER_MS = 1900

/**
 * Opening curtain: a counter runs to 100, then two panels split open
 * to reveal the site. Skipped entirely under prefers-reduced-motion.
 */
export function Loader() {
  const rootRef = useRef(null)
  const counterRef = useRef(null)
  const [done, setDone] = useState(false)
  const [reduced] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useGSAP(
    () => {
      if (reduced || done) return

      const counter = { value: 0 }
      const tl = gsap.timeline({ onComplete: () => setDone(true) })

      tl.to(counter, {
        value: 100,
        duration: 1,
        ease: 'power2.inOut',
        onUpdate: () => {
          counterRef.current.textContent = String(Math.round(counter.value)).padStart(3, '0')
        },
      })
        .to('.loader__bar-fill', { scaleX: 1, duration: 1, ease: 'power2.inOut' }, 0)
        .to('.loader__content', { yPercent: -40, autoAlpha: 0, duration: 0.45, ease: 'power3.in' }, 1.05)
        .to('.loader__panel--left', { yPercent: -101, duration: 0.7, ease: 'power4.inOut' }, 1.2)
        .to('.loader__panel--right', { yPercent: 101, duration: 0.7, ease: 'power4.inOut' }, 1.28)
    },
    { scope: rootRef },
  )

  if (reduced || done) return null

  return (
    <div ref={rootRef} className="loader" aria-hidden="true">
      <div className="loader__panel loader__panel--left" />
      <div className="loader__panel loader__panel--right" />
      <div className="loader__content">
        <p className="loader__logo">
          <span className="loader__bracket">&lt;</span>
          {profile.name}
          <span className="loader__bracket"> /&gt;</span>
        </p>
        <div className="loader__bar">
          <div className="loader__bar-fill" />
        </div>
        <p ref={counterRef} className="loader__counter">
          000
        </p>
      </div>
    </div>
  )
}
