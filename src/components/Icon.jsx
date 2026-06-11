import {
  ArrowDown,
  Briefcase,
  ChartColumn,
  Clapperboard,
  CloudSun,
  ExternalLink,
  Flag,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Moon,
  NotebookPen,
  Rocket,
  Server,
  ShoppingBag,
  Sparkle,
  SquareCheckBig,
  Star,
  Sun,
  Wrench,
  X,
} from 'lucide-react'

const lucideIcons = {
  arrowDown: ArrowDown,
  briefcase: Briefcase,
  chart: ChartColumn,
  clapperboard: Clapperboard,
  cloudSun: CloudSun,
  external: ExternalLink,
  flag: Flag,
  mail: Mail,
  pin: MapPin,
  menu: Menu,
  monitor: Monitor,
  moon: Moon,
  notebook: NotebookPen,
  rocket: Rocket,
  server: Server,
  shoppingBag: ShoppingBag,
  sparkle: Sparkle,
  check: SquareCheckBig,
  star: Star,
  sun: Sun,
  tool: Wrench,
  close: X,
}

// Lucide doesn't ship brand logos, so these three stay hand-drawn.
const brandPaths = {
  github: (
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18a11 11 0 0 1 5.76 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.23 2.75.12 3.04.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14 0 1.54-.01 2.78-.01 3.16 0 .31.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  ),
  linkedin: (
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45Z" />
  ),
  twitter: (
    <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
  ),
}

export function Icon({ name, size = 20, strokeWidth = 2, className = '' }) {
  const Lucide = lucideIcons[name]
  if (Lucide) {
    return (
      <Lucide
        size={size}
        strokeWidth={strokeWidth}
        className={className}
        aria-hidden="true"
        focusable="false"
      />
    )
  }

  const brand = brandPaths[name]
  if (!brand) return null
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {brand}
    </svg>
  )
}
