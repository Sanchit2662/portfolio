const KEYS = [
  ['/', 'or ctrl+k — focus the terminal'],
  ['1 – 6', 'jump to section'],
  ['g g', 'go to top'],
  ['G', 'go to bottom'],
  ['t', 'toggle light / dark'],
  ['c', 'toggle crt mode'],
  ['esc', 'close popup / leave input'],
  ['↑ ↓', 'command history (in terminal)'],
  ['tab', 'complete command (in terminal)'],
  ['ctrl+l', 'clear screen (in terminal)'],
  ['ctrl+c', 'cancel line (in terminal)'],
]

const CMDS = [
  ['help', 'all commands'],
  ['ls projects', 'list projects'],
  ['cat about.md', 'short bio'],
  ['open github', 'also: linkedin, email'],
  ['theme amber', 'also: green, cyan, light, dark'],
  ['crt on', 'retro scanlines'],
  ['neofetch', 'system info'],
  ['sudo hire sanchit', 'try it'],
]

// Shown on the "desktop" behind the window while it is minimized.
export default function Cheatsheet() {
  return (
    <div className="cheatsheet" aria-hidden="true">
      <p className="cheatsheet__title">
        while the terminal is away — <b>man sanchit.dev</b>
      </p>
      <div className="cheatsheet__cols">
        <div>
          <p className="cheatsheet__head">keyboard</p>
          {KEYS.map(([k, d]) => (
            <div className="cheatsheet__row" key={k}>
              <kbd>{k}</kbd>
              <span>{d}</span>
            </div>
          ))}
        </div>
        <div>
          <p className="cheatsheet__head">terminal commands</p>
          {CMDS.map(([k, d]) => (
            <div className="cheatsheet__row" key={k}>
              <kbd>{k}</kbd>
              <span>{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
