import { useEffect, useRef, useState } from 'react'
import { STATS, ACHIEVEMENTS } from '../data/content'

function StatBar({ label, level, color, icon, animate }) {
  return (
    <div className="stat card">
      <div className="stat__head">
        <span className="stat__label">{label}</span>
        <span className="stat__icon">{icon}</span>
      </div>
      <div className="stat__lvlrow">
        <span className="stat__lvl">LVL</span>
        <span className="stat__num">{level}</span>
      </div>
      <div className="stat__track">
        <div
          className="stat__fill"
          style={{ width: animate ? `${level}%` : '0%', background: color }}
        />
      </div>
    </div>
  )
}

export default function PlayerStats() {
  const ref = useRef(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setAnimate(true),
      { threshold: 0.3 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="section" id="skills" ref={ref}>
      <h2 className="section__title">PLAYER STATS</h2>
      <p className="section__sub">Skills leveled up through countless side quests</p>

      <div className="stats-grid">
        {STATS.map((s) => (
          <StatBar key={s.label} {...s} animate={animate} />
        ))}
      </div>

      <div className="ach-grid">
        {ACHIEVEMENTS.map((a) => (
          <div className="ach card" key={a.title}>
            <span className="ach__badge">{a.xp}</span>
            <div>
              <h3 className="ach__title">{a.title}</h3>
              <p className="ach__detail">{a.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
