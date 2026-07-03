import { useState } from 'react'
import { SKILL_TREE } from '../data/content'
import { useReveal } from '../hooks'

export default function Skills() {
  const ref = useReveal()
  const [collapsed, setCollapsed] = useState({})

  const toggle = (dir) =>
    setCollapsed((prev) => ({ ...prev, [dir]: !prev[dir] }))

  const dirCount = SKILL_TREE.length
  const fileCount = SKILL_TREE.reduce((n, d) => n + d.items.length, 0)

  return (
    <section id="skills" ref={ref} className="reveal">
      <p className="prompt">
        <span className="prompt__ps1">sanchit@cloud</span>
        <span className="prompt__cmd">tree skills/ <span className="prompt__flag">-L 2</span></span>
      </p>

      <div className="panel">
        <div className="panel__cap">
          <span><b>skills</b> — tree view</span>
          <span>click a directory to collapse it</span>
        </div>
        <div className="tree">
          <div className="tree__root">skills/</div>
          {SKILL_TREE.map((group, gi) => {
            const last = gi === SKILL_TREE.length - 1
            const closed = collapsed[group.dir]
            return (
              <div key={group.dir}>
                <button
                  className="tree__dir"
                  onClick={() => toggle(group.dir)}
                  aria-expanded={!closed}
                >
                  <span className="tree__branch">{last ? '└── ' : '├── '}</span>
                  <span className="tree__dirname">
                    {group.dir}/{closed && <span className="tree__ellipsis"> …</span>}
                  </span>
                  {group.dir === 'learning' && (
                    <span className="tree__badge">wip</span>
                  )}
                </button>
                {!closed &&
                  group.items.map((item, ii) => (
                    <div className="tree__file" key={item}>
                      <span className="tree__branch">
                        {last ? '    ' : '│   '}
                        {ii === group.items.length - 1 ? '└── ' : '├── '}
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
              </div>
            )
          })}
          <div className="tree__summary">
            {dirCount} directories, {fileCount} files
          </div>
        </div>
      </div>
    </section>
  )
}
