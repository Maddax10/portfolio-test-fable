import Lenis from 'lenis'
import { useEffect } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsapSetup.js'

/**
 * Buttery smooth scrolling with Lenis, kept in sync with GSAP's
 * ScrollTrigger. Anchor links are routed through Lenis so in-page
 * navigation glides instead of jumping.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Lenis and CSS smooth-scrolling fight each other.
    document.documentElement.style.scrollBehavior = 'auto'

    const lenis = new Lenis({ lerp: 0.12 })
    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const onAnchorClick = (event) => {
      const link = event.target.closest('a[href^="#"]')
      if (!link) return
      const target = document.querySelector(link.getAttribute('href'))
      if (!target) return
      event.preventDefault()
      lenis.scrollTo(target, { offset: -72, duration: 1.4 })
    }
    document.addEventListener('click', onAnchorClick)

    return () => {
      document.removeEventListener('click', onAnchorClick)
      gsap.ticker.remove(tick)
      lenis.destroy()
      document.documentElement.style.scrollBehavior = ''
    }
  }, [])
}
