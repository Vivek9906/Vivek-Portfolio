'use client'

import { useEffect, useRef } from 'react'
import { Project, type GsapContextHandle } from '@/types'
import { useMobileDetect } from '@/hooks/useMobileDetect'
import ProjectStackScroll from './ProjectStackScroll'
import ProjectCard from './ProjectCard'
import GitHubButton from './GitHubButton'

interface ProjectsProps {
  featuredProjects: Project[]
}

export default function Projects({ featuredProjects }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { isMobile } = useMobileDetect()

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
        const heading = sectionRef.current?.querySelector('.works-heading')
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

        if (isMobile) {
          const cards =
            sectionRef.current?.querySelectorAll('.mobile-project-card') ?? []
          cards.forEach((card, i) => {
            gsap.fromTo(
              card,
              { y: 60, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: i * 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 90%',
                  toggleActions: 'play none none none',
                },
              }
            )
          })
        }
      }, sectionRef)
    }

    void initAnimations()

    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [isMobile])

  return (
    <section
      id="Works"
      ref={sectionRef}
      className={`dark-section stack-above ${isMobile ? 'section-padding' : 'pt-24 pb-0'}`}
      style={{
        minHeight: isMobile ? 'auto' : '100vh',
      }}
    >
      <div className="content-width projects-content">
        {/* Section heading */}
        <div className="works-heading mb-16 md:mb-24">
          <h2
            className="heading-lg text-text-light"
            style={{ fontSize: 'clamp(2rem, 5.5vw, 5rem)' }}
          >
            SELECTED WORKS /
          </h2>
        </div>

        {/* Description */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-16 mb-16 md:mb-24 md:justify-center">
          <span className="label-text text-text-muted">(PROJECTS)</span>
          <p className="body-text text-text-light/70 max-w-lg">
            Thoughtfully crafted digital experiences that blend utility and
            aesthetics into something functional, memorable, and refined.
          </p>
        </div>
      </div>

      {/* Project showcase */}
      {isMobile ? (
        // Mobile fallback: simple vertical stack with stagger reveal
        <div className="content-width space-y-24 md:space-y-32">
          {featuredProjects.map((project, index) => (
            <div key={project.id} className="mobile-project-card">
              <ProjectCard 
                project={project} 
                index={index} 
                isMobile={true} 
                isActive={true}
              />
            </div>
          ))}
        </div>
      ) : (
        // Desktop version: GSAP Stack Scroll
        <div className="w-full">
           <ProjectStackScroll projects={featuredProjects} />
        </div>
      )}

      {/* GitHub CTA Button */}
      <div
        className={`content-width ${isMobile ? 'mt-20 pb-8' : 'py-16 md:py-20 bg-[#131313]'}`}
      >
        <GitHubButton />
      </div>
    </section>
  )
}
