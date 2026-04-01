'use client'

import { useEffect, useRef } from 'react'

const packages = [
  {
    number: '01',
    name: 'The Foundation',
    vibe: 'Clean, intentional, done.',
    description: 'Your first real corner of the internet — built with care, purpose, and no filler.',
    price: '$800',
    priceNote: 'starting at',
    includes: [
      '1–3 page responsive website',
      'Mobile-first, brand-aligned design',
      'Contact form integration',
      'Basic SEO setup',
      'Deployment included',
      '1 revision round',
    ],
    tag: null,
    featured: false,
    dark: false,
  },
  {
    number: '02',
    name: 'The Presence',
    vibe: 'Polished. Purposeful. Distinctly yours.',
    description: 'A full brand expression online — every page designed to feel exactly like you.',
    price: '$1,500',
    priceNote: 'starting at',
    includes: [
      'Up to 6 pages',
      'Custom design system',
      'Scroll animations',
      'CMS integration',
      'Performance optimization',
      '2 revision rounds',
    ],
    tag: 'Most Popular',
    featured: true,
    dark: false,
  },
  {
    number: '03',
    name: 'The Experience',
    vibe: 'Immersive. Interactive. Unforgettable.',
    description: 'For brands that want to be felt, not just seen. Built to move.',
    price: '$2,500+',
    priceNote: 'starting at',
    includes: [
      'Fully custom interactive build',
      'Micro-interactions & animation',
      'Component library',
      'CMS + third-party integrations',
      '30-day post-launch support',
      '3 revision rounds',
    ],
    tag: 'Premium',
    featured: false,
    dark: true,
  },
]

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      sectionRef.current?.querySelectorAll('.reveal').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
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
      id="pricing"
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden"
      style={{ background: '#F5F0EA' }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">

        {/* Section label */}
        <div className="reveal flex items-center gap-6 mb-8 sm:mb-14 lg:mb-20">
          <span
            className="font-epilogue text-xs uppercase tracking-widest"
            style={{ color: 'rgba(30,45,58,0.4)' }}
          >
            Pricing
          </span>
          <div className="flex-1 h-px" style={{ background: 'rgba(30,45,58,0.1)' }} />
        </div>

        {/* Headline */}
        <div className="reveal mb-4 sm:mb-6 max-w-4xl">
          <h2
            className="font-epilogue font-black leading-[0.9] text-slate-navy"
            style={{
              fontSize: 'clamp(35px, 6vw, 96px)',
              letterSpacing: '-0.04em',
            }}
          >
            Transparent pricing,
          </h2>
          <p
            className="playfair-italic"
            style={{
              fontSize: 'clamp(29px, 5.2vw, 84px)',
              color: '#D4907A',
              letterSpacing: '-0.02em',
            }}
          >
            no surprises.
          </p>
        </div>

        {/* Body copy */}
        <p
          className="reveal font-epilogue leading-relaxed mb-12 sm:mb-16 lg:mb-20 max-w-xl"
          style={{
            fontSize: 'clamp(15px, 1.3vw, 18px)',
            color: 'rgba(30,45,58,0.6)',
          }}
        >
          Every project is different — these are starting points. Not sure which fits?
          Reach out and we'll figure it out together.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-start">
          {packages.map((pkg) => (
            <div
              key={pkg.number}
              className={`reveal flex flex-col ${pkg.featured ? 'md:-mt-5' : ''}`}
            >
              {/* Tag badge */}
              {pkg.tag ? (
                <div className="mb-3">
                  <span
                    className="font-epilogue font-black uppercase tracking-widest"
                    style={{
                      fontSize: '10px',
                      letterSpacing: '0.18em',
                      color: pkg.featured ? '#4A7B9D' : '#D4907A',
                      background: pkg.featured
                        ? 'rgba(74,123,157,0.12)'
                        : 'rgba(212,144,122,0.14)',
                      padding: '4px 10px',
                      display: 'inline-block',
                    }}
                  >
                    {pkg.tag}
                  </span>
                </div>
              ) : (
                <div className="mb-3 h-[26px]" aria-hidden="true" />
              )}

              {/* Card body */}
              <div
                className="flex flex-col flex-1 p-7 sm:p-8 lg:p-10"
                style={{
                  background: pkg.dark ? '#1E2D3A' : '#FFFFFF',
                  border: pkg.featured
                    ? '1px solid rgba(74,123,157,0.25)'
                    : pkg.dark
                    ? '1px solid rgba(245,240,234,0.06)'
                    : '1px solid rgba(30,45,58,0.1)',
                  borderTop: pkg.featured
                    ? '2px solid #4A7B9D'
                    : pkg.dark
                    ? '2px solid #D4907A'
                    : '1px solid rgba(30,45,58,0.1)',
                  boxShadow: pkg.featured
                    ? '0 24px 64px rgba(30,45,58,0.1)'
                    : 'none',
                }}
              >
                {/* Number */}
                <span
                  className="block font-mono text-sm mb-5"
                  style={{
                    color: pkg.dark ? 'rgba(240,196,176,0.45)' : '#D4907A',
                  }}
                >
                  {pkg.number}
                </span>

                {/* Name */}
                <h3
                  className="font-epilogue font-black uppercase mb-1"
                  style={{
                    fontSize: 'clamp(15px, 1.6vw, 21px)',
                    letterSpacing: '0.05em',
                    color: pkg.dark ? '#F5F0EA' : '#1E2D3A',
                  }}
                >
                  {pkg.name}
                </h3>

                {/* Vibe */}
                <p
                  className="playfair-italic mb-4"
                  style={{
                    fontSize: 'clamp(13px, 1.05vw, 15px)',
                    color: pkg.dark ? '#F0C4B0' : '#D4907A',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {pkg.vibe}
                </p>

                {/* Description */}
                <p
                  className="font-epilogue leading-relaxed mb-7"
                  style={{
                    fontSize: 'clamp(12px, 1vw, 14px)',
                    color: pkg.dark
                      ? 'rgba(245,240,234,0.48)'
                      : 'rgba(30,45,58,0.5)',
                  }}
                >
                  {pkg.description}
                </p>

                {/* Price block */}
                <div
                  className="mb-7 pb-7"
                  style={{
                    borderBottom: `1px solid ${
                      pkg.dark
                        ? 'rgba(245,240,234,0.1)'
                        : 'rgba(30,45,58,0.08)'
                    }`,
                  }}
                >
                  <span
                    className="block font-epilogue uppercase mb-1"
                    style={{
                      fontSize: '10px',
                      letterSpacing: '0.15em',
                      color: pkg.dark
                        ? 'rgba(245,240,234,0.3)'
                        : 'rgba(30,45,58,0.32)',
                    }}
                  >
                    {pkg.priceNote}
                  </span>
                  <span
                    className="font-epilogue font-black"
                    style={{
                      fontSize: 'clamp(30px, 3.2vw, 46px)',
                      letterSpacing: '-0.03em',
                      color: pkg.dark ? '#F0C4B0' : '#1E2D3A',
                      lineHeight: 1,
                    }}
                  >
                    {pkg.price}
                  </span>
                </div>

                {/* Includes list */}
                <ul className="space-y-2.5 mb-10 flex-1">
                  {pkg.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 font-epilogue"
                      style={{
                        fontSize: 'clamp(12px, 1vw, 13px)',
                        color: pkg.dark
                          ? 'rgba(245,240,234,0.62)'
                          : 'rgba(30,45,58,0.62)',
                      }}
                    >
                      <span
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: pkg.dark ? '#D4907A' : '#4A7B9D' }}
                      >
                        <svg
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                        >
                          <polyline
                            points="2,7 5.5,10.5 12,3.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {pkg.dark ? (
                  <a
                    href="#contact"
                    className="pricing-btn-outline inline-flex items-center justify-center px-6 py-3 font-epilogue font-bold uppercase tracking-widest text-xs"
                    style={{
                      border: '1px solid rgba(240,196,176,0.5)',
                      color: '#F0C4B0',
                    }}
                  >
                    Start a Project
                  </a>
                ) : pkg.featured ? (
                  <a
                    href="#contact"
                    className="btn-sweep inline-flex items-center justify-center gap-2 px-6 py-3 font-epilogue font-bold uppercase tracking-widest text-xs"
                    style={{ background: '#1E2D3A', color: '#F5F0EA' }}
                  >
                    <span className="relative z-10">Start a Project</span>
                  </a>
                ) : (
                  <a
                    href="#contact"
                    className="arrow-link font-epilogue font-bold uppercase tracking-widest text-xs flex items-center gap-2"
                    style={{ color: 'rgba(30,45,58,0.55)' }}
                  >
                    Get Started <span className="arrow">→</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p
          className="reveal mt-10 sm:mt-14 font-epilogue text-center"
          style={{
            fontSize: '13px',
            color: 'rgba(30,45,58,0.32)',
            letterSpacing: '0.02em',
          }}
        >
          All packages are custom-quoted based on scope. Prices reflect base estimates for typical projects.
        </p>

      </div>
    </section>
  )
}
