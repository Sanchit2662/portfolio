import { PROFILE } from '../data/content'

export default function Footer() {
  return (
    <footer className="footer">
      <span>
        <b>exit 0</b> — © {new Date().getFullYear()} {PROFILE.name}
      </span>
      <span className="footer__links">
        <a href={PROFILE.links.github} target="_blank" rel="noreferrer">github</a>
        <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer">linkedin</a>
        <a href={`mailto:${PROFILE.links.email}`}>email</a>
      </span>
    </footer>
  )
}
