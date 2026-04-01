'use client'

import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '24px',
        zIndex: 9000,
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: hovered ? '#1E2D3A' : '#F5F0EA',
        border: '1px solid rgba(30,45,58,0.18)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '2px',
        boxShadow: hovered
          ? '0 8px 32px rgba(30,45,58,0.22)'
          : '0 4px 18px rgba(30,45,58,0.1)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.88)',
        pointerEvents: visible ? 'auto' : 'none',
        transition:
          'opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1), background 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Decorative blush dot — top-right */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '8px',
          right: '9px',
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          background: hovered ? '#F0C4B0' : '#D4907A',
          opacity: 0.8,
          transition: 'background 0.3s ease',
        }}
      />

      {/* Arrow up */}
      <svg
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        aria-hidden="true"
        style={{ marginTop: '2px' }}
      >
        <polyline
          points="3,10 8,5 13,10"
          stroke={hovered ? '#F5F0EA' : '#1E2D3A'}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transition: 'stroke 0.3s ease' }}
        />
      </svg>

      {/* Tiny label */}
      <span
        style={{
          fontFamily: 'var(--font-epilogue)',
          fontWeight: 700,
          fontSize: '7px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: hovered ? 'rgba(245,240,234,0.65)' : 'rgba(30,45,58,0.45)',
          lineHeight: 1,
          transition: 'color 0.3s ease',
        }}
      >
        top
      </span>
    </button>
  )
}
