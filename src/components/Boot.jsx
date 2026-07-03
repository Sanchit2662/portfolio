import { useEffect, useRef, useState } from 'react'

const BOOT_LINES = [
  { type: 'cmd', text: './sanchit.dev --boot' },
  { type: 'out', text: 'sanchit.dev v2.0 — terminal portfolio' },
  { type: 'ok', text: 'mounting /projects' },
  { type: 'ok', text: 'starting github-stats.service' },
  { type: 'ok', text: 'loading skills/ tree' },
  { type: 'ok', text: 'applying theme preferences' },
  { type: 'ok', text: 'all systems up' },
  { type: 'out', text: 'welcome, visitor — rendering portfolio…' },
]

const STEP_MS = 170
const DONE_PAUSE_MS = 450

// Short boot sequence on load/reload. Any key or click skips it.
export default function Boot({ onDone }) {
  const [count, setCount] = useState(1)
  const doneRef = useRef(false)

  useEffect(() => {
    const finish = () => {
      if (doneRef.current) return
      doneRef.current = true
      onDone()
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish()
      return
    }

    const iv = setInterval(() => {
      setCount((c) => {
        if (c >= BOOT_LINES.length) {
          clearInterval(iv)
          setTimeout(finish, DONE_PAUSE_MS)
          return c
        }
        return c + 1
      })
    }, STEP_MS)

    const skip = () => finish()
    window.addEventListener('keydown', skip)
    window.addEventListener('pointerdown', skip)
    return () => {
      clearInterval(iv)
      window.removeEventListener('keydown', skip)
      window.removeEventListener('pointerdown', skip)
    }
  }, [onDone])

  return (
    <div className="boot" aria-label="loading">
      {BOOT_LINES.slice(0, count).map((l) => (
        <pre key={l.text} className={`boot__line boot__line--${l.type}`}>
          {l.type === 'ok' && <span className="ok">[ ok ] </span>}
          {l.text}
        </pre>
      ))}
      <span className="boot__cursor" />
      <p className="boot__skip">press any key to skip</p>
    </div>
  )
}
