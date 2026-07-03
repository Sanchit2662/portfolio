import { useEffect, useRef, useState } from 'react'
import TitleBar from './components/TitleBar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Boot from './components/Boot'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Terminal from './components/Terminal'
import Footer from './components/Footer'
import Cheatsheet from './components/Cheatsheet'
import { applySavedPrefs, getCrt, getMode, setCrt, setMode } from './prefs'

const SECTION_IDS = ['about', 'oss', 'skills', 'projects', 'contact', 'terminal']
const MINIMIZE_SECONDS = 10

function focusTerminal() {
  const el = document.querySelector('.term__input')
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  setTimeout(() => el.focus({ preventScroll: true }), 350)
}

export default function App() {
  // 'normal' | 'closing' | 'minimized' | 'maximized'
  const [winState, setWinState] = useState('normal')
  const [booting, setBooting] = useState(true)
  const [toast, setToast] = useState(null)
  const [taskbar, setTaskbar] = useState(false)
  const [countdown, setCountdown] = useState(MINIMIZE_SECONDS)
  const winStateRef = useRef(winState)
  const closedOnceRef = useRef(false)
  const lastGRef = useRef(0)
  const toastTimerRef = useRef(null)
  winStateRef.current = winState

  useEffect(() => {
    applySavedPrefs()
  }, [])

  function showToast(msg, ms) {
    setToast(msg)
    clearTimeout(toastTimerRef.current)
    toastTimerRef.current = setTimeout(() => setToast(null), ms)
  }

  function handleClose() {
    if (winState === 'closing' || winState === 'minimized') return
    setWinState('closing')
    const firstTime = !closedOnceRef.current
    closedOnceRef.current = true
    setTimeout(() => {
      setWinState('normal')
      showToast(
        firstTime
          ? "oops — this is my terminal, you can't escape"
          : 'still here.',
        firstTime ? 3200 : 1500
      )
    }, firstTime ? 950 : 550)
  }

  function handleMinimize() {
    if (winState !== 'normal' && winState !== 'maximized') return
    setWinState('minimized')
    setTaskbar(true)
    setCountdown(MINIMIZE_SECONDS)
  }

  function handleMaximize() {
    if (winState === 'maximized') {
      setWinState('normal')
      return
    }
    if (winState !== 'normal') return
    setWinState('maximized')
    showToast("window maximized — as if it wasn't big enough", 2500)
  }

  // While minimized: countdown to auto-restore; any key or taskbar click restores early.
  useEffect(() => {
    if (winState !== 'minimized') return
    const iv = setInterval(
      () => setCountdown((c) => Math.max(0, c - 1)),
      1000
    )
    const onKey = () => setWinState('normal')
    window.addEventListener('keydown', onKey)
    return () => {
      clearInterval(iv)
      window.removeEventListener('keydown', onKey)
    }
  }, [winState])

  useEffect(() => {
    if (winState === 'minimized' && countdown === 0) setWinState('normal')
  }, [countdown, winState])

  // Global keyboard shortcuts (see the cheatsheet behind the minimized window).
  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target.tagName
      const typing = tag === 'INPUT' || tag === 'TEXTAREA'
      if (e.key === 'Escape' && typing) {
        e.target.blur()
        return
      }
      if (typing || winStateRef.current === 'minimized') return
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        focusTerminal()
        return
      }
      if (e.ctrlKey || e.metaKey || e.altKey) return

      if (e.key >= '1' && e.key <= '6') {
        document
          .getElementById(SECTION_IDS[Number(e.key) - 1])
          ?.scrollIntoView({ behavior: 'smooth' })
        return
      }
      switch (e.key) {
        case '/':
          e.preventDefault()
          focusTerminal()
          break
        case 't':
          setMode(getMode() === 'dark' ? 'light' : 'dark')
          break
        case 'c':
          setCrt(!getCrt())
          break
        case 'G':
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
          break
        case 'g': {
          const now = Date.now()
          if (now - lastGRef.current < 500) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            lastGRef.current = 0
          } else {
            lastGRef.current = now
          }
          break
        }
        default:
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className={`desktop desktop--${winState}`}>
      {winState === 'minimized' && <Cheatsheet />}

      <div className={`termwindow termwindow--${winState}`}>
        <TitleBar
          onClose={handleClose}
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
        />
        <main className="termwindow__body">
          {booting ? (
            <Boot onDone={() => setBooting(false)} />
          ) : (
            <>
              <Hero />
              <Experience />
              <Skills />
              <Projects />
              <Contact />
              <Terminal />
            </>
          )}
        </main>
        {!booting && <Footer />}
      </div>

      {taskbar && (
        <button
          className="taskbar"
          onClick={() => {
            if (winStateRef.current === 'minimized') setWinState('normal')
            else window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <span className="taskbar__app">▣ sanchit@cloud:~</span>
          <span className="taskbar__hint">
            {winState === 'minimized'
              ? `restoring in ${countdown}s — click anywhere or press any key`
              : 'click to scroll to top'}
          </span>
        </button>
      )}

      {toast && (
        <div className="toast" role="status">
          <span className="toast__ps1">➜</span> {toast}
        </div>
      )}
    </div>
  )
}
