import { profile } from '../data/portfolio.js'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          © {new Date().getFullYear()} {profile.name}. Designed &amp; built with React.
        </p>
        <a href="#top" className="footer__top-link">
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
