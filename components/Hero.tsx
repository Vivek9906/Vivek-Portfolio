'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowDownLeft } from 'lucide-react'
import type { GsapContextHandle } from '@/types'
import HeroTicker from './HeroTicker'

const HERO_PORTRAIT = '/hero-portrait.png'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let cancelled = false
    let ctx: GsapContextHandle | null = null

    const initAnimations = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (cancelled || !heroRef.current) return

      ctx = gsap.context(() => {
        if (nameRef.current) {
          const chars = nameRef.current.querySelectorAll('.char')
          gsap.fromTo(
            chars,
            { y: '100%', opacity: 0 },
            {
              y: '0%',
              opacity: 1,
              duration: 1,
              stagger: 0.03,
              ease: 'power4.out',
              delay: 0.3,
            }
          )
        }

        const heroContent = heroRef.current?.querySelector('.hero-content')
        if (heroContent) {
          gsap.to(heroContent, {
            opacity: 0,
            y: -60,
            scale: 0.97,
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom 40%',
              scrub: true,
            },
          })
        }
      }, heroRef)

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

  const currentDate = new Date()
  const month = currentDate
    .toLocaleString('en-US', { month: 'short' })
    .toUpperCase()
  const year = currentDate.getFullYear().toString().slice(-2)

  const splitName = (name: string) => {
    return name.split('').map((char, i) => (
      <span key={i} className="char inline-block overflow-hidden">
        <span className="inline-block">{char === ' ' ? '\u00A0' : char}</span>
      </span>
    ))
  }

  const handleContactClick = () => {
    const el = document.querySelector('#Contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={heroRef}
      className="light-section sticky-section relative min-h-screen overflow-hidden pt-20 md:pt-24"
    >
      <div className="hero-content content-width relative h-full pb-8 md:pb-12">
        <h1
          ref={nameRef}
          className="heading-xl mt-4 md:mt-8 overflow-hidden"
          style={{
            fontSize: 'clamp(3rem, 11vw, 12rem)',
            lineHeight: 0.85,
            fontWeight: 700,
          }}
        >
          <div className="overflow-hidden">{splitName('VIVEK RAJ')}</div>
        </h1>



        <div className="flex flex-col lg:flex-row items-start justify-between mt-8 md:mt-12 gap-8 lg:gap-16 pb-8 md:pb-12">
          <div className="flex flex-col gap-6 max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <ArrowDownLeft className="w-6 h-6 text-text-muted mb-4" />
            </motion.div>

            <motion.p
              className="body-text text-text-primary/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              I build fast, modern web apps and I&apos;m currently mastering DSA
              to make them smarter — open to freelance and collaboration
              worldwide.
            </motion.p>

            <motion.div
              className="flex items-center gap-3 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <motion.button
                onClick={handleContactClick}
                className="flex items-center gap-2 bg-text-primary text-bg-light px-6 py-3 rounded-full w-fit text-sm tracking-wider uppercase font-medium hover:bg-text-primary/90 transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Contact{' '}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M1 11L11 1M11 1H3M11 1V9" />
                </svg>
              </motion.button>

              <motion.a
                href="/resume.pdf"
                download
                className="flex items-center gap-2 border border-text-primary text-text-primary px-6 py-3 rounded-full w-fit text-sm tracking-wider uppercase font-medium hover:bg-text-primary hover:text-bg-light transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Check CV{' '}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 1v8M2 6l4 4 4-4" />
                </svg>
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            className="relative mx-auto h-[340px] w-[260px] overflow-hidden rounded-lg md:h-[420px] md:w-[320px] lg:mx-0 lg:h-[500px] lg:w-[380px] ring-1 ring-black/5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            <Image
              src={HERO_PORTRAIT}
              alt="Vivek Raj"
              fill
              className="object-cover object-[center_15%] grayscale-hover brightness-[0.97] contrast-[1.02]"
              sizes="(max-width: 768px) 260px, (max-width: 1024px) 320px, 380px"
              priority
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/[0.08] via-transparent to-transparent"
              aria-hidden
            />
          </motion.div>

          <motion.div
            className="flex flex-col items-end self-end text-right lg:self-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <span className="label-text text-text-muted tracking-[0.2em]">
              Available for work
            </span>
            <span
              className="mt-1 font-bold text-text-primary/50"
              style={{
                fontSize: 'clamp(2rem, 5vw, 5rem)',
                lineHeight: 1,
                fontWeight: 700,
              }}
            >
              {month}&apos;{year}
            </span>

            <div className="mt-6 max-w-[min(100%,300px)] rounded-md border border-[#2a2a2a] bg-[#101010] px-4 py-3 text-white text-left md:max-w-[320px] md:px-5">
              <span className="label-text mb-1 block text-white/50">(Update)</span>
              <p className="text-[0.78rem] uppercase leading-relaxed tracking-[0.08em] md:text-[0.83rem]">
                Currently building a Next.js SaaS workflow and improving real-time
                backend architecture.
              </p>
            </div>
          </motion.div>
        </div>

        <HeroTicker />
      </div>
    </section>
  )
}
