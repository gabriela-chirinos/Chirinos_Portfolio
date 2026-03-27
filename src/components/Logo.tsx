'use client'

interface LogoProps {
  color?: string
  size?: number
  className?: string
}

/**
 * GC monogram — lowercase italic Playfair 'g' with 'c' nested in the lower bowl.
 * Fully scalable, no raster assets needed.
 */
export default function Logo({
  color = '#1E2D3A',
  size = 52,
  className = '',
}: LogoProps) {
  const cSize = size * 0.3

  return (
    <div
      className={`relative inline-block leading-none select-none ${className}`}
      style={{
        fontFamily: 'var(--font-playfair)',
        fontStyle: 'italic',
        color,
        lineHeight: 1,
        width: size * 0.72,
        height: size * 1.05,
      }}
    >
      {/* Outer 'g' */}
      <span
        aria-hidden="true"
        style={{
          fontSize: size,
          lineHeight: 1,
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        g
      </span>

      {/* Inner 'c' — sits in the lower enclosed bowl of the g */}
      <span
        aria-hidden="true"
        style={{
          fontSize: cSize,
          lineHeight: 1,
          display: 'block',
          position: 'absolute',
          bottom: size * 0.05,
          left: '50%',
          transform: 'translateX(-44%)',
          opacity: 0.85,
        }}
      >
        c
      </span>

      {/* Screen reader label */}
      <span className="sr-only">GC</span>
    </div>
  )
}
