'use client'

import { motion } from 'framer-motion'

export default function GitHubButton() {
  return (
    <div className="flex justify-center px-2">
      <motion.a
        href="https://github.com/Vivek9906"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex w-full max-w-sm items-center justify-center gap-2 overflow-hidden rounded-full border border-white/80 bg-transparent px-6 py-3 text-center uppercase text-white transition-colors duration-300 ease-out hover:bg-white hover:text-black md:max-w-md md:px-7 md:py-3.5"
        style={{
          fontSize: 'clamp(0.8rem, 1.35vw, 1rem)',
          letterSpacing: '0.1em',
          fontFamily: 'var(--font-space-grotesk), sans-serif',
          fontWeight: 600,
        }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        data-hover
      >
        <span className="relative z-10">More on GitHub</span>
        <span
          className="relative z-10 text-base leading-none transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        >
          ↗
        </span>
      </motion.a>
    </div>
  )
}
