'use client'

import { useEffect, useRef } from 'react'
import { educationEntries } from '@/data/education'
import type { GsapContextHandle } from '@/types'

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let cancelled = false
    let ctx: GsapContextHandle | null = null

    const initAnimations = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (cancelled || !sectionRef.current) return

      ctx = gsap.context(() => {
        const heading = sectionRef.current?.querySelector('.education-heading')
        if (heading) {
          gsap.fromTo(
            heading,
            { clipPath: 'inset(100% 0 0 0)' },
            {
              clipPath: 'inset(0% 0 0 0)',
              duration: 1,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: heading,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          )
        }

        const entries =
          sectionRef.current?.querySelectorAll('.education-entry') ?? []
        entries.forEach((entry) => {
          const line = entry.querySelector('.education-line')
          const content = entry.querySelector('.education-content')

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: entry,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          })

          if (line) {
            tl.fromTo(
              line,
              { scaleX: 0, transformOrigin: 'left center' },
              { scaleX: 1, duration: 0.8, ease: 'power3.inOut' }
            )
          }

          if (content) {
            tl.fromTo(
              content,
              { x: -30, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
              '-=0.4'
            )
          }
        })
      }, sectionRef)

      document.fonts.ready.then(() => {
        ScrollTrigger.refresh()
      })
    }

    void initAnimations()

    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [])

  return (
    <section
      id="Education"
      ref={sectionRef}
      className="dark-section stack-above section-padding"
    >
      <div className="content-width">
        <span className="label-text text-text-muted mb-6 block md:mb-8">
          (Education)
        </span>

        <div className="education-heading mb-16 md:mb-24">
          <h2
            className="heading-lg text-text-light"
            style={{ fontSize: 'clamp(2rem, 5.5vw, 5rem)' }}
          >
            ACADEMIC BACKGROUND /
          </h2>
        </div>

        <div className="space-y-0 relative border-t border-[#1a1a1a]">
          {educationEntries.map((edu, index) => (
            <div
              key={index}
              className="education-entry relative py-8 md:py-12 border-b border-[#1a1a1a]"
            >
              <div className="education-line absolute top-[-1px] left-0 w-full h-[1px] bg-white opacity-20" />

              <div className="education-content flex flex-col md:flex-row gap-6 md:items-start justify-between">
                <div className="md:w-1/2 flex gap-4 md:gap-8 lg:gap-12">
                  <span
                    className="font-bold text-text-muted/40 shrink-0"
                    style={{
                      fontSize: 'clamp(2rem, 4vw, 3rem)',
                      lineHeight: 0.9,
                    }}
                  >
                    {edu.serial}
                  </span>

                  <div>
                    <h3
                      className="font-bold text-text-light uppercase tracking-tight mb-2"
                      style={{
                        fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                        fontFamily: 'var(--font-space-grotesk)',
                        lineHeight: 1.1,
                      }}
                    >
                      {edu.institution}
                    </h3>

                    {edu.current && (
                      <span className="pill-tag mt-2">Currently pursuing</span>
                    )}
                  </div>
                </div>

                <div className="md:w-[45%] lg:w-[40%]">
                  <div className="flex flex-col gap-2">
                    <p className="text-text-light/90 font-medium text-lg uppercase tracking-wide">
                      {edu.degree}
                    </p>
                    {edu.field && (
                      <p className="text-text-muted uppercase text-sm tracking-wider">
                        {edu.field}
                      </p>
                    )}
                    <span className="label-text text-text-muted/60 mt-2 block">
                      {edu.years}
                    </span>

                    {edu.note && (
                      <p className="text-sm text-text-muted/80 italic mt-6 leading-relaxed border-t border-[#1a1a1a] pt-4">
                        {edu.note}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
