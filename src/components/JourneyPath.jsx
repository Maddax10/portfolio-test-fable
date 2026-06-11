import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsapSetup.js'

const CHECKPOINTS = ['about', 'skills', 'projects', 'experience', 'contact']

/**
 * The "parkour course": a winding SVG path drawn down the whole page,
 * revealed as you scroll, with a runner that travels along it and
 * checkpoints that light up at each section.
 */
export function JourneyPath() {
  const rootRef = useRef(null)
  const svgRef = useRef(null)
  const pathRef = useRef(null)
  const runnerRef = useRef(null)
  const emojiRef = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const svg = svgRef.current
        const path = pathRef.current
        const runner = runnerRef.current
        let total = 0
        let nodeLengths = []

        const build = () => {
          const width = document.documentElement.clientWidth
          const height = document.documentElement.scrollHeight
          svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
          svg.setAttribute('width', width)
          svg.setAttribute('height', height)

          // One anchor point per section, zig-zagging left and right.
          const points = [{ x: width * 0.5, y: window.innerHeight * 0.96 }]
          CHECKPOINTS.forEach((id, i) => {
            const el = document.getElementById(id)
            if (!el) return
            const rect = el.getBoundingClientRect()
            points.push({
              x: i % 2 === 0 ? width * 0.07 : width * 0.93,
              y: rect.top + window.scrollY + 160,
            })
          })

          let d = `M ${points[0].x} ${points[0].y}`
          for (let i = 1; i < points.length; i++) {
            const prev = points[i - 1]
            const curr = points[i]
            const midY = (prev.y + curr.y) / 2
            d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`
          }
          path.setAttribute('d', d)

          total = path.getTotalLength()
          path.style.strokeDasharray = `${total}`

          // Find each checkpoint's distance along the path by sampling.
          const anchors = points.slice(1)
          nodeLengths = anchors.map(() => 0)
          const best = anchors.map(() => Infinity)
          const samples = 600
          for (let s = 0; s <= samples; s++) {
            const len = (s / samples) * total
            const pt = path.getPointAtLength(len)
            anchors.forEach((anchor, i) => {
              const dist = Math.hypot(pt.x - anchor.x, pt.y - anchor.y)
              if (dist < best[i]) {
                best[i] = dist
                nodeLengths[i] = len
              }
            })
          }

          const nodes = svg.querySelectorAll('.journey__node')
          nodes.forEach((node, i) => {
            const pt = path.getPointAtLength(nodeLengths[i] ?? 0)
            node.setAttribute('transform', `translate(${pt.x}, ${pt.y})`)
          })
        }

        const render = (progress) => {
          if (!total) return
          const len = total * progress
          path.style.strokeDashoffset = `${total - len}`

          const pt = path.getPointAtLength(len)
          const ahead = path.getPointAtLength(Math.min(len + 4, total))
          gsap.set(runner, { x: pt.x, y: pt.y })
          // Face the direction of travel.
          if (Math.abs(ahead.x - pt.x) > 0.3) {
            emojiRef.current.style.transform =
              ahead.x < pt.x ? 'scaleX(-1)' : 'scaleX(1)'
          }
          runner.style.opacity = progress > 0.005 ? 1 : 0

          const nodes = svg.querySelectorAll('.journey__node')
          nodes.forEach((node, i) => {
            node.classList.toggle('is-passed', len >= (nodeLengths[i] ?? Infinity) - 8)
          })
        }

        build()
        render(0)

        const trigger = ScrollTrigger.create({
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => render(self.progress),
        })

        const onRefresh = () => {
          build()
          render(trigger.progress)
        }
        ScrollTrigger.addEventListener('refresh', onRefresh)

        return () => {
          ScrollTrigger.removeEventListener('refresh', onRefresh)
          trigger.kill()
        }
      })
    },
    { scope: rootRef },
  )

  return (
    <div ref={rootRef} className="journey" aria-hidden="true">
      <svg ref={svgRef} className="journey__svg">
        <defs>
          <linearGradient id="journey-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent-1)" />
            <stop offset="100%" stopColor="var(--accent-2)" />
          </linearGradient>
        </defs>
        <path ref={pathRef} className="journey__path" />
        {CHECKPOINTS.map((id) => (
          <g key={id} className="journey__node">
            <circle className="journey__node-ring" r="14" />
            <circle className="journey__node-dot" r="5" />
          </g>
        ))}
      </svg>
      <div ref={runnerRef} className="journey__runner">
        <span ref={emojiRef} className="journey__runner-emoji">
          🏃
        </span>
      </div>
    </div>
  )
}
