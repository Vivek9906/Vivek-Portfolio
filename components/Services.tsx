'use client'

import { useEffect, useRef } from 'react'
import { services } from '@/data/projects'
import type { GsapContextHandle } from '@/types'

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let cancelled = false
    let ctx: GsapContextHandle | null = null

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (cancelled || !sectionRef.current) return

      ctx = gsap.context(() => {
        const heading = sectionRef.current?.querySelector('.services-heading')
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

        const items = gsap.utils.toArray(
          sectionRef.current!.querySelectorAll('.service-item')
        ) as HTMLElement[]
        if (items.length === 0) return

        gsap.set(items, { opacity: 0, y: 80 })

        gsap.to(items, {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'center center',
            scrub: 0.5,
          },
        })
      }, sectionRef)

      document.fonts.ready.then(() => {
        ScrollTrigger.refresh()
      })
    }

    void init()

    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [])

  return (
    <section
      id="Services"
      ref={sectionRef}
      className="dark-section stack-above section-padding relative z-10"
    >
      <div className="content-width">
        <div className="services-heading mb-16 md:mb-24">
          <h2
            className="heading-lg text-text-light"
            style={{ fontSize: 'clamp(2rem, 5.5vw, 5rem)' }}
          >
            WHAT I DO /
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-16 mb-16 md:mb-24 md:justify-center">
          <span className="label-text text-text-muted">(SERVICES)</span>
          <p className="body-text text-text-light/70 max-w-lg">
            I specialize in building fast, reliable, and user-friendly full-stack
            web applications. I help small businesses and startups turn ideas into
            high-quality websites and products that actually work and scale.
          </p>
        </div>

        <div className="space-y-0">
          {services.map((service) => (
            <div
              key={service.number}
              className="service-item border-t border-border-subtle py-8 md:py-12"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-0">
                <div className="md:w-1/3">
                  <span
                    className="font-bold text-text-muted/40"
                    style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 0.9 }}
                  >
                    {service.number}
                  </span>
                </div>

                <div className="md:w-2/3">
                  <h3
                    className="font-bold text-text-light mb-4 uppercase"
                    style={{
                      fontSize: 'clamp(1.5rem, 3.5vw, 3.5rem)',
                      fontFamily: 'var(--font-space-grotesk)',
                    }}
                  >
                    {service.title}
                  </h3>
                  <p className="body-text text-text-light/60 max-w-lg mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-3">
                    {service.tags.map((tag, tagIndex) => (
                      <div
                        key={tagIndex}
                        className="flex items-center gap-4 group"
                      >
                        <span className="font-mono text-sm text-[#444] transition-colors group-hover:text-white">
                          {String(tagIndex + 1).padStart(2, '0')}
                        </span>
                        <span className="text-sm text-text-light/80 tracking-wide uppercase group-hover:text-white transition-colors">
                          {tag}
                        </span>
                      </div>
                    ))}
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
