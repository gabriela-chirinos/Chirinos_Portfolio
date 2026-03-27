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

      // Hide via GSAP (not inline JSX style) so the pill is never permanently invisible
      if (pillWrap) gsap.set(pillWrap, { opacity: 0 })

      if (pillWrap && pillSpan) {
        const pillText = pillSpan.querySelector<HTMLElement>('.pill-text')

        gsap.set(pillWrap, { opacity: 1 })
        gsap.set(pillSpan, { maxWidth: '28px', overflow: 'hidden' })
        if (pillText) gsap.set(pillText, { opacity: 0 })

        gsap.to(pillSpan, {
          maxWidth: '260px',
          duration: 0.7,
          delay: 0.5,
          ease: 'power3.out',
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
        <span
          className="ghost-letter absolute top-[-4%] left-[-2%] font-epilogue font-black leading-none"
          style={{
            fontSize: 'clamp(120px, 16vw, 280px)',
            color: 'rgba(74, 123, 157, 0.09)',
            letterSpacing: '-0.06em',
            marginTop: '.15em',
            marginLeft: '.15em',
          }}
        >
          CREATIVE
        </span>
        <span
          className="ghost-letter absolute bottom-[-4%] right-[2%] font-epilogue font-black leading-none"
          style={{
            fontSize: 'clamp(120px, 16vw, 280px)',
            color: 'rgba(74, 123, 157, 0.09)',
            letterSpacing: '-0.06em',
          }}
        >
          DEVELOPER
        </span>
      </div>

      {/* ── Warm blur orbs ── */}
      <div aria-hidden="true" className="pointer-events-none select-none">
        <div className="orb" style={{ width: '480px', height: '480px', background: 'rgba(74, 123, 157, 0.14)', top: '-120px', right: '10%' }} />
        <div className="orb" style={{ width: '360px', height: '360px', background: 'rgba(240, 196, 176, 0.22)', bottom: '5%', left: '-60px' }} />
        <div className="orb" style={{ width: '280px', height: '280px', background: 'rgba(212, 144, 122, 0.18)', top: '40%', right: '28%' }} />
      </div>

      {/* ── Sacred geometry — far right ── */}
      <div
        aria-hidden="true"
        className="sacred-spin absolute pointer-events-none select-none"
        style={{
          right: '30%', top: '10%', transform: 'translateY(50%)',
          width: 'clamp(420px, 45vw, 700px)', height: 'clamp(420px, 45vw, 700px)',
        }}
      >
        <FlowerOfLife color="#1E2D3A" opacity={0.07} size={700} className="w-full h-full" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 pt-32 pb-24 w-full">
        <div className="max-w-4xl">

          {/* Availability pill — assembles from circle */}
          <div ref={pillRef} className="mb-10 flex justify-end">
            <span
              ref={pillSpanRef}
              className="pill bg-white/40 px-4 py-2 rounded-full text-sm font-epilogue font-semibold uppercase tracking-widest text-slate-navy inline-flex items-center gap-2 whitespace-nowrap"
            >
              <span
                className="inline-block w-2 h-2 rounded-full bg-burnt-blush animate-pulse-dot flex-shrink-0"
                style={{ boxShadow: '0 0 0 4px rgba(212,144,122,0.2)' }}
              />
              <span className="pill-text">Available for Projects</span>
            </span>
          </div>

          {/* Main headline */}
          <div ref={headlineRef} className="mb-6">
            <h1
              className="font-epilogue font-black leading-[0.92] text-slate-navy"
              style={{ fontSize: 'clamp(54px, 7.5vw, 112px)', letterSpacing: '-0.04em' }}
            >
              Grounded
              <br />
              by Logic,
            </h1>
            <p
              className="playfair-italic text-slate-navy leading-tight"
              style={{ fontSize: 'clamp(48px, 6.5vw, 96px)', letterSpacing: '-0.02em' }}
            >
              driven by design.
            </p>
          </div>

          {/* Sub-copy */}
          <p
            ref={subRef}
            className="font-epilogue text-slate-navy/60 leading-relaxed mb-12 max-w-lg"
            style={{ fontSize: 'clamp(15px, 1.4vw, 18px)' }}
          >
            Frontend developer specialising in beautiful interfaces, scalable
            design systems, and creating curated digital experiences.
          </p>

          {/* CTA */}
          <div ref={ctaRef} className="flex items-center gap-6 flex-wrap">
            <a
              href="#contact"
              className="btn-sweep inline-flex items-center gap-3 px-8 py-4 bg-slate-navy text-parchment font-epilogue font-bold uppercase tracking-widest text-sm transition-colors duration-300"
            >
              <span className="relative z-10">Start a Project</span>
            </a>
            <a
              href="#work"
              className="arrow-link font-epilogue font-bold uppercase tracking-widest text-sm text-slate-navy/70 hover:text-slate-navy transition-colors flex items-center gap-2"
            >
              View Work <span className="arrow">→</span>
            </a>
          </div>

        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-epilogue text-xs uppercase tracking-widest text-slate-navy">Scroll</span>
        <div className="w-px h-12 bg-slate-navy/40" />
      </div>
    </section>
  )
}
