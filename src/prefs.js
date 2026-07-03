// Runtime preferences set from the terminal (`theme`, `crt`) or the titlebar toggle.

export const ACCENTS = ['green', 'amber', 'cyan']
export const MODES = ['dark', 'light']

export function setAccent(name) {
  const root = document.documentElement
  if (name === 'green') root.removeAttribute('data-accent')
  else root.setAttribute('data-accent', name)
  localStorage.setItem('accent', name)
}

export function setMode(mode) {
  const root = document.documentElement
  if (mode === 'dark') root.removeAttribute('data-mode')
  else root.setAttribute('data-mode', 'light')
  localStorage.setItem('mode', mode)
  window.dispatchEvent(new CustomEvent('modechange', { detail: mode }))
}

export function getMode() {
  return document.documentElement.getAttribute('data-mode') === 'light'
    ? 'light'
    : 'dark'
}

export function setCrt(on) {
  document.documentElement.classList.toggle('crt', on)
  localStorage.setItem('crt', on ? '1' : '0')
}

export function getCrt() {
  return document.documentElement.classList.contains('crt')
}

export function applySavedPrefs() {
  const accent = localStorage.getItem('accent')
  if (accent && ACCENTS.includes(accent)) setAccent(accent)
  const mode = localStorage.getItem('mode')
  if (mode && MODES.includes(mode)) setMode(mode)
  if (localStorage.getItem('crt') === '1') setCrt(true)
}
