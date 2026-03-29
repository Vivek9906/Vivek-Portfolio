'use client'

import { useEffect, useRef } from 'react'
import { achievements, certifications } from '@/data/achievements'
import type { GsapContextHandle } from '@/types'

export default function Achievements() {
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
        const heading = sectionRef.current?.querySelector(
          '.achievements-heading'
        )
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

        const items =
          sectionRef.current?.querySelectorAll('.achievement-item') ?? []
        items.forEach((item, i) => {
          gsap.fromTo(
            item,
            { clipPath: 'inset(0 100% 0 0)' },
            {
              clipPath: 'inset(0 0% 0 0)',
              duration: 1,
              ease: 'power3.inOut',
              delay: i * 0.1,
              scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          )
        })

        const certCards = sectionRef.current?.querySelectorAll('.cert-card') ?? []
        certCards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { scale: 0.9, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: 'back.out(1.4)',
              delay: i * 0.1,
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          )
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
      id="Achievements"
      ref={sectionRef}
      className="dark-section stack-above section-padding"
    >
      <div className="content-width">
        <span className="label-text text-text-muted mb-6 block md:mb-8">
          (Recognition)
        </span>

        <div className="achievements-heading mb-12 md:mb-20">
          <h2
            className="heading-lg text-text-light"
            style={{ fontSize: 'clamp(2rem, 5.5vw, 5rem)' }}
          >
            ACHIEVEMENTS & CERTIFICATIONS /
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          <div className="w-full lg:w-1/2">
            <span className="label-text text-text-muted mb-8 block md:mb-12">
              (Achievements)
            </span>

            <div className="space-y-6 md:space-y-8">
              {achievements.map((item, index) => (
                <div key={index} className="achievement-item flex gap-6">
                  <span
                    className="text-text-muted/40 font-bold shrink-0"
                    style={{
                      fontSize: 'clamp(2rem, 4vw, 3rem)',
                      lineHeight: 0.9,
                    }}
                  >
                    {item.serial}
                  </span>
                  <div>
                    <h4 className="text-lg md:text-xl font-bold text-text-light mb-2 leading-tight uppercase tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-sm text-text-light/60 border border-[#222] bg-[#0f0f0f] p-4">
                      {item.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <span className="label-text text-text-muted mb-8 block md:mb-12">
              (Certifications)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="cert-card bg-[#0f0f0f] border border-[#222] p-6 rounded-xl transition-all duration-300 group"
                >
                  <div className="flex flex-col h-full justify-between gap-6">
                    <h4 className="font-bold text-text-light text-base leading-snug group-hover:text-white transition-colors">
                      {cert.name}
                    </h4>

                    <div className="flex items-center justify-between text-xs text-text-muted uppercase tracking-wider">
                      <span>{cert.issuer}</span>
                      {cert.year && <span>{cert.year}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
