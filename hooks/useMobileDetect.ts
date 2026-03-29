'use client'

import { useState, useEffect, useLayoutEffect } from 'react'

const MQ = '(max-width: 767px)'

export function useMobileDetect() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useLayoutEffect(() => {
    const mq = window.matchMedia(MQ)
    setIsMobile(mq.matches)
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)

    const onChange = () => setIsMobile(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia(MQ).matches)
    }
    window.addEventListener('resize', checkMobile, { passive: true })
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return { isMobile, isTouchDevice }
}
