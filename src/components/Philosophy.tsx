'use client'

import { useEffect, useRef } from 'react'
import { HexGeometry } from './SacredGeometry'

const pillars = [
  {
    number: '01',
    name: 'Craft Over Speed',
    body:
      'Every pixel is a decision. Rushed work ships technical debt; deliberate work ships clarity. The difference is in the details.',
  },
  {
    number: '02',
    name: 'Systems Thinking',
    body:
      'Components are words in a language. Designing  better systems, keeps it simple and beutiful.',
  },
  {
    number: '03',
    name: 'Motion With Intent',
    body:
      'Animation earns its place or it doesn\'t. Every transition communicates something. Decorative motion is just noise in a better outfit.',
  },
  {
    number: '04',
    name: 'Code as Material',
    body:
      'The browser is a creative medium. Constraints aren\'t limitations — they\'re the material. Learning the material deeply changes what\'s possible.',
  },
]

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
      className="relative overflow-hidden py-5 sm:py-24 lg:py-32"
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
            Simplicity. It's the standard.
          </p>
        </div>

        {/* Body copy */}
        <p
          className="reveal font-epilogue leading-relaxed mb-10 sm:mb-16 lg:mb-24 max-w-2xl"
          style={{
            fontSize: 'clamp(15px, 1.3vw, 18px)',
            color: 'rgba(245,240,234,0.6)',
          }}
        >
          Good frontend work sits at the intersection of good structure and
          creative instinct. Building the scaffolding so that your magic has
          somewhere to live.
        </p>

        {/* 2×2 pillar grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-2 md:gap-px">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.number}
              className={`pillar-card reveal p-6 sm:p-8 lg:p-12 ${
                i === 1 ? 'md:mt-16' : ''
              } ${i === 3 ? 'md:mt-16' : ''}`}
            >
              {/* Number */}
              <span
                className="block font-mono text-sm mb-4 sm:mb-6"
                style={{ color: '#D4907A' }}
              >
                {pillar.number}
              </span>

              {/* Name */}
              <h3
                className="font-epilogue font-black uppercase text-parchment mb-3 sm:mb-5"
                style={{
                  fontSize: 'clamp(14px, 1.5vw, 20px)',
                  letterSpacing: '0.06em',
                }}
              >
                {pillar.name}
              </h3>

              {/* Body */}
              <p
                className="font-epilogue leading-relaxed"
                style={{
                  fontSize: 'clamp(13px, 1.1vw, 15px)',
                  color: 'rgba(245,240,234,0.55)',
                }}
              >
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
