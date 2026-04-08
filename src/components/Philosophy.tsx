'use client'

import { useEffect, useRef } from 'react'
import { HexGeometry } from './SacredGeometry'

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const reveals = sectionRef.current?.querySelectorAll('.reveal')
      reveals?.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            delay: (i % 4) * 0.1,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
          }
        )
      })
    }

    initGSAP()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative overflow-hidden py-16 sm:py-24 lg:py-32"
      style={{ background: '#1E2D3A' }}
    >
      {/* ── Sacred geometry background ── */}
      <div
        aria-hidden="true"
        className="sacred-spin-slow absolute pointer-events-none hidden sm:block"
        style={{
          right: '-14%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'clamp(400px, 50vw, 720px)',
          height: 'clamp(400px, 50vw, 720px)',
        }}
      >
        <HexGeometry
          color="#F0C4B0"
          opacity={0.055}
          size={720}
          className="w-full h-full"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">
        {/* Section label */}
        <div className="reveal mb-4 sm:mb-8">
          <span
            className="font-epilogue text-xs uppercase tracking-widest"
            style={{ color: 'rgba(245,240,234,0.35)' }}
          >
            Philosophy
          </span>
        </div>

        {/* Main headline */}
        <div className="reveal mb-5 sm:mb-8 max-w-4xl">
          <h2
            className="font-epilogue font-black leading-[0.9] text-parchment"
            style={{
              fontSize: 'clamp(35px, 6vw, 96px)',
              letterSpacing: '-0.04em',
            }}
          >
            Making beautiful things that work
          </h2>
          <p
            className="playfair-italic"
            style={{
              fontSize: 'clamp(29px, 5.2vw, 84px)',
              color: '#F0C4B0',
              letterSpacing: '-0.02em',
            }}
          >
           Simple intentional design
          </p>
        </div>

        {/* Body copy */}
        <p
          className="reveal font-epilogue leading-relaxed max-w-2xl"
          style={{
            fontSize: 'clamp(16px, 1.3vw, 18px)',
            color: 'rgba(245,240,234,0.6)',
          }}
        >
          Building the scaffolding so that your magic has
          somewhere to live.
        </p>
      </div>
    </section>
  )
}
