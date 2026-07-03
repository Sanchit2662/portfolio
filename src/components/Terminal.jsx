import { useEffect, useRef, useState } from 'react'
import { OSS, PROFILE, PROJECTS } from '../data/content'
import { useReveal } from '../hooks'
import { ACCENTS, MODES, setAccent, setCrt, setMode } from '../prefs'
import { NEOFETCH_LINES } from './Neofetch'

const HELP = [
  'available commands:',
  '  help                 show this list',
  '  whoami               who is this guy',
  '  ls projects          list projects',
  '  cat about.md         short bio',
  '  oss                  open-source contributions',
  '  open <github|linkedin|email>',
  '  theme <green|amber|cyan|light|dark>',
  '  crt <on|off>         retro scanline mode',
  '  neofetch             system info',
  '  echo <text>          you know what this does',
  '  history              command history',
  '  clear                clear the screen',
  '',
  'tip: press / anywhere to focus this terminal,',
  '     or minimize the window (yellow dot) for all shortcuts.',
]

const COMMAND_NAMES = [
  'help', 'whoami', 'ls', 'cat', 'oss', 'open', 'theme',
  'crt', 'neofetch', 'echo', 'history', 'clear', 'sudo', 'contact',
]

export default function Terminal() {
  const ref = useReveal()
  const screenRef = useRef(null)
  const inputRef = useRef(null)
  const historyRef = useRef([])
  const histPosRef = useRef(-1)
  const [value, setValue] = useState('')
  const [lines, setLines] = useState([
    { type: 'out', text: `welcome to ${PROFILE.handle}'s terminal.` },
    { type: 'out', text: 'type `help` to get started, or try `sudo hire sanchit`.' },
  ])

  useEffect(() => {
    const el = screenRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  function print(cmd, out) {
    setLines((prev) => [...prev, { type: 'cmd', text: cmd }, ...out])
  }

  function run(raw) {
    const input = raw.trim()
    if (!input) return
    historyRef.current.push(input)
    histPosRef.current = -1

    const [cmd, ...args] = input.split(/\s+/)
    const arg = args.join(' ')
    const out = (text) => ({ type: 'out', text })
    const ok = (text) => ({ type: 'ok', text })
    const err = (text) => ({ type: 'err', text })

    switch (cmd) {
      case 'help':
        return print(input, HELP.map(out))
      case 'whoami':
        return print(input, [
          ok(PROFILE.name),
          out(`# ${PROFILE.title} · LFX mentee 2026`),
        ])
      case 'ls':
        return print(input, PROJECTS.map((p) => out(`${p.repo}/  — ${p.desc}`)))
      case 'cat':
        if (arg === 'about.md') return print(input, [out(PROFILE.tagline)])
        return print(input, [err(`cat: ${arg || 'missing file'}: no such file — try \`cat about.md\``)])
      case 'oss':
      case 'contact':
        if (cmd === 'contact')
          return print(input, [
            out(`email:    ${PROFILE.links.email}`),
            out(`github:   ${PROFILE.links.github}`),
            out(`linkedin: ${PROFILE.links.linkedin}`),
          ])
        return print(input, [
          ok(`${OSS.stats[0].value} PRs merged across CNCF:`),
          ...OSS.orgs.map((o) => out(`  ${o.name} — ${o.desc}`)),
        ])
      case 'open': {
        const targets = {
          github: PROFILE.links.github,
          linkedin: PROFILE.links.linkedin,
          email: `mailto:${PROFILE.links.email}`,
        }
        const url = targets[arg]
        if (!url) return print(input, [err(`open: unknown target — try github, linkedin or email`)])
        window.open(url, '_blank', 'noreferrer')
        return print(input, [ok(`opening ${arg}…`)])
      }
      case 'theme':
        if (MODES.includes(arg)) {
          setMode(arg)
          return print(input, [ok(`${arg} mode on ✓`)])
        }
        if (!ACCENTS.includes(arg))
          return print(input, [
            err(`theme: pick one of ${[...ACCENTS, ...MODES].join(', ')}`),
          ])
        setAccent(arg)
        return print(input, [ok(`accent set to ${arg} ✓`)])
      case 'crt':
        if (arg !== 'on' && arg !== 'off')
          return print(input, [err('usage: crt <on|off>')])
        setCrt(arg === 'on')
        return print(input, [ok(`crt mode ${arg} ✓`)])
      case 'neofetch':
        return print(input, NEOFETCH_LINES.map(([k, v]) => out(`${k.padEnd(12)} ${v}`)))
      case 'echo':
        return print(input, [out(arg)])
      case 'history':
        return print(input, historyRef.current.map((h, i) => out(`  ${i + 1}  ${h}`)))
      case 'clear':
        return setLines([])
      case 'sudo':
        if (/^hire\s+sanchit/i.test(arg))
          return print(input, [
            ok('permission granted ✓'),
            out(`sanchit added to your team. next step: ${PROFILE.links.email}`),
          ])
        return print(input, [err(`sudo: only \`sudo hire sanchit\` is allowed on this machine`)])
      case 'rm':
        return print(input, [err('nice try. this portfolio is immutable.')])
      case 'exit':
        return print(input, [out('there is no escape. scroll up instead.')])
      default:
        return print(input, [err(`command not found: ${cmd} — try \`help\``)])
    }
  }

  function onKeyDown(e) {
    const hist = historyRef.current
    if (e.ctrlKey && e.key.toLowerCase() === 'l') {
      e.preventDefault()
      setLines([])
      return
    }
    if (
      e.ctrlKey &&
      e.key.toLowerCase() === 'c' &&
      e.target.selectionStart === e.target.selectionEnd // don't break copy
    ) {
      e.preventDefault()
      setLines((prev) => [...prev, { type: 'cmd', text: `${value}^C` }])
      setValue('')
      histPosRef.current = -1
      return
    }
    if (e.key === 'Enter') {
      run(value)
      setValue('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!hist.length) return
      histPosRef.current =
        histPosRef.current === -1
          ? hist.length - 1
          : Math.max(0, histPosRef.current - 1)
      setValue(hist[histPosRef.current])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (histPosRef.current === -1) return
      histPosRef.current += 1
      if (histPosRef.current >= hist.length) {
        histPosRef.current = -1
        setValue('')
      } else {
        setValue(hist[histPosRef.current])
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const word = value.trimStart()
      if (!word || word.includes(' ')) return
      const match = COMMAND_NAMES.find((c) => c.startsWith(word))
      if (match) setValue(match + ' ')
    }
  }

  return (
    <section id="terminal" ref={ref} className="reveal">
      <p className="prompt">
        <span className="prompt__ps1">{PROFILE.handle}@{PROFILE.host}</span>
        <span className="prompt__cmd">bash <span className="prompt__flag">--interactive</span></span>
      </p>
      <p className="term__hint">
        a real shell — try <code>help</code>, <code>theme amber</code> or <code>sudo hire sanchit</code>
      </p>

      <div className="panel">
        <div className="panel__cap">
          <span><b>terminal</b> — bash</span>
          <span>↑ history · tab completes</span>
        </div>
        <div
          className="term__screen"
          ref={screenRef}
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((l, i) => (
            <pre key={i} className={`term__line--${l.type}`}>{l.text}</pre>
          ))}
        </div>
        <div className="term__inputrow">
          <span className="ps1">➜ ~</span>
          <input
            ref={inputRef}
            className="term__input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="type a command…"
            aria-label="terminal command input"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </div>
      </div>
    </section>
  )
}
