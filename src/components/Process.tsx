'use client'

import { useEffect, useRef } from 'react'

const steps = [
  {
    number: '01.',
    title: ' Strategize with Intention',
    body: 'Let\'s align on goals,  your audience, and what success looks like  — before comitting.',
  },
  {
    number: '02.',
    title: 'Tell Your Story',
    body: ' Hand crafted story driven design that makes your business unforgettable.',
  },
  {
    number: '03.',
    title: 'Build Authority',
    body: 'Define your brands values and communicate them consistently',
  },
]

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      sectionRef.current?.querySelectorAll('.reveal').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            delay: i * 0.12,
            scrollTrigger: { trigger: el, start: 'top 86%', once: true },
          }
        )
      })
    }
    initGSAP()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="process"
      className="py-16 sm:py-24 overflow-hidden"
      style={{ background: '#F5F0EA' }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">

        {/* Header */}
        <div className="reveal text-center mb-12 sm:mb-16">
          <span
            className="block font-epilogue text-xs uppercase tracking-widest mb-4"
            style={{ color: 'rgba(30,45,58,0.4)' }}
          >
            The Process
          </span>
          <h2
            className="font-epilogue font-black text-slate-navy"
            style={{
              fontSize: 'clamp(31px, 4vw, 56px)',
              letterSpacing: '-0.04em',
            }}
          >
            How it{' '}
            <span className="playfair-italic" style={{ color: '#D4907A' }}>
              works
            </span>
          </h2>
        </div>

        {/* Steps — gap-10 on mobile gives breathing room between each step's body <p> and the next circle */}
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-10 md:gap-0">

          {steps.map((step, i) => (
            <div key={step.number} className="flex flex-col md:flex-row items-center w-full md:w-auto">

              {/* Step circle */}
              <div
                className="reveal flex flex-col items-center text-center"
                style={{ width: 'clamp(200px, 22vw, 260px)' }}
              >
                {/* Circle */}
                <div
                  className="relative flex flex-col items-center justify-center rounded-full mb-5 sm:mb-6"
                  style={{
                    width: 'clamp(140px, 18vw, 220px)',
                    height: 'clamp(140px, 18vw, 220px)',
                    border: '1px solid rgba(30,45,58,0.18)',
                  }}
                >
                  {/* Number */}
                  <span
                    className="font-epilogue font-black mb-2"
                    style={{
                      fontSize: '14px',
                      color: '#D4907A',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {step.number}
                  </span>
                  {/* Title */}
                  <span
                    className="font-epilogue font-black text-slate-navy px-4 leading-tight text-center"
                    style={{ fontSize: 'clamp(13px, 1.2vw, 16px)', letterSpacing: '-0.02em' }}
                  >
                    {step.title}
                  </span>
                </div>

                {/* Body — pb-2 gives separation from the next circle on mobile */}
                <p
                  className="font-epilogue leading-relaxed text-center pb-2 md:pb-0"
                  style={{
                    fontSize: 'clamp(13px, 1vw, 14px)',
                    color: 'rgba(30,45,58,0.55)',
                    maxWidth: '200px',
                  }}
                >
                  {step.body}
                </p>
              </div>

              {/* Dashed arrow connector (between steps, desktop only) */}
              {i < steps.length - 1 && (
                <div
                  className="reveal hidden md:block flex-shrink-0 mx-2"
                  style={{ width: 'clamp(60px, 6vw, 100px)', marginTop: '-60px' }}
                >
                  <svg
                    viewBox="0 0 100 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full"
                    style={{
                      transform: i % 2 === 0 ? 'scaleY(-1)' : 'scaleY(1)',
                    }}
                  >
                    <path
                      d="M4 32 C 20 4, 80 4, 96 32"
                      stroke="#4A7B9D"
                      strokeWidth="1.2"
                      strokeDasharray="5 4"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M90 26 L96 32 L88 34"
                      stroke="#4A7B9D"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
