import { useEffect, useRef, useState } from 'react'

const REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Types out `text` character by character (instant if reduced motion).
export function useTyped(text, speed = 55, startDelay = 300) {
  const [out, setOut] = useState(REDUCED ? text : '')
  const [done, setDone] = useState(REDUCED)

  useEffect(() => {
    if (REDUCED) return
    let i = 0
    let interval
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1
        setOut(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
    }, startDelay)
    return () => {
      clearTimeout(start)
      clearInterval(interval)
    }
  }, [text, speed, startDelay])

  return [out, done]
}

// Fades sections in as they enter the viewport.
export function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          io.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

// Fetches the user's public repos once and returns { repoName: {stars, forks} }.
// Cached in sessionStorage; fails silently (rows just omit the numbers).
export function useGithubRepos(user) {
  const [repos, setRepos] = useState({})

  useEffect(() => {
    const key = `gh-repos:${user}`
    const cached = sessionStorage.getItem(key)
    if (cached) {
      setRepos(JSON.parse(cached))
      return
    }
    let cancelled = false
    fetch(`https://api.github.com/users/${user}/repos?per_page=100`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((list) => {
        const map = {}
        for (const r of list) {
          map[r.name] = { stars: r.stargazers_count, forks: r.forks_count }
        }
        if (!cancelled) {
          setRepos(map)
          sessionStorage.setItem(key, JSON.stringify(map))
        }
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [user])

  return repos
}
