'use client'

import { useEffect, useRef } from 'react'
import { useMobileDetect } from '@/hooks/useMobileDetect'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const { isTouchDevice } = useMobileDetect()

  useEffect(() => {
    if (isTouchDevice || typeof window === 'undefined') return

    const cursor = cursorRef.current
    if (!cursor) return

    let gsap: typeof import('gsap')['gsap']

    const initCursor = async () => {
      const mod = await import('gsap')
      gsap = mod.gsap

      const moveCursor = (e: MouseEvent) => {
        gsap.to(cursor, {
          x: e.clientX - 7,
          y: e.clientY - 7,
          duration: 0.5,
          ease: 'power3.out',
        })
      }

      const handleMouseEnter = () => {
        cursor.classList.add('hover')
      }

      const handleMouseLeave = () => {
        cursor.classList.remove('hover')
      }

      window.addEventListener('mousemove', moveCursor)

      const hoverables = document.querySelectorAll(
        'a, button, [data-hover], input, textarea'
      )
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)
      })

      // Re-attach on DOM changes
      const observer = new MutationObserver(() => {
        const newHoverables = document.querySelectorAll(
          'a, button, [data-hover], input, textarea'
        )
        newHoverables.forEach((el) => {
          el.addEventListener('mouseenter', handleMouseEnter)
          el.addEventListener('mouseleave', handleMouseLeave)
        })
      })

      observer.observe(document.body, { childList: true, subtree: true })

      return () => {
        window.removeEventListener('mousemove', moveCursor)
        observer.disconnect()
        hoverables.forEach((el) => {
          el.removeEventListener('mouseenter', handleMouseEnter)
          el.removeEventListener('mouseleave', handleMouseLeave)
        })
      }
    }

    const cleanup = initCursor()
    return () => {
      cleanup.then((fn) => fn?.())
    }
  }, [isTouchDevice])

  if (isTouchDevice) return null

  return <div ref={cursorRef} className="custom-cursor" />
}
