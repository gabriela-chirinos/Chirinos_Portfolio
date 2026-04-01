'use client'

import { useEffect, useRef, useState } from 'react'
import Logo from './Logo'

const navLinks = [
  { label: 'Work',       href: '#work',       num: '01' },
  { label: 'Philosophy', href: '#philosophy',  num: '02' },
  { label: 'Pricing',    href: '#pricing',     num: '03' },
  { label: 'Stack',      href: '#stack',       num: '04' },
  { label: 'Contact',    href: '#contact',     num: '05' },
]

export default function Navigation() {
  const [scrolled,  setScrolled]  = useState(false)
  const [isOpen,    setIsOpen]    = useState(false)
  const [animating, setAnimating] = useState(false)

  const navRef     = useRef<HTMLElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const linksRef   = useRef<HTMLDivElement>(null)
  const line1Ref   = useRef<HTMLSpanElement>(null)
  const line2Ref   = useRef<HTMLSpanElement>(null)
  const line3Ref   = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const openMenu = async () => {
    if (animating) return
    setAnimating(true)
    setIsOpen(true)
    document.body.style.overflow = 'hidden'

    const { gsap } = await import('gsap')
    const overlay = overlayRef.current
    const linkEls = linksRef.current?.querySelectorAll('.menu-link')
    const l1 = line1Ref.current
    const l2 = line2Ref.current
    const l3 = line3Ref.current

    if (!overlay) { setAnimating(false); return }

    const tl = gsap.timeline({ onComplete: () => setAnimating(false) })

    // ── 3 lines → X ─────────────────────────────────────────────────────────
    if (l1 && l2 && l3) {
      tl.to(l1, { rotation: 45,  y: 7,  width: 24, duration: 0.35, ease: 'power2.inOut' }, 0)
      tl.to(l2, { scaleX: 0, opacity: 0,            duration: 0.18, ease: 'power2.in'   }, 0)
      tl.to(l3, { rotation: -45, y: -7, width: 24,  duration: 0.35, ease: 'power2.inOut' }, 0)
    }

    // ── Clip-path reveal from top-right (hamburger position) ─────────────────
    gsap.set(overlay, { display: 'flex', clipPath: 'circle(0% at calc(100% - 40px) 44px)' })
    tl.to(overlay, {
      clipPath: 'circle(150% at calc(100% - 40px) 44px)',
      duration: 0.72, ease: 'power3.inOut',
    }, 0.05)

    // ── Links stagger in from right ──────────────────────────────────────────
    if (linkEls) {
      gsap.set(linkEls, { opacity: 0, x: 64 })
      tl.to(linkEls, {
        opacity: 1, x: 0,
        duration: 0.55, ease: 'power3.out',
        stagger: 0.09,
      }, 0.38)
    }
  }

  const closeMenu = async () => {
    if (animating) return
    setAnimating(true)

    const { gsap } = await import('gsap')
    const overlay = overlayRef.current
    const linkEls = linksRef.current?.querySelectorAll('.menu-link')
    const l1 = line1Ref.current
    const l2 = line2Ref.current
    const l3 = line3Ref.current

    const tl = gsap.timeline({
      onComplete: () => {
        if (overlay) gsap.set(overlay, { display: 'none' })
        document.body.style.overflow = ''
        setIsOpen(false)
        setAnimating(false)
      },
    })

    // ── Links out ─────────────────────────────────────────────────────────────
    if (linkEls) {
      tl.to(linkEls, {
        opacity: 0, x: 48,
        duration: 0.25, ease: 'power2.in',
        stagger: 0.04,
      }, 0)
    }

    // ── X → 3 lines ──────────────────────────────────────────────────────────
    if (l1 && l2 && l3) {
      tl.to(l1, { rotation: 0, y: 0, duration: 0.3, ease: 'power2.inOut' }, 0.08)
      tl.to(l2, { scaleX: 1, opacity: 1,             duration: 0.22, ease: 'power2.out' }, 0.2)
      tl.to(l3, { rotation: 0, y: 0, duration: 0.3, ease: 'power2.inOut' }, 0.08)
    }

    // ── Clip-path collapse ────────────────────────────────────────────────────
    tl.to(overlay, {
      clipPath: 'circle(0% at calc(100% - 40px) 44px)',
      duration: 0.55, ease: 'power3.inOut',
    }, 0.12)
  }

  const handleLinkClick = () => { if (isOpen) closeMenu() }

  const lineColor = isOpen || scrolled ? '#F0C4B0' : '#1E2D3A'

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
          scrolled && !isOpen ? 'nav-scrolled' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 lg:px-16 h-20 flex items-center justify-between">

          {/* Logo */}
          <a href="#hero" className="block" aria-label="Gabriela Chirinos — Home">
            <Logo
              size={44}
              color={isOpen ? '#F0C4B0' : scrolled ? '#F0C4B0' : '#1E2D3A'}
            />
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center md:gap-6 lg:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-epilogue font-semibold uppercase tracking-widest text-xs transition-colors"
                style={{
                  color: scrolled ? 'rgba(245,240,234,0.7)' : 'rgba(30,45,58,0.6)',
                  letterSpacing: '0.12em',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.color = scrolled
                    ? '#F0C4B0'
                    : '#1E2D3A'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.color = scrolled
                    ? 'rgba(245,240,234,0.7)'
                    : 'rgba(30,45,58,0.6)'
                }}
              >
                {link.label}
              </a>
            ))}

            <a
              href="#contact"
              className="btn-sweep inline-flex items-center px-5 py-2.5 font-epilogue font-bold uppercase tracking-widest text-xs"
              style={{ background: '#1E2D3A', color: '#F5F0EA' }}
            >
              <span className="relative z-10">Hire Me</span>
            </a>
          </div>

          {/* ── Hamburger / X button ── */}
          <button
            className="md:hidden flex flex-col justify-center gap-[6px] p-2"
            style={{ width: '40px', height: '40px' }}
            onClick={isOpen ? closeMenu : openMenu}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <span
              ref={line1Ref}
              className="block h-px"
              style={{ width: '24px', background: lineColor, transformOrigin: 'center' }}
            />
            <span
              ref={line2Ref}
              className="block h-px"
              style={{ width: '16px', background: lineColor }}
            />
            <span
              ref={line3Ref}
              className="block h-px"
              style={{ width: '24px', background: lineColor, transformOrigin: 'center' }}
            />
          </button>

        </div>
      </nav>

      {/* ── Full-screen mobile menu overlay ─────────────────────────────────── */}
      <div
        ref={overlayRef}
        className="md:hidden fixed inset-0 z-[55] flex-col justify-center px-8 pt-28 pb-12"
        style={{
          background: '#1E2D3A',
          display: 'none',
          clipPath: 'circle(0% at calc(100% - 40px) 44px)',
        }}
      >

        {/* Nav links */}
        <div ref={linksRef} className="flex flex-col">
          {navLinks.map((link) => (
            <div key={link.href} className="menu-link">
              <a
                href={link.href}
                onClick={handleLinkClick}
                className="group flex items-baseline gap-4 py-1"
              >
                {/* Step number */}
                <span
                  className="font-epilogue font-semibold uppercase flex-shrink-0"
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.18em',
                    color: 'rgba(240,196,176,0.28)',
                  }}
                >
                  {link.num}
                </span>

                {/* Link label */}
                <span
                  className="font-epilogue font-black leading-none"
                  style={{
                    fontSize: 'clamp(34px, 9.5vw, 58px)',
                    letterSpacing: '-0.04em',
                    color: '#F0C4B0',
                    transition: 'color 0.3s ease, letter-spacing 0.35s ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = '#F5F0EA'
                    el.style.letterSpacing = '-0.02em'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = '#F0C4B0'
                    el.style.letterSpacing = '-0.04em'
                  }}
                >
                  {link.label}
                </span>
              </a>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          className="mt-8 mb-6"
          style={{ height: '1px', background: 'rgba(240,196,176,0.1)' }}
        />

        {/* Footer line */}
        <p
          className="font-epilogue uppercase"
          style={{
            fontSize: '9px',
            letterSpacing: '0.22em',
            color: 'rgba(240,196,176,0.22)',
          }}
        >
          Gabriela Chirinos · Frontend Developer · Available
        </p>

      </div>
    </>
  )
}
