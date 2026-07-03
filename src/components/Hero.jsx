import { PROFILE } from '../data/content'
import { useTyped } from '../hooks'
import Neofetch from './Neofetch'

export default function Hero() {
  const [cmd, done] = useTyped('whoami')

  return (
    <section className="hero" id="about">
      <p className="prompt">
        <span className="prompt__ps1">{PROFILE.handle}@{PROFILE.host}</span>
        <span className="prompt__cmd">{cmd}</span>
      </p>

      {done && (
        <div className="hero__grid">
          <div>
            <div className="hero__status"><i />open to opportunities</div>
            <h1 className="hero__name">{PROFILE.name}</h1>
            <p className="hero__role">{PROFILE.title} · LFX mentee 2026</p>
            <p className="hero__tagline">
              Building across the stack — <em>distributed systems</em>, cloud
              infrastructure and on-chain tooling. Sharpened in the open, with
              50+ PRs merged across CNCF projects along the way.
            </p>
            <div className="hero__cta">
              <a className="btn btn--primary" href="#oss">view open-source work</a>
              <a className="btn btn--ghost" href={`mailto:${PROFILE.links.email}`}>
                get in touch
              </a>
            </div>
          </div>
          <Neofetch />
        </div>
      )}
    </section>
  )
}
