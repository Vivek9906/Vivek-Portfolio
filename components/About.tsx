'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import type { GsapContextHandle } from '@/types'

interface AboutProps {
  avatarUrl?: string
}

export default function About({ avatarUrl }: AboutProps) {
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
        const heading = sectionRef.current?.querySelector('.about-heading')
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

        const content = sectionRef.current?.querySelector('.about-content')
        if (content) {
          gsap.fromTo(
            content,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: content,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          )
        }
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
      id="About"
      ref={sectionRef}
      className="light-section stack-above section-padding"
    >
      <div className="content-width">
        <div className="about-heading mb-16 md:mb-24">
          <h2
            className="heading-lg text-text-primary"
            style={{ fontSize: 'clamp(2rem, 5.5vw, 5rem)' }}
          >
            ABOUT ME /
          </h2>
        </div>

        <div className="about-content flex flex-col lg:flex-row gap-12 lg:gap-20">
          <motion.div
            className="relative w-full max-w-sm mx-auto lg:mx-0 aspect-[3/4] rounded-lg overflow-hidden shrink-0"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="Vivek Raj"
                fill
                className="object-cover grayscale-hover"
                sizes="(max-width: 768px) 100vw, 380px"
              />
            ) : (
              <div className="w-full h-full bg-text-primary/10 flex items-center justify-center">
                <span className="heading-lg text-text-muted">VR</span>
              </div>
            )}
          </motion.div>

          <div className="flex-1">
            <span className="label-text text-text-muted mb-6 block">
              (ABOUT)
            </span>
            <p
              className="text-text-primary/80 leading-relaxed mb-6"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}
            >
              I&apos;m a full-stack developer who&apos;s been obsessed with the
              web since the first time I broke a CSS layout at 2am. I build with
              Node.js, JavaScript, Python, and whatever tool gets the job done
              cleanly.
            </p>
            <p
              className="text-text-primary/80 leading-relaxed mb-6"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}
            >
              Currently leveling up my DSA game because fast code matters as much
              as good-looking code. I work with teams and startups to turn rough
              ideas into real, reliable products.
            </p>
            <p
              className="text-text-primary/70 leading-relaxed italic"
              style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.1rem)' }}
            >
              I have opinions about things most people don&apos;t care about — like
              whether a border-radius should be 6px or 8px. (It&apos;s 8px,
              obviously.)
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <div className="px-5 py-3 border border-text-primary/15 rounded-full">
                <span className="text-sm font-medium text-text-primary">
                  Full-Stack Developer
                </span>
              </div>
              <div className="px-5 py-3 border border-text-primary/15 rounded-full">
                <span className="text-sm font-medium text-text-primary">
                  Open Source
                </span>
              </div>
              <div className="px-5 py-3 border border-text-primary/15 rounded-full">
                <span className="text-sm font-medium text-text-primary">
                  DSA Enthusiast
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
