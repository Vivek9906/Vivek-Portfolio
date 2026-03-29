'use client'

import { useEffect, useRef } from 'react'

const tickerItems = [
  'FULL-STACK DEVELOPER',
  '✦',
  'NODE.JS',
  '✦',
  'PYTHON',
  '✦',
  'JAVASCRIPT',
  '✦',
  'OPEN TO COLLABORATE',
  '✦',
  'REACT',
  '✦',
  'DSA ENTHUSIAST',
  '✦',
]

export default function HeroTicker() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let alive = true
    let tween: { pause: () => void; resume: () => void; kill: () => void } | null =
      null

    const onVisibility = () => {
      if (!tween) return
      if (document.hidden) tween.pause()
      else tween.resume()
    }

    const run = async () => {
      const { gsap } = await import('gsap')
      if (!alive || !trackRef.current) return

      const track = trackRef.current
      const seed = track.dataset.tickerSeed ?? track.innerHTML
      track.dataset.tickerSeed = seed
      track.innerHTML = seed + seed + seed

      const totalWidth = track.scrollWidth / 3
      if (totalWidth <= 0) return

      tween = gsap.to(track, {
        x: -totalWidth,
        duration: 36,
        ease: 'none',
        repeat: -1,
      })

      if (!alive) {
        tween.kill()
        tween = null
        return
      }
      document.addEventListener('visibilitychange', onVisibility)
    }

    run()

    return () => {
      alive = false
      document.removeEventListener('visibilitychange', onVisibility)
      tween?.kill()
      const el = trackRef.current
      if (el?.dataset.tickerSeed) {
        el.innerHTML = el.dataset.tickerSeed
      }
    }
  }, [])

  return (
    <div className="hero-ticker mt-8 md:mt-12">
      <div ref={trackRef} className="hero-ticker-track">
        {tickerItems.map((item, i) => (
          <span key={i} className="hero-ticker-text">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
