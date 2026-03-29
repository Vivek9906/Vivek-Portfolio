'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { interests } from '@/data/interests'
import type { GsapContextHandle } from '@/types'

export default function Interests() {
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
        const heading = sectionRef.current?.querySelector('.interests-heading')
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

        const cards =
          sectionRef.current?.querySelectorAll('.bento-card') ?? []
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: i * 0.1,
              ease: 'power3.out',
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
      id="Interests"
      ref={sectionRef}
      className="dark-section stack-above section-padding"
    >
      <div className="content-width">
        <span className="label-text text-text-muted mb-6 block md:mb-8">
          (Beyond the Code)
        </span>

        <div className="interests-heading mb-16 md:mb-24">
          <h2
            className="heading-lg text-text-light"
            style={{ fontSize: 'clamp(2rem, 5.5vw, 5rem)' }}
          >
            WHAT DRIVES ME /
          </h2>
        </div>

        <div className="bento-grid">
          {interests.map((interest, index) => (
            <motion.div
              key={index}
              className={`bento-card bg-[#111] border border-[#222] p-6 md:p-8 rounded-2xl flex flex-col gap-4 group ${
                interest.wide ? 'bento-wide' : ''
              }`}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className="text-3xl md:text-4xl text-text-muted/60 mb-2 font-display">
                {interest.icon}
              </div>

              <h3 className="font-bold text-lg md:text-xl text-text-light tracking-tight group-hover:text-white transition-colors">
                {interest.title}
              </h3>

              <p className="body-text text-text-muted/80 leading-relaxed mt-auto">
                {interest.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
