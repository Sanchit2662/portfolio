import { useState } from 'react'
import { EXPERIENCE, OSS } from '../data/content'
import { useReveal } from '../hooks'

export default function Experience() {
  const ref = useReveal()
  const [proofOpen, setProofOpen] = useState(false)

  return (
    <section id="oss" ref={ref} className="reveal">
      <p className="prompt">
        <span className="prompt__ps1">sanchit@cloud</span>
        <span className="prompt__cmd">cat experience.log</span>
      </p>

      <div className="panel">
        <div className="panel__cap">
          <span><b>experience</b> — log</span>
          <span>{EXPERIENCE.length} entries</span>
        </div>
        {EXPERIENCE.map((e) => (
          <div className="xp__row" key={e.role}>
            <span className="xp__period">{e.period}</span>
            <span className="xp__main">
              <span className="xp__role">{e.role}</span>
              <span className="xp__org"> @ {e.org}</span>
              <span className="xp__desc">{e.desc}</span>
            </span>
          </div>
        ))}

        <button
          className="xp__proof"
          onClick={() => setProofOpen((o) => !o)}
          aria-expanded={proofOpen}
        >
          <span className="xp__caret">{proofOpen ? '▾' : '▸'}</span>
          proof &gt; claims
          <span className="xp__proofhint">
            {proofOpen ? 'the receipts:' : 'click to verify the merged PRs'}
          </span>
        </button>

        {proofOpen && (
          <div className="xp__proofbody">
            <div className="oss__stats">
              {OSS.stats.map((s) => (
                <div className="oss__stat" key={s.label}>
                  <b>{s.value}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
            {OSS.orgs.map((o) => (
              <a
                className="oss__org"
                key={o.name}
                href={o.prs}
                target="_blank"
                rel="noreferrer"
              >
                <span className="n">{o.name}</span>
                <span className="d">{o.desc}</span>
                <span className="l">merged PRs</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
