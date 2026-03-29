'use client'

import { useEffect, useRef, useState } from 'react'
import { Project, type GsapContextHandle } from '@/types'
import ProjectCard from './ProjectCard'

interface ProjectStackScrollProps {
  projects: Project[]
}

export default function ProjectStackScroll({ projects }: ProjectStackScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const lastEmittedIndex = useRef(-1)

  const bgColors = ['#0a0a0a', '#0f0f0f', '#111111', '#131313', '#161616']

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return

    let cancelled = false
    let ctx: GsapContextHandle | null = null

    const initStackScroll = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (!containerRef.current || cancelled) return

      const root = containerRef.current
      const cards = gsap.utils.toArray(
        root.querySelectorAll('.project-stack-card')
      ) as HTMLElement[]

      if (cards.length === 0) return

      ctx = gsap.context(() => {
        gsap.set(cards, {
          zIndex: (i: number) => i + 1,
          yPercent: (i: number) => (i === 0 ? 0 : 100),
          y: 0,
          scale: 1,
        })

        if (cards.length < 2) {
          document.fonts.ready.then(() => ScrollTrigger.refresh())
          return
        }

        const emitActive = (idx: number) => {
          const clamped = Math.max(0, Math.min(idx, cards.length - 1))
          if (clamped === lastEmittedIndex.current) return
          lastEmittedIndex.current = clamped
          setActiveIndex(clamped)
        }

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: () => `+=${window.innerHeight * (cards.length - 1)}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress
              const segment = 1 / (cards.length - 1)
              const active = Math.min(
                Math.floor(progress / segment + 0.0001),
                cards.length - 1
              )
              emitActive(active)
            },
          },
        })

        cards.forEach((card, i) => {
          if (i === 0) return

          const prevCard = cards[i - 1]

          tl.fromTo(
            card,
            { yPercent: 100 },
            { yPercent: 0, duration: 1 },
            i - 1
          )

          tl.to(
            prevCard,
            {
              scale: 0.96,
              y: -20,
              duration: 1,
            },
            i - 1
          )
        })

        document.fonts.ready.then(() => {
          ScrollTrigger.refresh()
        })
      }, root)
    }

    void initStackScroll()

    return () => {
      cancelled = true
      lastEmittedIndex.current = -1
      ctx?.revert()
    }
  }, [projects.length])

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {projects.map((project, i) => (
        <div
          key={project.id}
          className="project-stack-card section-padding will-change-transform"
          style={{
            backgroundColor: bgColors[Math.min(i, bgColors.length - 1)],
          }}
        >
          <div className="content-width w-full h-full flex items-center">
            <ProjectCard
              project={project}
              index={i}
              isActive={activeIndex === i}
            />
          </div>
        </div>
      ))}

      <div className="absolute right-[clamp(12px,2vw,30px)] top-1/2 -translate-y-1/2 z-[60] hidden lg:flex flex-col gap-2 mix-blend-difference">
        {projects.map((_, i) => (
          <div
            key={i}
            className="w-[3px] h-[24px] rounded-sm transition-colors duration-300"
            style={{
              backgroundColor: activeIndex === i ? '#fff' : '#333',
            }}
            aria-hidden
          />
        ))}
      </div>
    </div>
  )
}
