'use client'

import { useEffect, useRef } from 'react'

const buildWith = [
  'Next.js',
  'React',
  'JavaScript',
  'TypeScript',
  'Tailwind CSS',
  'Responsive UI',
  'Forms',
  'API-driven Interfaces',
]

const alsoMring = [
  'SQL',
  'Python',
  'Analytics-minded Problem Solving',
  'Git / GitHub',
]

export default function Stack() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      sectionRef.current?.querySelectorAll('.reveal').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.08,
            scrollTrigger: { trigger: el, start: 'top 87%', once: true },
          }
        )
      })
    }
    initGSAP()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="stack"
      className="relative overflow-hidden py-20"
      style={{ background: '#4A7B9D' }}
    >
      {/* Ghost letter */}
      <div
        aria-hidden="true"
        className="absolute top-[-15%] right-[-3%] pointer-events-none select-none"
      >
        <span
          className="font-epilogue font-black leading-none"
          style={{
            fontSize: 'clamp(200px, 24vw, 380px)',
            color: 'rgba(30,45,58,0.08)',
            letterSpacing: '-0.06em',
            display: 'block',
          }}
        >
          T
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16">

        {/* Header row */}
        <div className="reveal flex items-baseline gap-4 mb-12">
          <span
            className="font-epilogue text-xs uppercase tracking-widest"
            style={{ color: 'rgba(245,240,234,0.4)' }}
          >
            Toolkit
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: 'rgba(245,240,234,0.12)' }}
          />
        </div>

        {/* What I build with */}
        <div className="reveal mb-10">
          <p
            className="font-epilogue font-black uppercase tracking-widest mb-5"
            style={{ fontSize: '11px', color: 'rgba(245,240,234,0.45)', letterSpacing: '0.2em' }}
          >
            What I build with
          </p>
          <div className="flex flex-wrap gap-2">
            {buildWith.map((item) => (
              <span
                key={item}
                className="toolkit-item font-epilogue font-semibold px-4 py-2 text-sm"
                style={{
                  background: 'rgba(245,240,234,0.1)',
                  color: '#F5F0EA',
                  border: '1px solid rgba(245,240,234,0.15)',
                  borderRadius: '2px',
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          className="reveal my-8"
          style={{ height: '1px', background: 'rgba(245,240,234,0.1)' }}
        />

        {/* What I also bring */}
        <div className="reveal">
          <p
            className="font-epilogue font-black uppercase tracking-widest mb-5"
            style={{ fontSize: '11px', color: 'rgba(245,240,234,0.45)', letterSpacing: '0.2em' }}
          >
            What I also bring
          </p>
          <div className="flex flex-wrap gap-2">
            {alsoMring.map((item) => (
              <span
                key={item}
                className="toolkit-item font-epilogue font-semibold px-4 py-2 text-sm"
                style={{
                  background: 'transparent',
                  color: '#F0C4B0',
                  border: '1px solid rgba(240,196,176,0.3)',
                  borderRadius: '2px',
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
