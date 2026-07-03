import { useEffect, useState } from 'react'
import { PROFILE } from '../data/content'
import { getMode, setMode } from '../prefs'
import { MoonIcon, SunIcon } from './Icons'

const TABS = [
  { id: 'about', label: 'about' },
  { id: 'oss', label: 'experience' },
  { id: 'skills', label: 'skills' },
  { id: 'projects', label: 'projects' },
  { id: 'contact', label: 'contact' },
  { id: 'terminal', label: 'terminal' },
]

export default function TitleBar({ onClose, onMinimize, onMaximize }) {
  const [active, setActive] = useState('about')
  const [mode, setModeState] = useState(getMode)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    TABS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    // keep the toggle in sync when the mode is changed from the terminal
    const onMode = (e) => setModeState(e.detail)
    window.addEventListener('modechange', onMode)
    return () => {
      io.disconnect()
      window.removeEventListener('modechange', onMode)
    }
  }, [])

  const toggleMode = () => setMode(mode === 'dark' ? 'light' : 'dark')

  return (
    <header className="titlebar">
      <span className="titlebar__dots">
        <button className="dot dot--red" onClick={onClose} aria-label="close window" title="close">×</button>
        <button className="dot dot--yellow" onClick={onMinimize} aria-label="minimize window" title="minimize">−</button>
        <button className="dot dot--green" onClick={onMaximize} aria-label="maximize window" title="maximize">+</button>
      </span>
      <span className="titlebar__host">
        <b>{PROFILE.handle}@{PROFILE.host}</b>:~
      </span>
      <nav className="titlebar__tabs">
        {TABS.map(({ id, label }) => (
          <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>
            {label}
          </a>
        ))}
      </nav>
      <button
        className="titlebar__toggle"
        onClick={toggleMode}
        aria-label={`switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
        title={`theme ${mode === 'dark' ? 'light' : 'dark'}`}
      >
        {mode === 'dark' ? <SunIcon width="15" height="15" /> : <MoonIcon width="15" height="15" />}
      </button>
    </header>
  )
}
