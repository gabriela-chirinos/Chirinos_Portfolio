'use client'

import { useEffect, useRef } from 'react'
import { FlowerOfLife } from './SacredGeometry'

export default function Hero() {
  const heroRef     = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const pillRef     = useRef<HTMLDivElement>(null)
  const pillSpanRef = useRef<HTMLSpanElement>(null)
  const ctaRef      = useRef<HTMLDivElement>(null)
  const subRef      = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap')

      // ── 1. Pill: circle → full pill ─────────────────────────────────────
      const pillWrap = pillRef.current
      const pillSpan = pillSpanRef.current

      // Pill is hidden on mobile (md:hidden), so GSAP only fires visually on desktop
      if (pillWrap) gsap.set(pillWrap, { opacity: 0 })

      if (pillWrap && pillSpan) {
        const pillText = pillSpan.querySelector<HTMLElement>('.pill-text')

        gsap.set(pillWrap, { opacity: 1 })
        gsap.set(pillSpan, { maxWidth: '28px', overflow: 'hidden' })
        if (pillText) gsap.set(pillText, { opacity: 0 })

        gsap.to(pillSpan, {
          maxWidth: '400px',
          duration: 0.7,
          delay: 0.5,
          ease: 'power3.out',
          onComplete: () => {
            // Remove inline constraints so the pill sits at its natural width
            if (pillSpanRef.current) {
              pillSpanRef.current.style.maxWidth = ''
              pillSpanRef.current.style.overflow = ''
            }
          },
        })

        if (pillText) {
          gsap.to(pillText, {
            opacity: 1,
            duration: 0.35,
            delay: 1.0,
            ease: 'power2.out',
          })
        }
      }

      // ── 2. Remaining content staggers in ────────────────────────────────
      const els = [headlineRef.current, subRef.current, ctaRef.current]
      gsap.set(els, { opacity: 0, y: 30 })
      els.forEach((el, i) => {
        if (!el) return
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.55 + i * 0.13,
        })
      })
    }

    initGSAP()
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-parchment"
    >
      {/* ── Ghost letterforms ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      >
        {/* clamp min 56px so ghost letters stay decorative, not dominant, on mobile */}
        <span
          className="ghost-letter ghost-creative-margin absolute top-[-4%] left-[-2%] font-epilogue font-black leading-none"
          style={{
            fontSize: 'clamp(56px, 16vw, 280px)',
            color: 'rgba(74, 123, 157, 0.09)',
            letterSpacing: '-0.06em',
          }}
        >
          CREATIVE
        </span>
        <span
          className="ghost-letter ghost-developer-bottom absolute right-[2%] font-epilogue font-black leading-none"
          style={{
            fontSize: 'clamp(56px, 16vw, 280px)',
            color: 'rgba(74, 123, 157, 0.09)',
            letterSpacing: '-0.06em',
          }}
        >
          DEVELOPER
        </span>
      </div>

      {/* ── Warm blur orbs — scaled for mobile ── */}
      <div aria-hidden="true" className="pointer-events-none select-none">
        {/* Top-right: hidden on small screens, too dominant at 480px */}
        <div
          className="orb hidden sm:block"
          style={{
            width: 'clamp(240px, 40vw, 480px)',
            height: 'clamp(240px, 40vw, 480px)',
            background: 'rgba(74, 123, 157, 0.14)',
            top: '-120px',
            right: '10%',
          }}
        />
        <div
          className="orb"
          style={{
            width: 'clamp(180px, 35vw, 360px)',
            height: 'clamp(180px, 35vw, 360px)',
            background: 'rgba(240, 196, 176, 0.22)',
            bottom: '5%',
            left: '-60px',
          }}
        />
        {/* Mid orb: hidden on mobile, shows from md */}
        <div
          className="orb hidden md:block"
          style={{
            width: '280px',
            height: '280px',
            background: 'rgba(212, 144, 122, 0.18)',
            top: '40%',
            right: '28%',
          }}
        />
      </div>

      {/* ── Sacred geometry — hidden on mobile, shown from md ── */}
      <div
        aria-hidden="true"
        className="sacred-spin absolute pointer-events-none select-none hidden md:block"
        style={{
          right: '30%',
          top: '10%',
          transform: 'translateY(50%)',
          width: 'clamp(320px, 45vw, 700px)',
          height: 'clamp(320px, 45vw, 700px)',
        }}
      >
        <FlowerOfLife color="#1E2D3A" opacity={0.07} size={700} className="w-full h-full" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 pt-16 sm:pt-28 lg:pt-32 pb-10 lg:pb-24 w-full">
        <div className="max-w-4xl">

          {/* ── Desktop pill (md+): expanding animation unchanged ── */}
          <div ref={pillRef} className="hidden md:flex mb-8 lg:mb-10 justify-end">
            <span
              ref={pillSpanRef}
              className="pill bg-white/40 px-3 py-1.5 rounded-full text-xs font-epilogue font-semibold uppercase tracking-widest text-slate-navy inline-flex items-center gap-2 whitespace-nowrap"
            >
              <span
                className="inline-block w-2 h-2 rounded-full bg-burnt-blush animate-pulse-dot flex-shrink-0"
                style={{ boxShadow: '0 0 0 4px rgba(212,144,122,0.2)' }}
              />
              <span className="pill-text">Available for Projects</span>
            </span>
          </div>

          {/* ── Mobile spinning badge (<md): circular orbital text ── */}
          <div className="md:hidden mb-6 flex justify-end">
            <div className="spin-badge-enter" style={{ position: 'relative', width: '92px', height: '92px' }}>

              {/* Spinning ring + orbiting text */}
              <div className="spin-badge-ring absolute inset-0">
                <svg viewBox="0 0 92 92" width="92" height="92" aria-hidden="true">
                  {/* Outer decorative ring */}
                  <circle cx="46" cy="46" r="43" fill="none"
                    stroke="rgba(240,196,176,0.25)" strokeWidth="0.6" />
                  {/* Inner ring */}
                  <circle cx="46" cy="46" r="37" fill="none"
                    stroke="rgba(240,196,176,0.15)" strokeWidth="0.4" />

                  {/* Circular text path — starts at 12 o'clock, runs clockwise */}
                  <defs>
                    <path id="hero-badge-path"
                      d="M46,6 A40,40 0 1,1 45.999,6"
                    />
                  </defs>
                  <text
                    fontSize="7"
                    fill="#F0C4B0"
                    fontFamily="var(--font-epilogue)"
                    fontWeight="700"
                    letterSpacing="2.8"
                  >
                    <textPath href="#hero-badge-path" startOffset="0%">
                      LET'S CREATE TOGETHER · AVAILABLE ·
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Center pulsing dot — does not spin */}
              <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
                <span
                  className="block w-2 h-2 rounded-full bg-burnt-blush animate-pulse-dot"
                  style={{ boxShadow: '0 0 0 5px rgba(212,144,122,0.18)' }}
                />
              </div>

            </div>
          </div>

          {/* Main headline */}
          <div ref={headlineRef} className="mb-4 sm:mb-6">
            <h1
              className="font-epilogue font-black leading-[0.92] text-slate-navy"
              style={{
                fontSize: 'clamp(42px, 7.5vw, 112px)',
                letterSpacing: '-0.04em',
              }}
            >
              Grounded
              <br />
              by Logic,
            </h1>
            <p
              className="playfair-italic text-slate-navy leading-tight"
              style={{
                fontSize: 'clamp(35px, 6.5vw, 96px)',
                letterSpacing: '-0.02em',
              }}
            >
              driven by design.
            </p>
          </div>

          {/* Sub-copy */}
          <p
            ref={subRef}
            className="font-epilogue text-slate-navy/60 leading-relaxed mb-8 sm:mb-12 max-w-lg"
            style={{ fontSize: 'clamp(15px, 3.5vw, 18px)' }}
          >
           I design clean, thoughtful digital experiences for solopreneurs and local businesses ready to stand out.
          </p>

          {/* CTA */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-3 sm:gap-6">
            <a
              href="#contact"
              className="btn-sweep inline-flex items-center gap-2 px-4 py-2.5 sm:px-8 sm:py-4 bg-slate-navy text-parchment font-epilogue font-bold uppercase tracking-widest text-xs sm:text-sm transition-colors duration-300"
            >
              <span className="relative z-10">Start a Project</span>
            </a>
            <a
              href="#work"
              className="arrow-link font-epilogue font-bold uppercase tracking-widest text-xs sm:text-sm text-slate-navy/70 hover:text-slate-navy transition-colors flex items-center gap-2"
            >
              View Work <span className="arrow">→</span>
            </a>
          </div>

        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-epilogue text-xs uppercase tracking-widest text-slate-navy">Scroll</span>
        <div className="w-px h-10 sm:h-12 bg-slate-navy/40" />
      </div>
    </section>
  )
}
