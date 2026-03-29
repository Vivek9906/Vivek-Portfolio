'use client'

import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useLocalTime } from '@/hooks/useLocalTime'
import { socialLinks } from '@/data/projects'

export default function Footer() {
  const localTime = useLocalTime()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Services', href: '#Services' },
    { name: 'Works', href: '#Works' },
    { name: 'About', href: '#About' },
    { name: 'Education', href: '#Education' },
    { name: 'Recognition', href: '#Achievements' },
    { name: 'Interests', href: '#Interests' },
    { name: 'Contact', href: '#Contact' },
  ]

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault()
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="dark-section stack-above border-t border-border-subtle">
      <div className="content-width py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Menu */}
          <div>
            <h4 className="label-text text-text-muted mb-6">(Menu)</h4>
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-[0.82rem] uppercase tracking-[0.14em] text-text-light/75 hover:text-text-light transition-colors w-fit"
                  data-hover
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Socials */}
          <div>
            <h4 className="label-text text-text-muted mb-6">(Socials)</h4>
            <nav className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.82rem] uppercase tracking-[0.14em] text-text-light/75 hover:text-text-light transition-colors w-fit"
                  data-hover
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Local time + Scroll to top */}
          <div className="flex flex-col items-start md:items-end justify-between">
            <div className="text-right">
              <h4 className="label-text text-text-muted mb-2">(Local Time)</h4>
              <span className="text-text-light text-base tracking-[0.16em] uppercase">
                {localTime}
              </span>
            </div>

            <motion.button
              onClick={scrollToTop}
              className="mt-8 md:mt-0 flex items-center gap-2 text-text-muted hover:text-text-light transition-colors text-[0.78rem] uppercase tracking-[0.14em]"
              whileHover={{ y: -4 }}
              data-hover
            >
              <ArrowUp className="w-4 h-4" />
              Back to top
            </motion.button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-text-muted/50 text-[0.66rem] uppercase tracking-[0.12em]">
            © {new Date().getFullYear()} Vivek Raj. All rights reserved.
          </span>
          <span className="text-text-muted/50 text-[0.66rem] uppercase tracking-[0.12em]">
            Built with Next.js, TailwindCSS, GSAP & Framer Motion
          </span>
        </div>
      </div>
    </footer>
  )
}
