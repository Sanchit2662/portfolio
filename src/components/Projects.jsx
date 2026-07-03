import { useEffect, useRef, useState } from 'react'
import { PROFILE, PROJECTS } from '../data/content'
import { useGithubRepos, useReveal } from '../hooks'
import { GitHubIcon } from './Icons'

function ProjectModal({ project, live, onClose }) {
  const [typed, setTyped] = useState('')
  const [opening, setOpening] = useState(false)
  const timersRef = useRef([])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      timersRef.current.forEach(clearTimeout)
    }
  }, [onClose])

  // Types `gh repo view … --web` into the popup, pauses 1s, then opens GitHub.
  function openOnGithub() {
    if (opening) return
    setOpening(true)
    const cmd = `gh repo view ${PROFILE.githubUser}/${project.repo} --web`
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const typeMs = reduced ? 0 : 28

    cmd.split('').forEach((_, i) => {
      timersRef.current.push(
        setTimeout(() => setTyped(cmd.slice(0, i + 1)), i * typeMs)
      )
    })
    timersRef.current.push(
      setTimeout(() => {
        window.open(project.url, '_blank', 'noreferrer')
        setOpening(false)
        setTyped('')
      }, cmd.length * typeMs + 1000)
    )
  }

  return (
    <div className="pmodal__overlay" onClick={onClose}>
      <div
        className="pmodal"
        role="dialog"
        aria-modal="true"
        aria-label={project.repo}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pmodal__bar">
          <span className="titlebar__dots"><i /><i /><i /></span>
          <span className="pmodal__title">{project.repo}</span>
          <button className="pmodal__gh" onClick={openOnGithub} disabled={opening}>
            <GitHubIcon width="14" height="14" /> view on github
          </button>
          <button className="pmodal__close" onClick={onClose} aria-label="close">
            ✕
          </button>
        </div>

        <div className="pmodal__bd">
          <p className="pmodal__cmd">
            <span className="ps1">➜ ~</span> cat projects/{project.repo}/README.md
          </p>
          {project.about.map((line) => (
            <p className="pmodal__out" key={line}>{line}</p>
          ))}

          <p className="pmodal__cmd">
            <span className="ps1">➜ ~</span> cat stack.txt
          </p>
          <div className="pmodal__stack">
            {project.stack.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>

          {live && (
            <p className="pmodal__out pmodal__meta">
              ★ {live.stars} stars · ⑂ {live.forks} forks — live from GitHub
            </p>
          )}

          {typed && (
            <p className="pmodal__cmd">
              <span className="ps1">➜ ~</span> {typed}
              <span className="pmodal__cursor" />
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const ref = useReveal()
  const repos = useGithubRepos(PROFILE.githubUser)
  const [active, setActive] = useState(null)

  return (
    <section id="projects" ref={ref} className="reveal">
      <p className="prompt">
        <span className="prompt__ps1">sanchit@cloud</span>
        <span className="prompt__cmd">ls <span className="prompt__flag">-la</span> projects/</span>
      </p>

      <div className="panel">
        <div className="panel__cap">
          <span><b>projects</b> — {PROJECTS.length} entries</span>
          <span>click a row for details · ★ live from GitHub</span>
        </div>
        {PROJECTS.map((p) => {
          const live = repos[p.repo]
          return (
            <a
              className="proj__row"
              key={p.repo}
              href={p.url}
              onClick={(e) => {
                e.preventDefault()
                setActive(p)
              }}
            >
              <span className="n">{p.repo}</span>
              <span className="d">{p.desc}</span>
              <span className="m">
                {live && <span className="stars">{live.stars}</span>}
                <span className="lang">{p.lang}</span>
              </span>
            </a>
          )
        })}
      </div>

      {active && (
        <ProjectModal
          project={active}
          live={repos[active.repo]}
          onClose={() => setActive(null)}
        />
      )}
    </section>
  )
}
