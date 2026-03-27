'use client'

import { useEffect, useRef, useCallback, useMemo } from 'react'

interface TargetCursorProps {
  targetSelector?: string
  spinDuration?: number
  hoverDuration?: number
  parallaxOn?: boolean
}

export default function TargetCursor({
  targetSelector = '.cursor-target',
  spinDuration   = 2,
  hoverDuration  = 0.18,
  parallaxOn     = true,
}: TargetCursorProps) {
  const cursorRef  = useRef<HTMLDivElement>(null)
  const cornersRef = useRef<NodeListOf<Element> | null>(null)
  const dotRef     = useRef<HTMLDivElement>(null)
  const spinTl     = useRef<gsap.core.Timeline | null>(null)

  const isActiveRef              = useRef(false)
  const targetCornerPositionsRef = useRef<{ x: number; y: number }[] | null>(null)
  const tickerFnRef              = useRef<(() => void) | null>(null)
  const activeStrengthRef        = useRef({ current: 0 })

  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false
    const hasTouchScreen   = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const isSmallScreen    = window.innerWidth <= 768
    const mobileRegex      = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
    const isMobileUA       = mobileRegex.test((navigator.userAgent || '').toLowerCase())
    return (hasTouchScreen && isSmallScreen) || isMobileUA
  }, [])

  const constants = useMemo(() => ({ borderWidth: 3, cornerSize: 12 }), [])

  const moveCursor = useCallback((x: number, y: number) => {
    if (!cursorRef.current) return
    import('gsap').then(({ gsap }) => {
      gsap.to(cursorRef.current!, { x, y, duration: 0.1, ease: 'power3.out' })
    })
  }, [])

  useEffect(() => {
    if (isMobile || !cursorRef.current) return

    let gsapInstance: typeof import('gsap')['gsap']
    let activeTarget: Element | null = null
    let currentLeaveHandler: (() => void) | null = null
    let resumeTimeout: ReturnType<typeof setTimeout> | null = null

    const init = async () => {
      const mod = await import('gsap')
      gsapInstance = mod.gsap

      const cursor = cursorRef.current!
      cornersRef.current = cursor.querySelectorAll('.target-cursor-corner')

      gsapInstance.set(cursor, {
        xPercent: -50, yPercent: -50,
        x: window.innerWidth / 2, y: window.innerHeight / 2,
      })

      const createSpinTl = () => {
        spinTl.current?.kill()
        spinTl.current = gsapInstance
          .timeline({ repeat: -1 })
          .to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' })
      }
      createSpinTl()

      // ── Ticker: parallax corners to target ──────────────────────────────
      const tickerFn = () => {
        if (!targetCornerPositionsRef.current || !cursorRef.current || !cornersRef.current) return
        const strength = activeStrengthRef.current.current
        if (strength === 0) return

        const cursorX = gsapInstance.getProperty(cursorRef.current, 'x') as number
        const cursorY = gsapInstance.getProperty(cursorRef.current, 'y') as number

        Array.from(cornersRef.current).forEach((corner, i) => {
          const currentX = gsapInstance.getProperty(corner as Element, 'x') as number
          const currentY = gsapInstance.getProperty(corner as Element, 'y') as number
          const targetX  = targetCornerPositionsRef.current![i].x - cursorX
          const targetY  = targetCornerPositionsRef.current![i].y - cursorY
          const finalX   = currentX + (targetX - currentX) * strength
          const finalY   = currentY + (targetY - currentY) * strength
          const dur      = strength >= 0.99 ? (parallaxOn ? 0.2 : 0) : 0.05
          gsapInstance.to(corner as Element, {
            x: finalX, y: finalY, duration: dur,
            ease: dur === 0 ? 'none' : 'power1.out', overwrite: 'auto',
          })
        })
      }
      tickerFnRef.current = tickerFn

      // ── Mouse move ───────────────────────────────────────────────────────
      const moveHandler = (e: MouseEvent) => moveCursor(e.clientX, e.clientY)
      window.addEventListener('mousemove', moveHandler)

      // ── Mousedown / up ───────────────────────────────────────────────────
      const mouseDownHandler = () => {
        if (!dotRef.current) return
        gsapInstance.to(dotRef.current,    { scale: 0.7, duration: 0.3 })
        gsapInstance.to(cursorRef.current, { scale: 0.9, duration: 0.2 })
      }
      const mouseUpHandler = () => {
        if (!dotRef.current) return
        gsapInstance.to(dotRef.current,    { scale: 1, duration: 0.3 })
        gsapInstance.to(cursorRef.current, { scale: 1, duration: 0.2 })
      }
      window.addEventListener('mousedown', mouseDownHandler)
      window.addEventListener('mouseup',   mouseUpHandler)

      // ── Hover enter ──────────────────────────────────────────────────────
      const enterHandler = (e: MouseEvent) => {
        let el: Element | null = e.target as Element
        while (el && el !== document.body) {
          if (el.matches(targetSelector)) break
          el = el.parentElement
        }
        const target = el && el.matches(targetSelector) ? el : null
        if (!target || !cursorRef.current || !cornersRef.current) return
        if (activeTarget === target) return
        if (activeTarget && currentLeaveHandler) {
          activeTarget.removeEventListener('mouseleave', currentLeaveHandler)
          currentLeaveHandler = null
        }
        if (resumeTimeout) { clearTimeout(resumeTimeout); resumeTimeout = null }

        activeTarget = target
        cursor.classList.add('is-active')

        Array.from(cornersRef.current).forEach(c => gsapInstance.killTweensOf(c))
        gsapInstance.killTweensOf(cursorRef.current, 'rotation')
        spinTl.current?.pause()
        gsapInstance.set(cursorRef.current, { rotation: 0 })

        const rect    = target.getBoundingClientRect()
        const { borderWidth, cornerSize } = constants
        const cursorX = gsapInstance.getProperty(cursorRef.current, 'x') as number
        const cursorY = gsapInstance.getProperty(cursorRef.current, 'y') as number

        targetCornerPositionsRef.current = [
          { x: rect.left  - borderWidth,                y: rect.top    - borderWidth               },
          { x: rect.right + borderWidth - cornerSize,   y: rect.top    - borderWidth               },
          { x: rect.right + borderWidth - cornerSize,   y: rect.bottom + borderWidth - cornerSize  },
          { x: rect.left  - borderWidth,                y: rect.bottom + borderWidth - cornerSize  },
        ]

        isActiveRef.current = true
        gsapInstance.ticker.add(tickerFnRef.current!)
        gsapInstance.to(activeStrengthRef.current, { current: 1, duration: hoverDuration, ease: 'power2.out' })

        Array.from(cornersRef.current).forEach((corner, i) => {
          gsapInstance.to(corner as Element, {
            x: targetCornerPositionsRef.current![i].x - cursorX,
            y: targetCornerPositionsRef.current![i].y - cursorY,
            duration: 0.2, ease: 'power2.out',
          })
        })

        const leaveHandler = () => {
          gsapInstance.ticker.remove(tickerFnRef.current!)
          isActiveRef.current               = false
          targetCornerPositionsRef.current  = null
          activeStrengthRef.current.current = 0
          activeTarget = null
          cursor.classList.remove('is-active')

          if (cornersRef.current) {
            const corners = Array.from(cornersRef.current)
            gsapInstance.killTweensOf(corners)
            const { cornerSize } = constants
            const positions = [
              { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
              { x:  cornerSize * 0.5, y: -cornerSize * 1.5 },
              { x:  cornerSize * 0.5, y:  cornerSize * 0.5 },
              { x: -cornerSize * 1.5, y:  cornerSize * 0.5 },
            ]
            const tl = gsapInstance.timeline()
            corners.forEach((corner, i) => {
              tl.to(corner as Element, { x: positions[i].x, y: positions[i].y, duration: 0.3, ease: 'power3.out' }, 0)
            })
          }

          resumeTimeout = setTimeout(() => {
            if (!activeTarget && cursorRef.current && spinTl.current) {
              spinTl.current.kill()
              spinTl.current = gsapInstance
                .timeline({ repeat: -1 })
                .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' })
            }
            resumeTimeout = null
          }, 50)

          target.removeEventListener('mouseleave', leaveHandler)
          currentLeaveHandler = null
        }

        currentLeaveHandler = leaveHandler
        target.addEventListener('mouseleave', leaveHandler)
      }

      window.addEventListener('mouseover', enterHandler as EventListener, { passive: true })

      return () => {
        if (tickerFnRef.current) gsapInstance.ticker.remove(tickerFnRef.current)
        window.removeEventListener('mousemove',  moveHandler)
        window.removeEventListener('mouseover',  enterHandler as EventListener)
        window.removeEventListener('mousedown',  mouseDownHandler)
        window.removeEventListener('mouseup',    mouseUpHandler)
        if (activeTarget && currentLeaveHandler) activeTarget.removeEventListener('mouseleave', currentLeaveHandler)
        spinTl.current?.kill()
      }
    }

    let cleanup: (() => void) | undefined
    init().then(fn => { cleanup = fn })
    return () => { cleanup?.() }
  }, [isMobile, spinDuration, hoverDuration, parallaxOn, targetSelector, moveCursor, constants])

  if (isMobile) return null

  return (
    <div ref={cursorRef} className="target-cursor-wrapper">
      <div ref={dotRef} className="target-cursor-dot" />
      <div className="target-cursor-corner corner-tl" />
      <div className="target-cursor-corner corner-tr" />
      <div className="target-cursor-corner corner-br" />
      <div className="target-cursor-corner corner-bl" />
    </div>
  )
}
