'use client'

import { useEffect, useRef } from 'react'

export function useGSAP() {
  const scopeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let gsapModule: typeof import('gsap') | null = null
    let ScrollTriggerModule: typeof import('gsap/ScrollTrigger') | null = null

    const initGSAP = async () => {
      gsapModule = await import('gsap')
      ScrollTriggerModule = await import('gsap/ScrollTrigger')

      gsapModule.gsap.registerPlugin(ScrollTriggerModule.ScrollTrigger)

      // Refresh after fonts load
      if (document.fonts) {
        document.fonts.ready.then(() => {
          ScrollTriggerModule?.ScrollTrigger.refresh()
        })
      }
    }

    initGSAP()

    return () => {
      if (ScrollTriggerModule) {
        ScrollTriggerModule.ScrollTrigger.getAll().forEach((trigger) =>
          trigger.kill()
        )
      }
    }
  }, [])

  return scopeRef
}
