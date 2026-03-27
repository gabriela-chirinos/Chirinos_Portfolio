'use client'

import { useEffect, useRef, useState } from 'react'
import Logo from './Logo'

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'nav-scrolled' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-16 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="block" aria-label="Gabriela Chirinos — Home">
          <Logo
            size={44}
            color={scrolled ? '#F0C4B0' : '#1E2D3A'}
          />
        </a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-10">
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
            className="btn-sweep inline-flex items-center px-5 py-2.5 font-epilogue font-bold uppercase tracking-widest text-xs transition-colors"
            style={{
              background: '#1E2D3A',
              color: '#F5F0EA',
            }}
          >
            <span className="relative z-10">Hire Me</span>
          </a>
        </div>

        {/* Mobile menu hint */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span
            className="block w-6 h-px"
            style={{ background: scrolled ? '#F5F0EA' : '#1E2D3A' }}
          />
          <span
            className="block w-4 h-px"
            style={{ background: scrolled ? '#F5F0EA' : '#1E2D3A' }}
          />
        </button>
      </div>
    </nav>
  )
}
