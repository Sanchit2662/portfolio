import { PROFILE } from '../data/content'

const ART = `███████  ██  ██
██       ██ ██
███████  ████
     ██  ██ ██
███████  ██  ██`

export const NEOFETCH_LINES = [
  ['user', `${PROFILE.handle}@${PROFILE.host}`],
  ['os', 'cloud-native linux'],
  ['kernel', 'kubernetes v1.31'],
  ['shell', 'go1.23 + bash'],
  ['prs_merged', '50+ across CNCF'],
  ['mentorship', 'LFX mentee · 2026'],
  ['side_quest', 'bitcoin & on-chain tooling'],
  ['contact', PROFILE.links.email],
]

export default function Neofetch() {
  return (
    <aside className="neofetch" aria-label="system info">
      <div className="neofetch__cap"><b>neofetch</b> — system info</div>
      <div className="neofetch__bd">
        <pre className="neofetch__art" aria-hidden="true">{ART}</pre>
        <div className="neofetch__info">
          {NEOFETCH_LINES.map(([k, v]) => (
            <div key={k}>
              <span className="k">{k}</span>
              <span>{v}</span>
            </div>
          ))}
          <div className="neofetch__swatches" aria-hidden="true">
            {['#e5534b', '#f0b23e', '#3ddc84', '#56c8dc', '#d4ddd6', '#5f6b64'].map((c) => (
              <i key={c} style={{ background: c }} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
