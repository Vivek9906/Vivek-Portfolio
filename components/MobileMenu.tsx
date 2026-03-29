'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { socialLinks } from '@/data/projects'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.08,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
  exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const handleLinkClick = (href: string) => {
    onClose()
    setTimeout(() => {
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      } else if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[49]"
            style={{
              backgroundColor: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(4px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Menu overlay */}
          <motion.div
            className="mobile-menu-overlay"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Close button — animated X using same hamburger lines */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 md:top-8 md:right-8 z-[110] flex flex-col items-end justify-center gap-[6px] p-2"
              style={{ border: 'none', background: 'none', cursor: 'pointer' }}
              aria-label="Close menu"
            >
              <span className="hamburger-line hamburger-line--top active" />
              <span className="hamburger-line hamburger-line--bottom active" />
            </button>

            <nav className="flex flex-col items-center gap-6 md:gap-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleLinkClick(item.href)}
                  className="mobile-menu-link"
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {item.name}
                </motion.button>
              ))}
            </nav>

            <motion.div
              className="absolute bottom-8 flex gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {socialLinks.slice(0, 3).map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-text-light transition-colors text-sm tracking-wider uppercase"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
