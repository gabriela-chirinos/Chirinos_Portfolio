'use client'

interface SacredGeometryProps {
  variant?: 'flower' | 'hex'
  className?: string
  color?: string
  opacity?: number
  size?: number
}

export function FlowerOfLife({
  className = '',
  color = 'currentColor',
  opacity = 0.06,
  size = 600,
}: {
  className?: string
  color?: string
  opacity?: number
  size?: number
}) {
  const cx = size / 2
  const cy = size / 2
  const r = size * 0.13 // circle radius

  // Ring 1: 6 circles at distance r from center
  const ring1 = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * Math.PI) / 3
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    }
  })

  // Ring 2: 6 circles at distance 2r (at 30° offset)
  const ring2 = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * Math.PI) / 3 + Math.PI / 6
    return {
      x: cx + r * Math.sqrt(3) * Math.cos(angle),
      y: cy + r * Math.sqrt(3) * Math.sin(angle),
    }
  })

  // Metatron's cube: all 13 circle centers connected
  const allCenters = [{ x: cx, y: cy }, ...ring1, ...ring2]

  const lines: Array<[number, number, number, number]> = []
  for (let i = 0; i < allCenters.length; i++) {
    for (let j = i + 1; j < allCenters.length; j++) {
      lines.push([allCenters[i].x, allCenters[i].y, allCenters[j].x, allCenters[j].y])
    }
  }

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className={className}
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke={color} fill="none" strokeWidth="0.6">
        {/* Outer containment ring */}
        <circle cx={cx} cy={cy} r={r * 3} strokeWidth="0.4" />

        {/* Metatron lines */}
        {lines.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="0.3" />
        ))}

        {/* Center circle */}
        <circle cx={cx} cy={cy} r={r} />

        {/* Ring 1 circles */}
        {ring1.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r={r} />
        ))}

        {/* Ring 2 circles (outer petals) */}
        {ring2.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r={r} strokeWidth="0.4" />
        ))}

        {/* Star of David hexagram */}
        <polygon
          points={ring1
            .filter((_, i) => i % 2 === 0)
            .map((c) => `${c.x},${c.y}`)
            .join(' ')}
          strokeWidth="0.5"
        />
        <polygon
          points={ring1
            .filter((_, i) => i % 2 === 1)
            .map((c) => `${c.x},${c.y}`)
            .join(' ')}
          strokeWidth="0.5"
        />
      </g>
    </svg>
  )
}

export function HexGeometry({
  className = '',
  color = 'currentColor',
  opacity = 0.06,
  size = 500,
}: {
  className?: string
  color?: string
  opacity?: number
  size?: number
}) {
  const cx = size / 2
  const cy = size / 2
  const R = size * 0.42

  // Hexagon vertices
  const hex = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * Math.PI) / 3 - Math.PI / 6
    return {
      x: cx + R * Math.cos(angle),
      y: cy + R * Math.sin(angle),
    }
  })

  // Inner hexagon
  const innerHex = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * Math.PI) / 3 - Math.PI / 6
    return {
      x: cx + (R * 0.55) * Math.cos(angle),
      y: cy + (R * 0.55) * Math.sin(angle),
    }
  })

  // Innermost hexagon
  const innermostHex = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * Math.PI) / 3 - Math.PI / 6
    return {
      x: cx + (R * 0.28) * Math.cos(angle),
      y: cy + (R * 0.28) * Math.sin(angle),
    }
  })

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className={className}
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke={color} fill="none" strokeWidth="0.6">
        {/* Outer circle */}
        <circle cx={cx} cy={cy} r={R * 1.05} strokeWidth="0.4" />
        <circle cx={cx} cy={cy} r={R} strokeWidth="0.3" />

        {/* Outer hexagon */}
        <polygon points={hex.map((v) => `${v.x},${v.y}`).join(' ')} />

        {/* Spokes from center to hex vertices */}
        {hex.map((v, i) => (
          <line key={i} x1={cx} y1={cy} x2={v.x} y2={v.y} strokeWidth="0.4" />
        ))}

        {/* Cross-spokes */}
        {hex.map((v, i) => (
          <line
            key={`cross-${i}`}
            x1={v.x}
            y1={v.y}
            x2={hex[(i + 2) % 6].x}
            y2={hex[(i + 2) % 6].y}
            strokeWidth="0.3"
          />
        ))}

        {/* Inner hexagon */}
        <polygon points={innerHex.map((v) => `${v.x},${v.y}`).join(' ')} />

        {/* Innermost hexagon (rotated 30°) */}
        <polygon points={innermostHex.map((v) => `${v.x},${v.y}`).join(' ')} strokeWidth="0.5" />

        {/* Two star triangles */}
        <polygon
          points={innerHex
            .filter((_, i) => i % 2 === 0)
            .map((v) => `${v.x},${v.y}`)
            .join(' ')}
          strokeWidth="0.5"
        />
        <polygon
          points={innerHex
            .filter((_, i) => i % 2 === 1)
            .map((v) => `${v.x},${v.y}`)
            .join(' ')}
          strokeWidth="0.5"
        />

        {/* Center dot */}
        <circle cx={cx} cy={cy} r={R * 0.04} fill={color} stroke="none" />
      </g>
    </svg>
  )
}
