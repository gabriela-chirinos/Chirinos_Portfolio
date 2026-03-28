'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const bio = [
  "I'm Gabby — frontend developer, interactive designer, and relentless problem solver.",
  "My path to design  is unconventional: operations, data, and a genuine obsession with taking things apart to understand how they actually work. ",
  "I lead with curiosity and a little courage. I ask the uncomfortable questions and lead with authenticity.",
  "Great digital experiences begin  with understanding — who  it\'s for & what\'s actually need. From there, it's about moving fast, learning faster, and improving without ego.",
]

const facts = [
  { label: 'Based in',  value: 'United States'        },
  { label: 'Background', value: 'Ops · Data · Amazon · Freelance Design' },
  { label: 'Approach',  value: 'Curiousity. Courage to be disliked.'  },
]

export default function About() {
  const sectionRef  = useRef<HTMLElement>(null)
  const [hovered, setHovered] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      sectionRef.current?.querySelectorAll('.reveal').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            delay: (i % 5) * 0.1,
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          }
        )
      })
    }
    init()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-14 sm:py-24 lg:py-32 overflow-hidden"
      style={{ background: '#F5F0EA' }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">

        {/* Section label */}
        <div className="reveal flex items-center gap-6 mb-8 sm:mb-14 lg:mb-20">
          <span
            className="font-epilogue text-xs uppercase tracking-widest"
            style={{ color: 'rgba(30,45,58,0.4)' }}
          >
            About
          </span>
          <div className="flex-1 h-px" style={{ background: 'rgba(30,45,58,0.1)' }} />
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row gap-10 sm:gap-14 md:gap-16 lg:gap-24">

          {/* ── Left: photo + facts ── */}
          <div className="md:w-5/12 lg:w-5/12 flex flex-col gap-8 sm:gap-10">

            {/* Photo */}
            <div
              className="reveal relative"
              style={{ aspectRatio: '4/5', maxWidth: '380px' }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              {/* Steel blue offset backplate */}
              <div
                className="absolute"
                style={{
                  inset: 0,
                  background: '#4A7B9D',
                  transform: 'translate(12px, 12px)',
                  zIndex: 0,
                  transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
                  ...(hovered ? { transform: 'translate(18px, 18px)' } : {}),
                }}
              />

              {/* Image container */}
              <div
                className="relative z-10 w-full h-full overflow-hidden"
                style={{ background: '#1E2D3A', isolation: 'isolate' }}
              >
                <Image
                  src="/gabby.jpg"
                  alt="Gabriela Chirinos"
                  fill
                  className="object-cover object-center"
                  onLoad={() => setImgLoaded(true)}
                  style={{
                    filter: hovered
                      ? 'grayscale(15%) contrast(1.05) brightness(1.02)'
                      : 'grayscale(100%) contrast(1.12) brightness(0.9)',
                    transition: 'filter 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease',
                    opacity: imgLoaded ? 1 : 0,
                    zIndex: 1,
                  }}
                />

                {/* Duotone colour wash */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(
                      160deg,
                      rgba(240,196,176,0.45) 0%,
                      rgba(212,144,122,0.28) 45%,
                      rgba(30,45,58,0.5)    100%
                    )`,
                    mixBlendMode: 'color',
                    opacity: hovered ? 0.25 : 1,
                    transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1)',
                    zIndex: 2,
                  }}
                />

                {/* Grain texture */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '200px 200px',
                    opacity: 0.04,
                    mixBlendMode: 'overlay',
                    zIndex: 3,
                  }}
                />

                {/* Fallback monogram */}
                {!imgLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 0 }}>
                    <span className="font-playfair" style={{
                      fontStyle: 'italic',
                      fontSize: 'clamp(80px, 12vw, 140px)',
                      color: 'rgba(74,123,157,0.2)',
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                      userSelect: 'none',
                    }}>gc</span>
                  </div>
                )}
              </div>

              {/* Hover label */}
              <div
                className="absolute bottom-0 left-0 right-0 z-20 px-5 py-4 flex items-center gap-2"
                style={{
                  background: 'linear-gradient(to top, rgba(30,45,58,0.85), transparent)',
                  opacity: hovered ? 1 : 0,
                  transform: hovered ? 'translateY(0)' : 'translateY(6px)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                  pointerEvents: 'none',
                }}
              >
                <span className="font-epilogue font-black uppercase tracking-widest text-parchment"
                  style={{ fontSize: '10px', letterSpacing: '0.2em' }}>
                  Gabriela Chirinos
                </span>
              </div>
            </div>

            {/* Facts */}
            <ul className="reveal space-y-0 border-l" style={{ borderColor: 'rgba(30,45,58,0.15)' }}>
              {facts.map(f => (
                <li key={f.label} className="px-5 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4">
                  <span
                    className="font-epilogue font-black uppercase tracking-widest"
                    style={{ fontSize: '10px', color: 'rgba(30,45,58,0.4)', letterSpacing: '0.18em' }}
                  >
                    {f.label}
                  </span>
                  <span
                    className="font-epilogue font-semibold"
                    style={{ fontSize: '13px', color: '#1E2D3A' }}
                  >
                    {f.value}
                  </span>
                </li>
              ))}
            </ul>

          </div>

          {/* ── Right: bio ── */}
          <div className="md:w-7/12 lg:w-7/12 flex flex-col justify-center gap-0">

            {/* Name + title */}
            <div className="reveal mb-6 sm:mb-10 lg:mb-12">
              <h2
                className="font-epilogue font-black leading-none text-slate-navy"
                style={{
                  fontSize: 'clamp(30px, 6vw, 88px)',
                  letterSpacing: '-0.04em',
                }}
              >
                Gabriela
              </h2>
              <p
                className="playfair-italic mt-1"
                style={{
                  fontSize: 'clamp(16px, 2vw, 28px)',
                  color: '#D4907A',
                  letterSpacing: '-0.01em',
                }}
              >
                Chirinos.
              </p>
            </div>

            {/* Bio paragraphs */}
            <div className="space-y-4 sm:space-y-6">
              {bio.map((para, i) => (
                <p
                  key={i}
                  className="reveal font-epilogue leading-relaxed"
                  style={{
                    fontSize: i === 0
                      ? 'clamp(14px, 1.8vw, 24px)'
                      : 'clamp(12px, 1.3vw, 17px)',
                    color: i === 0
                      ? '#1E2D3A'
                      : 'rgba(30,45,58,0.65)',
                    fontWeight: i === 0 ? 600 : 400,
                  }}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* CTA row */}
            <div className="reveal mt-8 sm:mt-12 flex flex-wrap items-center gap-4 sm:gap-6">
              <a
                href="#work"
                className="btn-sweep inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-slate-navy text-parchment font-epilogue font-bold uppercase tracking-widest text-sm"
              >
                <span className="relative z-10">See My Work</span>
              </a>
              <a
                href="https://www.linkedin.com/in/gabrielachirinos/"
                target="_blank"
                rel="noopener noreferrer"
                className="arrow-link font-epilogue font-bold uppercase tracking-widest text-xs text-slate-navy/50 hover:text-slate-navy transition-colors flex items-center gap-2"
              >
                LinkedIn <span className="arrow">→</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
