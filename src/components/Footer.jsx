import { PROFILE } from '../data/content'
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div>
          <h3 className="footer__name">{PROFILE.name}</h3>
          <p className="footer__bio">
            Cloud-native &amp; blockchain developer crafting open-source tools.
            Always ready for the next quest.
          </p>
        </div>

        <div>
          <h4 className="footer__head">QUICK LINKS</h4>
          <ul className="footer__links">
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer__head">CONNECT</h4>
          <div className="footer__social">
            <a href={PROFILE.links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon /></a>
            <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
            <a href={`mailto:${PROFILE.links.email}`} aria-label="Email"><MailIcon /></a>
          </div>
        </div>
      </div>

      <div className="footer__bar">
        © 2026 {PROFILE.name}. BUILT WITH <span className="heart">♥</span> &amp; REACT
      </div>
    </footer>
  )
}
