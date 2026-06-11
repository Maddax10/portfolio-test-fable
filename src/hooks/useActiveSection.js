import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently in view so the navbar can
 * highlight the matching link. `ids` is a list like ['about', 'skills'].
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [ids])

  return active
}
