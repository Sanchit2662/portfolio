import { useState } from 'react'
import { PROFILE } from '../data/content'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio message from ${form.name || 'someone'}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${PROFILE.links.email}?subject=${subject}&body=${body}`
  }

  return (
    <section className="section" id="contact">
      <h2 className="section__title">START CO-OP</h2>
      <p className="section__sub">Let&apos;s team up and build something legendary</p>

      <form className="contact card" onSubmit={onSubmit}>
        <label className="field">
          <span className="field__label">NAME</span>
          <input name="name" value={form.name} onChange={onChange} placeholder="Enter your name" required />
        </label>
        <label className="field">
          <span className="field__label">EMAIL</span>
          <input name="email" type="email" value={form.email} onChange={onChange} placeholder="your@email.com" required />
        </label>
        <label className="field">
          <span className="field__label">MESSAGE</span>
          <textarea name="message" rows="5" value={form.message} onChange={onChange} placeholder="Tell me about your project..." required />
        </label>
        <button className="btn btn--primary btn--block" type="submit">
          ⚡ SEND MESSAGE
        </button>
      </form>
    </section>
  )
}
