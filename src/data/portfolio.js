// ---------------------------------------------------------------------------
// Edit this file to make the portfolio yours: every section of the site
// (hero, about, skills, projects, experience, contact) reads from here.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Maximilien',
  role: 'React Web Developer',
  tagline: 'I build fast, accessible and beautiful web applications.',
  intro:
    'Front-end developer specialized in React. I turn ideas and designs into polished, production-ready interfaces — with a strong focus on performance, accessibility and clean code.',
  location: 'Paris, France · Remote friendly',
  email: 'maximilien01993@gmail.com',
  availableForWork: true,
  resumeUrl: '#', // link to your PDF resume
  socials: [
    { label: 'GitHub', url: 'https://github.com/maddax10', icon: 'github' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/', icon: 'linkedin' },
    { label: 'X / Twitter', url: 'https://x.com/', icon: 'twitter' },
  ],
}

export const about = {
  paragraphs: [
    "Hi! I'm Maximilien, a web developer who fell in love with React and the modern JavaScript ecosystem. For the past few years I've been designing and shipping single-page applications, dashboards and e-commerce experiences.",
    'I care about the details: smooth animations, keyboard navigation, fast load times and code that the next developer will enjoy reading. I work comfortably across the stack but the browser is where I feel at home.',
    "When I'm not coding, I'm exploring new front-end tools, contributing to open source, or sharing what I learn with other developers.",
  ],
  highlights: [
    { value: '4+', label: 'Years of experience' },
    { value: '25+', label: 'Projects shipped' },
    { value: '15+', label: 'Happy clients' },
    { value: '100%', label: 'Coffee powered' },
  ],
}

export const skillGroups = [
  {
    title: 'Front-end',
    icon: 'monitor',
    skills: [
      'React',
      'JavaScript (ES2024)',
      'TypeScript',
      'Next.js',
      'Redux / Zustand',
      'React Query',
      'HTML5',
      'CSS3 / Sass',
      'Tailwind CSS',
      'GSAP / ScrollTrigger',
    ],
  },
  {
    title: 'Back-end & APIs',
    icon: 'server',
    skills: [
      'Node.js',
      'Express',
      'REST APIs',
      'GraphQL',
      'PostgreSQL',
      'MongoDB',
      'Firebase',
      'Prisma',
    ],
  },
  {
    title: 'Tools & Workflow',
    icon: 'tool',
    skills: [
      'Git / GitHub',
      'Vite',
      'Jest / Vitest',
      'React Testing Library',
      'Storybook',
      'Figma',
      'CI/CD',
      'Docker',
      'Agile / Scrum',
    ],
  },
]

export const projects = [
  {
    title: 'Nova Commerce',
    description:
      'A full-featured e-commerce front-end with product search, cart, checkout flow and a headless CMS. Optimized to a 98 Lighthouse performance score.',
    tags: ['React', 'Next.js', 'Stripe', 'Tailwind CSS'],
    gradient: ['#6366f1', '#22d3ee'],
    icon: 'shoppingBag',
    liveUrl: '#',
    sourceUrl: '#',
    featured: true,
  },
  {
    title: 'Pulse Dashboard',
    description:
      'Real-time analytics dashboard with live charts, WebSocket updates and a fully keyboard-navigable interface. Dark and light themes included.',
    tags: ['React', 'TypeScript', 'D3.js', 'WebSocket'],
    gradient: ['#f43f5e', '#f97316'],
    icon: 'chart',
    liveUrl: '#',
    sourceUrl: '#',
    featured: true,
  },
  {
    title: 'TaskFlow',
    description:
      'A Kanban-style project management app with drag & drop, offline support and optimistic UI updates powered by React Query.',
    tags: ['React', 'React Query', 'dnd-kit', 'PWA'],
    gradient: ['#10b981', '#84cc16'],
    icon: 'check',
    liveUrl: '#',
    sourceUrl: '#',
    featured: true,
  },
  {
    title: 'CineSearch',
    description:
      'Movie discovery app with infinite scroll, debounced search and skeleton loading states, built on the TMDB API.',
    tags: ['React', 'Vite', 'REST API'],
    gradient: ['#8b5cf6', '#ec4899'],
    icon: 'clapperboard',
    liveUrl: '#',
    sourceUrl: '#',
    featured: false,
  },
  {
    title: 'DevBlog Platform',
    description:
      'A markdown-powered blog platform with syntax highlighting, comments and an admin editor with live preview.',
    tags: ['Next.js', 'MDX', 'PostgreSQL'],
    gradient: ['#0ea5e9', '#6366f1'],
    icon: 'notebook',
    liveUrl: '#',
    sourceUrl: '#',
    featured: false,
  },
  {
    title: 'Weatherly',
    description:
      'Beautiful weather app with geolocation, 7-day forecasts and animated weather icons. My favorite playground for CSS animations.',
    tags: ['React', 'CSS Animations', 'OpenWeather'],
    gradient: ['#f59e0b', '#ef4444'],
    icon: 'cloudSun',
    liveUrl: '#',
    sourceUrl: '#',
    featured: false,
  },
]

export const experience = [
  {
    role: 'Front-end Developer (React)',
    company: 'Freelance',
    period: '2024 — Present',
    description:
      'Building custom web applications for startups and small businesses: e-commerce storefronts, SaaS dashboards and marketing sites. Full ownership from design hand-off to deployment.',
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    role: 'Web Developer',
    company: 'Digital Agency',
    period: '2022 — 2024',
    description:
      'Developed and maintained 15+ client websites and SPAs. Introduced React and a shared component library that cut delivery time on new projects by 40%.',
    stack: ['React', 'Redux', 'Sass', 'Node.js'],
  },
  {
    role: 'Junior Front-end Developer',
    company: 'Tech Startup',
    period: '2021 — 2022',
    description:
      'First professional role: implemented UI features, fixed bugs and wrote tests for a B2B platform used by thousands of daily users. Learned the craft of code reviews and agile teamwork.',
    stack: ['JavaScript', 'React', 'Jest', 'Git'],
  },
]

export const marquee = [
  'React',
  'TypeScript',
  'Next.js',
  'GSAP',
  'Node.js',
  'GraphQL',
  'Tailwind CSS',
  'Vite',
  'Jest',
  'Figma',
]

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]
