import { useEffect, useState } from 'react'
import { CodeIcon, CoinIcon } from './Icons'
import { PROFILE } from '../data/content'

const LINKS = ['About', 'Skills', 'Projects', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a className="nav__brand" href="#top" aria-label="Home">
          <span className="nav__logo">
            <CodeIcon width="20" height="20" />
          </span>
          <span className="nav__brandtext">SK.DEV</span>
        </a>

        <nav className={`nav__links ${open ? 'is-open' : ''}`}>
          {LINKS.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}>
              {l}
            </a>
          ))}
        </nav>

        <div className="nav__right">
          <div className="coin" title="50+ merged PRs">
            <CoinIcon />
            <span>{PROFILE.coins}</span>
          </div>
          <button
            className="nav__burger"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  )
}
