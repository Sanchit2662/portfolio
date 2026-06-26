import { CodeIcon } from './Icons'
import { PROFILE } from '../data/content'

export default function Hero() {
  return (
    <section className="hero" id="about">
      <div className="hero__grid">
        <div className="hero__avatar">
          <div className="avatar-box">
            <CodeIcon className="avatar-box__code" />
            <span className="avatar-box__star">★</span>
          </div>
          <div className="avatar-tag">PRESS START</div>
        </div>

        <div className="hero__copy">
          <p className="hero__eyebrow">// player one ready</p>
          <h1 className="hero__name">{PROFILE.name}</h1>
          <p className="hero__role">{PROFILE.title}</p>
          <p className="hero__desc">{PROFILE.tagline}</p>

          <div className="hero__cta">
            <a className="btn btn--primary" href="#projects">
              <CodeIcon width="16" height="16" /> View Projects
            </a>
            <a className="btn btn--ghost" href={`mailto:${PROFILE.links.email}`}>
              ✉ Hire Me
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
