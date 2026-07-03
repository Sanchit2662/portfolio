import { PROFILE } from '../data/content'
import { useReveal } from '../hooks'
import { GitHubIcon, LinkedInIcon, MailIcon, SendIcon } from './Icons'

export default function Contact() {
  const ref = useReveal()
  const { links } = PROFILE

  const cards = [
    {
      icon: <MailIcon />,
      k: 'mail --to',
      v: links.email,
      href: `mailto:${links.email}`,
    },
    {
      icon: <GitHubIcon />,
      k: 'gh profile view',
      v: `github.com/${PROFILE.githubUser}`,
      href: links.github,
      ext: true,
    },
    {
      icon: <LinkedInIcon />,
      k: 'open --linkedin',
      v: 'in/sanchit-kumar',
      href: links.linkedin,
      ext: true,
    },
    {
      icon: <SendIcon />,
      k: 'hire --now',
      v: 'open to opportunities →',
      href: `mailto:${links.email}?subject=Let%27s%20work%20together`,
    },
  ]

  return (
    <section id="contact" ref={ref} className="reveal">
      <p className="prompt">
        <span className="prompt__ps1">sanchit@cloud</span>
        <span className="prompt__cmd">ping sanchit <span className="prompt__flag">--anywhere</span></span>
      </p>

      <div className="contact__grid">
        {cards.map((c) => (
          <a
            className="contact__card"
            key={c.k}
            href={c.href}
            {...(c.ext ? { target: '_blank', rel: 'noreferrer' } : {})}
          >
            <span className="contact__icon">{c.icon}</span>
            <span className="contact__body">
              <span className="k">{c.k}</span>
              <span className="v">{c.v}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
