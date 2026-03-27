'use client'

const disciplines = [
  { text: 'UI Components', filled: true },
  { text: 'Full Product Builds', filled: false },
  { text: 'Design Systems', filled: true },
  { text: 'Animation & Motion', filled: false },
  { text: 'Creative Development', filled: true },
  { text: 'UI Components', filled: false },
  { text: 'Full Product Builds', filled: true },
  { text: 'Design Systems', filled: false },
  { text: 'Animation & Motion', filled: true },
  { text: 'Creative Development', filled: false },
]

function MarqueeItem({ text, filled }: { text: string; filled: boolean }) {
  return (
    <span className="flex items-center shrink-0">
      <span
        className="font-epilogue font-black uppercase tracking-widest px-8 py-1"
        style={{
          fontSize: 'clamp(13px, 1.1vw, 15px)',
          letterSpacing: '0.18em',
          color: filled ? '#F5F0EA' : 'transparent',
          WebkitTextStroke: filled ? 'none' : '1px #F5F0EA',
        }}
      >
        {text}
      </span>
      {/* Dot separator */}
      <span
        className="shrink-0 rounded-full"
        style={{
          width: '5px',
          height: '5px',
          background: '#D4907A',
        }}
      />
    </span>
  )
}

export default function Marquee() {
  // Duplicate items for seamless infinite loop
  const items = [...disciplines, ...disciplines]

  return (
    <div
      className="w-full overflow-hidden py-5"
      style={{ background: '#1E2D3A' }}
      aria-hidden="true"
    >
      <div className="marquee-track">
        {items.map((item, i) => (
          <MarqueeItem key={i} text={item.text} filled={item.filled} />
        ))}
      </div>
    </div>
  )
}
