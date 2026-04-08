'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

type Project = {
  id: string
  title: string
  year: string
  tags: string[]
  image: string
  url: string | null
}

const projects: Project[] = [
  {
    id: '01',
    title: 'Lustro',
    year: '2026',
    tags: ['Brand Identity', 'Next.js', 'Content Strategy'],
    image: '/projects/screenshots/lustroshoes.png',
    url: 'https://lustroshoecare.netlify.app/',
  },
  {
    id: '02',
    title: 'Suko',
    year: '2025',
    tags: ['Next.js', 'Concept UI'],
    image: '/projects/screenshots/Soku_FitnessCoach.png',
    url: 'https://gabriela-chirinos.github.io/fitnessCoach_casestudy/',
  },
  {
    id: '03',
    title: 'Pan - Japanese Inspired Bakery',
    year: '2026',
    tags: ['Next.js', 'TypeScript', 'GSAP'],
    image: '/projects/screenshots/panbakery.png',
    url: 'https://gabriela-chirinos.github.io/japaneseBakery/',
  },
]

// ── Coming Soon screen placeholder ────────────────────────────────────────────
function ComingSoonPlaceholder() {
  return (
    <div className="absolute inset-0 bg-slate-navy flex flex-col items-center justify-center gap-3">
      <span
        className="font-epilogue font-black text-parchment/[0.06] select-none leading-none"
        style={{ fontSize: 'clamp(60px, 8vw, 100px)', letterSpacing: '-0.06em' }}
      >
        GC
      </span>
      <span className="font-epilogue text-[9px] uppercase tracking-[0.3em] text-parchment/25">
        In Progress
      </span>
    </div>
  )
}

// ── MacBook card (shared between carousel slots) ──────────────────────────────
interface MacBookCardProps {
  project: Project
  isCenter: boolean
  overlayVisible?: boolean
  onToggleOverlay?: () => void
  onNavigate?: () => void
}

