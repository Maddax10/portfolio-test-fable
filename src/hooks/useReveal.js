import { useEffect, useRef } from 'react'

/**
 * Adds the `.revealed` class to the returned ref's element when it
 * scrolls into view. Pair with the `.reveal` CSS class for the animation.
 */
export function useReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.classList.add('revealed')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px', ...options },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [options])

  return ref
}
