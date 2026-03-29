'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MobileMenu from './MobileMenu'

const navItems = [
  { name: 'Services', href: '#Services' },
  { name: 'Works', href: '#Works' },
  { name: 'About', href: '#About' },
  { name: 'Education', href: '#Education' },
  { name: 'Recognition', href: '#Achievements' },
  { name: 'Interests', href: '#Interests' },
  { name: 'Contact', href: '#Contact' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setPastHero(y > window.innerHeight * 0.72)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full max-w-[100vw] transition-all duration-500 ${
          pastHero
            ? 'pointer-events-none -translate-y-full opacity-0'
            : 'translate-y-0 opacity-100'
        } ${scrolled ? 'bg-bg-light/85 backdrop-blur-md' : 'bg-transparent'}`}
      >
        <div className="flex w-full items-center justify-between gap-4 px-[clamp(16px,4vw,56px)] py-3 md:py-4 lg:py-5">
          <span className="shrink-0 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-text-primary md:text-[0.72rem] lg:text-[0.78rem]">
            Web Developer &amp; Designer
          </span>

          <nav
            className="hidden shrink-0 items-center justify-end gap-3 md:flex lg:gap-4 xl:gap-5"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="nav-link-wrapper nav-link-wrapper--header shrink-0 tracking-wider text-text-primary"
                data-hover
              >
                <span>{item.name}</span>
                <span>{item.name}</span>
              </a>
            ))}
          </nav>

          {/* Animated slash hamburger button */}
          <button
            className="flex flex-col items-end justify-center gap-[6px] p-2 md:hidden"
            style={{ border: 'none', background: 'none', cursor: 'pointer' }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className={`hamburger-line hamburger-line--top ${isMenuOpen ? 'active' : ''}`}
            />
            <span
              className={`hamburger-line hamburger-line--bottom ${isMenuOpen ? 'active' : ''}`}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {pastHero && !isMenuOpen && (
          <motion.button
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="fixed right-[clamp(16px,4vw,40px)] top-5 z-[70] inline-flex flex-col items-end justify-center gap-[5px] p-2"
            style={{ border: 'none', background: 'none', cursor: 'pointer' }}
            aria-label="Open navigation menu"
            data-hover
          >
            <span className="hamburger-line hamburger-line--top" />
            <span className="hamburger-line hamburger-line--bottom" />
          </motion.button>
        )}
      </AnimatePresence>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
