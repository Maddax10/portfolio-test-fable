import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsapSetup.js'

export function ScrollProgress() {
  const barRef = useRef(null)

  useGSAP(() => {
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    })
  })

  return <div ref={barRef} className="scroll-progress" aria-hidden="true" />
}
