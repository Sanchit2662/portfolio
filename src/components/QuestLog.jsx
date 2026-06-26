import { PROJECTS } from '../data/content'
import { CoinIcon, GitHubIcon } from './Icons'

export default function QuestLog() {
  return (
    <section className="section" id="projects">
      <h2 className="section__title">QUEST LOG</h2>
      <p className="section__sub">Epic projects completed on the journey</p>

      <div className="quest-grid">
        {PROJECTS.map((p) => (
          <a className="quest card" key={p.name} href={p.url} target="_blank" rel="noreferrer">
            <div className="quest__head">
              <h3 className="quest__name">{p.name}</h3>
              <span className="quest__xp">
                <CoinIcon /> {p.xp}
              </span>
            </div>
            <p className="quest__desc">{p.desc}</p>
            <div className="quest__tags">
              {p.tags.map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
            <span className="quest__open">
              <GitHubIcon width="16" height="16" /> View Repo →
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