function MacBookCard({
  project,
  isCenter,
  overlayVisible = false,
  onToggleOverlay,
  onNavigate,
}: MacBookCardProps) {
  const [imgError, setImgError] = useState(false)

  return (
    <div
      className={isCenter ? 'group' : ''}
      style={{ cursor: isCenter ? 'default' : 'pointer' }}
      onClick={() => {
        if (!isCenter && onNavigate) onNavigate()
        else if (isCenter && onToggleOverlay) onToggleOverlay()
      }}
    >
      {/* MacBook screen bezel */}
      <div className="macbook-screen">
        <div className="macbook-notch" />

        {/* Screen display area */}
        <div className="macbook-display">

          {/* Screenshot or placeholder */}
          {project.url === null ? (
            <div key={project.id} className="screen-content absolute inset-0">
              <ComingSoonPlaceholder />
            </div>
          ) : imgError ? (
            <div key={project.id} className="screen-content absolute inset-0 flex items-center justify-center bg-slate-navy/80">
              <span className="font-epilogue text-xs uppercase tracking-widest text-parchment/40">
                {project.title}
              </span>
            </div>
          ) : (
            <div key={project.id} className="screen-content absolute inset-0">
              <Image
                src={project.image}
                alt={`${project.title} project screenshot`}
                fill
                sizes="(max-width: 768px) 85vw, 44vw"
                className="object-cover object-top"
                onError={() => setImgError(true)}
                priority={project.id === '01'}
              />
            </div>
          )}

          {/* Overlay — only renders on the center card */}
          {isCenter && (
            <div
              className={[
                'absolute inset-0 flex items-center justify-center',
                'bg-slate-navy/70 backdrop-blur-[2px]',
                'transition-opacity duration-[250ms] ease-out',
                'group-hover:opacity-100',
                overlayVisible ? 'opacity-100' : 'opacity-0',
              ].join(' ')}
            >
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 min-h-[44px] px-6
                    font-epilogue font-bold text-xs uppercase tracking-widest
                    text-parchment border border-parchment/50 rounded-sm
                    hover:bg-parchment hover:text-slate-navy transition-colors duration-200"
                >
                  Visit Site <span>→</span>
                </a>
              ) : (
                <span
                  className="inline-flex items-center gap-2 min-h-[44px] px-6
                    font-epilogue font-bold text-xs uppercase tracking-widest
                    text-parchment/40 border border-parchment/20 rounded-sm cursor-default"
                >
                  Coming Soon
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Keyboard base */}
      <div className="macbook-hinge" />
      <div className="macbook-base">
        <div className="macbook-trackpad" />
      </div>

      {/* Project title — center card only */}
      {isCenter && (
        <div className="mt-4 text-center">
          <h3
            className="font-epilogue font-black text-slate-navy text-lg"
            style={{ letterSpacing: '-0.04em' }}
          >
            {project.title}
          </h3>
        </div>
      )}
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef(0)
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const pauseAndResume = () => {
    setIsPaused(true)
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current)
    pauseTimerRef.current = setTimeout(() => setIsPaused(false), 8000)
  }

  const goPrev = () => { pauseAndResume(); setActiveIndex(i => (i - 1 + projects.length) % projects.length) }
  const goNext = () => { pauseAndResume(); setActiveIndex(i => (i + 1) % projects.length) }
  const goTo  = (i: number) => { pauseAndResume(); setActiveIndex(i) }

  // Close overlay whenever active project changes
  useEffect(() => { setOverlayVisible(false) }, [activeIndex])

  // Auto-advance
  useEffect(() => {
    if (isPaused) return
    const id = setInterval(() => setActiveIndex(i => (i + 1) % projects.length), 2500)
    return () => clearInterval(id)
  }, [isPaused])

  const prevIndex = (activeIndex - 1 + projects.length) % projects.length
  const nextIndex = (activeIndex + 1) % projects.length

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      sectionRef.current?.querySelectorAll('.reveal').forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 82%', once: true } }
        )
      })

      const carousel = sectionRef.current?.querySelector('.carousel-area')
      if (carousel) {
        gsap.fromTo(carousel,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: carousel, start: 'top 80%', once: true } }
        )
      }
    }
    init()
  }, [])

  return (
    <section
      id="work"
      ref={sectionRef}
      className="py-28 md:py-40 bg-parchment overflow-hidden"
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">
        <div className="reveal mb-14 md:mb-20 text-center">
          <span className="block font-epilogue text-xs uppercase tracking-widest mb-3 text-slate-navy/40">
            Work
          </span>
          <h2
            className="font-epilogue font-black text-slate-navy leading-tight"
            style={{ fontSize: 'clamp(31px, 5vw, 72px)', letterSpacing: '-0.04em' }}
          >
            Curated{' '}
            <span className="playfair-italic">Archive</span>
          </h2>
        </div>
      </div>

      {/* Carousel */}
      <div
        className="carousel-area relative px-10 sm:px-16 lg:px-24"
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
        onTouchEnd={(e) => {
          const delta = touchStartX.current - e.changedTouches[0].clientX
          if (Math.abs(delta) > 50) { pauseAndResume(); delta > 0 ? goNext() : goPrev() }
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Prev arrow */}
        <button
          onClick={goPrev}
          aria-label="Previous project"
          className="absolute left-2 sm:left-4 top-[40%] -translate-y-1/2 z-20
            w-9 h-9 flex items-center justify-center rounded-full
            border border-slate-navy/15 bg-parchment/90 backdrop-blur-sm
            text-slate-navy hover:bg-slate-navy hover:text-parchment
            transition-colors duration-200 cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Next arrow */}
        <button
          onClick={goNext}
          aria-label="Next project"
          className="absolute right-2 sm:right-4 top-[40%] -translate-y-1/2 z-20
            w-9 h-9 flex items-center justify-center rounded-full
            border border-slate-navy/15 bg-parchment/90 backdrop-blur-sm
            text-slate-navy hover:bg-slate-navy hover:text-parchment
            transition-colors duration-200 cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M5 11l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* ── Mobile: single centered card ── */}
        <div className="md:hidden max-w-sm mx-auto">
          <MacBookCard
            project={projects[activeIndex]}
            isCenter
            overlayVisible={overlayVisible}
            onToggleOverlay={() => setOverlayVisible(v => !v)}
          />
        </div>

        {/* ── Desktop: 3-card perspective carousel ── */}
        <div
          className="hidden md:grid items-center"
          style={{ gridTemplateColumns: '1fr 1.45fr 1fr' }}
        >
          {/* Left card — rotated toward center */}
          <div
            key={`left-${prevIndex}`}
            className="carousel-side-enter"
            style={{
              transform: 'perspective(1000px) rotateY(20deg) scale(0.8)',
              transformOrigin: 'right center',
              opacity: 0.6,
              pointerEvents: 'auto',
            }}
          >
            <MacBookCard
              project={projects[prevIndex]}
              isCenter={false}
              onNavigate={goPrev}
            />
          </div>

          {/* Center card — straight on, elevated */}
          <div
            key={`center-${activeIndex}`}
            className="carousel-card-enter"
            style={{ position: 'relative', zIndex: 10 }}
          >
            <MacBookCard
              project={projects[activeIndex]}
              isCenter
              overlayVisible={overlayVisible}
              onToggleOverlay={() => setOverlayVisible(v => !v)}
            />
          </div>

          {/* Right card — rotated toward center */}
          <div
            key={`right-${nextIndex}`}
            className="carousel-side-enter"
            style={{
              transform: 'perspective(1000px) rotateY(-20deg) scale(0.8)',
              transformOrigin: 'left center',
              opacity: 0.6,
              pointerEvents: 'auto',
            }}
          >
            <MacBookCard
              project={projects[nextIndex]}
              isCenter={false}
              onNavigate={goNext}
            />
          </div>
        </div>

        {/* Dot progress indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to project ${i + 1}`}
              className={`h-1.5 rounded-full overflow-hidden transition-all duration-300 cursor-pointer ${
                i === activeIndex ? 'w-6 bg-slate-navy/20' : 'w-1.5 bg-slate-navy/25'
              }`}
            >
              {i === activeIndex && (
                <span
                  key={activeIndex}
                  className="block h-full bg-slate-navy rounded-full"
                  style={{
                    animation: 'dot-progress 4s linear forwards',
                    animationPlayState: isPaused ? 'paused' : 'running',
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
