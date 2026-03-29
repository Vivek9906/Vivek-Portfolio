'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import type { GsapContextHandle } from '@/types'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState<{
    message: string
    type: 'success' | 'error'
  } | null>(null)

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
        const root = sectionRef.current
        if (!root) return

        const heading = root.querySelector('.contact-heading')
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

        const line = root.querySelector('.contact-line')
        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0, transformOrigin: 'left center' },
            {
              scaleX: 1,
              duration: 1.2,
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: line,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          )
        }

        const subtitle = root.querySelector('.contact-subtitle')
        if (subtitle) {
          gsap.fromTo(
            subtitle,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.3,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: subtitle,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          )
        }

        const form = root.querySelector('.contact-form')
        if (form) {
          gsap.fromTo(
            form,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: form,
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

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const emailjs = (await import('@emailjs/browser')).default

      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        showToast(
          'Email service not configured. Please set up EmailJS.',
          'error'
        )
        setIsLoading(false)
        return
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        publicKey
      )

      showToast('Message sent successfully!', 'success')
      setFormData({ name: '', email: '', message: '' })
    } catch {
      showToast('Something went wrong. Please try again.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section
      id="Contact"
      ref={sectionRef}
      className="dark-section stack-above section-padding"
    >
      <div className="content-width">
        <div className="contact-heading mb-6 md:mb-8">
          <h2
            className="text-text-light font-bold leading-[0.9]"
            style={{ fontSize: 'clamp(2rem, 5.5vw, 5rem)' }}
          >
            LET&apos;S MAKE
            <br />
            IT HAPPEN
          </h2>
        </div>

        <div className="contact-line h-[1px] bg-text-muted/40 mb-10 md:mb-14" />

        <p className="contact-subtitle body-text text-text-light/60 mb-12">
          Have a project in mind?
        </p>

        <form
          onSubmit={handleSubmit}
          className="contact-form max-w-2xl space-y-8"
        >
          <div className="floating-label-group">
            <input
              type="text"
              id="contact-name"
              placeholder=" "
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="min-h-[44px]"
            />
            <label htmlFor="contact-name">Your Name</label>
          </div>

          <div className="floating-label-group">
            <input
              type="email"
              id="contact-email"
              placeholder=" "
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="min-h-[44px]"
            />
            <label htmlFor="contact-email">Your Email</label>
          </div>

          <div className="floating-label-group">
            <textarea
              id="contact-message"
              placeholder=" "
              required
              rows={4}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="min-h-[120px] resize-none"
            />
            <label htmlFor="contact-message">Your Message</label>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 bg-text-light text-bg-dark px-8 py-4 rounded-full text-sm tracking-wider uppercase font-semibold hover:bg-white transition-colors disabled:opacity-50 min-h-[44px]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-hover
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Get a quote{' '}
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
              </>
            )}
          </motion.button>
        </form>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast border border-white/20"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            style={{
              backgroundColor:
                toast.type === 'success' ? '#1a1a1a' : '#2a2a2a',
            }}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
