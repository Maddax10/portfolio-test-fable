import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsapSetup.js'

/** Soft light that trails the cursor, adding depth to the dark theme. */
export function CursorGlow() {
  const glowRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const xTo = gsap.quickTo(glowRef.current, 'x', { duration: 0.6, ease: 'power3' })
    const yTo = gsap.quickTo(glowRef.current, 'y', { duration: 0.6, ease: 'power3' })

    const onMove = (event) => {
      xTo(event.clientX)
      yTo(event.clientY)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
}
