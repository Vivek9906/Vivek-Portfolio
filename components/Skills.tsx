'use client'

import { useEffect, useRef } from 'react'
import { skillRows } from '@/data/projects'
import type { GsapContextHandle } from '@/types'

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let cancelled = false
    let ctx: GsapContextHandle | null = null
    const marqueeTweens: Array<{ pause: () => void; resume: () => void }> = []
    const removeListeners: Array<() => void> = []

    const initMarquee = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (cancelled || !sectionRef.current) return

      ctx = gsap.context(() => {
        const heading = sectionRef.current?.querySelector('.skills-heading')
        if (heading) {
          gsap.fromTo(
            heading,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: heading,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          )
        }

        const rows = sectionRef.current?.querySelectorAll('.marquee-track')
        if (!rows?.length) return

        rows.forEach((row, i) => {
          const el = row as HTMLElement
          const direction = i % 2 === 0 ? -1 : 1
          const speed = 100

          const items = el.innerHTML
          el.innerHTML = items + items

          const totalWidth = el.scrollWidth / 2
          if (totalWidth <= 0) return

          gsap.set(el, { x: direction === -1 ? 0 : -totalWidth })

          const tween = gsap.to(el, {
            x: direction === -1 ? -totalWidth : 0,
            duration: totalWidth / speed,
            ease: 'none',
            repeat: -1,
          })
          marqueeTweens.push(tween)

          const onEnter = () => {
            gsap.to(tween, { timeScale: 0, duration: 0.5 })
          }
          const onLeave = () => {
            gsap.to(tween, { timeScale: 1, duration: 0.5 })
          }
          el.addEventListener('mouseenter', onEnter)
          el.addEventListener('mouseleave', onLeave)
          removeListeners.push(() => {
            el.removeEventListener('mouseenter', onEnter)
            el.removeEventListener('mouseleave', onLeave)
          })
        })
      }, sectionRef)
    }

    const onDocVisibility = () => {
      marqueeTweens.forEach((t) => {
        if (document.hidden) t.pause()
        else t.resume()
      })
    }

    void initMarquee().then(() => {
      if (cancelled) return
      document.addEventListener('visibilitychange', onDocVisibility)
    })

    return () => {
      cancelled = true
      document.removeEventListener('visibilitychange', onDocVisibility)
      removeListeners.forEach((r) => r())
      ctx?.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="dark-section stack-above section-padding overflow-hidden"
    >
      <div className="content-width mb-12 md:mb-16">
        <div className="skills-heading">
          <h2
            className="heading-md text-text-light mb-2"
            style={{ fontSize: 'clamp(2rem, 5.5vw, 5rem)' }}
          >
            DEVELOPER • DESIGNER • CREATOR /
          </h2>
          <span className="label-text text-text-muted">(Skills)</span>
        </div>
      </div>

      <div className="mb-4 md:mb-6 overflow-hidden">
        <h4 className="content-width label-text text-text-muted mb-3">
          Languages &amp; Tools
        </h4>
        <div className="marquee-track" data-hover>
          {skillRows.row1.map((skill) => (
            <span key={skill} className="marquee-item">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4 md:mb-6 overflow-hidden">
        <h4 className="content-width label-text text-text-muted mb-3">
          Frameworks &amp; Libraries
        </h4>
        <div className="marquee-track" data-hover>
          {skillRows.row2.map((skill) => (
            <span key={skill} className="marquee-item">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="overflow-hidden">
        <h4 className="content-width label-text text-text-muted mb-3">
          Core CS Concepts
        </h4>
        <div className="marquee-track" data-hover>
          {skillRows.row3.map((skill) => (
            <span key={skill} className="marquee-item">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
